export * from '../internarea_ui/lib/api';const DEFAULT_API_URL = '';

type ErrorResponse = {
  message?: string;
};

export function getApiBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configuredUrl) {
    return DEFAULT_API_URL;
  }

  return configuredUrl.replace(/\/+$/, '');
}

function shouldUseSameOrigin(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (typeof window === 'undefined' || !normalizedPath.startsWith('/api')) {
    return false;
  }

  return true;
}

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!getApiBaseUrl() || shouldUseSameOrigin(normalizedPath)) {
    return normalizedPath;
  }

  return `${getApiBaseUrl()}${normalizedPath}`;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...init,
    cache: init.cache ?? 'no-store',
    credentials: init.credentials ?? 'include',
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers ?? {}),
    },
  });

  const contentType = response.headers.get('content-type') ?? '';
  const data = contentType.includes('application/json')
    ? ((await response.json()) as unknown)
    : ((await response.text()) as unknown);

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as ErrorResponse).message ?? 'Request failed')
        : typeof data === 'string' && data
          ? data
          : 'Request failed';

    throw new Error(message);
  }

  return data as T;
}