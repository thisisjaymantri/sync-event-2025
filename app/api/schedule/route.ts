import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface SheetRow {
  time: string;
  event: string;
  status: 'Upcoming' | 'Active' | 'Complete';
}

export async function GET() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  // Fallback to local data if not configured
  if (!spreadsheetId || !apiKey) {
    const { scheduleData } = await import('@/lib/schedule-data');
    return NextResponse.json({ data: scheduleData, source: 'local' });
  }

  try {
    // Fetch from Google Sheets API
    const range = 'Sheet1!A2:C100'; // Starting from row 2 (skip header), columns A-C
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();
    const rows = data.values || [];

    // Transform rows into schedule items
    const scheduleData: SheetRow[] = rows
      .filter((row: string[]) => row[0] && row[1]) // Must have time and event
      .map((row: string[]) => ({
        time: row[0]?.trim() || '',
        event: row[1]?.trim() || '',
        status: (row[2]?.trim() as SheetRow['status']) || 'Upcoming',
      }));

    return NextResponse.json({ 
      data: scheduleData, 
      source: 'google-sheets',
      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    
    // Fallback to local data on error
    const { scheduleData } = await import('@/lib/schedule-data');
    return NextResponse.json({ 
      data: scheduleData, 
      source: 'local-fallback',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
