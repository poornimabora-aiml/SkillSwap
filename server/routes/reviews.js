const express = require('express');
const router = express.Router();
const { inMemoryDB } = require('../config/supabase');

// POST /api/reviews
router.post('/', (req, res) => {
  try {
    const { exchange_id, reviewer_id, rating, comments } = req.body;

    if (!exchange_id || !reviewer_id || !rating) {
      return res.status(400).json({ error: 'Exchange ID, reviewer ID, and rating (1-5) are required.' });
    }

    const numRating = parseInt(rating, 10);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ error: 'Rating must be an integer between 1 and 5.' });
    }

    const exchange = inMemoryDB.exchanges.find(e => e.exchange_id === exchange_id);
    if (!exchange) {
      return res.status(404).json({ error: 'Associated exchange not found.' });
    }

    // Check if user already reviewed this exchange
    const existing = inMemoryDB.reviews.find(
      r => r.exchange_id === exchange_id && r.reviewer_id === reviewer_id
    );
    if (existing) {
      existing.rating = numRating;
      existing.comments = comments || existing.comments;
      return res.json({ message: 'Review updated successfully!', review: existing });
    }

    const newReview = {
      review_id: 'rev-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
      exchange_id,
      reviewer_id,
      rating: numRating,
      comments: comments || 'Great exchange experience!',
      created_at: new Date().toISOString()
    };

    inMemoryDB.reviews.push(newReview);

    const reviewer = inMemoryDB.users.find(u => u.user_id === reviewer_id);

    res.status(201).json({
      message: 'Review submitted successfully!',
      review: {
        ...newReview,
        reviewer_name: reviewer ? reviewer.full_name : 'Community Member'
      }
    });
  } catch (err) {
    console.error('Submit review error:', err);
    res.status(500).json({ error: 'Server error submitting review.' });
  }
});

// GET /api/reviews/exchange/:exchangeId
router.get('/exchange/:exchangeId', (req, res) => {
  try {
    const { exchangeId } = req.params;
    const reviews = inMemoryDB.reviews
      .filter(r => r.exchange_id === exchangeId)
      .map(r => {
        const reviewer = inMemoryDB.users.find(u => u.user_id === r.reviewer_id);
        return {
          ...r,
          reviewer_name: reviewer ? reviewer.full_name : 'Community Member',
          reviewer_avatar: reviewer ? reviewer.avatar_url : ''
        };
      });

    res.json(reviews);
  } catch (err) {
    console.error('Fetch exchange reviews error:', err);
    res.status(500).json({ error: 'Server error fetching reviews.' });
  }
});

module.exports = router;
