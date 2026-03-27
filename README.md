# 🤖 PrepAI — AI-Powered Interview Preparation Platform

PrepAI is a full-stack web application that analyzes your resume against a job description using Google Gemini AI, generates a detailed interview report, and produces a tailored, ATS-friendly resume PDF — all in one place.

---

## ✨ Features

### 🧠 AI Interview Report Generation
- Upload your **resume (PDF)** or write a **self-description**
- Paste any **job description**
- Gemini AI analyzes the match and generates:
  - **Match Score** (0–100) — how well your profile fits the role
  - **Technical Questions** — with interviewer intention + how to answer
  - **Behavioral Questions** — with context and suggested answers
  - **Skill Gaps** — missing skills with severity (low / medium / high)
  - **Day-wise Preparation Roadmap** — structured plan to prepare

### 📄 AI Resume PDF Generator
- Generates a **tailored, ATS-friendly resume** based on your profile and the target job description
- Resume is formatted in clean HTML by Gemini AI
- Converted to a downloadable **A4 PDF** using **Puppeteer**
- One-click download from the interview report page

### 🔐 Authentication System
- **JWT-based authentication** using access + refresh tokens
- Tokens stored in **HTTP-only cookies** (XSS safe)
- **OTP email verification** on signup
- Token blacklisting on logout (stored in DB)
- Protected routes on both frontend and backend

### 📊 Dashboard
- View all previously generated interview reports
- Each report stores: match score, job title, resume, self-description
- Click any report to revisit the full interview analysis

---

## 🛠 Tech Stack

### Backend
| Technology | Usage |
|---|---|
| Node.js + Express.js | REST API server |
| TypeScript | Type safety |
| Prisma ORM | Database queries |
| PostgreSQL | Relational database |
| Google Gemini AI (`gemini-2.5-flash`) | AI report + resume generation |
| Puppeteer | HTML to PDF conversion |
| Zod | Input validation + AI schema enforcement |
| `zod-to-json-schema` | Convert Zod schema to JSON Schema for Gemini |
| `pdf-parse` | Extract text from uploaded resume PDF |
| Multer | File upload handling |
| JWT | Authentication tokens |
| Nodemailer | OTP email sending |
| bcrypt | Password hashing |

### Frontend
| Technology | Usage |
|---|---|
| React + TypeScript | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Context API | Global state management |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                         │
│  React + TypeScript + Context API + Axios            │
│                                                      │
│  Pages: Home → InterviewPage → Dashboard             │
│  Hooks: useInterview, useAuth                        │
└────────────────────┬────────────────────────────────┘
                     │ HTTP (withCredentials: true)
                     │ Cookies (JWT tokens)
┌────────────────────▼────────────────────────────────┐
│                     Backend                          │
│  Express.js + TypeScript                             │
│                                                      │
│  Routes:                                             │
│    POST /api/auth/signup                             │
│    POST /api/auth/login                              │
│    GET  /api/auth/logout                             │
│    GET  /api/auth/get-me                             │
│    POST /api/interview          (generate report)    │
│    GET  /api/interview          (all reports)        │
│    GET  /api/interview/report/:id                    │
│    POST /api/interview/resume/pdf/:id                │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
┌────────▼────────┐   ┌─────────▼────────┐
│   PostgreSQL    │   │   Google Gemini   │
│   via Prisma    │   │   AI API          │
│                 │   │                  │
│  Users          │   │  generateContent │
│  InterviewReport│   │  JSON Schema     │
│  TechnicalQ     │   │  enforced via    │
│  BehavioralQ    │   │  Zod             │
│  SkillGap       │   └──────────────────┘
│  PreparationPlan│
│  Otp            │
│  Blacklist      │
└─────────────────┘
```

---

## 🗄 Database Schema

```prisma
User
 ├── id, username, email, password, verified
 └── reports[]  ──→  InterviewReport
                          ├── matchScore, title, jobDescription
                          ├── technicalQuestion[]
                          ├── behavioralQuestions[]
                          ├── skillGaps[]
                          └── preparationPlan[]
```

Relations are **one-to-many** — one user has many reports, one report has many questions.

---

## 🤖 How AI Works

### Interview Report Generation
```
1. Resume PDF uploaded → text extracted via pdf-parse
2. Text + selfDescription + jobDescription sent to Gemini
3. Zod schema defines exact output structure
4. zod-to-json-schema converts it to JSON Schema
5. Gemini returns structured JSON (enforced by schema)
6. Data saved to PostgreSQL via Prisma nested writes
```

### Resume PDF Generation
```
1. Resume text + job description sent to Gemini
2. Gemini generates tailored HTML resume (inline CSS, A4 size)
3. Puppeteer opens HTML in headless Chrome
4. page.pdf() converts it to PDF buffer
5. Buffer sent to frontend as application/pdf blob
6. Frontend creates download link and triggers download
```

### Why `zod-to-json-schema`?
Gemini supports structured output via JSON Schema. Instead of writing raw JSON Schema manually, Zod schemas are written in TypeScript and converted automatically — giving both **type safety** and **AI output enforcement**.

> ⚠️ Note: `zod-to-json-schema` converts camelCase keys to snake_case. So `matchScore` in Zod becomes `match_score` in Gemini's response. Handle this in your backend mapping.

---

## 📁 Project Structure

```
GenAi-PrepAI/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection (Prisma)
│   │   ├── controller/      # Route handlers
│   │   ├── middleware/       # Auth middleware
│   │   ├── routes/          # Express routers
│   │   ├── services/        # AI logic (Gemini + Puppeteer)
│   │   ├── utils/           # Zod schemas, helpers
│   │   └── generated/       # Prisma generated client
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── features/
    │   │   └── interview/
    │   │       ├── components/   # Interview UI components
    │   │       ├── hooks/        # useInterview
    │   │       ├── services/     # API calls
    │   │       └── types/        # TypeScript types
    │   ├── pages/               # Home, Dashboard, InterviewPage
    │   └── App.tsx
    └── package.json
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google Gemini API key
- pnpm (or npm)

### 1. Clone the repo
```bash
git clone https://github.com/amankarn2007/GenAi-PrepAI.git
cd GenAi-PrepAI
```

### 2. Backend setup
```bash
cd backend
pnpm install
```

Create `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/prepai
GEMINI_API_KEY=your_gemini_api_key
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
```

```bash
npx prisma migrate dev
npx prisma generate
npx puppeteer browsers install chrome
pnpm dev
```

### 3. Frontend setup
```bash
cd frontend
pnpm install
```

Create `.env`:
```env
VITE_API_URL=http://localhost:3000
```

```bash
pnpm dev
```

---

## ☁️ Deployment (Render)

### Backend — Web Service
```
Root Directory:  backend
Build Command:   pnpm install && npx prisma generate && npx prisma migrate deploy && npx puppeteer browsers install chrome && pnpm build
Start Command:   pnpm start
```

Environment variables: same as `.env` above (add production values)

### Frontend — Static Site
```
Root Directory:    frontend
Build Command:     pnpm install && pnpm build
Publish Directory: dist
```

Environment variables:
```
VITE_API_URL = https://your-backend.onrender.com
```

---

## 📸 Screenshots

> Home Page → Interview Report → Dashboard → PDF Download

---

## 📝 License

MIT License — feel free to use and modify.

---

## 👨‍💻 Author

**Aman Kumar Karn**
- GitHub: [@amankarn2007](https://github.com/amankarn2007)
- LinkedIn: [linkedin.com/in/karnaman](https://linkedin.com/in/karnaman)