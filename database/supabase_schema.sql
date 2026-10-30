-- ============================================================================
-- SkillSwap – Two-Way Skill Exchange System
-- Database Engineering (DBE) Relational Schema & Implementation
-- Database: PostgreSQL (Compatible with Supabase)
-- ============================================================================

-- Drop tables if they exist in reverse order of foreign key dependencies
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS Exchanges CASCADE;
DROP TABLE IF EXISTS Exchange_Requests CASCADE;
DROP TABLE IF EXISTS User_Skills CASCADE;
DROP TABLE IF EXISTS Skills CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

-- Enable UUID extension if needed, or use BIGSERIAL/IDENTITY
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE
-- Stores user account info, credentials, and location
-- ============================================================================
CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    location VARCHAR(120) NOT NULL,
    bio TEXT DEFAULT 'Eager to exchange knowledge and learn new skills!',
    avatar_url TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_users_location ON Users(location);

-- ============================================================================
-- 2. SKILLS TABLE
-- Master catalog of skills categorized into domains
-- ============================================================================
CREATE TABLE Skills (
    skill_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(80) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_skill_category CHECK (
        category IN (
            'Programming',
            'Web Development',
            'Database Management',
            'Graphic Design',
            'Communication',
            'Languages',
            'Photography',
            'Digital Marketing',
            'Artificial Intelligence',
            'Music & Arts'
        )
    )
);

CREATE INDEX idx_skills_category ON Skills(category);
CREATE INDEX idx_skills_name ON Skills(skill_name);

