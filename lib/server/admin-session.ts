import { createHmac, timingSafeEqual } from 'crypto';

import { ADMIN_SESSION_COOKIE_NAME, ADMIN_SESSION_MAX_AGE_SECONDS } from '@/lib/constants';

const SESSION_SEPARATOR = '.';

type RequestWithCookies = Request & {
  cookies?: {
    get: (name: string) => { value: string } | undefined;
  };
};

function getAdminSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    `${process.env.ADMIN_USERNAME || 'admin'}:${process.env.ADMIN_PASSWORD || 'admin'}:internarea-admin-session`
  );
}

function sign(payload: string) {
  return createHmac('sha256', getAdminSessionSecret()).update(payload).digest('hex');
}

function encodePayload(payload: string) {
  return Buffer.from(payload, 'utf8').toString('base64url');
}

function decodePayload(payload: string) {
  return Buffer.from(payload, 'base64url').toString('utf8');
}

function parseCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) {
    return null;
  }

  const cookieEntry = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE_NAME}=`));

  return cookieEntry ? cookieEntry.slice(ADMIN_SESSION_COOKIE_NAME.length + 1) : null;
}

export function createAdminSessionToken(username: string) {
  const normalizedUsername = String(username || '').trim();
  const signature = sign(normalizedUsername);
  return `${normalizedUsername}${SESSION_SEPARATOR}${signature}`;
}

export function verifyAdminSessionToken(token: string | null | undefined) {
  if (!token || !token.includes(SESSION_SEPARATOR)) {
    return false;
  }

  const lastDot = token.lastIndexOf('.');
  const username = token.slice(0, lastDot).trim();
  const signature = token.slice(lastDot + 1).trim();

  if (!username || !signature) {
    return false;
  }

  try {
    const expectedSignature = sign(username);

    if (
      signature.length !== expectedSignature.length ||
      !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function getAdminSessionToken(request: Request) {
  const cookieStore = (request as RequestWithCookies).cookies;

  if (cookieStore?.get) {
    return cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? null;
  }

  return parseCookieHeader(request.headers.get('cookie'));
}

export function isAdminAuthenticated(request: Request) {
  return verifyAdminSessionToken(getAdminSessionToken(request));
}

export function createAdminSessionCookie(username: string) {
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    value: createAdminSessionToken(username),
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  };
}

export function clearAdminSessionCookie() {
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  };
}