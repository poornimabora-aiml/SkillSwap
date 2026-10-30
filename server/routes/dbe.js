const express = require('express');
const router = express.Router();
const { inMemoryDB } = require('../config/supabase');

// GET /api/dbe/stats
router.get('/stats', (req, res) => {
  res.json({
    tables: {
      users: inMemoryDB.users.length,
      skills: inMemoryDB.skills.length,
      user_skills: inMemoryDB.user_skills.length,
      exchange_requests: inMemoryDB.exchange_requests.length,
      exchanges: inMemoryDB.exchanges.length,
      reviews: inMemoryDB.reviews.length
    },
    metrics: {
      total_exchanges_active: inMemoryDB.exchanges.filter(e => e.status === 'Active').length,
      total_exchanges_completed: inMemoryDB.exchanges.filter(e => e.status === 'Completed').length,
      pending_requests: inMemoryDB.exchange_requests.filter(r => r.status === 'Pending').length,
      average_platform_rating: (
        inMemoryDB.reviews.reduce((acc, r) => acc + r.rating, 0) / (inMemoryDB.reviews.length || 1)
      ).toFixed(2)
    }
  });
});

// GET /api/dbe/schema
router.get('/schema', (req, res) => {
  const schema = [
    {
      table_name: 'Users',
      description: 'Stores member credentials, location, and profiles',
      primary_key: 'user_id',
      foreign_keys: [],
      columns: [
        { name: 'user_id', type: 'UUID', constraint: 'PRIMARY KEY' },
        { name: 'full_name', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
        { name: 'email', type: 'VARCHAR(150)', constraint: 'UNIQUE, NOT NULL, CHECK regex' },
        { name: 'password_hash', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
        { name: 'location', type: 'VARCHAR(120)', constraint: 'NOT NULL' },
        { name: 'bio', type: 'TEXT', constraint: 'DEFAULT' },
        { name: 'avatar_url', type: 'TEXT', constraint: 'DEFAULT' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
      ]
    },
    {
      table_name: 'Skills',
      description: 'Master catalog of teachable and learnable subjects',
      primary_key: 'skill_id',
      foreign_keys: [],
      columns: [
        { name: 'skill_id', type: 'UUID', constraint: 'PRIMARY KEY' },
        { name: 'skill_name', type: 'VARCHAR(100)', constraint: 'UNIQUE, NOT NULL' },
        { name: 'category', type: 'VARCHAR(80)', constraint: 'CHECK (IN 10 standard categories)' },
        { name: 'description', type: 'TEXT', constraint: 'NULLABLE' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
      ]
    },
    {
      table_name: 'User_Skills',
      description: 'Resolves M:N relationship between Users and Skills for Teach/Learn',
      primary_key: 'user_skill_id',
      foreign_keys: [
        { column: 'user_id', references: 'Users(user_id)', on_delete: 'CASCADE' },
        { column: 'skill_id', references: 'Skills(skill_id)', on_delete: 'RESTRICT' }
      ],
      columns: [
        { name: 'user_skill_id', type: 'UUID', constraint: 'PRIMARY KEY' },
        { name: 'user_id', type: 'UUID', constraint: 'FK -> Users(user_id)' },
        { name: 'skill_id', type: 'UUID', constraint: 'FK -> Skills(skill_id)' },
        { name: 'skill_type', type: 'VARCHAR(10)', constraint: "CHECK ('Teach', 'Learn')" },
        { name: 'proficiency_level', type: 'VARCHAR(20)', constraint: "CHECK ('Beginner', 'Intermediate', 'Advanced', 'Expert')" },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
      ]
    },
    {
      table_name: 'Exchange_Requests',
      description: 'Captures bilateral barter proposal with offered and requested skills',
      primary_key: 'request_id',
      foreign_keys: [
        { column: 'requester_id', references: 'Users(user_id)', on_delete: 'CASCADE' },
        { column: 'receiver_id', references: 'Users(user_id)', on_delete: 'CASCADE' },
        { column: 'offered_skill_id', references: 'Skills(skill_id)', on_delete: 'RESTRICT' },
        { column: 'requested_skill_id', references: 'Skills(skill_id)', on_delete: 'RESTRICT' }
      ],
      columns: [
        { name: 'request_id', type: 'UUID', constraint: 'PRIMARY KEY' },
        { name: 'requester_id', type: 'UUID', constraint: 'FK -> Users' },
        { name: 'receiver_id', type: 'UUID', constraint: 'FK -> Users, CHECK (requester <> receiver)' },
        { name: 'offered_skill_id', type: 'UUID', constraint: 'FK -> Skills' },
        { name: 'requested_skill_id', type: 'UUID', constraint: 'FK -> Skills' },
        { name: 'status', type: 'VARCHAR(20)', constraint: "CHECK ('Pending', 'Accepted', 'Rejected', 'Cancelled')" },
        { name: 'message', type: 'TEXT', constraint: 'NULLABLE' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
      ]
    },
    {
      table_name: 'Exchanges',
      description: 'Tracks initiated and completed skill exchange lifecycle',
      primary_key: 'exchange_id',
      foreign_keys: [
        { column: 'request_id', references: 'Exchange_Requests(request_id)', on_delete: 'CASCADE' }
      ],
      columns: [
        { name: 'exchange_id', type: 'UUID', constraint: 'PRIMARY KEY' },
        { name: 'request_id', type: 'UUID', constraint: 'UNIQUE, FK -> Exchange_Requests' },
        { name: 'start_date', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' },
        { name: 'completion_date', type: 'TIMESTAMP', constraint: 'NULLABLE' },
        { name: 'status', type: 'VARCHAR(20)', constraint: "CHECK ('Active', 'Completed', 'Cancelled')" },
        { name: 'feedback', type: 'TEXT', constraint: 'NULLABLE' }
      ]
    },
    {
      table_name: 'Reviews',
      description: 'Stores ratings (1-5) and feedback on completed exchanges',
      primary_key: 'review_id',
      foreign_keys: [
        { column: 'exchange_id', references: 'Exchanges(exchange_id)', on_delete: 'CASCADE' },
        { column: 'reviewer_id', references: 'Users(user_id)', on_delete: 'CASCADE' }
      ],
      columns: [
        { name: 'review_id', type: 'UUID', constraint: 'PRIMARY KEY' },
        { name: 'exchange_id', type: 'UUID', constraint: 'FK -> Exchanges' },
        { name: 'reviewer_id', type: 'UUID', constraint: 'FK -> Users' },
        { name: 'rating', type: 'INTEGER', constraint: 'CHECK (rating BETWEEN 1 AND 5)' },
        { name: 'comments', type: 'TEXT', constraint: 'NULLABLE' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
      ]
    }
  ];

  res.json(schema);
});

module.exports = router;
