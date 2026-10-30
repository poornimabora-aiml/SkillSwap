const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/auth');
const skillsRoutes = require('./routes/skills');
const matchesRoutes = require('./routes/matches');
const exchangesRoutes = require('./routes/exchanges');
const reviewsRoutes = require('./routes/reviews');
const dbeRoutes = require('./routes/dbe');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/exchanges', exchangesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/dbe', dbeRoutes);

// Root health check endpoint (Useful for Render ping)
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'SkillSwap Backend API',
    version: '1.0.0',
    college_project: 'Database Engineering (DBE)',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'SkillSwap Two-Way Skill Exchange System API is running.',
    documentation: '/api/dbe/schema',
    stats: '/api/dbe/stats'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SkillSwap Backend API running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   DBE Schema API: http://localhost:${PORT}/api/dbe/schema`);
  console.log(`=======================================================`);
});
