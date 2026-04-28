'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut as firebaseSignOut,
	type User,
	updateProfile,
} from 'firebase/auth';

import { auth, isFirebaseConfigured } from '@/lib/firebase';

type AuthUser = {
	uid: string;
	name: string;
	email: string;
	image?: string;
};

type AuthContextValue = {
	user: AuthUser | null;
	isLoading: boolean;
	signInWithEmail: (email: string, password: string) => Promise<AuthUser>;
	signInWithGoogle: () => Promise<AuthUser>;
	signOut: () => Promise<void>;
	signUpWithEmail: (name: string, email: string, password: string) => Promise<AuthUser>;
};

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

function ensureFirebaseConfigured() {
	if (!isFirebaseConfigured || !auth) {
		throw new Error('Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* variables to your app environment.');
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isFirebaseConfigured || !auth) {
			setIsLoading(false);
			return;
		}

		const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
			setUser(nextUser ? toAuthUser(nextUser) : null);
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	const signUpWithEmail = async (name: string, email: string, password: string) => {
		ensureFirebaseConfigured();
		const credential = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(credential.user, { displayName: name.trim() });
		const nextUser = toAuthUser({ ...credential.user, displayName: name.trim() } as User);
		setUser(nextUser);
		return nextUser;
	};

	const signInWithEmail = async (email: string, password: string) => {
		ensureFirebaseConfigured();
		const credential = await signInWithEmailAndPassword(auth, email, password);
		const nextUser = toAuthUser(credential.user);
		setUser(nextUser);
		return nextUser;
	};

	const signInWithGoogle = async () => {
		ensureFirebaseConfigured();
		try {
			const credential = await signInWithPopup(auth, googleProvider);
			const nextUser = toAuthUser(credential.user);
			setUser(nextUser);
			return nextUser;
		} catch (error: unknown) {
			// Provide more detailed error messages
			if (error instanceof Error) {
				const errorCode = (error as { code?: string }).code;
				
				if (errorCode === 'auth/popup-closed-by-user') {
					throw new Error('Sign-in was cancelled. Please try again.');
				}
				if (errorCode === 'auth/popup-blocked') {
					throw new Error('Popup was blocked by your browser. Please allow popups for this site.');
				}
				if (errorCode === 'auth/cancelled-popup-request') {
					throw new Error('Multiple popup requests detected. Please try again.');
				}
				if (errorCode === 'auth/operation-not-allowed') {
					throw new Error('Google sign-in is not enabled. Please contact the administrator.');
				}
				if (errorCode === 'auth/unauthorized-domain') {
					throw new Error('This domain is not authorized for OAuth operations.');
				}
				if (errorCode === 'auth/network-request-failed') {
					throw new Error('Network error. Please check your internet connection and try again.');
				}
				throw error;
			}
			throw new Error('Google sign-in failed. Please try again.');
		}
	};

	const signOut = () => {
		setUser(null);
		return firebaseSignOut(auth);
	};

	const value = useMemo(
		() => ({ user, isLoading, signInWithEmail, signInWithGoogle, signOut, signUpWithEmail }),
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
