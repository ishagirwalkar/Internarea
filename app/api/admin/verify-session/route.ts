import { cookies } from 'next/headers';
import { isAdminAuthenticated } from '@/lib/server/admin-session';

export async function GET(request: Request) {
  try {
    // Verify admin session
    const authenticated = isAdminAuthenticated(request);

    if (authenticated) {
      return Response.json({ authenticated: true });
    } else {
      return Response.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Session verification error:', error);
    return Response.json({ authenticated: false }, { status: 401 });
  }
}
