-- ============================================================================
-- SkillSwap – Comprehensive Realistic Seed Data for Database Engineering (DBE)
-- Populates: Users, Skills, User_Skills, Exchange_Requests, Exchanges, Reviews
-- ============================================================================

-- Clean existing seed data safely to prevent primary key or unique collisions
TRUNCATE Reviews, Exchanges, Exchange_Requests, User_Skills, Skills, Users CASCADE;

-- ============================================================================
-- 1. MASTER SKILLS CATALOG (16 Distinct Skills across 10 Categories)
-- ============================================================================
INSERT INTO Skills (skill_id, skill_name, category, description) VALUES
('11111111-1111-1111-1111-111111110001', 'Python Programming', 'Programming', 'Core Python, OOP, data structures, automation scripting, and algorithmic problem solving.'),
('11111111-1111-1111-1111-111111110002', 'React & Frontend Engineering', 'Web Development', 'Modern React 18, Hooks, state architecture, Tailwind CSS, and SPA optimization.'),
('11111111-1111-1111-1111-111111110003', 'Database Management & SQL', 'Database Management', 'Relational database schema design, PostgreSQL, MySQL, indexing, 3NF normalization, and query optimization.'),
('11111111-1111-1111-1111-111111110004', 'Graphic Design & UI/UX', 'Graphic Design', 'Figma design tokens, wireframing, high-fidelity interactive prototyping, Adobe Illustrator, and design systems.'),
('11111111-1111-1111-1111-111111110005', 'Public Speaking & Presentation', 'Communication', 'Executive storytelling, verbal delivery, debate mastery, stage confidence, and slide design.'),
('11111111-1111-1111-1111-111111110006', 'Spanish Language Mastery', 'Languages', 'Conversational fluency, practical grammar, subjunctive moods, accent training, and business communication.'),
('11111111-1111-1111-1111-111111110007', 'Digital Studio Photography', 'Photography', 'Manual DSLR/Mirrorless camera controls, composition, 3-point studio lighting, and Adobe Lightroom raw editing.'),
('11111111-1111-1111-1111-111111110008', 'Technical SEO & Growth Marketing', 'Digital Marketing', 'Search engine indexing, on-page SEO audits, organic growth strategies, conversion funnels, and Google Analytics 4.'),
('11111111-1111-1111-1111-111111110009', 'Machine Learning & Deep Learning', 'Artificial Intelligence', 'Supervised learning, scikit-learn, Neural Networks, PyTorch, model evaluation metrics, and predictive pipelines.'),
('11111111-1111-1111-1111-111111110010', 'Acoustic Guitar & Music Theory', 'Music & Arts', 'Chords, fingerstyle picking technique, rhythm structures, chord progressions, and ear training.'),
('11111111-1111-1111-1111-111111110011', 'Japanese Language (JLPT N4/N3)', 'Languages', 'Hiragana, Katakana, essential Kanji characters, conversational keigo, and everyday dialogue comprehension.'),
('11111111-1111-1111-1111-111111110012', 'Video Editing & Motion Graphics', 'Music & Arts', 'Adobe Premiere Pro, DaVinci Resolve color grading, keyframe animation, pacing, and audio mastering.'),
('11111111-1111-1111-1111-111111110013', 'Data Science & PowerBI Analytics', 'Database Management', 'Exploratory data analysis, DAX queries, PowerBI executive dashboards, KPI modeling, and data storytelling.'),
('11111111-1111-1111-1111-111111110014', 'C++ & Low-Level Systems', 'Programming', 'Memory management, pointers, STL algorithms, multithreading, and systems software architecture.'),
('11111111-1111-1111-1111-111111110015', 'French Conversational Fluency', 'Languages', 'Pronunciation phonetics, colloquial dialogue, everyday Francophone culture, and grammar foundations.'),
('11111111-1111-1111-1111-111111110016', 'Brand Copywriting & Content Strategy', 'Communication', 'Compelling landing page copy, value proposition messaging, email newsletters, and content marketing architectures.')
ON CONFLICT (skill_id) DO UPDATE SET 
    skill_name = EXCLUDED.skill_name, 
    category = EXCLUDED.category, 
    description = EXCLUDED.description;

