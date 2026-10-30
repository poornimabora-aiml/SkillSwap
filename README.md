# SkillSwap – Two-Way Skill Exchange System
> **Database Engineering (DBE) College Project**  
> **Author:** Poornima Bora  
> **Repository:** [https://github.com/poornimabora-aiml/SkillSwap.git](https://github.com/poornimabora-aiml/SkillSwap.git)

---

## 📌 1. Project Overview

**SkillSwap** is a decentralized, barter-based knowledge exchange platform where people teach skills they know and learn new skills from others without paying money.

Instead of one-way transactions, SkillSwap enforces a **Two-Way Relational Matching Algorithm** that calculates mutual compatibility between members:
- **User A teaches** what **User B wants to learn**, and
- **User B teaches** what **User A wants to learn**.

When both directions match, the system awards a **100% Perfect Mutual Match**. If only one side matches, users can still send a proposal clearly labeled as a **50% One-Way Request (Not Yet Reciprocal)**.

---

## 🛠️ 2. Technology Stack & Deployment Architecture

| Tier | Technology | Deployment Platform |
|---|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons | **Cloudflare Pages** |
| **Backend API** | Node.js, Express.js REST API, CORS, JWT, Bcrypt | **Render** |
| **Database** | PostgreSQL (Relational 3NF), Foreign Keys, Triggers | **Supabase** |

---

## 🗄️ 3. Database Engineering (DBE) Relational Schema

The relational schema strictly satisfies **Third Normal Form (3NF)** and **Boyce-Codd Normal Form (BCNF)** across 6 distinct tables:

```
[Users] ──(1:N)──< [User_Skills] >──(N:1)── [Skills]
  │                                              │
  ├──(Requester)──> [Exchange_Requests] <──(Offered / Requested Skill)
  └──(Receiver)───>         │
                    (1:1 on Accept)
                            ▼
                       [Exchanges] ──(1:N)──> [Reviews]
```

### Table Definitions & Primary / Foreign Keys

1. **`Users`**: Primary key `user_id` (UUID). Stores full name, verified email, password hash, city/location, and bio.
2. **`Skills`**: Primary key `skill_id` (UUID). Master catalog across 10 categories (Programming, Web Development, Database Management, Graphic Design, Communication, Languages, Photography, Digital Marketing, etc.).
3. **`User_Skills`**: Primary key `user_skill_id` (UUID). Junction table mapping users to skills with `skill_type` (`'Teach'` or `'Learn'`) and `proficiency_level` (`'Beginner'`, `'Intermediate'`, `'Advanced'`, `'Expert'`).
4. **`Exchange_Requests`**: Primary key `request_id` (UUID). Captures exchange proposals with foreign keys to `requester_id`, `receiver_id`, `offered_skill_id`, `requested_skill_id`, and `status` (`'Pending'`, `'Accepted'`, `'Rejected'`).
5. **`Exchanges`**: Primary key `exchange_id` (UUID). Created automatically when a request transitions to `'Accepted'`. Tracks `start_date`, `completion_date`, and `status`.
6. **`Reviews`**: Primary key `review_id` (UUID). Stores verified ratings (`1` to `5`) and comments submitted upon exchange completion.

---

## ⚡ 4. Two-Way Relational Matching Algorithm (SQL)

```sql
SELECT 
    u1.user_id AS user_a_id,
    u1.full_name AS user_a_name,
    s_a.skill_name AS a_teaches,
    u2.user_id AS user_b_id,
    u2.full_name AS user_b_name,
    s_b.skill_name AS b_teaches,
    100 AS match_percentage
FROM User_Skills us_a_teach
JOIN Skills s_a ON us_a_teach.skill_id = s_a.skill_id AND us_a_teach.skill_type = 'Teach'
JOIN User_Skills us_b_learn ON us_b_learn.skill_id = s_a.skill_id AND us_b_learn.skill_type = 'Learn'
JOIN User_Skills us_b_teach ON us_b_teach.user_id = us_b_learn.user_id AND us_b_teach.skill_type = 'Teach'
JOIN Skills s_b ON us_b_teach.skill_id = s_b.skill_id
JOIN User_Skills us_a_learn ON us_a_learn.user_id = us_a_teach.user_id 
    AND us_a_learn.skill_id = s_b.skill_id 
    AND us_a_learn.skill_type = 'Learn'
JOIN Users u1 ON u1.user_id = us_a_teach.user_id
JOIN Users u2 ON u2.user_id = us_b_learn.user_id
WHERE u1.user_id <> u2.user_id;
```

---

## 🚀 5. Local Setup & Quickstart

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/poornimabora-aiml/SkillSwap.git
cd SkillSwap
```

### 2. Setup Database in Supabase
1. Create a new PostgreSQL project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase.
3. Paste and run the contents of [`database/supabase_schema.sql`](database/supabase_schema.sql).
4. Run the seed data from [`database/seed_data.sql`](database/seed_data.sql).

### 3. Run the Backend (Express API)
```bash
cd server
npm install
npm start
# Server starts on http://localhost:5000
```

### 4. Run the Frontend (React + Vite)
```bash
cd ../client
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

---

## 🌐 6. Deployment Guide

### A. Deploy Backend to Render
1. Push this repository to GitHub.
2. Sign in to [render.com](https://render.com) and click **New + > Web Service**.
3. Connect your repository `SkillSwap`.
4. Set **Root Directory** to `server`.
5. Set **Build Command** to `npm install`.
6. Set **Start Command** to `node server.js`.
7. In **Environment Variables**, add:
   - `PORT`: `5000`
   - `SUPABASE_URL`: `your_supabase_project_url`
   - `SUPABASE_ANON_KEY`: `your_supabase_anon_key`
   - `JWT_SECRET`: `your_secret_key`

### B. Deploy Frontend to Cloudflare Pages
1. Sign in to [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages** > **Create application** > **Pages**.
2. Connect your GitHub repository `SkillSwap`.
3. In **Build Settings**:
   - **Framework preset**: `Vite`
   - **Root directory**: `client`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. In **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://your-render-api-subdomain.onrender.com/api`
5. Click **Save and Deploy**.

---

## 👥 7. Pre-configured Demo Test Accounts

The platform includes pre-seeded profiles configured with complementary skills to test the matching engine:

| Name | Email | Password | Teaches | Wants to Learn | Reciprocal Match Partner |
|---|---|---|---|---|---|
| **Alice Johnson** | `alice@skillswap.edu` | `password123` | Python, Database | Graphic Design, Spanish | **Bob Smith (100%)** |
| **Bob Smith** | `bob@skillswap.edu` | `password123` | Graphic Design | Python | **Alice Johnson (100%)** |
| **Carlos Mendoza** | `carlos@skillswap.edu` | `password123` | Spanish, Debate | Database Management | **Alice Johnson (100%)** |
| **Diana Prince** | `diana@skillswap.edu` | `password123` | React & Web Dev | Machine Learning | **Evan Wright (100%)** |
| **Poornima Bora** | `poornima@skillswap.edu` | `password123` | AI & Databases | Photography, Design | **Fiona Gallagher (100%)** |

---

## 📜 8. License

This project is licensed under the MIT License for educational and academic submission.
