-- ============================================================================
-- SkillSwap – Initial Seed Data
-- ============================================================================

-- Insert Master Skills Catalog
INSERT INTO Skills (skill_id, skill_name, category, description) VALUES
('11111111-1111-1111-1111-111111110001', 'Python Programming', 'Programming', 'Core Python, OOP, scripting, data structures, and automation.'),
('11111111-1111-1111-1111-111111110002', 'React & Frontend', 'Web Development', 'Modern React 18, Hooks, state management, and Tailwind CSS.'),
('11111111-1111-1111-1111-111111110003', 'Database Management', 'Database Management', 'Relational design, PostgreSQL, MySQL, indexing, normalization.'),
('11111111-1111-1111-1111-111111110004', 'Graphic Design & UI/UX', 'Graphic Design', 'Figma, Adobe Illustrator, color theory, wireframing & prototyping.'),
('11111111-1111-1111-1111-111111110005', 'Public Speaking & Debate', 'Communication', 'Verbal delivery, slide decks, presentation mastery, confidence.'),
('11111111-1111-1111-1111-111111110006', 'Spanish Language', 'Languages', 'Conversational Spanish, grammar, vocabulary, pronunciation.'),
('11111111-1111-1111-1111-111111110007', 'Digital Photography', 'Photography', 'Camera manual mode, composition, lighting, and Adobe Lightroom.'),
('11111111-1111-1111-1111-111111110008', 'SEO & Digital Marketing', 'Digital Marketing', 'Growth marketing, search ranking, analytics, and social campaigns.'),
('11111111-1111-1111-1111-111111110009', 'Machine Learning & AI', 'Artificial Intelligence', 'Scikit-learn, Neural Networks, PyTorch, predictive modeling.'),
('11111111-1111-1111-1111-111111110010', 'Acoustic Guitar', 'Music & Arts', 'Chords, fingerpicking techniques, rhythm, and song composition.')
ON CONFLICT (skill_name) DO NOTHING;

-- Insert Pre-configured Users
-- Note: passwords are pre-hashed for 'password123'
INSERT INTO Users (user_id, full_name, email, password_hash, location, bio, avatar_url) VALUES
(
    '22222222-2222-2222-2222-222222220001',
    'Poornima Bora',
    'poornima@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Bangalore, India',
    'Database Engineering student passionate about AI, relational architectures, and community knowledge sharing.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
),
(
    '22222222-2222-2222-2222-222222220002',
    'Alice Johnson',
    'alice@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'San Francisco, CA',
    'Full-stack developer who loves building robust Python backend pipelines and exploring aesthetic graphic design.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250'
),
(
    '22222222-2222-2222-2222-222222220003',
    'Bob Smith',
    'bob@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'New York, NY',
    'Visual brand designer eager to pick up computational Python skills for creative coding and generative art.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
),
(
    '22222222-2222-2222-2222-222222220004',
    'Carlos Mendoza',
    'carlos@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Austin, TX',
    'Native Spanish linguist and debate coach eager to master relational database indexing and SQL optimization.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
),
(
    '22222222-2222-2222-2222-222222220005',
    'Diana Prince',
    'diana@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Seattle, WA',
    'Modern React & frontend engineer wanting to break into applied Machine Learning and AI algorithms.',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=250'
),
(
    '22222222-2222-2222-2222-222222220006',
    'Evan Wright',
    'evan@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Boston, MA',
    'Growth marketer and SEO specialist seeking to understand React frontend architecture for technical web audits.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250'
),
(
    '22222222-2222-2222-2222-222222220007',
    'Fiona Gallagher',
    'fiona@skillswap.edu',
    '$2a$10$wT0XkI4t0vV5P7p4r9s1le7XpP3o5G7o0u8k4X4F1B.B9C0D1E2F3',
    'Chicago, IL',
    'Commercial photographer looking to exchange lighting techniques for organic digital marketing and brand reach.',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
)
ON CONFLICT (email) DO NOTHING;

-- Map User Skills (Teach & Learn)
-- Alice: Teaches Python (Adv) & Database (Int); Learns Graphic Design & Spanish
INSERT INTO User_Skills (user_id, skill_id, skill_type, proficiency_level) VALUES
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110001', 'Teach', 'Advanced'),
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110003', 'Teach', 'Intermediate'),
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110004', 'Learn', 'Beginner'),
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111110006', 'Learn', 'Beginner'),

