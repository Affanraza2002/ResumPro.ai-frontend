# 🧠 ResumPro.ai — AI-Powered Resume Builder

> **Version 2.0** | Built with the MERN Stack + OpenAI | Deployed on Vercel

**ResumPro.ai** is a full-stack, production-grade AI resume builder that helps job seekers create professional, ATS-optimised resumes in minutes. It features a beautifully designed React frontend with real-time live preview, intelligent AI content enhancement, ATS scoring, auto-save, public resume sharing — all backed by a secure, serverless-ready Node.js/MongoDB API.

---

## 📑 Table of Contents

1. [Introduction](#introduction)
2. [How It Works](#how-it-works)
3. [Frontend Features & UX](#frontend-features--ux)
4. [Backend Features & Architecture](#backend-features--architecture)
5. [Tech Stack & Key Libraries](#tech-stack--key-libraries)
6. [Version 2.0 Upgrades](#version-20-upgrades)
7. [API Reference](#api-reference)
8. [Getting Started](#getting-started)

---

## Introduction

ResumPro.ai was built to solve a common problem: creating a high-quality, ATS-friendly resume is time-consuming and confusing. By combining a clean editing interface with GPT-powered AI assistance, users can:

- Build a resume from scratch with live preview
- Upload an existing PDF and have AI parse & import the data
- Get real-time ATS score feedback with actionable improvements
- Choose from multiple professional templates and accent colours
- Share their resume publicly via a unique URL

The project follows a clean separation of concerns — a React SPA (Vite) for the frontend and an Express.js REST API for the backend — both deployed on Vercel.

---

## How It Works

```
User Registers / Logs In (JWT issued)
        │
        ▼
Dashboard → View, Create, Rename, Duplicate, Delete Resumes
        │
  ┌─────┴──────┐
Create New    Upload PDF
  Resume      (AI extracts data via OpenAI)
    │               │
    └───────┬────────┘
            ▼
    Resume Builder
    ├── Section Forms: Personal Info, Summary, Experience, Education, Projects, Skills, Custom Sections
    ├── Live Resume Preview (updates in real time)
    ├── AI Enhance on Summary (with tone selector) and Experience descriptions
    ├── ATS Score Sliding Panel (score ring, strengths, improvements, missing keywords)
    ├── Auto-Save (3-second debounce)
    ├── Job Description Matcher (paste JD → get keyword gap analysis)
    ├── Template Selector + Color Picker
    └── Public/Private toggle → shareable /view/:id URL
            │
            ▼
    Save → PUT /api/resumes/update (MongoDB)
    PDF Export → window.print() with A4 print CSS
```

---

## Frontend Features & UX

### 🏠 Landing Page
- Framer Motion **staggered hero animations** — headline, badge, CTAs fade in sequentially
- Emerald/Teal **unified brand design** matching the inner app
- Animated **Features section** with scroll-triggered card reveals
- Testimonials **auto-scrolling marquee** (dual rows, reverse animation)
- Minimal **Footer** with branding and developer social links

### 🖥️ Dashboard
- **Stats Row**: Total resumes, last updated date, public resume count
- **Color-coded resume cards** (5 theme variants, hover animations)
- **Search/filter** resumes by title in real-time
- **Hover action menu**: Duplicate, Rename, Delete — each with animated tooltips
- **Animated modals** (spring physics) for Create, Upload, and Rename actions
- **Empty state** with call-to-action when no resumes exist

### ✍️ Resume Builder
- **Section progress bar** — animates fill as you navigate between sections
- **Prev/Next navigation** between 6 sections with animated transitions
- **Animated section switching** (slide-in from right, slide-out to left)
- **Save status indicator**: Saved ✅ / Unsaved ⚠️ / Saving ⏳
- **Auto-save** every 3 seconds of inactivity (debounced)
- **Template toolbar**: 4 templates + 5 accent colour presets

### 📝 Form Components
| Form | Key Feature |
|---|---|
| Personal Info | Camera icon avatar upload, background removal toggle |
| Professional Summary | Tone selector (Professional/Executive/Technical/Creative) + char counter |
| Experience | Move up/down reordering, CURRENT badge toggle, per-entry AI enhance |
| Education | Move up/down reordering, graduation date picker |
| Projects | URL field, move up/down reordering |
| Skills | Quick-add suggestion chips, animated pill removal |
| Custom Sections | Add unlimited custom sections (Certifications, Languages, Awards, etc.) |

### 🤖 AI Features
- **AI Enhance Summary**: Rewrites with tone-specific language
- **AI Enhance Job Description**: Action verbs + quantifiable achievements
- **ATS Score Panel**: Score ring (0-100), colour-coded by threshold, strengths, improvements, missing keywords, re-analyze button
- **Job Description Matcher**: Paste a job posting → get match percentage + keyword gaps
- **PDF Upload & Parse**: Upload existing resume PDF → AI extracts and pre-fills all fields

### 👁️ Preview & Sharing
- **Public Preview page**: Clean render with copy-link, share, and PDF download buttons
- **Footer CTA** on preview page to drive new user signups
- Fully **print-optimised CSS** for clean A4 PDF export

---

## Backend Features & Architecture

### Architecture Pattern
```
client request
      │
      ▼
Vercel Serverless Function (server.js exported as module)
      │
   Middleware Stack:
   ├── Helmet (security headers)
   ├── CORS (allowlist of origins)
   ├── express.json (10mb limit)
   ├── cookieParser
   ├── DB Connection Middleware (readyState check)
   └── Rate Limiters (auth: 10/15min, AI: 15/15min)
      │
      ▼
Routes → Controllers → Mongoose → MongoDB Atlas
      │
   AI Routes → OpenAI SDK → GPT-4o-mini
   File Routes → Multer → Jimp → Cloudinary
```

### API Endpoints

#### Users
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Create account (bcrypt password) |
| POST | `/api/users/login` | Issue JWT token |
| GET | `/api/users/data` | Get authenticated user profile |
| GET | `/api/users/resumes` | List all resumes for user |

#### Resumes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/resumes/create` | Create empty resume |
| GET | `/api/resumes/get/:id` | Get resume by ID (auth) |
| GET | `/api/resumes/public/:id` | Get public resume (no auth) |
| PUT | `/api/resumes/update` | Update resume data + image |
| DELETE | `/api/resumes/delete/:id` | Delete resume |

#### AI
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/enhance-pro-sum` | Enhance professional summary |
| POST | `/api/ai/enhance-job-desc` | Enhance job description |
| POST | `/api/ai/upload-resume` | Parse PDF text → resume data |
| POST | `/api/ai/analyze-ats` | ATS score analysis |
| POST | `/api/ai/match-jd` | Job description keyword matcher |

---

## Tech Stack & Key Libraries

### Frontend

```
React 19 (Vite)         — UI framework with fast hot reload
Redux Toolkit           — Global auth state management
React Router v7         — SPA routing with nested layouts
Tailwind CSS v4         — Utility-first styling with design tokens
Framer Motion           — Declarative animations and transitions
Lucide React            — Consistent SVG icon library
Axios                   — HTTP client with base URL configuration
react-pdftotext         — PDF text extraction in the browser
react-hot-toast         — Elegant toast notifications
Google Fonts (Outfit)   — Modern typography
```

### Backend

```
Node.js + Express       — HTTP server and middleware pipeline
MongoDB Atlas           — Cloud NoSQL document storage
Mongoose                — Schema-based ODM with query helpers
jsonwebtoken            — Stateless JWT auth tokens
bcryptjs                — Password hashing (salt rounds: 10)
OpenAI Node SDK         — GPT-4o-mini integration
Multer                  — Multipart file upload handling
Jimp                    — Server-side image background removal
Cloudinary              — Image CDN and storage
Helmet.js               — 11 security HTTP headers
express-rate-limit      — Per-IP request throttling
dotenv                  — Environment variable management
```

---

## Version 2.0 Upgrades

### Frontend (V2)

| Category | What Changed |
|---|---|
| **Design System** | Unified Emerald/Teal brand palette across all pages — no more random colour classes |
| **Animations** | Added Framer Motion to every major component: hero, dashboard cards, form sections, ATS panel, modals |
| **Navbar** | Glassmorphism blur, favicon logo, animated dropdown, conditional Login/Get Started for guests |
| **Dashboard** | Stats row, color-coded cards, search, hover action buttons, duplicate resume, animated spring modals |
| **Resume Builder** | Section progress bar, animated transitions, prev/next nav, save status indicator |
| **Form Components** | Redesigned all 6 forms with icons, reorder controls, empty states, animated entries |
| **Skill Form** | Added 12 quick-add suggestion chips + animated pill removal |
| **Summary Form** | Tone selector + character counter |
| **ATS Panel** | New feature: SVG score ring, strengths, improvements, keyword gaps |
| **Auto-Save** | New feature: 3-second debounce auto-save |
| **Custom Sections** | New feature: unlimited user-defined sections |
| **Job Description Matcher** | New feature: AI-powered keyword gap analysis |
| **Landing Page** | Full Framer Motion overhaul, emerald brand sync, animated features section |
| **Print CSS** | Proper A4 rules with `print-color-adjust: exact` |

### Backend (V2)

| Category | What Changed |
|---|---|
| **Security** | Added Helmet.js (11 headers: CSP, HSTS, X-Frame-Options, etc.) |
| **Rate Limiting** | express-rate-limit on auth routes (10/15min) and AI routes (15/15min) |
| **Error Handling** | Global error handler middleware added to server.js |
| **DB Connection** | Serverless-safe readyState check in `configs/db.js` |
| **Route Coverage** | Both `/api/resumes` and `/api/resume` mounted for compatibility |
| **Body Limit** | Increased from 1mb to 10mb for image upload payloads |
| **ATS Endpoint** | New: POST `/api/ai/analyze-ats` returns structured JSON score |
| **JD Matcher Endpoint** | New: POST `/api/ai/match-jd` returns match % and keyword gaps |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- OpenAI API key
- Cloudinary account

### Backend Setup
```bash
cd ResumPro_ai-backend
npm install
cp .env.example .env   # Fill in MONGO_URI, JWT_SECRET, OPENAI_API_KEY, CLOUDINARY_*
npm run dev            # Starts on http://localhost:3000
```

### Frontend Setup
```bash
cd ResumPro.ai-frontend
npm install
cp .env.example .env   # Set VITE_BACKEND_URL=http://localhost:3000
npm run dev            # Starts on http://localhost:5173
```

### Environment Variables

#### Backend `.env`
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_key
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=http://localhost:5173
```

#### Frontend `.env`
```env
VITE_BACKEND_URL=http://localhost:3000/api
```

---

## 📜 License

MIT — free to use, modify, and distribute.

---

> Built with ❤️ by **Affanraza** | [GitHub](https://github.com) · [LinkedIn](https://linkedin.com)
