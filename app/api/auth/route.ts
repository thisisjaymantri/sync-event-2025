import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // Check against environment variable
  const correctPassword = process.env.STAGING_PASSWORD || 'sync2025';
  
  if (password === correctPassword) {
    const response = NextResponse.json({ success: true });
    
    // Set auth cookie (httpOnly for security, 7 days expiry)
    response.cookies.set('staging-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
}