-- ============================================================================
-- 3. USER_SKILLS TABLE
-- Maps users to the skills they either 'Teach' or want to 'Learn' (M:N)
-- ============================================================================
CREATE TABLE User_Skills (
    user_skill_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    skill_id UUID NOT NULL,
    skill_type VARCHAR(10) NOT NULL,
    proficiency_level VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_userskills_user FOREIGN KEY (user_id) 
        REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_userskills_skill FOREIGN KEY (skill_id) 
        REFERENCES Skills(skill_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_skill_type CHECK (skill_type IN ('Teach', 'Learn')),
    CONSTRAINT chk_proficiency CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    CONSTRAINT uq_user_skill_type UNIQUE (user_id, skill_id, skill_type)
);

CREATE INDEX idx_userskills_lookup ON User_Skills(user_id, skill_type);
CREATE INDEX idx_userskills_skill ON User_Skills(skill_id, skill_type);

-- ============================================================================
-- 4. EXCHANGE_REQUESTS TABLE
-- Records requests sent from one user to another for a skill swap
-- ============================================================================
CREATE TABLE Exchange_Requests (
    request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    offered_skill_id UUID NOT NULL,
    requested_skill_id UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_req_requester FOREIGN KEY (requester_id) 
        REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_req_receiver FOREIGN KEY (receiver_id) 
        REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_req_offered_skill FOREIGN KEY (offered_skill_id) 
        REFERENCES Skills(skill_id) ON DELETE RESTRICT,
    CONSTRAINT fk_req_requested_skill FOREIGN KEY (requested_skill_id) 
        REFERENCES Skills(skill_id) ON DELETE RESTRICT,
    CONSTRAINT chk_different_parties CHECK (requester_id <> receiver_id),
    CONSTRAINT chk_request_status CHECK (status IN ('Pending', 'Accepted', 'Rejected', 'Cancelled'))
);

CREATE INDEX idx_requests_requester ON Exchange_Requests(requester_id);
CREATE INDEX idx_requests_receiver ON Exchange_Requests(receiver_id);
CREATE INDEX idx_requests_status ON Exchange_Requests(status);

-- ============================================================================
-- 5. EXCHANGES TABLE
-- Tracks active and completed skill swaps resulting from accepted requests
-- ============================================================================
CREATE TABLE Exchanges (
    exchange_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID UNIQUE NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'Active',
    feedback TEXT,
    
    CONSTRAINT fk_exchange_request FOREIGN KEY (request_id) 
        REFERENCES Exchange_Requests(request_id) ON DELETE CASCADE,
    CONSTRAINT chk_exchange_status CHECK (status IN ('Active', 'Completed', 'Cancelled'))
);

CREATE INDEX idx_exchanges_status ON Exchanges(status);

-- ============================================================================
-- 6. REVIEWS TABLE
-- Stores ratings (1-5) and feedback submitted after exchange completion
-- ============================================================================
CREATE TABLE Reviews (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exchange_id UUID NOT NULL,
    reviewer_id UUID NOT NULL,
    rating INTEGER NOT NULL,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_review_exchange FOREIGN KEY (exchange_id) 
        REFERENCES Exchanges(exchange_id) ON DELETE CASCADE,
    CONSTRAINT fk_review_reviewer FOREIGN KEY (reviewer_id) 
        REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT chk_rating_range CHECK (rating >= 1 AND rating <= 5)
);

CREATE INDEX idx_reviews_exchange ON Reviews(exchange_id);
CREATE INDEX idx_reviews_reviewer ON Reviews(reviewer_id);

-- ============================================================================
-- DATABASE ENGINEERING VIEW: TWO-WAY MUTUAL MATCHES
-- Calculates 100% reciprocal compatible matches between users
-- ============================================================================
CREATE OR REPLACE VIEW View_Mutual_Skill_Matches AS
SELECT 
    u1.user_id AS user_a_id,
    u1.full_name AS user_a_name,
    u1.location AS user_a_location,
    s_a_teaches.skill_id AS user_a_teaches_skill_id,
    s_a_teaches.skill_name AS user_a_teaches_skill_name,
    s_a_teaches.category AS user_a_teaches_category,
    us_a_teach.proficiency_level AS user_a_proficiency,
    
    u2.user_id AS user_b_id,
    u2.full_name AS user_b_name,
    u2.location AS user_b_location,
    s_b_teaches.skill_id AS user_b_teaches_skill_id,
    s_b_teaches.skill_name AS user_b_teaches_skill_name,
    s_b_teaches.category AS user_b_teaches_category,
    us_b_teach.proficiency_level AS user_b_proficiency,
    
    100 AS match_percentage,
    'Perfect Reciprocal Match' AS compatibility_label
FROM User_Skills us_a_teach
JOIN Skills s_a_teaches ON us_a_teach.skill_id = s_a_teaches.skill_id AND us_a_teach.skill_type = 'Teach'
JOIN User_Skills us_b_learn ON us_b_learn.skill_id = s_a_teaches.skill_id AND us_b_learn.skill_type = 'Learn'
JOIN User_Skills us_b_teach ON us_b_teach.user_id = us_b_learn.user_id AND us_b_teach.skill_type = 'Teach'
JOIN Skills s_b_teaches ON us_b_teach.skill_id = s_b_teaches.skill_id
JOIN User_Skills us_a_learn ON us_a_learn.user_id = us_a_teach.user_id 
    AND us_a_learn.skill_id = s_b_teaches.skill_id 
    AND us_a_learn.skill_type = 'Learn'
JOIN Users u1 ON u1.user_id = us_a_teach.user_id
JOIN Users u2 ON u2.user_id = us_b_learn.user_id
WHERE u1.user_id != u2.user_id;

-- ============================================================================
-- TRIGGER: Auto-create Exchange row when request is Accepted
-- ============================================================================
CREATE OR REPLACE FUNCTION fn_create_exchange_on_accept()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Accepted' AND (OLD.status IS NULL OR OLD.status != 'Accepted') THEN
        INSERT INTO Exchanges (request_id, start_date, status)
        VALUES (NEW.request_id, CURRENT_TIMESTAMP, 'Active')
        ON CONFLICT (request_id) DO NOTHING;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_auto_create_exchange ON Exchange_Requests;
CREATE TRIGGER trg_auto_create_exchange
AFTER UPDATE OF status ON Exchange_Requests
FOR EACH ROW
EXECUTE FUNCTION fn_create_exchange_on_accept();
