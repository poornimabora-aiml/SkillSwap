// ============================================================================
// SkillSwap Client Fallback Data & Master Catalog
// Ensures 100% full functionality even if backend/Supabase API is unavailable
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

export const MOCK_USERS = [
  {
    user_id: '22222222-2222-2222-2222-222222220001',
    full_name: 'Poornima Bora',
    email: 'poornima@skillswap.edu',
    location: 'Bengaluru, Karnataka',
    bio: 'Database Engineering student and AI researcher passionate about relational schemas, distributed databases, and decentralized barter economies.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350',
    skills_teach: [
      { skill_id: '11111111-1111-1111-1111-111111110009', skill_name: 'Machine Learning & Deep Learning', category: 'Artificial Intelligence', proficiency_level: 'Advanced' },
      { skill_id: '11111111-1111-1111-1111-111111110003', skill_name: 'Database Management & SQL', category: 'Database Management', proficiency_level: 'Expert' }
    ],
    skills_learn: [
      { skill_id: '11111111-1111-1111-1111-111111110007', skill_name: 'Digital Studio Photography', category: 'Photography', proficiency_level: 'Beginner' },
      { skill_id: '11111111-1111-1111-1111-111111110004', skill_name: 'Graphic Design & UI/UX', category: 'Graphic Design', proficiency_level: 'Intermediate' }
    ]
  },
  {
    user_id: '22222222-2222-2222-2222-222222220002',
    full_name: 'Aarav Sharma',
    email: 'aarav@skillswap.edu',
    location: 'Hyderabad, Telangana',
    bio: 'Backend software engineer specializing in Python microservices, distributed pipelines, and PostgreSQL database tuning. Enthusiastic about visual UI design and languages.',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=350',
    skills_teach: [
      { skill_id: '11111111-1111-1111-1111-111111110001', skill_name: 'Python Programming', category: 'Programming', proficiency_level: 'Expert' },
      { skill_id: '11111111-1111-1111-1111-111111110003', skill_name: 'Database Management & SQL', category: 'Database Management', proficiency_level: 'Advanced' }
    ],
    skills_learn: [
      { skill_id: '11111111-1111-1111-1111-111111110004', skill_name: 'Graphic Design & UI/UX', category: 'Graphic Design', proficiency_level: 'Beginner' },
      { skill_id: '11111111-1111-1111-1111-111111110006', skill_name: 'Spanish Language Mastery', category: 'Languages', proficiency_level: 'Beginner' }
    ]
  },
  {
    user_id: '22222222-2222-2222-2222-222222220003',
    full_name: 'Priya Patel',
    email: 'priya@skillswap.edu',
    location: 'Mumbai, Maharashtra',
    bio: 'Product designer & design system architect with 6 years experience in Figma and brand aesthetics. Eager to master computational Python and ML algorithms.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350',
    skills_teach: [
      { skill_id: '11111111-1111-1111-1111-111111110004', skill_name: 'Graphic Design & UI/UX', category: 'Graphic Design', proficiency_level: 'Expert' }
    ],
    skills_learn: [
      { skill_id: '11111111-1111-1111-1111-111111110001', skill_name: 'Python Programming', category: 'Programming', proficiency_level: 'Beginner' },
      { skill_id: '11111111-1111-1111-1111-111111110009', skill_name: 'Machine Learning & Deep Learning', category: 'Artificial Intelligence', proficiency_level: 'Beginner' }
    ]
  },
  {
    user_id: '22222222-2222-2222-2222-222222220004',
    full_name: 'Rohan Verma',
    email: 'rohan@skillswap.edu',
    location: 'New Delhi, Delhi',
    bio: 'National debate champion and public speaking mentor. Avid learner looking to master relational database indexing, SQL joins, and backend architectures.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=350',
    skills_teach: [
      { skill_id: '11111111-1111-1111-1111-111111110006', skill_name: 'Spanish Language Mastery', category: 'Languages', proficiency_level: 'Expert' },
      { skill_id: '11111111-1111-1111-1111-111111110005', skill_name: 'Public Speaking & Presentation', category: 'Communication', proficiency_level: 'Advanced' }
    ],
    skills_learn: [
      { skill_id: '11111111-1111-1111-1111-111111110003', skill_name: 'Database Management & SQL', category: 'Database Management', proficiency_level: 'Intermediate' },
      { skill_id: '11111111-1111-1111-1111-111111110014', skill_name: 'C++ & Low-Level Systems', category: 'Programming', proficiency_level: 'Beginner' }
    ]
  },
  {
    user_id: '22222222-2222-2222-2222-222222220005',
    full_name: 'Ananya Iyer',
    email: 'ananya@skillswap.edu',
    location: 'Chennai, Tamil Nadu',
    bio: 'Senior Frontend Architect skilled in React 18, TypeScript, and accessible component libraries. Looking to exchange web dev for applied Machine Learning.',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=350',
    skills_teach: [
      { skill_id: '11111111-1111-1111-1111-111111110002', skill_name: 'React & Frontend Engineering', category: 'Web Development', proficiency_level: 'Expert' }
    ],
    skills_learn: [
      { skill_id: '11111111-1111-1111-1111-111111110009', skill_name: 'Machine Learning & Deep Learning', category: 'Artificial Intelligence', proficiency_level: 'Intermediate' },
      { skill_id: '11111111-1111-1111-1111-111111110010', skill_name: 'Acoustic Guitar & Music Theory', category: 'Music & Arts', proficiency_level: 'Beginner' }
    ]
  },
  {
    user_id: '22222222-2222-2222-2222-222222220006',
    full_name: 'Vikram Malhotra',
    email: 'vikram@skillswap.edu',
    location: 'Pune, Maharashtra',
    bio: 'Growth marketer and technical SEO consultant. Keen to understand React frontend architecture to perform better technical code and rendering audits.',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=350',
    skills_teach: [
      { skill_id: '11111111-1111-1111-1111-111111110008', skill_name: 'Technical SEO & Growth Marketing', category: 'Digital Marketing', proficiency_level: 'Advanced' }
    ],
    skills_learn: [
      { skill_id: '11111111-1111-1111-1111-111111110002', skill_name: 'React & Frontend Engineering', category: 'Web Development', proficiency_level: 'Beginner' },
      { skill_id: '11111111-1111-1111-1111-111111110007', skill_name: 'Digital Studio Photography', category: 'Photography', proficiency_level: 'Beginner' }
    ]
  },
  {
    user_id: '22222222-2222-2222-2222-222222220007',
    full_name: 'Sneha Kulkarni',
    email: 'sneha@skillswap.edu',
    location: 'Bengaluru, Karnataka',
    bio: 'Commercial portrait & product photographer. Excited to barter camera manual controls and lighting setups in exchange for organic SEO growth strategies.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350',
    skills_teach: [
      { skill_id: '11111111-1111-1111-1111-111111110007', skill_name: 'Digital Studio Photography', category: 'Photography', proficiency_level: 'Expert' }
    ],
    skills_learn: [
      { skill_id: '11111111-1111-1111-1111-111111110008', skill_name: 'Technical SEO & Growth Marketing', category: 'Digital Marketing', proficiency_level: 'Beginner' },
      { skill_id: '11111111-1111-1111-1111-111111110009', skill_name: 'Machine Learning & Deep Learning', category: 'Artificial Intelligence', proficiency_level: 'Beginner' }
    ]
  }
];