-- ============================================================================
-- 2. USERS (12 Indian Tech & Creative Members with Realistic Bios & Locations)
-- Note: Default password for all seed accounts is 'password123'
-- ============================================================================
INSERT INTO Users (user_id, full_name, email, password_hash, location, bio, avatar_url) VALUES
(
    '22222222-2222-2222-2222-222222220001',
    'Poornima Bora',
    'poornima@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Bengaluru, Karnataka',
    'Database Engineering student and AI researcher passionate about relational schemas, distributed databases, and decentralized barter economies.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220002',
    'Aarav Sharma',
    'aarav@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Hyderabad, Telangana',
    'Backend software engineer specializing in Python microservices, distributed pipelines, and PostgreSQL database tuning. Enthusiastic about visual UI design and languages.',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220003',
    'Priya Patel',
    'priya@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Mumbai, Maharashtra',
    'Product designer & design system architect with 6 years experience in Figma and brand aesthetics. Eager to master computational Python and ML algorithms.',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220004',
    'Rohan Verma',
    'rohan@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'New Delhi, Delhi',
    'National debate champion and public speaking mentor. Avid learner looking to master relational database indexing, SQL joins, and backend architectures.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220005',
    'Ananya Iyer',
    'ananya@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Chennai, Tamil Nadu',
    'Senior Frontend Architect skilled in React 18, TypeScript, and accessible component libraries. Looking to exchange web dev for applied Machine Learning.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220006',
    'Vikram Malhotra',
    'vikram@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Pune, Maharashtra',
    'Growth marketer and technical SEO consultant. Keen to understand React frontend architecture to perform better technical code and rendering audits.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220007',
    'Sneha Kulkarni',
    'sneha@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Bengaluru, Karnataka',
    'Commercial portrait & product photographer. Excited to barter camera manual controls and lighting setups in exchange for organic SEO growth strategies.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220008',
    'Aditya Nair',
    'aditya@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Kochi, Kerala',
    'High-performance C++ systems developer who writes performance engines and low-level code. Looking to improve executive presentation delivery and learn French.',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220009',
    'Ishita Sen',
    'ishita@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Kolkata, West Bengal',
    'Conversational copywriter and narrative strategist for tech startups. Looking to swap storytelling lessons for Japanese language fundamentals.',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220010',
    'Kavita Reddy',
    'kavita@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Hyderabad, Telangana',
    'Business intelligence engineer and PowerBI wizard. Wants to trade analytics dashboard design for modern React frontend development.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220011',
    'Rahul Deshmukh',
    'rahul@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Nagpur, Maharashtra',
    'Acoustic guitarist and composer. Enthusiastic about trading music theory and fingerstyle guitar technique for video editing and DaVinci Resolve skills.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220012',
    'Tanvi Joshi',
    'tanvi@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Ahmedabad, Gujarat',
    'Tokyo-certified Japanese tutor and YouTube video editor. Looking to learn technical copywriting and guitar chords.',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=350'
)
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- 3. USER_SKILLS (M:N Map Creating Guaranteed Reciprocal & One-Way Matches)
-- ============================================================================
INSERT INTO User_Skills (user_id, skill_id, skill_type, proficiency_level) VALUES
-- Poornima Bora
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111110009', 'Teach', 'Advanced'),     -- ML & AI
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111110003', 'Teach', 'Expert'),       -- Database & SQL
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111110007', 'Learn', 'Beginner'),     -- Photography
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111110004', 'Learn', 'Intermediate'), -- Graphic Design

-- Aarav Sharma (100% Reciprocal with Priya on Python/Design & with Rohan on Database/Spanish)
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110001', 'Teach', 'Expert'),       -- Python
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110003', 'Teach', 'Advanced'),     -- Database & SQL
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110004', 'Learn', 'Beginner'),     -- Graphic Design
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110006', 'Learn', 'Beginner'),     -- Spanish

-- Priya Patel (100% Reciprocal with Aarav on Graphic Design/Python)
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111110004', 'Teach', 'Expert'),       -- Graphic Design
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111110001', 'Learn', 'Beginner'),     -- Python
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111110009', 'Learn', 'Beginner'),     -- ML & AI

-- Rohan Verma (100% Reciprocal with Aarav on Spanish/Database & with Aditya on Speech/C++)
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110006', 'Teach', 'Expert'),       -- Spanish
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110005', 'Teach', 'Advanced'),     -- Public Speaking
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110003', 'Learn', 'Intermediate'), -- Database
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110014', 'Learn', 'Beginner'),     -- C++

-- Ananya Iyer (100% Reciprocal with Vikram on React/SEO & with Poornima on React/ML)
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111110002', 'Teach', 'Expert'),       -- React
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111110009', 'Learn', 'Intermediate'), -- ML & AI
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111110010', 'Learn', 'Beginner'),     -- Guitar

