# San Jose Christian Assembly - Church Website

A bilingual (English/Chinese) church website built with Next.js, Supabase, and Tailwind CSS.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Admin Portal](#admin-portal)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Bilingual Support](#bilingual-support)

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The site runs on `http://localhost:3000` by default. Any changes that are pushed to this GitHub repository are then built on Vercel automatically. Ensure that `npm run build` runs without error prior to pushing to the main branch.

---

## Environment Variables

Create a `.env.local` file in the `church-website` directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SERVICE_KEY=your_supabase_service_role_key

# Email (for contact form)
EMAIL_USER=your_gmail@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
```

### Gmail App Password Setup

The contact form uses Gmail SMTP. To set this up:

1. Enable 2-Step Verification on your Google Account
2. Go to Google Account > Security > 2-Step Verification > App passwords
3. Generate a new app password for "Mail"
4. Use this 16-character password as `EMAIL_APP_PASSWORD`

---

## Admin Portal

Access the admin portal at `/admin`. Only users with `@sjca.org` email addresses can log in.

### Authentication

The admin portal uses Supabase Auth. Admin users must:

- Have an account in Supabase Auth
- Use an email ending in `@sjca.org`

### Features

#### Daily Bread Management

Manage daily scripture verses displayed on the homepage.

- Click any date on the calendar to add or edit a verse
- Enter the English verse reference (e.g., "John 3:16" or "Psalm 23:1-6")
- The system auto-populates Chinese translation and verse text from local Bible files
- Green indicator = complete (both languages), Amber = missing Chinese translation

#### Events Management

Manage church events displayed on the homepage and calendar.

- Click "Add Event" or click a date to create a new event
- Fill in English fields (required) and Chinese fields (optional)
- Toggle "Public Event" to control visibility on the public website
- Events are stored in Los Angeles timezone
- Events with "Bible Study" in the title appear on the Bible Study page

---

## Database Schema

The application uses Supabase (PostgreSQL) with the following tables:

### `daily_bread`

Stores daily scripture verses.

| Column               | Type      | Description                           |
| -------------------- | --------- | ------------------------------------- |
| `date`               | date      | Primary key, the date for this verse  |
| `verse_reference_en` | text      | English reference (e.g., "John 3:16") |
| `verse_reference_zh` | text      | Chinese reference                     |
| `verse_text_en`      | text      | Full verse text in English (NKJV)     |
| `verse_text_zh`      | text      | Full verse text in Chinese (CUV)      |
| `created_by`         | uuid      | User ID who created this entry        |
| `created_at`         | timestamp | Creation timestamp                    |

### `events`

Stores church events.

| Column           | Type      | Description                       |
| ---------------- | --------- | --------------------------------- |
| `id`             | uuid      | Primary key                       |
| `title_en`       | text      | Event title in English (required) |
| `title_zh`       | text      | Event title in Chinese            |
| `description_en` | text      | Description in English            |
| `description_zh` | text      | Description in Chinese            |
| `location_en`    | text      | Location in English               |
| `location_zh`    | text      | Location in Chinese               |
| `start_time`     | timestamp | Event start time (stored in UTC)  |
| `end_time`       | timestamp | Event end time                    |
| `is_public`      | boolean   | Whether visible on public site    |
| `created_by`     | uuid      | User ID who created this event    |
| `created_at`     | timestamp | Creation timestamp                |

### Supabase Setup

1. Create a new Supabase project
2. Run the following SQL to create tables:

```sql
-- Daily Bread table
CREATE TABLE daily_bread (
  date DATE PRIMARY KEY,
  verse_reference_en TEXT NOT NULL,
  verse_reference_zh TEXT,
  verse_text_en TEXT,
  verse_text_zh TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_zh TEXT,
  description_en TEXT,
  description_zh TEXT,
  location_en TEXT,
  location_zh TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE daily_bread ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read access for events
CREATE POLICY "Public can read public events" ON events
  FOR SELECT USING (is_public = true);

-- Authenticated users can manage events
CREATE POLICY "Authenticated users can manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

-- Public read access for daily bread
CREATE POLICY "Public can read daily bread" ON daily_bread
  FOR SELECT USING (true);

-- Authenticated users can manage daily bread
CREATE POLICY "Authenticated users can manage daily bread" ON daily_bread
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## API Routes

### Public Endpoints

| Endpoint                           | Method | Description                    |
| ---------------------------------- | ------ | ------------------------------ |
| `/api/daily-bread?date=YYYY-MM-DD` | GET    | Get verse for a specific date  |
| `/api/events?start=YYYY-MM-DD`     | GET    | Get public events from date    |
| `/api/bible/lookup?ref=John+3:16`  | GET    | Lookup verse text by reference |
| `/api/send-email`                  | POST   | Submit contact form            |

### Authenticated Endpoints

These require an `Authorization: Bearer <token>` header.

| Endpoint                           | Method | Description               |
| ---------------------------------- | ------ | ------------------------- |
| `/api/daily-bread`                 | POST   | Create/update daily bread |
| `/api/daily-bread?date=YYYY-MM-DD` | DELETE | Delete daily bread        |
| `/api/events`                      | POST   | Create event              |
| `/api/events`                      | PUT    | Update event              |
| `/api/events?id=UUID`              | DELETE | Delete event              |

---

## Bilingual Support

The site supports English and Chinese throughout.

### How it works

- Each page has a `language` state (`"en"` or `"zh"`)
- Users toggle language via the nav bar button
- Database fields are stored with `_en` and `_zh` suffixes
- The site falls back to English if Chinese is not available

### Adding translations

When adding content through the admin portal:

- English fields are required
- Chinese fields are optional but recommended
- The Daily Bread auto-lookup fetches both NKJV and CUV translations

### Bible translations

Local Bible JSON files are stored in `/public/bible_translations/`:

- `NKJV_bible.json` - New King James Version (English)
- `CUV_bible.json` - Chinese Union Version (Chinese)
- `book_names.json` - Book name mappings between languages

---

## Project Structure

```
church-website/
├── app/
│   ├── admin/           # Admin portal
│   ├── api/             # API routes
│   ├── bible-study/     # Bible study page
│   ├── connect/         # Contact form
│   ├── daily-bread/     # Daily verse page
│   ├── components/      # Page-specific components
│   └── ...              # Other pages
├── components/
│   ├── ui/              # Shadcn UI components
│   └── ...              # Shared components
├── lib/                 # Utilities and helpers
├── public/              # Static assets
│   ├── bible_translations/
│   ├── easter_25/       # Event photos
│   └── ...
└── styles/              # Global styles
```

---

## Deployment

The site is designed to deploy on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

Make sure to add all environment variables from `.env.local` to your Vercel project settings.
