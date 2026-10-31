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
  console.log('ℹ️ Running with local relational DBE engine with pre-seeded data.');
}

// In-Memory Relational DBE Store (Mirrors PostgreSQL schema for local testing & live demo)
const inMemoryDB = {
  users: [
    {
      user_id: '22222222-2222-2222-2222-222222220001',
      full_name: 'Poornima Bora',
      email: 'poornima@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Bengaluru, Karnataka',
      bio: 'Database Engineering student and AI researcher passionate about relational schemas, distributed databases, and decentralized barter economies.',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 30 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220002',
      full_name: 'Aarav Sharma',
      email: 'aarav@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Hyderabad, Telangana',
      bio: 'Backend software engineer specializing in Python microservices, distributed pipelines, and PostgreSQL database tuning. Enthusiastic about visual UI design and languages.',
      avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 25 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220003',
      full_name: 'Priya Patel',
      email: 'priya@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Mumbai, Maharashtra',
      bio: 'Product designer & design system architect with 6 years experience in Figma and brand aesthetics. Eager to master computational Python and ML algorithms.',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 22 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220004',
      full_name: 'Rohan Verma',
      email: 'rohan@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'New Delhi, Delhi',
      bio: 'National debate champion and public speaking mentor. Avid learner looking to master relational database indexing, SQL joins, and backend architectures.',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 20 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220005',
      full_name: 'Ananya Iyer',
      email: 'ananya@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Chennai, Tamil Nadu',
      bio: 'Senior Frontend Architect skilled in React 18, TypeScript, and accessible component libraries. Looking to exchange web dev for applied Machine Learning.',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 17 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220006',
      full_name: 'Vikram Malhotra',
      email: 'vikram@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Pune, Maharashtra',
      bio: 'Growth marketer and technical SEO consultant. Keen to understand React frontend architecture to perform better technical code and rendering audits.',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 15 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220007',
      full_name: 'Sneha Kulkarni',
      email: 'sneha@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Bengaluru, Karnataka',
      bio: 'Commercial portrait & product photographer. Excited to barter camera manual controls and lighting setups in exchange for organic SEO growth strategies.',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 12 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220008',
      full_name: 'Aditya Nair',
      email: 'aditya@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Kochi, Kerala',
      bio: 'High-performance C++ systems developer who writes performance engines and low-level code. Looking to improve executive presentation delivery and learn French.',
      avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 10 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220009',
      full_name: 'Ishita Sen',
      email: 'ishita@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Kolkata, West Bengal',
      bio: 'Conversational copywriter and narrative strategist for tech startups. Looking to swap storytelling lessons for Japanese language fundamentals.',
      avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 8 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220010',
      full_name: 'Kavita Reddy',
      email: 'kavita@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Hyderabad, Telangana',
      bio: 'Business intelligence engineer and PowerBI wizard. Wants to trade analytics dashboard design for modern React frontend development.',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 6 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220011',
      full_name: 'Rahul Deshmukh',
      email: 'rahul@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Nagpur, Maharashtra',
      bio: 'Acoustic guitarist and composer. Enthusiastic about trading music theory and fingerstyle guitar technique for video editing and DaVinci Resolve skills.',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      user_id: '22222222-2222-2222-2222-222222220012',
      full_name: 'Tanvi Joshi',
      email: 'tanvi@skillswap.edu',
      password_hash: '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
      location: 'Ahmedabad, Gujarat',
      bio: 'Tokyo-certified Japanese tutor and YouTube video editor. Looking to learn technical copywriting and guitar chords.',
      avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=350',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString()
    }
  ],
  skills: [
    {
      skill_id: '11111111-1111-1111-1111-111111110001',
      skill_name: 'Python Programming',
      category: 'Programming',
      description: 'Core Python, OOP, data structures, automation scripting, and algorithmic problem solving.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110002',
      skill_name: 'React & Frontend Engineering',
      category: 'Web Development',
      description: 'Modern React 18, Hooks, state architecture, Tailwind CSS, and SPA optimization.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110003',
      skill_name: 'Database Management & SQL',
      category: 'Database Management',
      description: 'Relational database schema design, PostgreSQL, MySQL, indexing, 3NF normalization, and query optimization.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110004',
      skill_name: 'Graphic Design & UI/UX',
      category: 'Graphic Design',
      description: 'Figma design tokens, wireframing, high-fidelity interactive prototyping, Adobe Illustrator, and design systems.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110005',
      skill_name: 'Public Speaking & Presentation',
      category: 'Communication',
      description: 'Executive storytelling, verbal delivery, debate mastery, stage confidence, and slide design.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110006',
      skill_name: 'Spanish Language Mastery',
      category: 'Languages',
      description: 'Conversational fluency, practical grammar, subjunctive moods, accent training, and business communication.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110007',
      skill_name: 'Digital Studio Photography',
      category: 'Photography',
      description: 'Manual DSLR/Mirrorless camera controls, composition, 3-point studio lighting, and Adobe Lightroom raw editing.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110008',
      skill_name: 'Technical SEO & Growth Marketing',
      category: 'Digital Marketing',
      description: 'Search engine indexing, on-page SEO audits, organic growth strategies, conversion funnels, and Google Analytics 4.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110009',
      skill_name: 'Machine Learning & Deep Learning',
      category: 'Artificial Intelligence',
      description: 'Supervised learning, scikit-learn, Neural Networks, PyTorch, model evaluation metrics, and predictive pipelines.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110010',
      skill_name: 'Acoustic Guitar & Music Theory',
      category: 'Music & Arts',
      description: 'Chords, fingerstyle picking technique, rhythm structures, chord progressions, and ear training.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110011',
      skill_name: 'Japanese Language (JLPT N4/N3)',
      category: 'Languages',
      description: 'Hiragana, Katakana, essential Kanji characters, conversational keigo, and everyday dialogue comprehension.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110012',
      skill_name: 'Video Editing & Motion Graphics',
      category: 'Music & Arts',
      description: 'Adobe Premiere Pro, DaVinci Resolve color grading, keyframe animation, pacing, and audio mastering.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110013',
      skill_name: 'Data Science & PowerBI Analytics',
      category: 'Database Management',
      description: 'Exploratory data analysis, DAX queries, PowerBI executive dashboards, KPI modeling, and data storytelling.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110014',
      skill_name: 'C++ & Low-Level Systems',
      category: 'Programming',
      description: 'Memory management, pointers, STL algorithms, multithreading, and systems software architecture.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110015',
      skill_name: 'French Conversational Fluency',
      category: 'Languages',
      description: 'Pronunciation phonetics, colloquial dialogue, everyday Francophone culture, and grammar foundations.'
    },
    {
      skill_id: '11111111-1111-1111-1111-111111110016',
      skill_name: 'Brand Copywriting & Content Strategy',
      category: 'Communication',
      description: 'Compelling landing page copy, value proposition messaging, email newsletters, and content marketing architectures.'
    }
  ],
  user_skills: [
    // Poornima Bora
    { user_skill_id: 'us-0001', user_id: '22222222-2222-2222-2222-222222220001', skill_id: '11111111-1111-1111-1111-111111110009', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-0002', user_id: '22222222-2222-2222-2222-222222220001', skill_id: '11111111-1111-1111-1111-111111110003', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0003', user_id: '22222222-2222-2222-2222-222222220001', skill_id: '11111111-1111-1111-1111-111111110007', skill_type: 'Learn', proficiency_level: 'Beginner' },
    { user_skill_id: 'us-0004', user_id: '22222222-2222-2222-2222-222222220001', skill_id: '11111111-1111-1111-1111-111111110004', skill_type: 'Learn', proficiency_level: 'Intermediate' },

    // Aarav Sharma
    { user_skill_id: 'us-0005', user_id: '22222222-2222-2222-2222-222222220002', skill_id: '11111111-1111-1111-1111-111111110001', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0006', user_id: '22222222-2222-2222-2222-222222220002', skill_id: '11111111-1111-1111-1111-111111110003', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-0007', user_id: '22222222-2222-2222-2222-222222220002', skill_id: '11111111-1111-1111-1111-111111110004', skill_type: 'Learn', proficiency_level: 'Beginner' },
    { user_skill_id: 'us-0008', user_id: '22222222-2222-2222-2222-222222220002', skill_id: '11111111-1111-1111-1111-111111110006', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Priya Patel
    { user_skill_id: 'us-0009', user_id: '22222222-2222-2222-2222-222222220003', skill_id: '11111111-1111-1111-1111-111111110004', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0010', user_id: '22222222-2222-2222-2222-222222220003', skill_id: '11111111-1111-1111-1111-111111110001', skill_type: 'Learn', proficiency_level: 'Beginner' },
    { user_skill_id: 'us-0011', user_id: '22222222-2222-2222-2222-222222220003', skill_id: '11111111-1111-1111-1111-111111110009', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Rohan Verma
    { user_skill_id: 'us-0012', user_id: '22222222-2222-2222-2222-222222220004', skill_id: '11111111-1111-1111-1111-111111110006', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0013', user_id: '22222222-2222-2222-2222-222222220004', skill_id: '11111111-1111-1111-1111-111111110005', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-0014', user_id: '22222222-2222-2222-2222-222222220004', skill_id: '11111111-1111-1111-1111-111111110003', skill_type: 'Learn', proficiency_level: 'Intermediate' },
    { user_skill_id: 'us-0015', user_id: '22222222-2222-2222-2222-222222220004', skill_id: '11111111-1111-1111-1111-111111110014', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Ananya Iyer
    { user_skill_id: 'us-0016', user_id: '22222222-2222-2222-2222-222222220005', skill_id: '11111111-1111-1111-1111-111111110002', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0017', user_id: '22222222-2222-2222-2222-222222220005', skill_id: '11111111-1111-1111-1111-111111110009', skill_type: 'Learn', proficiency_level: 'Intermediate' },
    { user_skill_id: 'us-0018', user_id: '22222222-2222-2222-2222-222222220005', skill_id: '11111111-1111-1111-1111-111111110010', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Vikram Malhotra
    { user_skill_id: 'us-0019', user_id: '22222222-2222-2222-2222-222222220006', skill_id: '11111111-1111-1111-1111-111111110008', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-0020', user_id: '22222222-2222-2222-2222-222222220006', skill_id: '11111111-1111-1111-1111-111111110002', skill_type: 'Learn', proficiency_level: 'Beginner' },
    { user_skill_id: 'us-0021', user_id: '22222222-2222-2222-2222-222222220006', skill_id: '11111111-1111-1111-1111-111111110007', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Sneha Kulkarni
    { user_skill_id: 'us-0022', user_id: '22222222-2222-2222-2222-222222220007', skill_id: '11111111-1111-1111-1111-111111110007', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0023', user_id: '22222222-2222-2222-2222-222222220007', skill_id: '11111111-1111-1111-1111-111111110008', skill_type: 'Learn', proficiency_level: 'Beginner' },
    { user_skill_id: 'us-0024', user_id: '22222222-2222-2222-2222-222222220007', skill_id: '11111111-1111-1111-1111-111111110009', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Aditya Nair
    { user_skill_id: 'us-0025', user_id: '22222222-2222-2222-2222-222222220008', skill_id: '11111111-1111-1111-1111-111111110014', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0026', user_id: '22222222-2222-2222-2222-222222220008', skill_id: '11111111-1111-1111-1111-111111110005', skill_type: 'Learn', proficiency_level: 'Intermediate' },
    { user_skill_id: 'us-0027', user_id: '22222222-2222-2222-2222-222222220008', skill_id: '11111111-1111-1111-1111-111111110015', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Ishita Sen
    { user_skill_id: 'us-0028', user_id: '22222222-2222-2222-2222-222222220009', skill_id: '11111111-1111-1111-1111-111111110016', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-0029', user_id: '22222222-2222-2222-2222-222222220009', skill_id: '11111111-1111-1111-1111-111111110011', skill_type: 'Learn', proficiency_level: 'Beginner' },
    { user_skill_id: 'us-0030', user_id: '22222222-2222-2222-2222-222222220009', skill_id: '11111111-1111-1111-1111-111111110004', skill_type: 'Learn', proficiency_level: 'Intermediate' },

    // Kavita Reddy
    { user_skill_id: 'us-0031', user_id: '22222222-2222-2222-2222-222222220010', skill_id: '11111111-1111-1111-1111-111111110013', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0032', user_id: '22222222-2222-2222-2222-222222220010', skill_id: '11111111-1111-1111-1111-111111110002', skill_type: 'Learn', proficiency_level: 'Intermediate' },
    { user_skill_id: 'us-0033', user_id: '22222222-2222-2222-2222-222222220010', skill_id: '11111111-1111-1111-1111-111111110006', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Rahul Deshmukh
    { user_skill_id: 'us-0034', user_id: '22222222-2222-2222-2222-222222220011', skill_id: '11111111-1111-1111-1111-111111110010', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0035', user_id: '22222222-2222-2222-2222-222222220011', skill_id: '11111111-1111-1111-1111-111111110012', skill_type: 'Learn', proficiency_level: 'Intermediate' },
    { user_skill_id: 'us-0036', user_id: '22222222-2222-2222-2222-222222220011', skill_id: '11111111-1111-1111-1111-111111110007', skill_type: 'Learn', proficiency_level: 'Beginner' },

    // Tanvi Joshi
    { user_skill_id: 'us-0037', user_id: '22222222-2222-2222-2222-222222220012', skill_id: '11111111-1111-1111-1111-111111110011', skill_type: 'Teach', proficiency_level: 'Expert' },
    { user_skill_id: 'us-0038', user_id: '22222222-2222-2222-2222-222222220012', skill_id: '11111111-1111-1111-1111-111111110012', skill_type: 'Teach', proficiency_level: 'Advanced' },
    { user_skill_id: 'us-0039', user_id: '22222222-2222-2222-2222-222222220012', skill_id: '11111111-1111-1111-1111-111111110016', skill_type: 'Learn', proficiency_level: 'Intermediate' },
    { user_skill_id: 'us-0040', user_id: '22222222-2222-2222-2222-222222220012', skill_id: '11111111-1111-1111-1111-111111110010', skill_type: 'Learn', proficiency_level: 'Beginner' }
  ],
  exchange_requests: [
    {
      request_id: '33333333-3333-3333-3333-333333330001',
      requester_id: '22222222-2222-2222-2222-222222220002', // Aarav
      receiver_id: '22222222-2222-2222-2222-222222220003',  // Priya
      offered_skill_id: '11111111-1111-1111-1111-111111110001', // Python
      requested_skill_id: '11111111-1111-1111-1111-111111110004', // Design
      status: 'Accepted',
      message: 'Hey Priya! I noticed you are eager to pick up Python. I would love to mentor you through algorithmic scripting in exchange for hands-on Figma design system sessions!',
      created_at: new Date(Date.now() - 21 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330002',
      requester_id: '22222222-2222-2222-2222-222222220006', // Vikram
      receiver_id: '22222222-2222-2222-2222-222222220005',  // Ananya
      offered_skill_id: '11111111-1111-1111-1111-111111110008', // SEO
      requested_skill_id: '11111111-1111-1111-1111-111111110002', // React
      status: 'Pending',
      message: 'Hi Ananya! I conduct technical SEO audits and growth strategy for tech platforms. I would be thrilled to exchange 4 growth sessions for an introduction to React hooks and custom components.',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330003',
      requester_id: '22222222-2222-2222-2222-222222220007', // Sneha
      receiver_id: '22222222-2222-2222-2222-222222220001',  // Poornima
      offered_skill_id: '11111111-1111-1111-1111-111111110007', // Photo
      requested_skill_id: '11111111-1111-1111-1111-111111110009', // ML & AI
      status: 'Accepted',
      message: 'Hello Poornima! I would love to guide you through studio strobe lighting and RAW color grading in Lightroom in exchange for an introduction to predictive Machine Learning models.',
      created_at: new Date(Date.now() - 8 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330004',
      requester_id: '22222222-2222-2222-2222-222222220004', // Rohan
      receiver_id: '22222222-2222-2222-2222-222222220002',  // Aarav
      offered_skill_id: '11111111-1111-1111-1111-111111110006', // Spanish
      requested_skill_id: '11111111-1111-1111-1111-111111110003', // Database
      status: 'Accepted',
      message: 'Namaste Aarav! I am looking to understand relational database normalization and index optimization for a college project. Happy to trade fluent Spanish conversational tutoring.',
      created_at: new Date(Date.now() - 18 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330005',
      requester_id: '22222222-2222-2222-2222-222222220008', // Aditya
      receiver_id: '22222222-2222-2222-2222-222222220004',  // Rohan
      offered_skill_id: '11111111-1111-1111-1111-111111110014', // C++
      requested_skill_id: '11111111-1111-1111-1111-111111110005', // Speech
      status: 'Accepted',
      message: 'Hi Rohan, I have to give a keynote at a systems engineering symposium and need executive public speaking coaching. Can trade deep C++ pointers and memory management lessons.',
      created_at: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330006',
      requester_id: '22222222-2222-2222-2222-222222220009', // Ishita
      receiver_id: '22222222-2222-2222-2222-222222220012',  // Tanvi
      offered_skill_id: '11111111-1111-1111-1111-111111110016', // Copywriting
      requested_skill_id: '11111111-1111-1111-1111-111111110011', // Japanese
      status: 'Accepted',
      message: 'Hi Tanvi! I would love to practice everyday Japanese conversation in exchange for helping you craft high-converting video titles and brand copy for your channel.',
      created_at: new Date(Date.now() - 15 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330007',
      requester_id: '22222222-2222-2222-2222-222222220011', // Rahul
      receiver_id: '22222222-2222-2222-2222-222222220012',  // Tanvi
      offered_skill_id: '11111111-1111-1111-1111-111111110010', // Guitar
      requested_skill_id: '11111111-1111-1111-1111-111111110012', // Video
      status: 'Pending',
      message: 'Hey Tanvi! I saw your video editing portfolio and loved your pacing. Would you like to exchange video editing lessons for acoustic guitar fingerpicking fundamentals?',
      created_at: new Date(Date.now() - 1 * 86400000).toISOString()
    },
    {
      request_id: '33333333-3333-3333-3333-333333330008',
      requester_id: '22222222-2222-2222-2222-222222220010', // Kavita
      receiver_id: '22222222-2222-2222-2222-222222220005',  // Ananya
      offered_skill_id: '11111111-1111-1111-1111-111111110013', // PowerBI
      requested_skill_id: '11111111-1111-1111-1111-111111110002', // React
      status: 'Pending',
      message: 'Hi Ananya, I want to bridge the gap between PowerBI dashboards and custom React data visualization widgets. Could we pair up for an exchange?',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    }
  ],
  exchanges: [
    {
      exchange_id: '44444444-4444-4444-4444-444444440001',
      request_id: '33333333-3333-3333-3333-333333330001',
      start_date: new Date(Date.now() - 21 * 86400000).toISOString(),
      completion_date: new Date(Date.now() - 4 * 86400000).toISOString(),
      status: 'Completed',
      feedback: 'Exchange completed with flying colors! Both participants mastered 5 milestone modules: Python OOP & list algorithms, and Figma design token systems.'
    },
    {
      exchange_id: '44444444-4444-4444-4444-444444440002',
      request_id: '33333333-3333-3333-3333-333333330003',
      start_date: new Date(Date.now() - 8 * 86400000).toISOString(),
      completion_date: null,
      status: 'Active',
      feedback: 'Session 1 & 2 completed. Covered camera aperture, shutter speed tradeoffs, and dataset preprocessing for Scikit-learn.'
    },
    {
      exchange_id: '44444444-4444-4444-4444-444444440003',
      request_id: '33333333-3333-3333-3333-333333330004',
      start_date: new Date(Date.now() - 18 * 86400000).toISOString(),
      completion_date: new Date(Date.now() - 2 * 86400000).toISOString(),
      status: 'Completed',
      feedback: 'Completed 4 in-depth sessions. Rohan gained confidence writing complex SQL joins and B-tree indexes, and Aarav improved conversational Spanish fluently!'
    },
    {
      exchange_id: '44444444-4444-4444-4444-444444440004',
      request_id: '33333333-3333-3333-3333-333333330005',
      start_date: new Date(Date.now() - 5 * 86400000).toISOString(),
      completion_date: null,
      status: 'Active',
      feedback: 'Session 1 complete. Discussed speech cadence and vocal variety. Scheduled next session for C++ smart pointers.'
    },
    {
      exchange_id: '44444444-4444-4444-4444-444444440005',
      request_id: '33333333-3333-3333-3333-333333330006',
      start_date: new Date(Date.now() - 15 * 86400000).toISOString(),
      completion_date: new Date(Date.now() - 3 * 86400000).toISOString(),
      status: 'Completed',
      feedback: 'Exchange concluded successfully. Tanvi completely overhauled her YouTube thumbnails and copy, and Ishita mastered 80 Hiragana/Katakana combinations.'
    }
  ],
  reviews: [
    {
      review_id: '55555555-5555-5555-5555-555555550001',
      exchange_id: '44444444-4444-4444-4444-444444440001',
      reviewer_id: '22222222-2222-2222-2222-222222220003', // Priya reviewed Aarav
      rating: 5,
      comments: 'Aarav is an incredible mentor! He broke down complex Python decorators and list comprehensions with clear visual diagrams. Now I can automate repetitive design scripts effortlessly. 10/10 exchange!',
      created_at: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      review_id: '55555555-5555-5555-5555-555555550002',
      exchange_id: '44444444-4444-4444-4444-444444440001',
      reviewer_id: '22222222-2222-2222-2222-222222220002', // Aarav reviewed Priya
      rating: 5,
      comments: 'Priya taught me Figma auto-layouts, typography scales, and token systems in just 3 practical sessions. I was able to redesign my portfolio UI immediately. Super patient, structured, and insightful!',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      review_id: '55555555-5555-5555-5555-555555550003',
      exchange_id: '44444444-4444-4444-4444-444444440003',
      reviewer_id: '22222222-2222-2222-2222-222222220002', // Aarav reviewed Rohan
      rating: 5,
      comments: 'Rohan is an outstanding language instructor. He kept all our Spanish conversations engaging, corrected my grammatical quirks politely, and introduced me to real conversational idioms.',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      review_id: '55555555-5555-5555-5555-555555550004',
      exchange_id: '44444444-4444-4444-4444-444444440003',
      reviewer_id: '22222222-2222-2222-2222-222222220004', // Rohan reviewed Aarav
      rating: 5,
      comments: 'I went from struggling with basic SQL queries to writing multi-table INNER and LEFT JOINs with confidence. Aarav is exceptional at explaining relational theory intuitively!',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      review_id: '55555555-5555-5555-5555-555555550005',
      exchange_id: '44444444-4444-4444-4444-444444440005',
      reviewer_id: '22222222-2222-2222-2222-222222220012', // Tanvi reviewed Ishita
      rating: 5,
      comments: 'Ishita helped me rework my entire channel description and video hooks. My viewer retention jumped by 24% after applying her copywriting frameworks. Highly recommend swapping skills with her!',
      created_at: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      review_id: '55555555-5555-5555-5555-555555550006',
      exchange_id: '44444444-4444-4444-4444-444444440005',
      reviewer_id: '22222222-2222-2222-2222-222222220009', // Ishita reviewed Tanvi
      rating: 5,
      comments: 'Tanvi is so supportive! Learning Japanese seemed daunting at first, but her flashcard methods and pronunciation drills made it fun and natural. Arigato gozaimasu!',
      created_at: new Date(Date.now() - 2 * 86400000).toISOString()
    }
  ]
};

module.exports = {
  supabase,
  isConnected,
  inMemoryDB
};
