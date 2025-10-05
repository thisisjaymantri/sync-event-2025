# Sync '25 Event Web App

A web application for the Sync '25 event featuring a DVD-style screensaver animation and run of show schedule.

![Sync '25](public/sync-logo.svg)

## Features

- **DVD Screensaver**: Classic bouncing logo animation with RGB color cycling
- **Event Schedule**: Complete run of show from 9:30 AM to 6:30 PM
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Pixel-Perfect Design**: Built from Figma specifications

## Getting Started

```bash
# Install dependencies
npm install

# Create local environment file
cat > .env.local << EOF
STAGING_PASSWORD=your-password
GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0
EOF

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔒 Password Protection

The site is protected with a password gate to restrict access.

**Vercel Setup (Required):**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add: `STAGING_PASSWORD` = `your-secure-password`
3. Redeploy

⚠️ No fallback password - must be set in Vercel to work!

---

## 📊 Live Schedule Updates (Optional)

Enable real-time schedule editing via Google Sheets so event staff can update from their phones!

**✨ Simple Setup (No API Key!):**
1. Create a Google Sheet with columns: `Time`, `Event`, `Status`
2. Make it public (view-only)
3. Get the CSV export URL
4. Add `GOOGLE_SHEET_CSV_URL` to Vercel
5. Event staff can now edit the schedule live!

**📖 Setup Guides:**
- **[SIMPLE_SETUP.md](./SIMPLE_SETUP.md)** ⭐ **Recommended** - 5 minutes, no API key, works with any Google account
- **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** - Advanced method with API (if you have Google Cloud access)

**Without Google Sheets:** The app uses the hardcoded schedule from `lib/schedule-data.ts` - everything still works!

## Font Setup

⚠️ **Add Suisse Intl font files** to `/app/fonts/`:
- `SuisseIntl-Regular.woff2`  
- `SuisseIntl-Regular.woff`

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/sync)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: RequestAnimationFrame
- **Deployment**: Vercel

---

Built for Sync '25 • Los Angeles, CA