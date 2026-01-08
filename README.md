# San Jose Christian Assembly

Official website and digital platform for San Jose Christian Assembly, a bilingual Chinese-American church located in Milpitas, California.

---

## Overview

This repository contains the source code for the SJCA church website. The site serves as the primary online presence for the congregation, providing information about services, events, and resources for both English and Chinese-speaking members.

### Live Site

Production: [sjca.org](https://sjca.org) (or your Vercel deployment URL)

---

## Repository Structure

```
San-Jose-Christian-Assembly/
└── church-website/          # Next.js web application
    ├── app/                 # Pages and API routes
    ├── components/          # Reusable UI components
    ├── lib/                 # Utility functions
    ├── public/              # Static assets (images, videos, Bible data)
    └── README.md            # Detailed technical documentation
```

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| Hosting | Vercel |
| Email | Nodemailer (Gmail SMTP) |

---

## Features

### Public Pages

- **Homepage** - Hero video, daily scripture, upcoming events, service information
- **Bible Study** - Weekly study information with dynamic scheduling from events
- **Daily Bread** - Daily scripture verses with bilingual support
- **Connect** - Contact form with email integration
- **Give** - Donation information
- **Staff** - Leadership team profiles
- **History** - Church timeline and background
- **Values** - Core beliefs and mission
- **Youth** - Youth ministry information
- **Gallery** - Photo gallery
- **Watch Live** - Link to YouTube livestreams

### Admin Portal

Located at `/admin`, restricted to `@sjca.org` email accounts.

- Manage daily scripture verses (auto-lookup from local Bible files)
- Create and manage church events
- Bilingual content support (English/Chinese)

---

## Quick Start

```bash
# Navigate to the website directory
cd church-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

See `church-website/README.md` for detailed setup instructions including database configuration and environment variables.

---

## Deployment

The site automatically deploys to Vercel when changes are pushed to the main branch.

Before pushing:
1. Ensure `npm run build` completes without errors
2. Test changes locally
3. Verify environment variables are set in Vercel dashboard

---

## Contributing

This is a private repository for SJCA web team members. For access or questions, contact the church office.

### Development Workflow

1. Create a feature branch from `main`
2. Make changes and test locally
3. Run `npm run build` to verify no build errors
4. Push to GitHub and create a pull request
5. Merge to `main` after review (auto-deploys to production)

---

## Contact

**San Jose Christian Assembly**

215 Topaz St, Milpitas, CA 95035

Website: [sjca.org](https://sjca.org)