-- Bob: Teaches Graphic Design (Adv); Learns Python (Beginner) -> 100% Reciprocal with Alice!
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111110004', 'Teach', 'Advanced'),
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111110001', 'Learn', 'Beginner'),

-- Carlos: Teaches Spanish (Adv) & Public Speaking (Adv); Learns Database -> 100% Reciprocal with Alice!
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110006', 'Teach', 'Advanced'),
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110005', 'Teach', 'Advanced'),
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111110003', 'Learn', 'Intermediate'),

-- Diana: Teaches React (Adv); Learns Machine Learning
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111110002', 'Teach', 'Advanced'),
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111110009', 'Learn', 'Beginner'),

-- Evan: Teaches SEO (Int); Learns React -> 100% Reciprocal with Diana!
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111110008', 'Teach', 'Intermediate'),
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111110002', 'Learn', 'Beginner'),

-- Fiona: Teaches Photography (Adv); Learns SEO
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111110007', 'Teach', 'Advanced'),
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111110008', 'Learn', 'Beginner'),

-- Poornima: Teaches AI (Adv) & Database (Adv); Learns Photography & Graphic Design
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111110009', 'Teach', 'Advanced'),
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111110003', 'Teach', 'Advanced'),
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111110007', 'Learn', 'Beginner'),
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111110004', 'Learn', 'Intermediate')
ON CONFLICT DO NOTHING;

-- Seed Exchange Requests
INSERT INTO Exchange_Requests (request_id, requester_id, receiver_id, offered_skill_id, requested_skill_id, status, message) VALUES
(
    '33333333-3333-3333-3333-333333330001',
    '22222222-2222-2222-2222-222222220002', -- Alice
    '22222222-2222-2222-2222-222222220003', -- Bob
    '11111111-1111-1111-1111-111111110001', -- Python
    '11111111-1111-1111-1111-111111110004', -- Graphic Design
    'Accepted',
    'Hey Bob! I noticed you want to learn Python. I would love to teach you Python in exchange for Figma UI/UX lessons!'
),
(
    '33333333-3333-3333-3333-333333330002',
    '22222222-2222-2222-2222-222222220006', -- Evan
    '22222222-2222-2222-2222-222222220005', -- Diana
    '11111111-1111-1111-1111-111111110008', -- SEO
    '11111111-1111-1111-1111-111111110002', -- React
    'Pending',
    'Hi Diana, would you be interested in learning growth marketing and SEO while helping me with React hooks?'
),
(
    '33333333-3333-3333-3333-333333330003',
    '22222222-2222-2222-2222-222222220007', -- Fiona
    '22222222-2222-2222-2222-222222220001', -- Poornima
    '11111111-1111-1111-1111-111111110007', -- Photography
    '11111111-1111-1111-1111-111111110009', -- AI
    'Accepted',
    'Hello Poornima! I would love to introduce you to studio portrait photography if you can guide me through machine learning basics.'
)
ON CONFLICT (request_id) DO NOTHING;

-- Seed Exchanges
INSERT INTO Exchanges (exchange_id, request_id, start_date, completion_date, status, feedback) VALUES
(
    '44444444-4444-4444-4444-444444440001',
    '33333333-3333-3333-3333-333333330001',
    CURRENT_TIMESTAMP - INTERVAL '14 days',
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    'Completed',
    'Exchange completed successfully! Both participants mastered 4 modules.'
),
(
    '44444444-4444-4444-4444-444444440002',
    '33333333-3333-3333-3333-333333330003',
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    NULL,
    'Active',
    'Session 1 and 2 completed. Camera manual mode covered.'
)
ON CONFLICT (exchange_id) DO NOTHING;

-- Seed Reviews
INSERT INTO Reviews (review_id, exchange_id, reviewer_id, rating, comments) VALUES
(
    '55555555-5555-5555-5555-555555550001',
    '44444444-4444-4444-4444-444444440001',
    '22222222-2222-2222-2222-222222220003', -- Bob reviewed Alice
    5,
    'Alice is an incredible Python mentor! She broke down complex list comprehensions and functions with easy examples. 10/10 exchange!'
),
(
    '55555555-5555-5555-5555-555555550002',
    '44444444-4444-4444-4444-444444440001',
    '22222222-2222-2222-2222-222222220002', -- Alice reviewed Bob
    5,
    'Bob taught me Figma design systems and color palettes in just 3 sessions. Now I can design my own apps. Super helpful and patient!'
)
ON CONFLICT (review_id) DO NOTHING;
