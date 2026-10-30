const express = require('express');
const router = express.Router();
const { inMemoryDB } = require('../config/supabase');

// Helper to get skills for a user
function getUserSkillDetails(userId) {
  const teachSkills = inMemoryDB.user_skills
    .filter(us => us.user_id === userId && us.skill_type === 'Teach')
    .map(us => {
      const s = inMemoryDB.skills.find(sk => sk.skill_id === us.skill_id);
      return s ? { ...s, proficiency_level: us.proficiency_level, user_skill_id: us.user_skill_id } : null;
    })
    .filter(Boolean);

  const learnSkills = inMemoryDB.user_skills
    .filter(us => us.user_id === userId && us.skill_type === 'Learn')
    .map(us => {
      const s = inMemoryDB.skills.find(sk => sk.skill_id === us.skill_id);
      return s ? { ...s, proficiency_level: us.proficiency_level, user_skill_id: us.user_skill_id } : null;
    })
    .filter(Boolean);

  return { teachSkills, learnSkills };
}

// GET /api/matches/recommendations/:userId
// Computes two-way mutual matches and one-way matches for a given user
router.get('/recommendations/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = inMemoryDB.users.find(u => u.user_id === userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const { teachSkills: myTeach, learnSkills: myLearn } = getUserSkillDetails(userId);
    const myTeachIds = new Set(myTeach.map(s => s.skill_id));
    const myLearnIds = new Set(myLearn.map(s => s.skill_id));

    const recommendations = [];

    // Compare with all other users
    for (const partner of inMemoryDB.users) {
      if (partner.user_id === userId) continue;

      const { teachSkills: partnerTeach, learnSkills: partnerLearn } = getUserSkillDetails(partner.user_id);

      // What I can teach partner that partner wants to learn
      const iCanTeachThem = myTeach.filter(s => partnerLearn.some(pl => pl.skill_id === s.skill_id));

      // What partner can teach me that I want to learn
      const theyCanTeachMe = partnerTeach.filter(s => myLearn.some(ml => ml.skill_id === s.skill_id));

      let matchPercentage = 0;
      let compatibilityLabel = 'No Direct Match';
      let isReciprocal = false;

      if (iCanTeachThem.length > 0 && theyCanTeachMe.length > 0) {
        matchPercentage = 100;
        compatibilityLabel = '100% Perfect Mutual Match';
        isReciprocal = true;
      } else if (iCanTeachThem.length > 0) {
        matchPercentage = 50;
        compatibilityLabel = '50% One-Way Match (You teach them)';
        isReciprocal = false;
      } else if (theyCanTeachMe.length > 0) {
        matchPercentage = 50;
        compatibilityLabel = '50% One-Way Match (They teach you)';
        isReciprocal = false;
      }

      // Calculate rating
      const partnerRequests = inMemoryDB.exchange_requests.filter(
        r => r.requester_id === partner.user_id || r.receiver_id === partner.user_id
      );
      const reqIds = partnerRequests.map(r => r.request_id);
      const partnerExchanges = inMemoryDB.exchanges.filter(e => reqIds.includes(e.request_id));
      const exIds = partnerExchanges.map(e => e.exchange_id);
      const reviews = inMemoryDB.reviews.filter(rev => exIds.includes(rev.exchange_id) && rev.reviewer_id !== partner.user_id);
      const rating = reviews.length ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : '5.0';

      // Only recommend if there is at least a 50% match
      if (matchPercentage > 0) {
        recommendations.push({
          partner_id: partner.user_id,
          partner_name: partner.full_name,
          partner_email: partner.email,
          partner_location: partner.location,
          partner_bio: partner.bio,
          partner_avatar: partner.avatar_url,
          rating: parseFloat(rating),
          total_reviews: reviews.length,
          match_percentage: matchPercentage,
          compatibility_label: compatibilityLabel,
          is_reciprocal: isReciprocal,
          you_teach_them: iCanTeachThem,
          they_teach_you: theyCanTeachMe,
          all_partner_teaches: partnerTeach,
          all_partner_learns: partnerLearn
        });
      }
    }

    // Sort: 100% matches first, then by rating, then by name
    recommendations.sort((a, b) => {
      if (b.match_percentage !== a.match_percentage) {
        return b.match_percentage - a.match_percentage;
      }
      return b.rating - a.rating;
    });

    res.json({
      user_id: userId,
      total_matches: recommendations.length,
      mutual_count: recommendations.filter(r => r.is_reciprocal).length,
      one_way_count: recommendations.filter(r => !r.is_reciprocal).length,
      matches: recommendations
    });
  } catch (err) {
    console.error('Match recommendation error:', err);
    res.status(500).json({ error: 'Server error computing skill matches.' });
  }
});

// GET /api/matches/all-mutual
// System-wide view of all 100% reciprocal pairs (Mirrors PostgreSQL View_Mutual_Skill_Matches)
router.get('/all-mutual', (req, res) => {
  try {
    const mutualPairs = [];
    const users = inMemoryDB.users;

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const u1 = users[i];
        const u2 = users[j];

        const { teachSkills: u1Teach, learnSkills: u1Learn } = getUserSkillDetails(u1.user_id);
        const { teachSkills: u2Teach, learnSkills: u2Learn } = getUserSkillDetails(u2.user_id);

        const u1TeachesU2 = u1Teach.filter(s => u2Learn.some(l => l.skill_id === s.skill_id));
        const u2TeachesU1 = u2Teach.filter(s => u1Learn.some(l => l.skill_id === s.skill_id));

        if (u1TeachesU2.length > 0 && u2TeachesU1.length > 0) {
          mutualPairs.push({
            user_a: {
              user_id: u1.user_id,
              name: u1.full_name,
              location: u1.location,
              avatar: u1.avatar_url,
              teaches: u1TeachesU2[0]
            },
            user_b: {
              user_id: u2.user_id,
              name: u2.full_name,
              location: u2.location,
              avatar: u2.avatar_url,
              teaches: u2TeachesU1[0]
            },
            match_percentage: 100,
            compatibility_label: '100% Perfect Reciprocal Match'
          });
        }
      }
    }

    res.json(mutualPairs);
  } catch (err) {
    console.error('All mutual error:', err);
    res.status(500).json({ error: 'Server error fetching mutual matches.' });
  }
});

module.exports = router;
