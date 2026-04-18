'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	Briefcase,
	CalendarDays,
	CheckCircle2,
	Clock3,
	ExternalLink,
	Info,
	IndianRupee,
	MapPin,
	Sparkles,
	Upload,
	Users,
	X,
} from 'lucide-react';
import type { ListingDetail } from '../lib/sample-listings';
import { createApplication } from '@/lib/applications';
import { useAuth } from '@/context/AuthContext';
import { extractResumeInsights, generateCoverLetter } from '../lib/resume-cover-letter';

type ListingDetailsPageProps = {
	listing: ListingDetail;
	listingType: 'job' | 'internship';
};

type ApplicationFormData = {
	fullName: string;
	email: string;
	phoneNumber: string;
	coverLetter: string;
	resumeFile: File | null;
};

type ApplicationFormErrors = Partial<Record<keyof ApplicationFormData, string>>;

const initialFormData: ApplicationFormData = {
	fullName: '',
	email: '',
	phoneNumber: '',
	coverLetter: '',
	resumeFile: null,
};

export default function ListingDetailsPage({ listing, listingType }: ListingDetailsPageProps) {
	const router = useRouter();
	const { user } = useAuth();
	const [isApplyOpen, setIsApplyOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [generationError, setGenerationError] = useState('');
	const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
	const [errors, setErrors] = useState<ApplicationFormErrors>({});

	useEffect(() => {
		if (!user) {
			return;
		}

		setFormData((current) => ({
			...current,
			fullName: current.fullName || user.name,
			email: current.email || user.email,
		}));
	}, [user]);

	useEffect(() => {
		if (!isApplyOpen) {
			return;
		}

		const { overflow } = document.body.style;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = overflow;
		};
	}, [isApplyOpen]);

	const listingLower = listingType === 'job' ? 'job' : 'internship';
	const listingPluralHref = listingType === 'job' ? '/jobs' : '/internships';

	const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;

		setFormData((current) => ({
			...current,
			[name]: value,
		}));

		setErrors((current) => ({
			...current,
			[name]: undefined,
		}));
	};

	const handleResumeChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const resumeFile = event.target.files?.[0] ?? null;

		setFormData((current) => ({
			...current,
			resumeFile,
		}));

		setErrors((current) => ({
			...current,
			resumeFile: undefined,
		}));
		setGenerationError('');

		if (!resumeFile) {
			return;
		}

		try {
			setIsGeneratingCoverLetter(true);
			const insights = await extractResumeInsights(resumeFile);
			const generatedCoverLetter = generateCoverLetter({
				candidateName: formData.fullName || user?.name || '',
				listing,
				insights,
			});

			setFormData((current) => ({
				...current,
				resumeFile,
				coverLetter: generatedCoverLetter,
			}));
		} catch (error) {
			setGenerationError(error instanceof Error ? error.message : 'Failed to generate cover letter from resume.');
		} finally {
			setIsGeneratingCoverLetter(false);
		}
	};

	const validateForm = () => {
		const nextErrors: ApplicationFormErrors = {};

		if (!formData.fullName.trim()) {
			nextErrors.fullName = 'Full Name is required.';
		}

		if (!formData.email.trim()) {
			nextErrors.email = 'Email is required.';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			nextErrors.email = 'Enter a valid email address.';
		}

		if (!formData.phoneNumber.trim()) {
			nextErrors.phoneNumber = 'Phone Number is required.';
		} else if (!/^[0-9+()\-\s]{7,}$/.test(formData.phoneNumber)) {
			nextErrors.phoneNumber = 'Enter a valid phone number.';
		}

		if (!formData.resumeFile) {
			nextErrors.resumeFile = 'Resume Upload is required.';
		}

		if (!formData.coverLetter.trim()) {
			nextErrors.coverLetter = 'Cover Letter is required.';
		}

		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			setSubmitting(true);
			setSubmitError('');

			await createApplication({
				listingType,
				listingId: listing.id,
				company: listing.company,
				category: listing.title,
				applicantName: formData.fullName.trim(),
				applicantEmail: formData.email.trim(),
				phoneNumber: formData.phoneNumber.trim(),
				coverLetter: formData.coverLetter.trim(),
				resumeFileName: formData.resumeFile?.name ?? 'resume',
				appliedDate: new Date().toISOString().slice(0, 10),
			});

			setIsSubmitted(true);
			setErrors({});
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : 'Failed to submit application.');
		} finally {
			setSubmitting(false);
		}
	};

	const handleOpenApply = () => {
		setIsApplyOpen(true);
		setIsSubmitted(false);
		setSubmitError('');
		setGenerationError('');
	};

	const handleCloseApply = () => {
		setIsApplyOpen(false);
		setIsSubmitted(false);
		setSubmitting(false);
		setIsGeneratingCoverLetter(false);
		setSubmitError('');
		setGenerationError('');
		setErrors({});
		setFormData({
			...initialFormData,
			fullName: user?.name ?? '',
			email: user?.email ?? '',
		});
	};

	return (
		<main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl space-y-6">
				<div className="flex items-center justify-between gap-4">
					<Link
						href={listingPluralHref}
						className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
					>
						← Back to {listingType === 'job' ? 'Jobs' : 'Internships'}
					</Link>
				</div>

				<div className="rounded-xl bg-white p-6 shadow-md">
					<div className="space-y-6">
						<header className="space-y-4 border-b border-slate-200 pb-6">
							<span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
								Actively Hiring
							</span>

							<div>
								<h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{listing.title}</h1>
								<p className="mt-2 text-base text-gray-600">{listing.company}</p>
							</div>

							<div className="flex flex-wrap gap-6 text-sm text-gray-600">
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-sky-600" />
									<span>{listing.location}</span>
								</div>
								<div className="flex items-center gap-2">
									<IndianRupee className="h-4 w-4 text-emerald-600" />
									<span>{listing.compensation}</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock3 className="h-4 w-4 text-amber-600" />
									<span>{listing.duration}</span>
								</div>
								<div className="flex items-center gap-2">
									<CalendarDays className="h-4 w-4 text-violet-600" />
									<span>{listing.postedDate}</span>
								</div>
							</div>
						</header>

						<section className="space-y-6 divide-y divide-slate-200">
							<div className="space-y-3 pt-0">
								<div className="flex items-center gap-2 text-slate-900">
									<Briefcase className="h-5 w-5 text-blue-600" />
									<h2 className="text-xl font-semibold">About {listing.company}</h2>
								</div>
								<a
									href={listing.companyWebsite}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-800"
								>
									Visit company website <ExternalLink className="h-4 w-4" />
								</a>
								<p className="text-sm leading-7 text-slate-700">{listing.aboutCompany}</p>
							</div>

							<div className="space-y-3 pt-6">
								<div className="flex items-center gap-2 text-slate-900">
									<Sparkles className="h-5 w-5 text-blue-600" />
									<h2 className="text-xl font-semibold">About the {listingLower}</h2>
								</div>
								<p className="text-sm leading-7 text-slate-700">{listing.aboutRole}</p>
							</div>

							<div className="space-y-3 pt-6">
								<div className="flex items-center gap-2 text-slate-900">
									<Users className="h-5 w-5 text-blue-600" />
									<h2 className="text-xl font-semibold">Who can apply</h2>
								</div>
								<p className="text-sm leading-7 text-slate-700">{listing.whoCanApply}</p>
							</div>

							<div className="space-y-3 pt-6">
								<div className="flex items-center gap-2 text-slate-900">
									<CheckCircle2 className="h-5 w-5 text-blue-600" />
									<h2 className="text-xl font-semibold">Perks</h2>
								</div>
								<ul className="space-y-2 text-sm text-slate-700">
									{listing.perks.map((perk) => (
										<li key={perk} className="flex items-center gap-2">
											<CheckCircle2 className="h-4 w-4 text-emerald-500" />
											<span>{perk}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="space-y-3 pt-6">
								<div className="flex items-center gap-2 text-slate-900">
									<Info className="h-5 w-5 text-blue-600" />
									<h2 className="text-xl font-semibold">Additional Information</h2>
								</div>
								<p className="text-sm leading-7 text-slate-700">{listing.additionalInformation}</p>
							</div>

							<div className="space-y-3 pt-6">
								<div className="flex items-center gap-2 text-slate-900">
									<Users className="h-5 w-5 text-blue-600" />
									<h2 className="text-xl font-semibold">Number of Openings</h2>
								</div>
								<p className="text-lg font-semibold text-slate-900">{listing.openings}</p>
							</div>
						</section>

						<div className="flex justify-center border-t border-slate-200 pt-6">
							<button
								type="button"
								onClick={handleOpenApply}
								className="rounded-lg bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
							>
								Apply Now
							</button>
						</div>
					</div>
				</div>
			</div>

			{isApplyOpen && (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={handleCloseApply} />
					<div className="flex min-h-full items-start justify-center p-4 sm:items-center">

						<div className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
							<div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
							<div>
								<p className="text-sm font-medium text-blue-600">Application Form</p>
								<h2 className="text-2xl font-bold text-slate-900">Apply for {listing.title}</h2>
							</div>
							<button
								onClick={handleCloseApply}
								className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
								aria-label="Close application form"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{isSubmitted ? (
							<div className="overflow-y-auto px-6 py-8 text-center">
								<div className="space-y-6">
								<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
									<CheckCircle2 className="h-7 w-7" />
								</div>
								<div>
									<h3 className="text-2xl font-bold text-slate-900">Application submitted successfully!</h3>
									<p className="mt-2 text-sm text-slate-600">
										Your application for {listing.title} at {listing.company} has been recorded.
									</p>
								</div>
								<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
									<button
										onClick={() => router.push('/my-applications')}
										className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
									>
										Go to My Applications
									</button>
									<button
										onClick={handleCloseApply}
										className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
									>
										Close
									</button>
								</div>
								</div>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto px-6 py-6">
								{submitError && (
									<div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
										{submitError}
									</div>
								)}

								{generationError && (
									<div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
										{generationError}
									</div>
								)}

								<div className="grid gap-5 md:grid-cols-2">
									<div>
										<label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
											Full Name
										</label>
										<input
											id="fullName"
											name="fullName"
											type="text"
											value={formData.fullName}
											onChange={handleFieldChange}
											className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
											placeholder="Enter your full name"
										/>
										{errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
									</div>

									<div>
										<label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
											Email
										</label>
										<input
											id="email"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleFieldChange}
											className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
											placeholder="Enter your email"
										/>
										{errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
									</div>
								</div>

								<div>
									<label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-slate-700">
										Phone Number
									</label>
									<input
										id="phoneNumber"
										name="phoneNumber"
										type="tel"
										value={formData.phoneNumber}
										onChange={handleFieldChange}
										className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
										placeholder="Enter your phone number"
									/>
									{errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
								</div>

								<div>
									<label htmlFor="resumeFile" className="mb-2 block text-sm font-medium text-slate-700">
										Resume Upload
									</label>
									<label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 transition hover:border-blue-400 hover:bg-blue-50">
										<div className="flex items-center gap-3 text-sm text-slate-600">
											<Upload className="h-5 w-5 text-blue-600" />
											<span>{formData.resumeFile ? formData.resumeFile.name : 'Choose resume file'}</span>
										</div>
										<span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
											Browse
										</span>
										<input
											id="resumeFile"
											name="resumeFile"
											type="file"
											className="hidden"
											accept=".pdf,.docx,.txt,.md"
											onChange={handleResumeChange}
										/>
									</label>
									<p className="mt-2 text-xs text-slate-500">
										Upload your resume and we will generate a personalized cover letter from your skills, education, and projects.
									</p>
									{errors.resumeFile && <p className="mt-2 text-sm text-red-600">{errors.resumeFile}</p>}
								</div>

								<div>
									<label htmlFor="coverLetter" className="mb-2 block text-sm font-medium text-slate-700">
										Cover Letter
									</label>
									<textarea
										id="coverLetter"
										name="coverLetter"
										rows={7}
										value={formData.coverLetter}
										onChange={handleFieldChange}
										className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
										placeholder="Your personalized cover letter will appear here after resume analysis"
									/>
									{isGeneratingCoverLetter && <p className="mt-2 text-sm text-blue-600">Generating cover letter from resume...</p>}
									{errors.coverLetter && <p className="mt-2 text-sm text-red-600">{errors.coverLetter}</p>}
								</div>

								<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
									<div className="flex items-center gap-2 font-medium text-slate-800">
										<Briefcase className="h-4 w-4" /> Application summary
									</div>
									<p className="mt-2">{listing.title} at {listing.company}</p>
								</div>

								<div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
									<button
										type="button"
										onClick={handleCloseApply}
										className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
									>
										Cancel
									</button>
									<button
										type="submit"
										disabled={submitting || isGeneratingCoverLetter}
										className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
									>
										{submitting ? 'Submitting...' : 'Submit'}
									</button>
								</div>
							</form>
						)}
					</div>
					</div>
				</div>
			)}
		</main>
	);
}