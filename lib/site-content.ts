import type { ComponentType, SVGProps } from 'react';

import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/lib/social-icons';

export type SiteContentSection = {
	title: string;
	body: string;
};

export type SitePageContent = {
	slug: string;
	title: string;
	eyebrow: string;
	description: string;
	highlights: string[];
	sections: SiteContentSection[];
	ctaLabel: string;
	ctaHref: string;
};

export type FooterLink = {
	label: string;
	href: string;
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export type FooterSection = {
	title: string;
	titleHref?: string;
	links: FooterLink[];
};

export const sitePages: Record<string, SitePageContent> = {
	about: {
		slug: 'about',
		title: 'About',
		eyebrow: 'Company',
		description: 'InternArea helps students and early-career professionals discover internships and jobs with a faster, cleaner hiring experience.',
		highlights: ['Trusted by growing teams', 'Focused on early-career talent', 'Built for faster discovery'],
		sections: [
			{
				title: 'What we do',
				body: 'We bring internships and jobs into one focused platform so candidates can search, compare, and apply without wading through noise.',
			},
			{
				title: 'How we work',
				body: 'Our product favors clarity, strong filters, direct applications, and transparent listings that help candidates make better decisions quickly.',
			},
		],
		ctaLabel: 'Explore opportunities',
		ctaHref: '/internships',
	},
	careers: {
		slug: 'careers',
		title: 'Careers',
		eyebrow: 'Company',
		description: 'Join a team building a more focused experience for talent discovery, applications, and hiring operations.',
		highlights: ['Remote-friendly workflows', 'Product-driven culture', 'Meaningful ownership'],
		sections: [
			{
				title: 'Why join us',
				body: 'We are building practical tools that remove friction from the start of a candidate journey, and every role contributes directly to that mission.',
			},
			{
				title: 'Who we look for',
				body: 'We value people who write clearly, ship carefully, and care about product quality more than process theater.',
			},
		],
		ctaLabel: 'See internships',
		ctaHref: '/jobs',
	},
	contact: {
		slug: 'contact',
		title: 'Contact',
		eyebrow: 'Company',
		description: 'Reach the InternArea team for hiring support, platform questions, or partnership inquiries.',
		highlights: ['Support for candidates', 'Help for hiring teams', 'Partnership conversations'],
		sections: [
			{
				title: 'Candidate support',
				body: 'If you need help with applications, profile setup, or account access, the support flow is designed to get you moving again quickly.',
			},
			{
				title: 'Business inquiries',
				body: 'Teams interested in listings, employer branding, or workflow improvements can contact us for platform support and onboarding details.',
			},
		],
		ctaLabel: 'Visit help center',
		ctaHref: '/help-center',
	},
	resources: {
		slug: 'resources',
		title: 'Resources',
		eyebrow: 'Resources',
		description: 'Explore practical guidance, platform updates, and support content designed for candidates and hiring teams.',
		highlights: ['Career guidance', 'Platform support', 'Policy transparency'],
		sections: [
			{
				title: 'For candidates',
				body: 'Use our resource library to strengthen applications, understand job expectations, and move through the hiring process with fewer surprises.',
			},
			{
				title: 'For employers',
				body: 'Resources also cover how teams can create clearer listings, improve candidate quality, and streamline early-stage hiring.',
			},
		],
		ctaLabel: 'Read the blog',
		ctaHref: '/blog',
	},
	blog: {
		slug: 'blog',
		title: 'Blog',
		eyebrow: 'Resources',
		description: 'Read insights on internships, jobs, hiring practices, and candidate preparation from the InternArea team.',
		highlights: ['Hiring trends', 'Career advice', 'Platform updates'],
		sections: [
			{
				title: 'What you will find',
				body: 'The blog focuses on practical posts that help candidates improve applications and help teams attract better early-career talent.',
			},
			{
				title: 'Publishing approach',
				body: 'We prefer clear, useful writing over generic content. Every article is meant to help a candidate or employer take a concrete next step.',
			},
		],
		ctaLabel: 'Get support',
		ctaHref: '/help-center',
	},
	'help-center': {
		slug: 'help-center',
		title: 'Help Center',
		eyebrow: 'Resources',
		description: 'Find answers for account access, applications, listings, and platform behavior in one support destination.',
		highlights: ['Account help', 'Application questions', 'Employer support'],
		sections: [
			{
				title: 'Common issues',
				body: 'The help center covers login issues, application status questions, profile setup, and employer workflow basics.',
			},
			{
				title: 'How to get unstuck',
				body: 'When something blocks progress, start with the help center for the quickest path to the most common fixes and process explanations.',
			},
		],
		ctaLabel: 'Contact us',
		ctaHref: '/contact',
	},
	'privacy-policy': {
		slug: 'privacy-policy',
		title: 'Privacy Policy',
		eyebrow: 'Resources',
		description: 'Understand what information InternArea uses, why it is collected, and how that data supports the platform experience.',
		highlights: ['Clear data handling', 'Practical transparency', 'Candidate trust'],
		sections: [
			{
				title: 'Data we use',
				body: 'We use account and application details to support access, candidate workflows, and listing interactions across the platform.',
			},
			{
				title: 'How it is applied',
				body: 'Information is used to improve search, applications, and platform operations while keeping the experience understandable and predictable.',
			},
		],
		ctaLabel: 'Read resources',
		ctaHref: '/resources',
	},
};

export const footerSections: FooterSection[] = [
	{
		title: 'Company',
		links: [
			{ label: 'About', href: '/about' },
			{ label: 'Careers', href: '/careers' },
			{ label: 'Contact', href: '/contact' },
		],
	},
	{
		title: 'Resources',
		titleHref: '/resources',
		links: [
			{ label: 'Blog', href: '/blog' },
			{ label: 'Help Center', href: '/help-center' },
			{ label: 'Privacy Policy', href: '/privacy-policy' },
		],
	},
	{
		title: 'Social Links',
		links: [
			{ label: 'LinkedIn', href: 'https://www.linkedin.com', icon: LinkedInIcon },
			{ label: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
			{ label: 'GitHub', href: 'https://github.com', icon: GitHubIcon },
		],
	},
];