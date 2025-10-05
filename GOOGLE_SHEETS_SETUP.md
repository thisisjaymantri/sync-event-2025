# 📊 Google Sheets Live Schedule Setup

This guide will help you connect Google Sheets so your event staff can update the schedule in real-time from their phones!

---

## 🎯 What You'll Get

- ✅ Event staff can edit schedule from any device
- ✅ Changes appear on the live site within 30 seconds
- ✅ Simple spreadsheet interface (no technical knowledge needed)
- ✅ Collaborative editing (multiple people can update)
- ✅ Automatic fallback to hardcoded schedule if sheets fail

---

## 📝 Step 1: Create Your Google Sheet

### 1.1 Copy This Template

Create a new Google Sheet with exactly these column headers in Row 1:

| Time     | Event             | Status   |
|----------|-------------------|----------|
| 9:30 am  | Welcome           | Complete |
| 10:00 am | Opening keynote   | Complete |
| 10:30 am | Product spotlight | Complete |
| 11:15 am | Break             | Complete |
| 11:45 am | Fireside chat     | Active   |
| 12:15 pm | Lunch             | Upcoming |
| 2:00 pm  | Open networks     | Upcoming |
| 2:20 pm  | Spark update      | Upcoming |
| 2:40 pm  | Break             | Upcoming |
| 3:00 pm  | Working sessions  | Upcoming |
| 4:30 pm  | Closing           | Upcoming |
| 5:30 pm  | Happy hour        | Upcoming |
| 6:30 pm  | Dinner            | Upcoming |

### 1.2 Important Formatting Rules

- **Column A (Time)**: Any format (e.g., "9:30 am", "10:00 AM", "14:30")
- **Column B (Event)**: Any text
- **Column C (Status)**: MUST be exactly one of:
  - `Upcoming` (default, no styling)
  - `Active` (shows green dot)
  - `Complete` (faded/greyed out)

⚠️ **Status values are case-sensitive!**

### 1.3 Share the Sheet

1. Click **Share** button (top right)
2. Under "General access" → Change to **"Anyone with the link"**
3. Set permission to **"Viewer"** (not Editor!)
4. Click **Done**

---

## 🔑 Step 2: Get Your Google API Key

### 2.1 Enable Google Sheets API

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Go to: **APIs & Services** → **Library**
4. Search for **"Google Sheets API"**
5. Click **Enable**

### 2.2 Create API Key

1. Go to: **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **API Key**
3. Copy the API key (you'll need this for Vercel)
4. Click **Edit API key** → **Restrict Key**:
   - Under "API restrictions" → Select **"Restrict key"**
   - Check only **"Google Sheets API"**
   - Under "Application restrictions" → Select **"HTTP referrers"**
   - Add: `*.vercel.app/*` and your production domain
   - Click **Save**

---

## 🚀 Step 3: Configure Vercel

### 3.1 Get Your Sheet ID

From your Google Sheet URL, copy the ID:
```
https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit
```

### 3.2 Add Environment Variables to Vercel

1. Go to: https://vercel.com/jaylightsparkcs-projects/sync/settings/environment-variables
2. Add two new variables:

**Variable 1:**
- **Key**: `GOOGLE_SHEET_ID`
- **Value**: Your sheet ID from step 3.1
- **Environments**: Production, Preview, Development

**Variable 2:**
- **Key**: `GOOGLE_API_KEY`
- **Value**: Your API key from step 2.2
- **Environments**: Production, Preview, Development

3. Click **Save** for each
4. **Redeploy** your site (Vercel will prompt you)

---

## ✅ Step 4: Test It!

1. Visit your live site
2. In dev mode, you'll see a small badge showing `google-sheets` if connected
3. Edit your Google Sheet (change a status or event name)
4. Wait 30 seconds
5. Refresh your site → Changes should appear!

---

## 📱 Day-of-Event Usage

### For Your Event Staff:

**Updating the schedule:**
1. Open the Google Sheet on phone/tablet
2. Find the current event
3. Change its **Status** column to `Active`
4. Change previous event to `Complete`
5. Save (happens automatically in Google Sheets)
6. Changes appear on the live site within 30 seconds!

**Pro Tips:**
- Use data validation in Google Sheets to create a dropdown for the Status column
- Keep the sheet open on a tablet backstage
- Assign one person as "schedule manager"
- Test the workflow before the event

---

## 🔧 Troubleshooting

### Schedule isn't updating?
- Check that BOTH environment variables are set in Vercel
- Verify the sheet is shared as "Anyone with link can view"
- Check that Status values are exactly: `Upcoming`, `Active`, or `Complete` (case-sensitive)
- Look at browser console for error messages

### Shows "local" or "local-fallback"?
- Sheet is not connected yet (using hardcoded data)
- This is fine! The site still works, just not editable from sheets

### API quota errors?
- Google Sheets API has generous free limits
- Your app only fetches once per 30 seconds per viewer
- For a typical event, you'll be well within limits

---

## 🎨 Optional: Add Data Validation

Make it easier for staff to set the status correctly:

1. Select the Status column (C2:C100)
2. **Data** → **Data validation**
3. Criteria: **List of items**
4. Enter: `Upcoming,Active,Complete`
5. Click **Save**

Now the Status column has a dropdown! ✨

---

## 🔄 Reverting to Hardcoded Data

To disable Google Sheets and use the hardcoded schedule:

1. Go to Vercel environment variables
2. Delete `GOOGLE_SHEET_ID` and `GOOGLE_API_KEY`
3. Redeploy

The app will automatically use `lib/schedule-data.ts` as the source.

---

Need help? The app gracefully falls back to hardcoded data if anything goes wrong, so your event will never break! 🎉
