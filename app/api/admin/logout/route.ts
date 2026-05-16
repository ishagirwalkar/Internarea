import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  // Clear the admin session cookie
  response.cookies.set({
    name: 'internarea_admin_session',
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0, // This will delete the cookie
  });

  // Redirect to login page
  response.headers.set('Location', '/admin');

  return response;
}
