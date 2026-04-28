export interface InternshipData {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  duration: string;
  stipend: string;
  tags: string[];
  postedDaysAgo: string;
  activelyHiring: boolean;
  aboutCompany: string;
  aboutInternship: string;
  skillsRequired: string[];
  whoCanApply: string[];
  perks: string[];
  additionalInfo: string;
  openings: number;
}

import { apiFetch } from './api';

export type CreateInternshipInput = {
  title: string;
  location: string;
  companyName: string;
  category: string;
  aboutCompany: string;
  aboutInternship: string;
  whoCanApply: string;
  perks: string;
  numberOfOpenings: string;
  stipend: string;
  startDate: string;
  additionalInfo: string;
};

type BackendInternship = {
  _id: string;
  title: string;
  location: string;
  companyName: string;
  category: string;
  aboutCompany: string;
  aboutInternship: string;
  whoCanApply: string[];
  perks: string[];
  numberOfOpenings: number;
  stipend: string;
  startDate: string;
  additionalInfo: string;
  workMode?: string;
  duration?: string;
  createdAt?: string;
};

function createList(values: string[] | string | undefined, fallback: string) {
  if (Array.isArray(values) && values.length > 0) {
    return values;
  }

  if (typeof values === 'string' && values.trim()) {
    return values
      .split(/\r?\n|,/)
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return [fallback];
}

function formatPostedLabel(createdAt?: string) {
  if (!createdAt) {
    return 'recently';
  }

  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) {
    return 'recently';
  }

  const hours = Math.max(1, Math.floor((Date.now() - createdTime) / (1000 * 60 * 60)));

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const days = Math.max(1, Math.floor(hours / 24));
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function mapInternship(raw: BackendInternship): InternshipData {
  return {
    id: raw._id,
    title: raw.title,
    company: raw.companyName,
    location: raw.location,
    startDate: raw.startDate,
    duration: raw.duration ?? '3 months',
    stipend: raw.stipend,
    tags: [raw.category, raw.workMode ?? 'Remote'],
    postedDaysAgo: formatPostedLabel(raw.createdAt),
    activelyHiring: true,
    aboutCompany: raw.aboutCompany,
    aboutInternship: raw.aboutInternship,
    skillsRequired: createList(raw.category, `${raw.category} exposure`),
    whoCanApply: createList(raw.whoCanApply, 'Students matching the listed requirements'),
    perks: createList(raw.perks, 'Certificate of completion'),
    additionalInfo: raw.additionalInfo,
    openings: raw.numberOfOpenings,
  };
}

export async function getInternships() {
  const internships = await apiFetch<BackendInternship[]>('/api/internship');
  return internships.map(mapInternship);
}

export async function getInternshipById(id: string) {
  try {
    const internship = await apiFetch<BackendInternship>(`/api/internship/${id}`);
    return mapInternship(internship);
  } catch {
    return null;
  }
}

export async function createInternship(payload: CreateInternshipInput) {
  const createdInternship = await apiFetch<BackendInternship>('/api/internship', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return mapInternship(createdInternship);
}
