import credentials from "../../lib/service-account.json";
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { clientData } = await request.json();

    // Fetch IP Address
    const ipRes = await fetch('https://api.ipify.org?format=json');
    if (!ipRes.ok) throw new Error(`Failed to get IP. Status: ${ipRes.status}`);
    const { ip } = await ipRes.json();

    // Fetch Geo Location
    const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,timezone,query`);
    if (!geoRes.ok) throw new Error(`Failed to get geo info. Status: ${geoRes.status}`);
    const geoData = await geoRes.json();

    if (geoData.status !== "success") throw new Error(`IP-API error: ${geoData.message}`);

    // Google Sheets Setup
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = "1znZ0HCqiG5J5fHL8BPEytJ12KO8tSn4P2Ju5jVfENBg";
    const range = 'Sheet1!A1';

    // Combine data
    const row = [
      new Date().toISOString(),
      clientData.device,
      clientData.os,
      clientData.browser,
      geoData.country,
      geoData.city,
      clientData.language,
      clientData.referrer,
      geoData.timezone,
      ip
    ];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    });

    console.log(geoData);
    

    return NextResponse.json({ 
      message: 'Data appended successfully',
      ipData: { ip, ...geoData }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}