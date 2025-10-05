import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface SheetRow {
  time: string;
  event: string;
  status: 'Upcoming' | 'Active' | 'Complete';
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if (char === '\n' && !inQuotes) {
      currentRow.push(currentField);
      if (currentRow.some(field => field.trim())) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else if (char === '\r') {
      // Skip carriage returns
      continue;
    } else {
      currentField += char;
    }
  }

  // Add last field and row if not empty
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(field => field.trim())) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export async function GET() {
  const sheetUrl = process.env.GOOGLE_SHEET_CSV_URL;

  // Fallback to local data if not configured
  if (!sheetUrl) {
    const { scheduleData } = await import('@/lib/schedule-data');
    return NextResponse.json({ data: scheduleData, source: 'local' });
  }

  try {
    // Fetch CSV from public Google Sheet
    const response = await fetch(sheetUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    // Skip header row (first row)
    const dataRows = rows.slice(1);

    // Transform rows into schedule items
    const scheduleData: SheetRow[] = dataRows
      .filter((row: string[]) => row[0]?.trim() && row[1]?.trim()) // Must have time and event
      .map((row: string[]) => ({
        time: row[0]?.trim() || '',
        event: row[1]?.trim() || '',
        status: (row[2]?.trim() as SheetRow['status']) || 'Upcoming',
      }));

    return NextResponse.json({ 
      data: scheduleData, 
      source: 'google-sheets-csv',
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