-- Vikram Malhotra (100% Reciprocal with Ananya on SEO/React & with Sneha on SEO/Photography)
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111110008', 'Teach', 'Advanced'),     -- SEO
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111110002', 'Learn', 'Beginner'),     -- React
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111110007', 'Learn', 'Beginner'),     -- Photography

-- Sneha Kulkarni (100% Reciprocal with Poornima on Photography/AI & with Vikram on Photography/SEO)
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111110007', 'Teach', 'Expert'),       -- Photography
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111110008', 'Learn', 'Beginner'),     -- SEO
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111110009', 'Learn', 'Beginner'),     -- ML & AI

-- Aditya Nair (100% Reciprocal with Rohan on C++/Public Speaking)
('22222222-2222-2222-2222-222222220008', '11111111-1111-1111-1111-111111110014', 'Teach', 'Expert'),       -- C++
('22222222-2222-2222-2222-222222220008', '11111111-1111-1111-1111-111111110005', 'Learn', 'Intermediate'), -- Public Speaking
('22222222-2222-2222-2222-222222220008', '11111111-1111-1111-1111-111111110015', 'Learn', 'Beginner'),     -- French

-- Ishita Sen (100% Reciprocal with Tanvi on Copywriting/Japanese & with Priya on Copywriting/Design)
('22222222-2222-2222-2222-222222220009', '11111111-1111-1111-1111-111111110016', 'Teach', 'Advanced'),     -- Copywriting
('22222222-2222-2222-2222-222222220009', '11111111-1111-1111-1111-111111110011', 'Learn', 'Beginner'),     -- Japanese
('22222222-2222-2222-2222-222222220009', '11111111-1111-1111-1111-111111110004', 'Learn', 'Intermediate'), -- Graphic Design

-- Kavita Reddy (100% Reciprocal with Ananya on PowerBI/React)
('22222222-2222-2222-2222-222222220010', '11111111-1111-1111-1111-111111110013', 'Teach', 'Expert'),       -- PowerBI
('22222222-2222-2222-2222-222222220010', '11111111-1111-1111-1111-111111110002', 'Learn', 'Intermediate'), -- React
('22222222-2222-2222-2222-222222220010', '11111111-1111-1111-1111-111111110006', 'Learn', 'Beginner'),     -- Spanish

-- Rahul Deshmukh (100% Reciprocal with Tanvi on Guitar/Video & with Ananya on Guitar/React)
('22222222-2222-2222-2222-222222220011', '11111111-1111-1111-1111-111111110010', 'Teach', 'Expert'),       -- Guitar
('22222222-2222-2222-2222-222222220011', '11111111-1111-1111-1111-111111110012', 'Learn', 'Intermediate'), -- Video Editing
('22222222-2222-2222-2222-222222220011', '11111111-1111-1111-1111-111111110007', 'Learn', 'Beginner'),     -- Photography

-- Tanvi Joshi (100% Reciprocal with Ishita on Japanese/Copywriting & with Rahul on Video/Guitar)
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111110011', 'Teach', 'Expert'),       -- Japanese
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111110012', 'Teach', 'Advanced'),     -- Video Editing
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111110016', 'Learn', 'Intermediate'), -- Copywriting
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111110010', 'Learn', 'Beginner')      -- Guitar
ON CONFLICT (user_id, skill_id, skill_type) DO NOTHING;

