import { apiFetch } from './api';

export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  duration: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  type: 'Full-time' | 'Part-time' | 'Internship';
  posted: string;
  activelyHiring: boolean;
  remote: boolean;
  aboutCompany: string;
  companyWebsite: string;
  description: string;
  aboutRole: string;
  skillsRequired: string[];
  whoCanApply: string[];
  perks: string[];
  additionalInfo: string;
  openings: number;
}

export type CreateJobInput = {
  title: string;
  location: string;
  companyName: string;
  category: string;
  aboutCompany: string;
  aboutJob: string;
  whoCanApply: string;
  perks: string;
  numberOfOpenings: string;
  stipend: string;
  startDate: string;
  additionalInfo: string;
};

type BackendJob = {
  _id: string;
  title: string;
  location: string;
  companyName: string;
  category: string;
  aboutCompany: string;
  aboutJob: string;
  whoCanApply: string[];
  perks: string[];
  numberOfOpenings: number;
  stipend: string;
  startDate: string;
  additionalInfo: string;
  employmentType?: string;
  workMode?: string;
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

function normalizeSalaryValue(input: string) {
  const normalized = input.toLowerCase();
  const matches = [...normalized.matchAll(/\d+(?:\.\d+)?/g)].map((match) => Number(match[0]));

  if (matches.length === 0) {
    return { min: 0, max: 300 };
  }

  const convert = (value: number) => {
    if (normalized.includes('lpa') || normalized.includes('lakh')) {
      return Math.round((value * 100) / 12);
    }

    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return Math.round(value);
  };

  const [first, second] = matches;
  const min = convert(first);
  const max = convert(second ?? first);

  return {
    min: Math.min(min, max),
    max: Math.max(min, max),
  };
}

function mapEmploymentType(value?: string): JobData['type'] {
  const normalized = value?.toLowerCase() ?? '';

  if (normalized.includes('part')) {
    return 'Part-time';
  }

  if (normalized.includes('intern')) {
    return 'Internship';
  }

  return 'Full-time';
}

function mapJob(raw: BackendJob): JobData {
  const salaryRange = normalizeSalaryValue(raw.stipend);

  return {
    id: raw._id,
    title: raw.title,
    company: raw.companyName,
    location: raw.location,
    startDate: raw.startDate,
    duration: raw.employmentType ?? 'Full-time',
    salary: raw.stipend,
    salaryMin: salaryRange.min,
    salaryMax: salaryRange.max,
    type: mapEmploymentType(raw.employmentType),
    posted: formatPostedLabel(raw.createdAt),
    activelyHiring: true,
    remote: (raw.workMode ?? '').toLowerCase().includes('remote') || raw.location.toLowerCase().includes('remote'),
    aboutCompany: raw.aboutCompany,
    companyWebsite: 'https://example.com',
    description: `${raw.category} opportunity at ${raw.companyName}`,
    aboutRole: raw.aboutJob,
    skillsRequired: createList(raw.category, `${raw.category} fundamentals`),
    whoCanApply: createList(raw.whoCanApply, 'Candidates matching the posted requirements'),
    perks: createList(raw.perks, 'Certificate of completion'),
    additionalInfo: raw.additionalInfo,
    openings: raw.numberOfOpenings,
  };
}

export async function getJobs() {
  const jobs = await apiFetch<BackendJob[]>('/api/job');
  return jobs.map(mapJob);
}

export async function getJobById(id: string) {
  try {
    const job = await apiFetch<BackendJob>(`/api/job/${id}`);
    return mapJob(job);
  } catch {
    return null;
  }
}

export async function createJob(payload: CreateJobInput) {
  const createdJob = await apiFetch<BackendJob>('/api/job', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return mapJob(createdJob);
}