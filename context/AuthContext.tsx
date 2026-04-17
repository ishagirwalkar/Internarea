'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type AuthUser = {
	name: string;
	email: string;
	image?: string;
};

type AuthContextValue = {
	user: AuthUser | null;
	isLoading: boolean;
	signIn: (nextUser: AuthUser) => Promise<void>;
	signOut: () => void;
};

const STORAGE_KEY = 'internarea-auth-user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
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
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
	};

	const signOut = () => {
		setUser(null);
		window.localStorage.removeItem(STORAGE_KEY);
	};

	const value = useMemo(
		() => ({ user, isLoading, signIn, signOut }),
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
