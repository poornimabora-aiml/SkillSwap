// ============================================================================
// SkillSwap Client Fallback Data & Master Catalog
// Ensures instant rendering even before backend/Supabase API calls resolve
// ============================================================================

export const DEFAULT_SKILLS = [
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
];

export const INDIAN_SAMPLE_PROFILES = [
  {
    name: 'Aarav Sharma',
    email: 'aarav@skillswap.edu',
    location: 'Hyderabad, Telangana',
    bio: 'Backend Python engineer & SQL enthusiast. Excited to swap code mentoring for UI design!',
    teachSkillId: '11111111-1111-1111-1111-111111110001', // Python
    teachLevel: 'Expert',
    learnSkillId: '11111111-1111-1111-1111-111111110004', // Graphic Design
    learnLevel: 'Beginner'
  },
  {
    name: 'Priya Patel',
    email: 'priya@skillswap.edu',
    location: 'Mumbai, Maharashtra',
    bio: 'Figma UI/UX designer eager to master computational Python and machine learning algorithms.',
    teachSkillId: '11111111-1111-1111-1111-111111110004', // Graphic Design
    teachLevel: 'Expert',
    learnSkillId: '11111111-1111-1111-1111-111111110001', // Python
    learnLevel: 'Beginner'
  },
  {
    name: 'Rohan Verma',
    email: 'rohan@skillswap.edu',
    location: 'New Delhi, Delhi',
    bio: 'National debate mentor looking to exchange public speaking sessions for Database SQL joins.',
    teachSkillId: '11111111-1111-1111-1111-111111110005', // Public Speaking
    teachLevel: 'Advanced',
    learnSkillId: '11111111-1111-1111-1111-111111110003', // Database Management
    learnLevel: 'Beginner'
  },
  {
    name: 'Sneha Kulkarni',
    email: 'sneha@skillswap.edu',
    location: 'Bengaluru, Karnataka',
    bio: 'Studio photographer looking to learn technical SEO to grow my creative agency website.',
    teachSkillId: '11111111-1111-1111-1111-111111110007', // Photography
    teachLevel: 'Expert',
    learnSkillId: '11111111-1111-1111-1111-111111110008', // SEO
    learnLevel: 'Beginner'
  }
];
