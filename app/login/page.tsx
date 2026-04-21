'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

function GoogleIcon() {
	return (
		<svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
			<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
			<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
			<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
		</svg>
	);
}

function Spinner() {
	return <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />;
}

export default function LoginPage() {
	const router = useRouter();
	const { isFirebaseEnabled, signInWithEmail, signInWithGoogle } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [activeAction, setActiveAction] = useState<'email' | 'google' | null>(null);

	const isSubmitting = activeAction !== null;

	const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError('');

		if (!email.trim() || !password) {
			setError('Email and password are required.');
			return;
		}

		setActiveAction('email');

		try {
			await signInWithEmail(email.trim(), password);
			router.push('/dashboard');
		} catch (authError) {
			setError(authError instanceof Error ? authError.message : 'Login failed. Please try again.');
		} finally {
			setActiveAction(null);
		}
	};

	const handleGoogleLogin = async () => {
		setError('');
		setActiveAction('google');

		try {
			await signInWithGoogle();
			router.push('/dashboard');
		} catch (authError) {
			setError(authError instanceof Error ? authError.message : 'Google sign-in failed. Please try again.');
		} finally {
			setActiveAction(null);
		}
	};

	return (
		<main className="min-h-screen bg-[linear-gradient(180deg,#f7f9fc_0%,#edf3fb_100%)] px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
					<p className="mt-2 text-sm text-slate-600">Login to continue tracking applications and opportunities.</p>
				</div>

				<div className="mt-8 space-y-6">
					<button
						type="button"
						onClick={() => void handleGoogleLogin()}
						disabled={isSubmitting || !isFirebaseEnabled}
						className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
					>
						{activeAction === 'google' ? <Spinner /> : <GoogleIcon />}
						<span>Continue with Google</span>
					</button>

					{!isFirebaseEnabled ? (
						<p className="text-sm text-slate-500">
							Google sign-in requires NEXT_PUBLIC_FIREBASE_* variables. Email login can use the local account created from the register page.
						</p>
					) : null}

					<div className="flex items-center gap-4">
						<div className="h-px flex-1 bg-slate-200" />
						<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Or</span>
						<div className="h-px flex-1 bg-slate-200" />
					</div>

					<form onSubmit={handleEmailLogin} className="space-y-5" noValidate>
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium text-slate-700">
								Email Address
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
								placeholder="Enter your email"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium text-slate-700">
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
								placeholder="Enter your password"
							/>
						</div>

						{error ? (
							<div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
								{error}
							</div>
						) : null}

						<button
							type="submit"
							disabled={isSubmitting}
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
						>
							{activeAction === 'email' ? <Spinner /> : null}
							<span>Login</span>
						</button>
					</form>
				</div>

				<p className="mt-8 text-center text-sm text-slate-600">
					New to InternArea?{' '}
					<Link href="/register" className="font-semibold text-blue-600 transition hover:text-blue-700">
						Create an account
					</Link>
				</p>
			</div>
		</main>
	);
}