import { env } from './env';

export type AdminMe = { id: string; email: string; name: string; role: string };

async function backendFetch<T>(
  path: string,
  options: { method?: string; body?: unknown; accessToken?: string } = {}
): Promise<T> {
  const res = await fetch(`${env.BACKEND_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'content-type': 'application/json',
      ...(options.accessToken ? { authorization: `Bearer ${options.accessToken}` } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store'
  });

  const json = (await res.json()) as any;
  if (!res.ok || !json?.ok) {
    const message = json?.error?.message ?? 'Request failed';
    throw new Error(message);
  }
  return json.data as T;
}

export const adminApi = {
  login: (body: { email: string; password: string }) =>
    backendFetch<{ admin: AdminMe; tokens: { accessToken: string; refreshToken: string } }>('/v1/admin/auth/login', {
      method: 'POST',
      body
    }),

  refresh: (body: { refreshToken: string }) =>
    backendFetch<{ tokens: { accessToken: string; refreshToken: string } }>('/v1/admin/auth/refresh', {
      method: 'POST',
      body
    }),

  logout: (body: { refreshToken: string }) =>
    backendFetch<{ revoked: boolean }>('/v1/admin/auth/logout', {
      method: 'POST',
      body
    }),

  me: (accessToken: string) => backendFetch<AdminMe>('/v1/admin/auth/me', { accessToken })
};

