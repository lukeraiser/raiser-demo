# 📄 Product Requirements Document (PRD)
# Fundraising Pipeline Tool for Small Charities

## Overview
This document outlines the development of a lightweight, intuitive fundraising pipeline tool built specifically for small charities. It is designed to help fundraisers and charity leaders centralize organisational knowledge, track grant applications, manage deadlines, and streamline funding workflows.

## Target Users

- Fundraisers at small charities
- Charity leaders managing or writing funding applications
- Consultants supporting multiple charities or projects

## Key Goals

- Create a reusable organisational knowledge base to support funding applications
- Centralized tracking of all grant opportunities
- Pipeline insights to help fundraisers measure performance
- Task and deadline management to ensure no opportunity is missed
- Simple, intuitive UI designed for small charity workflows
- Support for basic financial and reporting requirements
- Future integrations with external systems (e.g., Salesforce, Xero)

## Epics & Features

### 🧱 Epic 0: Organisational Intelligence Hub
**Goal:** Help users store all key information about their charity and its projects in one place — and reuse it across multiple applications.

**Features:**
- Charity profile setup (name, registration, contact, mission, etc.)
- Project profiles with description, outcomes, target audiences, delivery models
- Outcome/evidence bank (testimonials, stats, quotes, case studies)
- Tagging and relationship linking between projects and content
- Single source of truth for all reusable application material

🚀 **Deliverable:** A reusable content hub that powers every future grant bid and report.

### 📦 Epic 1: Pipeline & Opportunity Management
**Goal:** Help users track and manage funding opportunities linked to their work.

**Features:**
- CRUD for funding opportunities (title, funder, amount, deadline, stage)
- Status tracking (e.g. researching, drafting, submitted, awarded, lost)
- Link opportunities to projects in the Org Hub
- "Next eligible to apply" and reapply tracking
- Table/list views with sorting/filtering by deadline, stage, etc.
- Simple dashboard showing pipeline totals and deadline summaries

🚀 **Deliverable:** A visual, accessible pipeline that keeps fundraisers in control of their applications.

### 🧠 Epic 2: Application Drafting & Reuse
**Goal:** Let users draft and edit funding applications using reusable blocks and smart writing tools.

**Features:**
- Upload funder questions (from web/PDF/Word)
- Compose draft responses using saved content blocks
- GPT-powered writing assistance (suggestions, rewrites, tone adjustments)
- Save content blocks for reuse in other bids
- Team collaboration on single application drafts (no version chaos)

🚀 **Deliverable:** A fast, intelligent drafting workflow tailored to small charities.

### 📋 Epic 3: Task & Deadline Management
**Goal:** Ensure deadlines and responsibilities don't fall through the cracks.

**Features:**
- Assign tasks to team members (e.g. write Q3, gather attachments)
- Due date tracking and status completion
- Calendar integration (Google, iCal)
- Personal "My Tasks" dashboard
- Team overview of upcoming key dates

🚀 **Deliverable:** A collaborative task system with clear accountability.

### 📊 Epic 4: Reporting & Financial Insights
**Goal:** Support post-award responsibilities and future forecasting.

**Features:**
- Track what was promised vs. what's been delivered
- Input outcome/attendance/spend data for each project
- Auto-draft funder reports based on stored data
- Budget tracking by project or award
- CSV export for external reports or finance tools

🚀 **Deliverable:** A basic impact and financial reporting system that cuts admin time.

### 🔌 Epic 5: External Integrations & Scaling
**Goal:** Make the system extensible and connected to users' wider ecosystem.

**Features:**
- Export to Word, PDF, CSV
- Calendar sync for deadlines and tasks
- Zapier / Make / API for custom automations
- Salesforce/Xero export support
- Community roadmap voting and feedback submission

🚀 **Deliverable:** A future-ready system that can plug into existing workflows.

## Development Roadmap
### Vibe Coding Sprints

🟢 Sprint 1 (→ April 4): Epic 0 + Epic 1 — Org Hub + Grant Tracking MVP
🟡 Sprint 2: Epic 2 — Application drafting (with GPT reuse, no AI generation yet)
🔵 Sprint 3: Epic 3 — Task & deadline management + calendar integration
🟠 Sprint 4: Epic 4 — Reporting & CSV export
🔴 Sprint 5+: Epic 5 — Integrations, feedback loops, scaling

## Technical Stack

- **Frontend:** Next.js + Tailwind + ShadCN
- **Backend:** Supabase + Prisma
- **Auth:** Clerk
- **Storage:** Supabase
- **AI Integration:** OpenAI/Anthropic models (for Epic 2), ElevenLabs for voice (future)
- **Deployments:** Vercel
- **Integrations:** Google Calendar API, potential Zapier/Make, optional Salesforce/Xero

## Key Success Metrics

🎯 **MVP Adoption:** At least 10 active small charities using the platform
🎯 **Pipeline Usage:** Average of 5+ tracked opportunities per org
🎯 **Time-Saved Feedback:** Users reporting time saved writing applications or reports
🎯 **Feature Validation:** 5+ pieces of user feedback directly inform post-MVP roadmap

## Next Steps

- Build Org Intelligence Hub and Grant Pipeline (Sprints 1 → by April 4)
- Add dummy/test data to walk through workflows and validate logic
- Share with small group of charity testers for early feedback
- Prioritise drafting and reporting modules based on what users ask for most

🚀 Let's ship something simple, useful, and genuinely game-changing for small charities. 