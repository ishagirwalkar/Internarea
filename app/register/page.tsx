'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useAuth } from '@/context/AuthContext';

type FormValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

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

function validateForm(values: FormValues): FormErrors {
	const errors: FormErrors = {};

	if (!values.name.trim()) {
		errors.name = 'Full name is required.';
	}

	if (!values.email.trim()) {
		errors.email = 'Email address is required.';
	}

	if (!values.password) {
		errors.password = 'Password is required.';
	}

	if (!values.confirmPassword) {
		errors.confirmPassword = 'Please confirm your password.';
	}

	if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
		errors.confirmPassword = 'Passwords do not match.';
	}

	return errors;
}

export default function RegisterPage() {
	const router = useRouter();
	const { isFirebaseEnabled, signInWithGoogle, signUpWithEmail } = useAuth();
	const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
	const [errors, setErrors] = useState<FormErrors>({});
	const [formError, setFormError] = useState('');
	const [activeAction, setActiveAction] = useState<'google' | 'register' | null>(null);

	const isSubmitting = activeAction !== null;
	const cardHint = useMemo(
		() => 'Create one profile to apply faster, track applications, and unlock fresh roles every day.',
		[],
	);

	const handleChange = (field: keyof FormValues, value: string) => {
		setValues((current) => ({ ...current, [field]: value }));
		setErrors((current) => ({ ...current, [field]: undefined }));
		setFormError('');
	};

	const handleGoogleSignIn = async () => {
		setFormError('');
		setActiveAction('google');

		try {
			await signInWithGoogle();
			router.push('/dashboard');
		} catch (error) {
			setFormError(error instanceof Error ? error.message : 'Google sign-in failed. Please try again.');
		} finally {
			setActiveAction(null);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validationErrors = validateForm(values);

		setErrors(validationErrors);
		setFormError('');

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		setActiveAction('register');

		try {
			await signUpWithEmail(values.name.trim(), values.email.trim(), values.password);
			router.push('/dashboard');
		} catch (error) {
			setFormError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
		} finally {
			setActiveAction(null);
		}
	};

	return (
		<main className="min-h-screen bg-[linear-gradient(180deg,#f7f9fc_0%,#edf3fb_100%)] px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
				<section className="hidden rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.24),_transparent_42%),linear-gradient(135deg,#0f172a_0%,#1e3a8a_55%,#1d4ed8_100%)] p-10 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] lg:block">
					<p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">InternArea</p>
					<h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight">Build your candidate profile before the right role finds someone else.</h1>
					<p className="mt-5 max-w-lg text-base leading-7 text-blue-50/90">{cardHint}</p>
					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						<div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
							<p className="text-2xl font-semibold">10k+</p>
							<p className="mt-1 text-sm text-blue-50/80">Open roles</p>
						</div>
						<div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
							<p className="text-2xl font-semibold">4 min</p>
							<p className="mt-1 text-sm text-blue-50/80">Average apply time</p>
						</div>
						<div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
							<p className="text-2xl font-semibold">300k+</p>
							<p className="mt-1 text-sm text-blue-50/80">Employers reached</p>
						</div>
					</div>
				</section>

				<section className="mx-auto w-full max-w-xl rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
					<div>
						<h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create your account</h1>
						<p className="mt-2 text-sm text-slate-600">Join and explore internships and jobs</p>
					</div>

					<div className="mt-8 space-y-6">
						<button
							type="button"
							onClick={() => void handleGoogleSignIn()}
							disabled={isSubmitting || !isFirebaseEnabled}
							className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
						>
							{activeAction === 'google' ? <Spinner /> : <GoogleIcon />}
							<span>Continue with Google</span>
						</button>

						{!isFirebaseEnabled ? (
							<p className="text-sm text-slate-500">
								Google sign-in will be available after NEXT_PUBLIC_FIREBASE_* variables are added. Email registration works locally for now.
							</p>
						) : null}

						<div className="flex items-center gap-4">
							<div className="h-px flex-1 bg-slate-200" />
							<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Or</span>
							<div className="h-px flex-1 bg-slate-200" />
						</div>

						<form onSubmit={handleSubmit} className="space-y-5" noValidate>
							<div className="space-y-2">
								<label htmlFor="name" className="text-sm font-medium text-slate-700">
									Full Name
								</label>
								<input
									id="name"
									type="text"
									value={values.name}
									onChange={(event) => handleChange('name', event.target.value)}
									placeholder="Enter your full name"
									className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
								/>
								{errors.name ? <p className="text-sm text-rose-600">{errors.name}</p> : null}
							</div>

							<div className="space-y-2">
								<label htmlFor="email" className="text-sm font-medium text-slate-700">
									Email Address
								</label>
								<input
									id="email"
									type="email"
									value={values.email}
									onChange={(event) => handleChange('email', event.target.value)}
									placeholder="Enter your email"
									className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
								/>
								{errors.email ? <p className="text-sm text-rose-600">{errors.email}</p> : null}
							</div>

							<div className="space-y-2">
								<label htmlFor="password" className="text-sm font-medium text-slate-700">
									Password
								</label>
								<input
									id="password"
									type="password"
									value={values.password}
									onChange={(event) => handleChange('password', event.target.value)}
									placeholder="Create a password"
									className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
								/>
								{errors.password ? <p className="text-sm text-rose-600">{errors.password}</p> : null}
							</div>

							<div className="space-y-2">
								<label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
									Confirm Password
								</label>
								<input
									id="confirmPassword"
									type="password"
									value={values.confirmPassword}
									onChange={(event) => handleChange('confirmPassword', event.target.value)}
									placeholder="Confirm your password"
									className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
								/>
								{errors.confirmPassword ? <p className="text-sm text-rose-600">{errors.confirmPassword}</p> : null}
							</div>

							{formError ? (
								<div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
									{formError}
								</div>
							) : null}

							<button
								type="submit"
								disabled={isSubmitting}
								className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
							>
								{activeAction === 'register' ? <Spinner /> : null}
								<span>Register</span>
							</button>
						</form>
					</div>

					<p className="mt-8 text-center text-sm text-slate-600">
						Already registered?{' '}
						<Link href="/login" className="font-semibold text-blue-600 transition hover:text-blue-700">
							Login
						</Link>
					</p>
				</section>
			</div>
		</main>
	);
}