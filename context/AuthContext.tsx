'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut as firebaseSignOut,
	updateProfile,
	type Auth,
	type User,
} from 'firebase/auth';

import { auth, isFirebaseConfigured } from '@/lib/firebase';

type AuthUser = {
	uid?: string;
	name: string;
	firstName?: string;
	lastName?: string;
	email: string;
	mobileNumber?: string;
	image?: string;
};

type AuthContextValue = {
	user: AuthUser | null;
	isLoading: boolean;
	isFirebaseEnabled: boolean;
	signIn: (nextUser: AuthUser) => Promise<void>;
	signInWithEmail: (email: string, password: string) => Promise<AuthUser>;
	signInWithGoogle: () => Promise<AuthUser>;
	signUpWithEmail: (firstName: string, lastName: string, email: string, password: string, mobileNumber: string) => Promise<AuthUser>;
	signOut: () => Promise<void>;
};

const STORAGE_KEY = 'internarea-auth-user';
const CREDENTIALS_STORAGE_KEY = 'internarea-auth-credentials';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

function toAuthUser(firebaseUser: User): AuthUser {
	return {
		uid: firebaseUser.uid,
		name: firebaseUser.displayName?.trim() || firebaseUser.email?.split('@')[0] || 'InternArea User',
		email: firebaseUser.email || '',
		image: firebaseUser.photoURL || undefined,
	};
}

function setStoredUser(nextUser: AuthUser | null) {
	if (nextUser) {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
		return;
	}

	window.localStorage.removeItem(STORAGE_KEY);
}

type StoredCredential = {
	name: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: string;
	image?: string;
};

function getStoredCredentials(): StoredCredential[] {
	try {
		const storedValue = window.localStorage.getItem(CREDENTIALS_STORAGE_KEY);
		if (!storedValue) {
			return [];
		}

		const parsedValue = JSON.parse(storedValue);
		return Array.isArray(parsedValue) ? (parsedValue as StoredCredential[]) : [];
	} catch {
		window.localStorage.removeItem(CREDENTIALS_STORAGE_KEY);
		return [];
	}
}

function setStoredCredentials(credentials: StoredCredential[]) {
	window.localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(credentials));
}

function upsertStoredCredential(nextCredential: StoredCredential) {
	const normalizedEmail = nextCredential.email.trim().toLowerCase();
	const currentCredentials = getStoredCredentials().filter(
		(credential) => credential.email.trim().toLowerCase() !== normalizedEmail,
	);

	setStoredCredentials([...currentCredentials, { ...nextCredential, email: normalizedEmail }]);
}

function requireAuthInstance(): Auth {
	if (!isFirebaseConfigured || !auth) {
		throw new Error('Firebase authentication is not configured. Add NEXT_PUBLIC_FIREBASE_* variables to continue.');
	}

	return auth;
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isFirebaseConfigured && auth) {
			const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
				const resolvedUser = nextUser ? toAuthUser(nextUser) : null;
				setUser(resolvedUser);
				setStoredUser(resolvedUser);
				setIsLoading(false);
			});

			return unsubscribe;
		}

		try {
			const storedUser = window.localStorage.getItem(STORAGE_KEY);
			if (storedUser) {
				setUser(JSON.parse(storedUser) as AuthUser);
			}
		} catch {
			window.localStorage.removeItem(STORAGE_KEY);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const signIn = async (nextUser: AuthUser) => {
		setUser(nextUser);
		setStoredUser(nextUser);
	};

	const signInWithGoogle = async () => {
		if (!isFirebaseConfigured) {
			throw new Error('Google authentication is unavailable until NEXT_PUBLIC_FIREBASE_* variables are configured.');
		}

		const authInstance = requireAuthInstance();
		const credential = await signInWithPopup(authInstance, googleProvider);
		const nextUser = toAuthUser(credential.user);
		setUser(nextUser);
		setStoredUser(nextUser);
		return nextUser;
	};

	const signInWithEmail = async (email: string, password: string) => {
		if (!isFirebaseConfigured || !auth) {
			const normalizedEmail = email.trim().toLowerCase();
			const matchedCredential = getStoredCredentials().find(
				(credential) => credential.email.trim().toLowerCase() === normalizedEmail && credential.password === password,
			);

			if (!matchedCredential) {
				throw new Error('No matching local account found. Register first or add Firebase env variables for hosted authentication.');
			}

			const nextUser = {
				name: matchedCredential.name,
				email: matchedCredential.email,
				image: matchedCredential.image,
			};
			setUser(nextUser);
			setStoredUser(nextUser);
			return nextUser;
		}

		const authInstance = requireAuthInstance();
		const credential = await signInWithEmailAndPassword(authInstance, email, password);
		const nextUser = toAuthUser(credential.user);
		setUser(nextUser);
		setStoredUser(nextUser);
		return nextUser;
	};

	const signUpWithEmail = async (firstName: string, lastName: string, email: string, password: string, mobileNumber: string) => {
		if (!isFirebaseConfigured || !auth) {
			const normalizedEmail = email.trim().toLowerCase();
			const duplicateCredential = getStoredCredentials().find(
				(credential) => credential.email.trim().toLowerCase() === normalizedEmail,
			);

			if (duplicateCredential) {
				throw new Error('An account with this email already exists. Login instead or configure Firebase for hosted authentication.');
			}

			const fullName = `${firstName.trim()} ${lastName.trim()}`;
			const nextUser = {
				name: fullName,
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				email: normalizedEmail,
				mobileNumber: mobileNumber.trim(),
			};
			upsertStoredCredential({
				name: fullName,
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				email: normalizedEmail,
				password,
				mobileNumber: mobileNumber.trim(),
			});
			setUser(nextUser);
			setStoredUser(nextUser);
			return nextUser;
		}

		const authInstance = requireAuthInstance();
		const credential = await createUserWithEmailAndPassword(authInstance, email, password);
		const fullName = `${firstName.trim()} ${lastName.trim()}`;
		await updateProfile(credential.user, { displayName: fullName });
		const nextUser = {
			uid: credential.user.uid,
			name: fullName,
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			email: credential.user.email || email,
			mobileNumber: mobileNumber.trim(),
			image: credential.user.photoURL || undefined,
		};
		setUser(nextUser);
		setStoredUser(nextUser);
		return nextUser;
	};

	const signOut = async () => {
		try {
			if (isFirebaseConfigured && auth) {
				await firebaseSignOut(auth);
			}
		} finally {
			setUser(null);
			setStoredUser(null);
		}
	};

	const value = useMemo(
		() => ({ user, isLoading, isFirebaseEnabled: isFirebaseConfigured, signIn, signInWithEmail, signInWithGoogle, signUpWithEmail, signOut }),
		[isLoading, user],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
