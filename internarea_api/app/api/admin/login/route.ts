import { NextRequest, NextResponse } from 'next/server';

import { createAdminSessionCookie } from '@/lib/server/admin-session';

const adminUsername = process.env.ADMIN_USERNAME ?? 'admin';
const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin';

export async function POST(request: NextRequest) {
  let payload: { username?: string; password?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body',
      },
      { status: 400 },
    );
  }

  const username = payload.username?.trim();
  const password = payload.password?.trim();

  if (!username || !password) {
    return NextResponse.json(
      {
        success: false,
        message: 'Username and password are required',
      },
      { status: 400 },
    );
  }

  if (username === adminUsername && password === adminPassword) {
    const response = NextResponse.json({
      success: true,
      message: 'Login successfully',
    });

    response.cookies.set(createAdminSessionCookie(username));
    return response;
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Invalid credential',
    },
    { status: 401 },
  );
}