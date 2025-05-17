import credentials from "../../lib/service-account.json";
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userData } = await request.json();

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = "1znZ0HCqiG5J5fHL8BPEytJ12KO8tSn4P2Ju5jVfENBg";
    
    // First, check if headers exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:I1'
    });

    // Define headers
    const headers = [
      'Timestamp',
      'Device',
      'Operating System',
      'Browser',
      'Country',
      'City',
      'Language',
      'Referrer',
      'Timezone'
    ];

    // If no headers exist, add them
    if (!response.data.values) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        }
      });
    }

    // Append data row
    const row = [
      new Date().toISOString(),
      userData.device,
      userData.os,
      userData.browser,
      userData.country,
      userData.city,
      userData.language,
      userData.referrer,
      userData.timezone
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A2',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    });

    return NextResponse.json({ message: 'Data appended successfully' });
  } catch (error) {
    console.error('Google Sheets API error:', error);
    return NextResponse.json({ error: 'Failed to append to sheet' }, { status: 500 });
  }
}