export const MOCK_EXPLORE_TEACHERS = [
  {
    user_skill_id: 'us-0001',
    user_id: '22222222-2222-2222-2222-222222220001',
    user_name: 'Poornima Bora',
    user_email: 'poornima@skillswap.edu',
    location: 'Bengaluru, Karnataka',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350',
    user_bio: 'Database Engineering student and AI researcher passionate about relational schemas and barter matching.',
    rating: '5.0',
    skill_id: '11111111-1111-1111-1111-111111110009',
    skill_name: 'Machine Learning & Deep Learning',
    category: 'Artificial Intelligence',
    proficiency_level: 'Advanced',
    skill_description: 'Supervised learning, scikit-learn, Neural Networks, PyTorch, model evaluation metrics, and predictive pipelines.',
    learning_skills: ['Digital Studio Photography', 'Graphic Design & UI/UX']
  },
  {
    user_skill_id: 'us-0005',
    user_id: '22222222-2222-2222-2222-222222220002',
    user_name: 'Aarav Sharma',
    user_email: 'aarav@skillswap.edu',
    location: 'Hyderabad, Telangana',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=350',
    user_bio: 'Backend software engineer specializing in Python microservices, distributed pipelines, and PostgreSQL tuning.',
    rating: '5.0',
    skill_id: '11111111-1111-1111-1111-111111110001',
    skill_name: 'Python Programming',
    category: 'Programming',
    proficiency_level: 'Expert',
    skill_description: 'Core Python, OOP, data structures, automation scripting, and algorithmic problem solving.',
    learning_skills: ['Graphic Design & UI/UX', 'Spanish Language Mastery']
  },
  {
    user_skill_id: 'us-0009',
    user_id: '22222222-2222-2222-2222-222222220003',
    user_name: 'Priya Patel',
    user_email: 'priya@skillswap.edu',
    location: 'Mumbai, Maharashtra',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350',
    user_bio: 'Product designer & design system architect with 6 years experience in Figma, design systems, and brand aesthetics.',
    rating: '5.0',
    skill_id: '11111111-1111-1111-1111-111111110004',
    skill_name: 'Graphic Design & UI/UX',
    category: 'Graphic Design',
    proficiency_level: 'Expert',
    skill_description: 'Figma design tokens, wireframing, high-fidelity interactive prototyping, Adobe Illustrator, and design systems.',
    learning_skills: ['Python Programming', 'Machine Learning & Deep Learning']
  },
  {
    user_skill_id: 'us-0012',
    user_id: '22222222-2222-2222-2222-222222220004',
    user_name: 'Rohan Verma',
    user_email: 'rohan@skillswap.edu',
    location: 'New Delhi, Delhi',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=350',
    user_bio: 'National debate champion and public speaking mentor. Eager to master database normalization and SQL indexing.',
    rating: '5.0',
    skill_id: '11111111-1111-1111-1111-111111110005',
    skill_name: 'Public Speaking & Presentation',
    category: 'Communication',
    proficiency_level: 'Advanced',
    skill_description: 'Executive storytelling, verbal delivery, debate mastery, stage confidence, and slide design.',
    learning_skills: ['Database Management & SQL', 'C++ & Low-Level Systems']
  },
  {
    user_skill_id: 'us-0016',
    user_id: '22222222-2222-2222-2222-222222220005',
    user_name: 'Ananya Iyer',
    user_email: 'ananya@skillswap.edu',
    location: 'Chennai, Tamil Nadu',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=350',
    user_bio: 'Senior Frontend Architect skilled in React 18, TypeScript, and component libraries.',
    rating: '5.0',
    skill_id: '11111111-1111-1111-1111-111111110002',
    skill_name: 'React & Frontend Engineering',
    category: 'Web Development',
    proficiency_level: 'Expert',
    skill_description: 'Modern React 18, Hooks, state architecture, Tailwind CSS, and SPA optimization.',
    learning_skills: ['Machine Learning & Deep Learning', 'Acoustic Guitar & Music Theory']
  },
  {
    user_skill_id: 'us-0022',
    user_id: '22222222-2222-2222-2222-222222220007',
    user_name: 'Sneha Kulkarni',
    user_email: 'sneha@skillswap.edu',
    location: 'Bengaluru, Karnataka',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350',
    user_bio: 'Commercial portrait & product photographer trading studio lighting and RAW photo editing for organic SEO strategies.',
    rating: '5.0',
    skill_id: '11111111-1111-1111-1111-111111110007',
    skill_name: 'Digital Studio Photography',
    category: 'Photography',
    proficiency_level: 'Expert',
    skill_description: 'Manual DSLR/Mirrorless camera controls, composition, 3-point studio lighting, and Adobe Lightroom raw editing.',
    learning_skills: ['Technical SEO & Growth Marketing', 'Machine Learning & Deep Learning']
  }
];
