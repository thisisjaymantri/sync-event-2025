import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // Check against environment variable (no fallback for security)
  const correctPassword = process.env.STAGING_PASSWORD;
  
  if (!correctPassword) {
    return NextResponse.json(
      { success: false, error: 'Password not configured' },
      { status: 500 }
    );
  }
  
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
