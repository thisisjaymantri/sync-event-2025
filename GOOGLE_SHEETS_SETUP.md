# 📊 Google Sheets Live Schedule Setup

Connect your event schedule to Google Sheets for real-time updates. No API keys, no Google Cloud Console, no special permissions needed!

---

## ✨ What You Need

- ✅ A Google account (personal or work - any will work!)
- ✅ 5 minutes
- ✅ That's it!

---

## 🚀 Step-by-Step Setup

### Step 1: Create Your Google Sheet

1. Go to: https://sheets.google.com
2. Create a new sheet
3. Add these **exact** column headers in Row 1:

| Time     | Event             | Status   |
|----------|-------------------|----------|

4. Fill in your schedule starting from Row 2:

| Time     | Event             | Status   |
|----------|-------------------|----------|
| 9:30 am  | Welcome           | Upcoming |
| 10:00 am | Opening keynote   | Upcoming |
| 10:30 am | Product spotlight | Upcoming |
| 11:15 am | Break             | Upcoming |
| 11:45 am | Fireside chat     | Upcoming |
| 12:15 pm | Lunch             | Upcoming |
| 2:00 pm  | Open networks     | Upcoming |
| 2:20 pm  | Spark update      | Upcoming |
| 2:40 pm  | Break             | Upcoming |
| 3:00 pm  | Working sessions  | Upcoming |
| 4:30 pm  | Closing           | Upcoming |
| 5:30 pm  | Happy hour        | Upcoming |
| 6:30 pm  | Dinner            | Upcoming |

**Status Options (case-sensitive!):**
- `Upcoming` - Normal appearance, no special styling
- `Active` - Shows green indicator dot
- `Complete` - Faded/greyed out at 50% opacity

---

### Step 2: Make Sheet Public

1. Click the **Share** button (top right)
2. Click **"Anyone with the link"**
3. Set to **"Viewer"** (not Editor!)
4. Click **Done**

---

### Step 3: Get Your CSV URL

1. Copy your sheet URL from the browser. It looks like:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0/edit#gid=0
   ```

2. Extract the **Sheet ID** (the long string between `/d/` and `/edit`):
   ```
   1a2b3c4d5e6f7g8h9i0
   ```

3. Create your CSV export URL using this format:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0
   ```

   **Example:**
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0/export?format=csv&gid=0
   ```

4. Test it! Paste the CSV URL in your browser - you should see your data as plain text.

---

### Step 4: Add to Vercel

1. Go to: https://vercel.com/jaylightsparkcs-projects/sync/settings/environment-variables
2. Click **"Add New"**
3. Add:
   - **Key**: `GOOGLE_SHEET_CSV_URL`
   - **Value**: Your CSV URL from Step 3
   - **Environments**: Check all three (Production, Preview, Development)
4. Click **Save**
5. **Redeploy** your site (Vercel will prompt you)

---

## ✅ That's It!

Your schedule is now live! The app will automatically fetch updates every 30 seconds.

---

## 📱 Using It Day-of-Event

**For Event Staff:**

1. Open the Google Sheet on your phone/tablet
2. Find the current event
3. Change the **Status** column to `Active`
4. Mark previous events as `Complete`
5. Changes appear on the live site within 30 seconds!

**Pro Tips:**
- Add data validation to the Status column (see below)
- Keep the sheet open backstage on a tablet
- Assign one person as the "schedule runner"
- Test it before the event!

---

## 🎨 Optional: Add Status Dropdown

Make it foolproof with a dropdown menu:

1. Select cells **C2:C100** (the Status column, below header)
2. Go to **Data** → **Data validation**
3. Under "Criteria" select **"List of items"**
4. Enter: `Upcoming,Active,Complete`
5. Check **"Show dropdown list in cell"**
6. Click **Save**

Now staff can just click and select the status! ✨

---

## 🔧 Troubleshooting

### "Schedule isn't updating"
- Make sure the sheet is set to "Anyone with the link can view"
- Check that the CSV URL works in your browser
- Verify `GOOGLE_SHEET_CSV_URL` is set in Vercel
- Make sure Status values are exactly: `Upcoming`, `Active`, or `Complete`

### "Shows 'local' in corner"
- The Google Sheet isn't connected yet
- App is using hardcoded data from `lib/schedule-data.ts`
- This is fine! The site still works perfectly

### "Some events are missing"
- Make sure Time and Event columns aren't empty
- Check that there are no blank rows in the middle of your schedule

---

## 🔄 To Disable Google Sheets

Want to go back to the hardcoded schedule?

1. Go to Vercel environment variables
2. Delete `GOOGLE_SHEET_CSV_URL`
3. Redeploy

The app will use the schedule in `lib/schedule-data.ts` instead.

---

## 🎯 Why This Works Great

✅ **No API key required** - Just share a public link  
✅ **Works with any Google account** - Personal or corporate  
✅ **No special permissions needed** - No Google Cloud Console access  
✅ **5-minute setup** - Super fast and simple  
✅ **Real-time updates** - Changes appear within 30 seconds  
✅ **Non-technical friendly** - Anyone can edit a spreadsheet

---

## 🔒 Security Note

Your schedule will be publicly viewable via the CSV URL, but:
- Only you can edit it (unless you give edit permissions)
- It's just event schedule info (not sensitive)
- The URL is obscure and not easily guessable
- Perfect for an event schedule use case!

If you need password protection on the sheet itself, stick with the app's existing password gate - that protects the entire site.

---

**Need help?** The app gracefully falls back to hardcoded data if anything goes wrong. Your event will never break! 🎉
