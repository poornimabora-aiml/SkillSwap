const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

let supabase = null;
let isConnected = false;

if (SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes('your-project')) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    isConnected = true;
    console.log('✅ Supabase client initialized with provided URL:', SUPABASE_URL);
  } catch (err) {
    console.warn('⚠️ Supabase initialization failed, falling back to local relational store:', err.message);
  }
} else {
  console.log('ℹ️ No live Supabase credentials provided; running with in-memory relational DBE engine.');
}

// In-Memory Relational DBE Store (Mirrors PostgreSQL schema for local testing & zero-friction demo)
const inMemoryDB = {
  users: [
    {
      user_id: '22222222-2222-2222-2222-222222220001',
      full_name: 'Poornima Bora',
      email: 'poornima@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3', // password123
      location: 'Bangalore, India',
      bio: 'Database Engineering student passionate about AI, relational architectures, and community knowledge sharing.',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      created_at: new Date(Date.now() - 30 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220002',
      full_name: 'Alice Johnson',
      email: 'alice@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'San Francisco, CA',
      bio: 'Full-stack developer who loves building robust Python backend pipelines and exploring aesthetic graphic design.',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
      created_at: new Date(Date.now() - 25 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220003',
      full_name: 'Bob Smith',
      email: 'bob@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'New York, NY',
      bio: 'Visual brand designer eager to pick up computational Python skills for creative coding and generative art.',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      created_at: new Date(Date.now() - 20 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220004',
      full_name: 'Carlos Mendoza',
      email: 'carlos@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Austin, TX',
      bio: 'Native Spanish linguist and debate coach eager to master relational database indexing and SQL optimization.',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
      created_at: new Date(Date.now() - 18 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220005',
      full_name: 'Diana Prince',
      email: 'diana@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Seattle, WA',
      bio: 'Modern React & frontend engineer wanting to break into applied Machine Learning and AI algorithms.',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=250',
      created_at: new Date(Date.now() - 15 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220006',
      full_name: 'Evan Wright',
      email: 'evan@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Boston, MA',
      bio: 'Growth marketer and SEO specialist seeking to understand React frontend architecture for technical web audits.',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
      created_at: new Date(Date.now() - 12 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220007',
      full_name: 'Fiona Gallagher',
      email: 'fiona@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Chicago, IL',
      bio: 'Commercial photographer looking to exchange lighting techniques for organic digital marketing and brand reach.',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
      created_at: new Date(Date.now() - 10 * 86400000).toISOString()
    }
  ],
  skills: [
    {
      skill_id: '11111111-1111-1111-1111-111111110001',
      skill_name: 'Python Programming',
      category: 'Programming',
      description: 'Core Python, OOP, scripting, data structures, and automation.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110002',
      skill_name: 'React & Frontend',
      category: 'Web Development',
      description: 'Modern React 18, Hooks, state management, and Tailwind CSS.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110003',
      skill_name: 'Database Management',
      category: 'Database Management',
      description: 'Relational design, PostgreSQL, MySQL, indexing, normalization.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110004',
      skill_name: 'Graphic Design & UI/UX',
      category: 'Graphic Design',
      description: 'Figma, Adobe Illustrator, color theory, wireframing & prototyping.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110005',
      skill_name: 'Public Speaking & Debate',
      category: 'Communication',
      description: 'Verbal delivery, slide decks, presentation mastery, confidence.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110006',
      skill_name: 'Spanish Language',
      category: 'Languages',
      description: 'Conversational Spanish, grammar, vocabulary, pronunciation.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110007',
      skill_name: 'Digital Photography',
      category: 'Photography',
      description: 'Camera manual mode, composition, lighting, and Adobe Lightroom.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110008',
      skill_name: 'SEO & Digital Marketing',
      category: 'Digital Marketing',
      description: 'Growth marketing, search ranking, analytics, and social campaigns.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110009',
      skill_name: 'Machine Learning & AI',
      category: 'Artificial Intelligence',
      description: 'Scikit-learn, Neural Networks, PyTorch, predictive modeling.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110010',
      skill_name: 'Acoustic Guitar',
      category: 'Music & Arts',
      description: 'Chords, fingerpicking techniques, rhythm, and song composition.'
    }
  ],
  user_skills: [
    // Alice
    { user_skill_id: 'us-001', user_id: '22222222-2222-2222-2222-222222220002', skill_id: '11111111-1111-1111-1111-111111110001', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-002', user_id: '22222222-2222-2222-2222-222222220002', skill_id: '11111111-1111-1111-1111-111111110003', skill_type: 'Teach', proficiency_level: 'Intermediate' },
    { user_skill_id: 'us-003', user_id: '22222222-2222-2222-2222-222222220002', skill_id: '11111111-1111-1111-1111-111111110004', skill_type: 'Learn', proficiency_level: 'Beginner' },
    { user_skill_id: 'us-004', user_id: '22222222-2222-2222-2222-222222220002', skill_id: '11111111-1111-1111-1111-111111110006', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Bob
    { user_skill_id: 'us-005', user_id: '22222222-2222-2222-2222-222222220003', skill_id: '11111111-1111-1111-1111-111111110004', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-006', user_id: '22222222-2222-2222-2222-222222220003', skill_id: '11111111-1111-1111-1111-111111110001', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Carlos
    { user_skill_id: 'us-007', user_id: '22222222-2222-2222-2222-222222220004', skill_id: '11111111-1111-1111-1111-111111110006', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-008', user_id: '22222222-2222-2222-2222-222222220004', skill_id: '11111111-1111-1111-1111-111111110005', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-009', user_id: '22222222-2222-2222-2222-222222220004', skill_id: '11111111-1111-1111-1111-111111110003', skill_type: 'Learn', proficiency_level: 'Intermediate' },

    // Diana
    { user_skill_id: 'us-010', user_id: '22222222-2222-2222-2222-222222220005', skill_id: '11111111-1111-1111-1111-111111110002', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-011', user_id: '22222222-2222-2222-2222-222222220005', skill_id: '11111111-1111-1111-1111-111111110009', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Evan
    { user_skill_id: 'us-012', user_id: '22222222-2222-2222-2222-222222220006', skill_id: '11111111-1111-1111-1111-111111110008', skill_type: 'Teach', proficiency_level: 'Intermediate' },
    { user_skill_id: 'us-013', user_id: '22222222-2222-2222-2222-222222220006', skill_id: '11111111-1111-1111-1111-111111110002', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Fiona
    { user_skill_id: 'us-014', user_id: '22222222-2222-2222-2222-222222220007', skill_id: '11111111-1111-1111-1111-111111110007', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-015', user_id: '22222222-2222-2222-2222-222222220007', skill_id: '11111111-1111-1111-1111-111111110008', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Poornima
    { user_skill_id: 'us-016', user_id: '22222222-2222-2222-2222-222222220001', skill_id: '11111111-1111-1111-1111-111111110009', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-017', user_id: '22222222-2222-2222-2222-222222220001', skill_id: '11111111-1111-1111-1111-111111110003', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-018', user_id: '22222222-2222-2222-2222-222222220001', skill_id: '11111111-1111-1111-1111-111111110007', skill_type: 'Learn', proficiency_level: 'Beginner' },
    { user_skill_id: 'us-019', user_id: '22222222-2222-2222-2222-222222220001', skill_id: '11111111-1111-1111-1111-111111110004', skill_type: 'Learn', proficiency_level: 'Intermediate' }
  ],
  exchange_requests: [
    {
      request_id: '33333333-3333-3333-3333-333333330001',
      requester_id: '22222222-2222-2222-2222-222222220002', // Alice
      receiver_id: '22222222-2222-2222-2222-222222220003',  // Bob
      offered_skill_id: '11111111-1111-1111-1111-111111110001', // Python
      requested_skill_id: '11111111-1111-1111-1111-111111110004', // Design
      status: 'Accepted',
      message: 'Hey Bob! I noticed you want to learn Python. I would love to teach you Python in exchange for Figma UI/UX lessons!',
      created_at: new Date(Date.now() - 14 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330002',
      requester_id: '22222222-2222-2222-2222-222222220006', // Evan
      receiver_id: '22222222-2222-2222-2222-222222220005',  // Diana
      offered_skill_id: '11111111-1111-1111-1111-111111110008', // SEO
      requested_skill_id: '11111111-1111-1111-1111-111111110002', // React
      status: 'Pending',
      message: 'Hi Diana, would you be interested in learning growth marketing and SEO while helping me with React hooks?',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330003',
      requester_id: '22222222-2222-2222-2222-222222220007', // Fiona
      receiver_id: '22222222-2222-2222-2222-222222220001',  // Poornima
      offered_skill_id: '11111111-1111-1111-1111-111111110007', // Photo
      requested_skill_id: '11111111-1111-1111-1111-111111110009', // AI
      status: 'Accepted',
      message: 'Hello Poornima! I would love to introduce you to studio portrait photography if you can guide me through machine learning basics.',
      created_at: new Date(Date.now() - 7 * 86400000).toISOString()
    }
  ],
  exchanges: [
    {
      exchange_id: '44444444-4444-4444-4444-444444440001',
      request_id: '33333333-3333-3333-3333-333333330001',
      start_date: new Date(Date.now() - 14 * 86400000).toISOString(),
      completion_date: new Date(Date.now() - 2 * 86400000).toISOString(),
      status: 'Completed',
      feedback: 'Exchange completed successfully! Both participants mastered 4 modules.'
    },
    {
      exchange_id: '44444444-4444-4444-4444-444444440002',
      request_id: '33333333-3333-3333-3333-333333330003',
      start_date: new Date(Date.now() - 5 * 86400000).toISOString(),
      completion_date: null,
      status: 'Active',
      feedback: 'Session 1 and 2 completed. Camera manual mode covered.'
    }
  ],
  reviews: [
    {
      review_id: '55555555-5555-5555-5555-555555550001',
      exchange_id: '44444444-4444-4444-4444-444444440001',
      reviewer_id: '22222222-2222-2222-2222-222222220003', // Bob reviewed Alice
      rating: 5,
      comments: 'Alice is an incredible Python mentor! She broke down complex list comprehensions and functions with easy examples. 10/10 exchange!',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      review_id: '55555555-5555-5555-5555-555555550002',
      exchange_id: '44444444-4444-4444-4444-444444440001',
      reviewer_id: '22222222-2222-2222-2222-222222220002', // Alice reviewed Bob
      rating: 5,
      comments: 'Bob taught me Figma design systems and color palettes in just 3 sessions. Now I can design my own apps. Super helpful and patient!',
      created_at: new Date(Date.now() - 1 * 86400000).toISOString()
    }
  ]
};

module.exports = {
  supabase,
  isConnected,
  inMemoryDB
};
