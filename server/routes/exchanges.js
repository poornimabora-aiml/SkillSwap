const express = require('express');
const router = express.Router();
const { inMemoryDB } = require('../config/supabase');

function enrichRequest(req) {
  const requester = inMemoryDB.users.find(u => u.user_id === req.requester_id);
  const receiver = inMemoryDB.users.find(u => u.user_id === req.receiver_id);
  const offered = inMemoryDB.skills.find(s => s.skill_id === req.offered_skill_id);
  const requested = inMemoryDB.skills.find(s => s.skill_id === req.requested_skill_id);

  return {
    ...req,
    requester_name: requester ? requester.full_name : 'User',
    requester_email: requester ? requester.email : '',
    requester_avatar: requester ? requester.avatar_url : '',
    receiver_name: receiver ? receiver.full_name : 'User',
    receiver_email: receiver ? receiver.email : '',
    receiver_avatar: receiver ? receiver.avatar_url : '',
    offered_skill_name: offered ? offered.skill_name : 'Offered Skill',
    requested_skill_name: requested ? requested.skill_name : 'Requested Skill'
  };
}

// POST /api/exchanges/request
router.post('/request', (req, res) => {
  try {
    const { requester_id, receiver_id, offered_skill_id, requested_skill_id, message } = req.body;

    if (!requester_id || !receiver_id || !offered_skill_id || !requested_skill_id) {
      return res.status(400).json({ error: 'All fields (requester, receiver, offered skill, requested skill) are required.' });
    }

    if (requester_id === receiver_id) {
      return res.status(400).json({ error: 'Cannot send an exchange request to yourself.' });
    }

    // Check if an identical pending request already exists
    const duplicate = inMemoryDB.exchange_requests.find(
      r =>
        r.requester_id === requester_id &&
        r.receiver_id === receiver_id &&
        r.status === 'Pending'
    );
    if (duplicate) {
      return res.status(400).json({ error: 'A pending request to this user already exists.' });
    }

    const newRequest = {
      request_id: 'req-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
      requester_id,
      receiver_id,
      offered_skill_id,
      requested_skill_id,
      status: 'Pending',
      message: message || 'I would like to exchange skills with you on SkillSwap!',
      created_at: new Date().toISOString()
    };

    inMemoryDB.exchange_requests.unshift(newRequest);

    res.status(201).json({
      message: 'Exchange request sent successfully!',
      request: enrichRequest(newRequest)
    });
  } catch (err) {
    console.error('Create request error:', err);
    res.status(500).json({ error: 'Server error sending exchange request.' });
  }
});

// GET /api/exchanges/requests/:userId
router.get('/requests/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    const received = inMemoryDB.exchange_requests
      .filter(r => r.receiver_id === userId)
      .map(enrichRequest);

    const sent = inMemoryDB.exchange_requests
      .filter(r => r.requester_id === userId)
      .map(enrichRequest);

    res.json({
      received,
      sent,
      pending_received_count: received.filter(r => r.status === 'Pending').length
    });
  } catch (err) {
    console.error('Fetch requests error:', err);
    res.status(500).json({ error: 'Server error fetching requests.' });
  }
});

// PUT /api/exchanges/requests/:requestId/status
router.put('/requests/:requestId/status', (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // 'Accepted' | 'Rejected' | 'Cancelled'

    if (!['Accepted', 'Rejected', 'Cancelled'].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Allowed values: 'Accepted', 'Rejected', 'Cancelled'." });
    }

    const request = inMemoryDB.exchange_requests.find(r => r.request_id === requestId);
    if (!request) {
      return res.status(404).json({ error: 'Exchange request not found.' });
    }

    request.status = status;
    request.updated_at = new Date().toISOString();

    let createdExchange = null;

    // Relational Trigger emulation: When status is 'Accepted', automatically create Exchange record
    if (status === 'Accepted') {
      const existingExchange = inMemoryDB.exchanges.find(e => e.request_id === requestId);
      if (!existingExchange) {
        createdExchange = {
          exchange_id: 'ex-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
          request_id: requestId,
          start_date: new Date().toISOString(),
          completion_date: null,
          status: 'Active',
          feedback: 'Exchange ongoing. Both participants have commenced skill sharing sessions.'
        };
        inMemoryDB.exchanges.unshift(createdExchange);
      }
    }

    res.json({
      message: `Request ${status.toLowerCase()} successfully!`,
      request: enrichRequest(request),
      exchange: createdExchange
    });
  } catch (err) {
    console.error('Update request status error:', err);
    res.status(500).json({ error: 'Server error updating request status.' });
  }
});

// GET /api/exchanges/user/:userId
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    // Find all exchanges where userId is requester or receiver
    const userExchanges = inMemoryDB.exchanges
      .map(ex => {
        const req = inMemoryDB.exchange_requests.find(r => r.request_id === ex.request_id);
        if (!req) return null;
        if (req.requester_id !== userId && req.receiver_id !== userId) return null;

        const isRequester = req.requester_id === userId;
        const partnerId = isRequester ? req.receiver_id : req.requester_id;
        const partner = inMemoryDB.users.find(u => u.user_id === partnerId);
        const myOfferedSkill = inMemoryDB.skills.find(s => s.skill_id === (isRequester ? req.offered_skill_id : req.requested_skill_id));
        const myRequestedSkill = inMemoryDB.skills.find(s => s.skill_id === (isRequester ? req.requested_skill_id : req.offered_skill_id));

        // Has this user reviewed this exchange?
        const myReview = inMemoryDB.reviews.find(rev => rev.exchange_id === ex.exchange_id && rev.reviewer_id === userId);
        const partnerReview = inMemoryDB.reviews.find(rev => rev.exchange_id === ex.exchange_id && rev.reviewer_id === partnerId);

        return {
          exchange_id: ex.exchange_id,
          request_id: ex.request_id,
          start_date: ex.start_date,
          completion_date: ex.completion_date,
          status: ex.status,
          feedback: ex.feedback,
          partner: {
            user_id: partner ? partner.user_id : '',
            name: partner ? partner.full_name : 'Partner',
            email: partner ? partner.email : '',
            avatar: partner ? partner.avatar_url : '',
            location: partner ? partner.location : ''
          },
          you_teach: myOfferedSkill ? myOfferedSkill.skill_name : 'Skill',
          they_teach: myRequestedSkill ? myRequestedSkill.skill_name : 'Skill',
          has_reviewed: !!myReview,
          my_review: myReview || null,
          partner_review: partnerReview || null
        };
      })
      .filter(Boolean);

    res.json({
      active: userExchanges.filter(e => e.status === 'Active'),
      completed: userExchanges.filter(e => e.status === 'Completed'),
      all: userExchanges
    });
  } catch (err) {
    console.error('Fetch user exchanges error:', err);
    res.status(500).json({ error: 'Server error fetching exchanges.' });
  }
});

// PUT /api/exchanges/:exchangeId/complete
router.put('/:exchangeId/complete', (req, res) => {
  try {
    const { exchangeId } = req.params;
    const { feedback } = req.body;

    const exchange = inMemoryDB.exchanges.find(e => e.exchange_id === exchangeId);
    if (!exchange) {
      return res.status(404).json({ error: 'Exchange not found.' });
    }

    exchange.status = 'Completed';
    exchange.completion_date = new Date().toISOString();
    if (feedback) exchange.feedback = feedback;

    res.json({
      message: 'Exchange marked as completed!',
      exchange
    });
  } catch (err) {
    console.error('Complete exchange error:', err);
    res.status(500).json({ error: 'Server error completing exchange.' });
  }
});

module.exports = router;
