'use client';

import { FormEvent, useEffect, useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
};

type ApiError = {
  message?: string;
};

async function readResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T | ApiError;

  if (!response.ok) {
    const message = typeof data === 'object' && data !== null && 'message' in data
      ? data.message || 'Request failed'
      : 'Request failed';

    throw new Error(message);
  }

  return data as T;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage('');

      const response = await fetch('/api/users', {
        cache: 'no-store',
      });

      const data = await readResponse<User[]>(response);
      setUsers(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage('Please enter both name and email.');
      return;
    }

    try {
      setSubmitting(true);
      setMessage('');

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      await readResponse<User>(response);

      setName('');
      setEmail('');
      setMessage('User added successfully.');
      await fetchUsers();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to add user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-slate-900">Users</h1>
          <p className="mt-2 text-sm text-slate-600">
            This page uses App Router route handlers at /api/users to fetch and create MongoDB records.
          </p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p className="font-medium text-slate-900">Frontend fetch example</p>
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs text-slate-600">{`const response = await fetch('/api/users');
const users = await response.json();

await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email }),
});`}</pre>
          </div>

          {message && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {message}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
            <ul className="divide-y divide-slate-200">
              {loading ? (
                <li className="px-4 py-4 text-sm text-slate-500">Loading users...</li>
              ) : users.length === 0 ? (
                <li className="px-4 py-4 text-sm text-slate-500">No users found.</li>
              ) : (
                users.map((user) => (
                  <li key={user._id} className="px-4 py-4">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-600">{user.email}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900">Add User</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                placeholder="Enter email"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
            >
              {submitting ? 'Saving...' : 'Add User'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}