-- ============================================================================
-- 4. EXCHANGE_REQUESTS (Rich Lifecycle: Pending, Accepted, Completed)
-- ============================================================================
INSERT INTO Exchange_Requests (request_id, requester_id, receiver_id, offered_skill_id, requested_skill_id, status, message, created_at) VALUES
-- Aarav ➔ Priya (Accepted & Completed)
(
    '33333333-3333-3333-3333-333333330001',
    '22222222-2222-2222-2222-222222220002', -- Aarav
    '22222222-2222-2222-2222-222222220003', -- Priya
    '11111111-1111-1111-1111-111111110001', -- Python
    '11111111-1111-1111-1111-111111110004', -- Graphic Design
    'Accepted',
    'Hey Priya! I noticed you are eager to pick up Python. I would love to mentor you through algorithmic scripting in exchange for hands-on Figma design system sessions!',
    CURRENT_TIMESTAMP - INTERVAL '21 days'
),
-- Vikram ➔ Ananya (Pending)
(
    '33333333-3333-3333-3333-333333330002',
    '22222222-2222-2222-2222-222222220006', -- Vikram
    '22222222-2222-2222-2222-222222220005', -- Ananya
    '11111111-1111-1111-1111-111111110008', -- SEO
    '11111111-1111-1111-1111-111111110002', -- React
    'Pending',
    'Hi Ananya! I conduct technical SEO audits and growth strategy for tech platforms. I would be thrilled to exchange 4 growth sessions for an introduction to React hooks and custom components.',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
-- Sneha ➔ Poornima (Accepted & Active)
(
    '33333333-3333-3333-3333-333333330003',
    '22222222-2222-2222-2222-222222220007', -- Sneha
    '22222222-2222-2222-2222-222222220001', -- Poornima
    '11111111-1111-1111-1111-111111110007', -- Photography
    '11111111-1111-1111-1111-111111110009', -- Machine Learning & AI
    'Accepted',
    'Hello Poornima! I would love to guide you through studio strobe lighting and RAW color grading in Lightroom in exchange for an introduction to predictive Machine Learning models.',
    CURRENT_TIMESTAMP - INTERVAL '8 days'
),
-- Rohan ➔ Aarav (Accepted & Completed)
(
    '33333333-3333-3333-3333-333333330004',
    '22222222-2222-2222-2222-222222220004', -- Rohan
    '22222222-2222-2222-2222-222222220002', -- Aarav
    '11111111-1111-1111-1111-111111110006', -- Spanish
    '11111111-1111-1111-1111-111111110003', -- Database Management
    'Accepted',
    'Namaste Aarav! I am looking to understand relational database normalization and index optimization for a college project. Happy to trade fluent Spanish conversational tutoring.',
    CURRENT_TIMESTAMP - INTERVAL '18 days'
),
-- Aditya ➔ Rohan (Accepted & Active)
(
    '33333333-3333-3333-3333-333333330005',
    '22222222-2222-2222-2222-222222220008', -- Aditya
    '22222222-2222-2222-2222-222222220004', -- Rohan
    '11111111-1111-1111-1111-111111110014', -- C++
    '11111111-1111-1111-1111-111111110005', -- Public Speaking
    'Accepted',
    'Hi Rohan, I have to give a keynote at a systems engineering symposium and need executive public speaking coaching. Can trade deep C++ pointers and memory management lessons.',
    CURRENT_TIMESTAMP - INTERVAL '5 days'
),
-- Ishita ➔ Tanvi (Accepted & Completed)
(
    '33333333-3333-3333-3333-333333330006',
    '22222222-2222-2222-2222-222222220009', -- Ishita
    '22222222-2222-2222-2222-222222220012', -- Tanvi
    '11111111-1111-1111-1111-111111110016', -- Copywriting
    '11111111-1111-1111-1111-111111110011', -- Japanese
    'Accepted',
    'Hi Tanvi! I would love to practice everyday Japanese conversation in exchange for helping you craft high-converting English video titles and brand copy for your channel.',
    CURRENT_TIMESTAMP - INTERVAL '15 days'
),
-- Rahul ➔ Tanvi (Pending)
(
    '33333333-3333-3333-3333-333333330007',
    '22222222-2222-2222-2222-222222220011', -- Rahul
    '22222222-2222-2222-2222-222222220012', -- Tanvi
    '11111111-1111-1111-1111-111111110010', -- Guitar
    '11111111-1111-1111-1111-111111110012', -- Video Editing
    'Pending',
    'Hey Tanvi! I saw your video editing portfolio and loved your pacing. Would you like to exchange video editing lessons for acoustic guitar fingerpicking fundamentals?',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
-- Kavita ➔ Ananya (Pending)
(
    '33333333-3333-3333-3333-333333330008',
    '22222222-2222-2222-2222-222222220010', -- Kavita
    '22222222-2222-2222-2222-222222220005', -- Ananya
    '11111111-1111-1111-1111-111111110013', -- PowerBI
    '11111111-1111-1111-1111-111111110002', -- React
    'Pending',
    'Hi Ananya, I want to bridge the gap between PowerBI dashboards and custom React data visualization widgets. Could we pair up for an exchange?',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
)
ON CONFLICT (request_id) DO NOTHING;

-- ============================================================================
-- 5. EXCHANGES (Active and Completed Skill Swaps)
-- ============================================================================
INSERT INTO Exchanges (exchange_id, request_id, start_date, completion_date, status, feedback) VALUES
-- Aarav & Priya (Completed)
(
    '44444444-4444-4444-4444-444444440001',
    '33333333-3333-3333-3333-333333330001',
    CURRENT_TIMESTAMP - INTERVAL '21 days',
    CURRENT_TIMESTAMP - INTERVAL '4 days',
    'Completed',
    'Exchange completed with flying colors! Both participants mastered 5 milestone modules: Python OOP & list algorithms, and Figma design token systems.'
),
-- Sneha & Poornima (Active)
(
    '44444444-4444-4444-4444-444444440002',
    '33333333-3333-3333-3333-333333330003',
    CURRENT_TIMESTAMP - INTERVAL '8 days',
    NULL,
    'Active',
    'Session 1 & 2 completed. Covered camera aperture, shutter speed tradeoffs, and dataset preprocessing for Scikit-learn.'
),
-- Rohan & Aarav (Completed)
(
    '44444444-4444-4444-4444-444444440003',
    '33333333-3333-3333-3333-333333330004',
    CURRENT_TIMESTAMP - INTERVAL '18 days',
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    'Completed',
    'Completed 4 in-depth sessions. Rohan gained confidence writing complex SQL joins and B-tree indexes, and Aarav improved conversational Spanish fluently!'
),
-- Aditya & Rohan (Active)
(
    '44444444-4444-4444-4444-444444440004',
    '33333333-3333-3333-3333-333333330005',
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    NULL,
    'Active',
    'Session 1 complete. Discussed speech cadence and vocal variety. Scheduled next session for C++ smart pointers.'
),
-- Ishita & Tanvi (Completed)
(
    '44444444-4444-4444-4444-444444440005',
    '33333333-3333-3333-3333-333333330006',
    CURRENT_TIMESTAMP - INTERVAL '15 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    'Completed',
    'Exchange concluded successfully. Tanvi completely overhauled her YouTube thumbnails and copy, and Ishita mastered 80 Hiragana/Katakana combinations.'
)
ON CONFLICT (exchange_id) DO NOTHING;

-- ============================================================================
-- 6. REVIEWS (Authentic 5-Star and 4-Star Community Feedback)
-- ============================================================================
INSERT INTO Reviews (review_id, exchange_id, reviewer_id, rating, comments, created_at) VALUES
-- Priya reviewed Aarav
(
    '55555555-5555-5555-5555-555555550001',
    '44444444-4444-4444-4444-444444440001',
    '22222222-2222-2222-2222-222222220003', -- Priya
    5,
    'Aarav is an incredible mentor! He broke down complex Python decorators and list comprehensions with clear visual diagrams. Now I can automate repetitive design scripts effortlessly. 10/10 exchange!',
    CURRENT_TIMESTAMP - INTERVAL '4 days'
),
-- Aarav reviewed Priya
(
    '55555555-5555-5555-5555-555555550002',
    '44444444-4444-4444-4444-444444440001',
    '22222222-2222-2222-2222-222222220002', -- Aarav
    5,
    'Priya taught me Figma auto-layouts, typography scales, and token systems in just 3 practical sessions. I was able to redesign my portfolio UI immediately. Super patient, structured, and insightful!',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
-- Aarav reviewed Rohan
(
    '55555555-5555-5555-5555-555555550003',
    '44444444-4444-4444-4444-444444440003',
    '22222222-2222-2222-2222-222222220002', -- Aarav
    5,
    'Rohan is an outstanding language instructor. He kept all our Spanish conversations engaging, corrected my grammatical quirks politely, and introduced me to real conversational idioms.',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
-- Rohan reviewed Aarav
(
    '55555555-5555-5555-5555-555555550004',
    '44444444-4444-4444-4444-444444440003',
    '22222222-2222-2222-2222-222222220004', -- Rohan
    5,
    'I went from struggling with basic SQL queries to writing multi-table INNER and LEFT JOINs with confidence. Aarav is exceptional at explaining relational theory intuitively!',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
-- Tanvi reviewed Ishita
(
    '55555555-5555-5555-5555-555555550005',
    '44444444-4444-4444-4444-444444440005',
    '22222222-2222-2222-2222-222222220012', -- Tanvi
    5,
    'Ishita helped me rework my entire channel description and video hooks. My viewer retention jumped by 24% after applying her copywriting frameworks. Highly recommend swapping skills with her!',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
-- Ishita reviewed Tanvi
(
    '55555555-5555-5555-5555-555555550006',
    '44444444-4444-4444-4444-444444440005',
    '22222222-2222-2222-2222-222222220009', -- Ishita
    5,
    'Tanvi is so supportive! Learning Japanese seemed daunting at first, but her flashcard methods and pronunciation drills made it fun and natural. Arigato gozaimasu!',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
)
ON CONFLICT (review_id) DO NOTHING;
