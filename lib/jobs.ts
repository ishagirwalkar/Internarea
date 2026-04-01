export interface JobData {
  id: number;
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
  whoCanApply: string[];
  perks: string[];
  additionalInfo: string;
  openings: number;
}

export const SAMPLE_JOBS: JobData[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    startDate: 'May 2026',
    duration: 'Full-time',
    salary: '$150,000-180,000/year',
    salaryMin: 150,
    salaryMax: 180,
    type: 'Full-time',
    posted: '2 days ago',
    activelyHiring: true,
    remote: false,
    aboutCompany: 'Google is a global technology leader focused on innovation in search, ads, cloud, and AI services.',
    companyWebsite: 'https://careers.google.com',
    description: 'Build and scale cloud services for millions of users.',
    whoCanApply: [
      'Computer Science graduates',
      '5+ years experience in backend development',
      'Strong knowledge of distributed systems',
    ],
    perks: ['Health insurance', 'Stock options', 'Flexible hours', 'Remote work days'],
    additionalInfo: 'This role is based out of Mountain View with relocation support available.',
    openings: 6,
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Bangalore, India',
    startDate: 'June 2026',
    duration: 'Full-time',
    salary: '₹25-35 LPA',
    salaryMin: 25,
    salaryMax: 35,
    type: 'Full-time',
    posted: '3 days ago',
    activelyHiring: true,
    remote: false,
    aboutCompany: 'Microsoft builds productive and secure platforms for businesses and individuals worldwide.',
    companyWebsite: 'https://careers.microsoft.com',
    description: 'Define product roadmaps and work with engineering teams to deliver enterprise products.',
    whoCanApply: [
      'MBA or equivalent experience',
      'Product lifecycle experience',
      'Strong stakeholder communication',
    ],
    perks: ['Paid vacation', 'Health benefits', 'Retirement savings', 'Learning stipend'],
    additionalInfo: 'Candidates with cloud platform experience in Azure are preferred.',
    openings: 3,
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Amazon',
    location: 'Seattle, WA',
    startDate: 'July 2026',
    duration: 'Full-time',
    salary: '$160,000-190,000/year',
    salaryMin: 160,
    salaryMax: 190,
    type: 'Full-time',
    posted: '1 day ago',
    activelyHiring: true,
    remote: false,
    aboutCompany: 'Amazon is a leading e-commerce and cloud platform with a global customer base.',
    companyWebsite: 'https://www.amazon.jobs',
    description: 'Work on recommendation algorithms and NLP models for e-commerce personalization.',
    whoCanApply: [
      'Masters/PhD in Metrics or ML',
      'Strong Python and statistical modeling skills',
      'Experience in production ML pipelines',
    ],
    perks: ['Career growth', 'Comprehensive benefits', 'Innovation programs', 'RSUs'],
    additionalInfo: 'This position is for experienced professionals; internship roles are separate.',
    openings: 2,
  },
];