const express = require('express');
const router = express.Router();
const { inMemoryDB } = require('../config/supabase');

// GET /api/skills
router.get('/', (req, res) => {
  res.json(inMemoryDB.skills);
});

// GET /api/skills/categories
router.get('/categories', (req, res) => {
  const categories = [...new Set(inMemoryDB.skills.map(s => s.category))];
  res.json(categories);
});

// GET /api/skills/explore
// Explores who teaches what with filters
router.get('/explore', (req, res) => {
  const { search, category, level } = req.query;

  // Join User_Skills (Teach) with Users and Skills
  let teachers = inMemoryDB.user_skills
    .filter(us => us.skill_type === 'Teach')
    .map(us => {
      const user = inMemoryDB.users.find(u => u.user_id === us.user_id);
      const skill = inMemoryDB.skills.find(s => s.skill_id === us.skill_id);
      if (!user || !skill) return null;

      // Find user's rating
      const userRequests = inMemoryDB.exchange_requests.filter(r => r.requester_id === user.user_id || r.receiver_id === user.user_id);
      const requestIds = userRequests.map(r => r.request_id);
      const userExchanges = inMemoryDB.exchanges.filter(e => requestIds.includes(e.request_id));
      const exchangeIds = userExchanges.map(e => e.exchange_id);
      const reviews = inMemoryDB.reviews.filter(rev => exchangeIds.includes(rev.exchange_id) && rev.reviewer_id !== user.user_id);
      const rating = reviews.length ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : '5.0';

      // Find what this user wants to learn (for mutual exchange context!)
      const learningSkills = inMemoryDB.user_skills
        .filter(l => l.user_id === user.user_id && l.skill_type === 'Learn')
        .map(l => {
          const ls = inMemoryDB.skills.find(s => s.skill_id === l.skill_id);
          return ls ? ls.skill_name : null;
        })
        .filter(Boolean);

      return {
        user_skill_id: us.user_skill_id,
        user_id: user.user_id,
        user_name: user.full_name,
        user_email: user.email,
        user_avatar: user.avatar_url,
        location: user.location,
        bio: user.bio,
        skill_id: skill.skill_id,
        skill_name: skill.skill_name,
        category: skill.category,
        description: skill.description,
        proficiency_level: us.proficiency_level,
        wants_to_learn: learningSkills,
        rating: parseFloat(rating),
        total_reviews: reviews.length,
        availability: 'Available for Exchange'
      };
    })
    .filter(Boolean);

  // Apply Search
  if (search) {
    const q = search.toLowerCase();
    teachers = teachers.filter(
      t =>
        t.skill_name.toLowerCase().includes(q) ||
        t.user_name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }

  // Apply Category Filter
  if (category && category !== 'All') {
    teachers = teachers.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }

  // Apply Level Filter
  if (level && level !== 'All') {
    teachers = teachers.filter(t => t.proficiency_level.toLowerCase() === level.toLowerCase());
  }

  res.json(teachers);
});

// POST /api/skills (Create new skill)
router.post('/', (req, res) => {
  const { skill_name, category, description } = req.body;
  if (!skill_name || !category) {
    return res.status(400).json({ error: 'Skill name and category are required.' });
  }

  const existing = inMemoryDB.skills.find(s => s.skill_name.toLowerCase() === skill_name.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'Skill already exists in catalog.' });
  }

  const newSkill = {
    skill_id: 'sk-' + Math.random().toString(36).substring(2, 9),
    skill_name,
    category,
    description: description || ''
  };

  inMemoryDB.skills.push(newSkill);
  res.status(201).json(newSkill);
});

module.exports = router;
