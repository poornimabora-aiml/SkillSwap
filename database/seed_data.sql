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
-- 2. USERS (12 Diverse Members with Real Bios, Locations & Avatars)
-- Note: Default password for all seed accounts is 'password123'
-- ============================================================================
INSERT INTO Users (user_id, full_name, email, password_hash, location, bio, avatar_url) VALUES
(
    '22222222-2222-2222-2222-222222220001',
    'Poornima Bora',
    'poornima@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Bangalore, India',
    'Database Engineering student and AI researcher passionate about relational schemas, distributed databases, and decentralized barter economies.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220002',
    'Alice Johnson',
    'alice@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'San Francisco, CA',
    'Backend software engineer specializing in Python pipelines, microservices, and database tuning. Enthusiastic about visual UI design and languages.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220003',
    'Bob Smith',
    'bob@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'New York, NY',
    'Product designer & design system architect with 6 years experience in Figma and brand aesthetics. Eager to master computational Python and ML algorithms.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220004',
    'Carlos Mendoza',
    'carlos@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Austin, TX',
    'Bilingual debate champion and speech coach. Avid learner looking to master relational database indexing, SQL joins, and backend architectures.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220005',
    'Diana Prince',
    'diana@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Seattle, WA',
    'Senior Frontend Architect skilled in React 18, TypeScript, and accessible component libraries. Looking to exchange web dev for applied Machine Learning.',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220006',
    'Evan Wright',
    'evan@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Boston, MA',
    'Growth marketer and technical SEO consultant. Keen to understand React frontend architecture to perform better technical code and rendering audits.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220007',
    'Fiona Gallagher',
    'fiona@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Chicago, IL',
    'Commercial portrait & product photographer. Excited to barter camera manual controls and lighting setups in exchange for organic SEO growth strategies.',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220008',
    'George Zhao',
    'george@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Toronto, Canada',
    'C++ systems developer who writes performance engines and low-level code. Looking to improve executive presentation delivery and learn French.',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220009',
    'Hannah Patel',
    'hannah@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'London, UK',
    'Conversational copywriter and narrative strategist for tech startups. Looking to swap storytelling lessons for Japanese language fundamentals.',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220010',
    'Ivan Petrov',
    'ivan@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Berlin, Germany',
    'Business intelligence engineer and PowerBI wizard. Wants to trade analytics dashboard design for modern React frontend development.',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220011',
    'Julia Silva',
    'julia@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'São Paulo, Brazil',
    'Acoustic guitarist and composer. Enthusiastic about trading music theory and fingerstyle guitar technique for video editing and DaVinci Resolve skills.',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=350'
),
(
    '22222222-2222-2222-2222-222222220012',
    'Kenji Takahashi',
    'kenji@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Tokyo, Japan',
    'Native Tokyo Japanese tutor and YouTube video editor. Looking to learn technical copywriting and guitar chords.',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=350'
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

-- Alice Johnson (100% Reciprocal with Bob on Python/Design & with Carlos on Database/Spanish)
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110001', 'Teach', 'Expert'),       -- Python
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110003', 'Teach', 'Advanced'),     -- Database & SQL
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110004', 'Learn', 'Beginner'),     -- Graphic Design
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110006', 'Learn', 'Beginner'),     -- Spanish

-- Bob Smith (100% Reciprocal with Alice on Graphic Design/Python)
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111110004', 'Teach', 'Expert'),       -- Graphic Design
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111110001', 'Learn', 'Beginner'),     -- Python
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111110009', 'Learn', 'Beginner'),     -- ML & AI

-- Carlos Mendoza (100% Reciprocal with Alice on Spanish/Database & with George on Speech/C++)
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110006', 'Teach', 'Expert'),       -- Spanish
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110005', 'Teach', 'Advanced'),     -- Public Speaking
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110003', 'Learn', 'Intermediate'), -- Database
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110014', 'Learn', 'Beginner'),     -- C++

-- Diana Prince (100% Reciprocal with Evan on React/SEO & with Poornima on React/ML)
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111110002', 'Teach', 'Expert'),       -- React
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111110009', 'Learn', 'Intermediate'), -- ML & AI
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111110010', 'Learn', 'Beginner'),     -- Guitar

-- Evan Wright (100% Reciprocal with Diana on SEO/React & with Fiona on SEO/Photography)
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111110008', 'Teach', 'Advanced'),     -- SEO
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111110002', 'Learn', 'Beginner'),     -- React
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111110007', 'Learn', 'Beginner'),     -- Photography

-- Fiona Gallagher (100% Reciprocal with Poornima on Photography/AI & with Evan on Photography/SEO)
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111110007', 'Teach', 'Expert'),       -- Photography
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111110008', 'Learn', 'Beginner'),     -- SEO
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111110009', 'Learn', 'Beginner'),     -- ML & AI

-- George Zhao (100% Reciprocal with Carlos on C++/Public Speaking)
('22222222-2222-2222-2222-222222220008', '11111111-1111-1111-1111-111111110014', 'Teach', 'Expert'),       -- C++
('22222222-2222-2222-2222-222222220008', '11111111-1111-1111-1111-111111110005', 'Learn', 'Intermediate'), -- Public Speaking
('22222222-2222-2222-2222-222222220008', '11111111-1111-1111-1111-111111110015', 'Learn', 'Beginner'),     -- French

-- Hannah Patel (100% Reciprocal with Kenji on Copywriting/Japanese & with Bob on Copywriting/Design)
('22222222-2222-2222-2222-222222220009', '11111111-1111-1111-1111-111111110016', 'Teach', 'Advanced'),     -- Copywriting
('22222222-2222-2222-2222-222222220009', '11111111-1111-1111-1111-111111110011', 'Learn', 'Beginner'),     -- Japanese
('22222222-2222-2222-2222-222222220009', '11111111-1111-1111-1111-111111110004', 'Learn', 'Intermediate'), -- Graphic Design

-- Ivan Petrov (100% Reciprocal with Diana on PowerBI/React)
('22222222-2222-2222-2222-222222220010', '11111111-1111-1111-1111-111111110013', 'Teach', 'Expert'),       -- PowerBI
('22222222-2222-2222-2222-222222220010', '11111111-1111-1111-1111-111111110002', 'Learn', 'Intermediate'), -- React
('22222222-2222-2222-2222-222222220010', '11111111-1111-1111-1111-111111110006', 'Learn', 'Beginner'),     -- Spanish

-- Julia Silva (100% Reciprocal with Kenji on Guitar/Video & with Diana on Guitar/React)
('22222222-2222-2222-2222-222222220011', '11111111-1111-1111-1111-111111110010', 'Teach', 'Expert'),       -- Guitar
('22222222-2222-2222-2222-222222220011', '11111111-1111-1111-1111-111111110012', 'Learn', 'Intermediate'), -- Video Editing
('22222222-2222-2222-2222-222222220011', '11111111-1111-1111-1111-111111110007', 'Learn', 'Beginner'),     -- Photography

-- Kenji Takahashi (100% Reciprocal with Hannah on Japanese/Copywriting & with Julia on Video/Guitar)
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111110011', 'Teach', 'Expert'),       -- Japanese
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111110012', 'Teach', 'Advanced'),     -- Video Editing
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111110016', 'Learn', 'Intermediate'), -- Copywriting
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111110010', 'Learn', 'Beginner')      -- Guitar
ON CONFLICT (user_id, skill_id, skill_type) DO NOTHING;

-- ============================================================================
-- 4. EXCHANGE_REQUESTS (Rich Lifecycle: Pending, Accepted, Completed)
-- ============================================================================
INSERT INTO Exchange_Requests (request_id, requester_id, receiver_id, offered_skill_id, requested_skill_id, status, message, created_at) VALUES
-- Alice ➔ Bob (Accepted & Completed)
(
    '33333333-3333-3333-3333-333333330001',
    '22222222-2222-2222-2222-222222220002', -- Alice
    '22222222-2222-2222-2222-222222220003', -- Bob
    '11111111-1111-1111-1111-111111110001', -- Python
    '11111111-1111-1111-1111-111111110004', -- Graphic Design
    'Accepted',
    'Hey Bob! I noticed you are eager to pick up Python. I would love to mentor you through algorithmic scripting in exchange for hands-on Figma design system sessions!',
    CURRENT_TIMESTAMP - INTERVAL '21 days'
),
-- Evan ➔ Diana (Pending)
(
    '33333333-3333-3333-3333-333333330002',
    '22222222-2222-2222-2222-222222220006', -- Evan
    '22222222-2222-2222-2222-222222220005', -- Diana
    '11111111-1111-1111-1111-111111110008', -- SEO
    '11111111-1111-1111-1111-111111110002', -- React
    'Pending',
    'Hi Diana! I conduct technical SEO audits and growth strategy for SaaS products. I would be thrilled to exchange 4 growth sessions for an introduction to React hooks and custom components.',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
-- Fiona ➔ Poornima (Accepted & Active)
(
    '33333333-3333-3333-3333-333333330003',
    '22222222-2222-2222-2222-222222220007', -- Fiona
    '22222222-2222-2222-2222-222222220001', -- Poornima
    '11111111-1111-1111-1111-111111110007', -- Photography
    '11111111-1111-1111-1111-111111110009', -- Machine Learning & AI
    'Accepted',
    'Hello Poornima! I would love to guide you through studio strobe lighting and RAW color grading in Lightroom in exchange for an introduction to predictive Machine Learning models.',
    CURRENT_TIMESTAMP - INTERVAL '8 days'
),
-- Carlos ➔ Alice (Accepted & Completed)
(
    '33333333-3333-3333-3333-333333330004',
    '22222222-2222-2222-2222-222222220004', -- Carlos
    '22222222-2222-2222-2222-222222220002', -- Alice
    '11111111-1111-1111-1111-111111110006', -- Spanish
    '11111111-1111-1111-1111-111111110003', -- Database Management
    'Accepted',
    'Hola Alice! I am looking to understand relational database normalization and index optimization for a civic project. Happy to trade fluent Spanish conversational tutoring.',
    CURRENT_TIMESTAMP - INTERVAL '18 days'
),
-- George ➔ Carlos (Accepted & Active)
(
    '33333333-3333-3333-3333-333333330005',
    '22222222-2222-2222-2222-222222220008', -- George
    '22222222-2222-2222-2222-222222220004', -- Carlos
    '11111111-1111-1111-1111-111111110014', -- C++
    '11111111-1111-1111-1111-111111110005', -- Public Speaking
    'Accepted',
    'Hi Carlos, I have to give a keynote at a systems engineering symposium and need executive public speaking coaching. Can trade deep C++ pointers and memory management lessons.',
    CURRENT_TIMESTAMP - INTERVAL '5 days'
),
-- Hannah ➔ Kenji (Accepted & Completed)
(
    '33333333-3333-3333-3333-333333330006',
    '22222222-2222-2222-2222-222222220009', -- Hannah
    '22222222-2222-2222-2222-222222220012', -- Kenji
    '11111111-1111-1111-1111-111111110016', -- Copywriting
    '11111111-1111-1111-1111-111111110011', -- Japanese
    'Accepted',
    'Konnichiwa Kenji! I would love to practice everyday Japanese conversation in exchange for helping you craft high-converting English video titles and brand copy for your channel.',
    CURRENT_TIMESTAMP - INTERVAL '15 days'
),
-- Julia ➔ Kenji (Pending)
(
    '33333333-3333-3333-3333-333333330007',
    '22222222-2222-2222-2222-222222220011', -- Julia
    '22222222-2222-2222-2222-222222220012', -- Kenji
    '11111111-1111-1111-1111-111111110010', -- Guitar
    '11111111-1111-1111-1111-111111110012', -- Video Editing
    'Pending',
    'Hey Kenji! I saw your video editing portfolio and loved your pacing. Would you like to exchange video editing lessons for acoustic guitar fingerpicking fundamentals?',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
-- Ivan ➔ Diana (Pending)
(
    '33333333-3333-3333-3333-333333330008',
    '22222222-2222-2222-2222-222222220010', -- Ivan
    '22222222-2222-2222-2222-222222220005', -- Diana
    '11111111-1111-1111-1111-111111110013', -- PowerBI
    '11111111-1111-1111-1111-111111110002', -- React
    'Pending',
    'Hi Diana, I want to bridge the gap between PowerBI dashboards and custom React data visualization widgets. Could we pair up for an exchange?',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
)
ON CONFLICT (request_id) DO NOTHING;

-- ============================================================================
-- 5. EXCHANGES (Active and Completed Skill Swaps)
-- ============================================================================
INSERT INTO Exchanges (exchange_id, request_id, start_date, completion_date, status, feedback) VALUES
-- Alice & Bob (Completed)
(
    '44444444-4444-4444-4444-444444440001',
    '33333333-3333-3333-3333-333333330001',
    CURRENT_TIMESTAMP - INTERVAL '21 days',
    CURRENT_TIMESTAMP - INTERVAL '4 days',
    'Completed',
    'Exchange completed with flying colors! Both participants mastered 5 milestone modules: Python OOP & list comprehensions, and Figma component libraries.'
),
-- Fiona & Poornima (Active)
(
    '44444444-4444-4444-4444-444444440002',
    '33333333-3333-3333-3333-333333330003',
    CURRENT_TIMESTAMP - INTERVAL '8 days',
    NULL,
    'Active',
    'Session 1 & 2 completed. Covered camera aperture, shutter speed tradeoffs, and dataset preprocessing for Scikit-learn.'
),
-- Carlos & Alice (Completed)
(
    '44444444-4444-4444-4444-444444440003',
    '33333333-3333-3333-3333-333333330004',
    CURRENT_TIMESTAMP - INTERVAL '18 days',
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    'Completed',
    'Completed 4 in-depth sessions. Carlos gained confidence writing complex SQL joins and B-tree indexes, and Alice improved conversational Spanish fluently!'
),
-- George & Carlos (Active)
(
    '44444444-4444-4444-4444-444444440004',
    '33333333-3333-3333-3333-333333330005',
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    NULL,
    'Active',
    'Session 1 complete. Discussed speech cadence and vocal variety. Scheduled next session for C++ smart pointers.'
),
-- Hannah & Kenji (Completed)
(
    '44444444-4444-4444-4444-444444440005',
    '33333333-3333-3333-3333-333333330006',
    CURRENT_TIMESTAMP - INTERVAL '15 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    'Completed',
    'Exchange concluded successfully. Kenji completely overhauled his English YouTube thumbnails and copy, and Hannah mastered 80 Hiragana/Katakana combinations.'
)
ON CONFLICT (exchange_id) DO NOTHING;

-- ============================================================================
-- 6. REVIEWS (Authentic 5-Star and 4-Star Community Feedback)
-- ============================================================================
INSERT INTO Reviews (review_id, exchange_id, reviewer_id, rating, comments, created_at) VALUES
-- Bob reviewed Alice
(
    '55555555-5555-5555-5555-555555550001',
    '44444444-4444-4444-4444-444444440001',
    '22222222-2222-2222-2222-222222220003', -- Bob
    5,
    'Alice is an incredible mentor! She broke down complex Python decorators and list comprehensions with clear visual diagrams. Now I can automate repetitive design scripts effortlessly. 10/10 exchange!',
    CURRENT_TIMESTAMP - INTERVAL '4 days'
),
-- Alice reviewed Bob
(
    '55555555-5555-5555-5555-555555550002',
    '44444444-4444-4444-4444-444444440001',
    '22222222-2222-2222-2222-222222220002', -- Alice
    5,
    'Bob taught me Figma auto-layouts, typography scales, and token systems in just 3 practical sessions. I was able to redesign my portfolio UI immediately. Super patient, structured, and insightful!',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
-- Alice reviewed Carlos
(
    '55555555-5555-5555-5555-555555550003',
    '44444444-4444-4444-4444-444444440003',
    '22222222-2222-2222-2222-222222220002', -- Alice
    5,
    'Carlos is an outstanding language instructor. He kept all our Spanish conversations engaging, corrected my grammatical quirks politely, and introduced me to real conversational idioms.',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
-- Carlos reviewed Alice
(
    '55555555-5555-5555-5555-555555550004',
    '44444444-4444-4444-4444-444444440003',
    '22222222-2222-2222-2222-222222220004', -- Carlos
    5,
    'I went from struggling with basic SQL queries to writing multi-table INNER and LEFT JOINs with confidence. Alice is exceptional at explaining relational theory intuitively!',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
-- Kenji reviewed Hannah
(
    '55555555-5555-5555-5555-555555550005',
    '44444444-4444-4444-4444-444444440005',
    '22222222-2222-2222-2222-222222220012', -- Kenji
    5,
    'Hannah helped me rework my entire channel description and video hooks. My viewer retention jumped by 24% after applying her copywriting frameworks. Highly recommend swapping skills with her!',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
-- Hannah reviewed Kenji
(
    '55555555-5555-5555-5555-555555550006',
    '44444444-4444-4444-4444-444444440005',
    '22222222-2222-2222-2222-222222220009', -- Hannah
    5,
    'Kenji is so supportive! Learning Japanese seemed daunting at first, but his flashcard methods and pronunciation drills made it fun and natural. Arigato gozaimasu!',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
)
ON CONFLICT (review_id) DO NOTHING;
