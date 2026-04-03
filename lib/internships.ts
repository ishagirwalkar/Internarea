import { Calendar, Clock, DollarSign, MapPin, Dot } from 'lucide-react';

export interface InternshipData {
  id: number;
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

export const SAMPLE_INTERNSHIPS: InternshipData[] = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechCorp Solutions',
    location: 'Remote',
    startDate: 'April 2025',
    duration: '3 months',
    stipend: '₹25,000/month',
    tags: ['Internship', 'Full-time'],
    postedDaysAgo: '1 day ago',
    activelyHiring: true,
    aboutCompany:
      'TechCorp is a leading software development firm specializing in AI-driven applications for global clients.',
    aboutInternship:
      'Work on modern frontend features using React, TypeScript, and Tailwind in a collaborative environment. You will contribute to production UI components, support feature releases, and work closely with mentors on code quality and performance.',
    skillsRequired: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'Responsive design'],
    whoCanApply: [
      'Students or fresh graduates in Computer Science/IT',
      'Strong understanding of JavaScript and CSS',
      'Passion for UI/UX and clean code',
    ],
    perks: [
      'Monthly stipend',
      'Flexi work hours',
      'Certificate and recommendation letter',
      'Opportunity for full-time offer',
    ],
    additionalInfo:
      'This is a fully remote position with weekly mentorship sessions and code reviews.',
    openings: 5,
  },
  {
    id: 2,
    title: 'UI/UX Design Intern',
    company: 'Creative Studios',
    location: 'Remote',
    startDate: 'March 2025',
    duration: '2 months',
    stipend: '₹18,000/month',
    tags: ['Internship', 'Remote'],
    postedDaysAgo: '2 days ago',
    activelyHiring: true,
    aboutCompany:
      'Creative Studios is a digital design agency crafting user-centered products for startups and enterprises.',
    aboutInternship:
      'Assist in wireframing, prototyping, and user testing for mobile and web projects. You will partner with designers on research synthesis, visual iterations, and polished handoff assets for engineering teams.',
    skillsRequired: ['Figma', 'Wireframing', 'Prototyping', 'User research', 'Visual design'],
    whoCanApply: [
      'Design students with Figma/Adobe XD experience',
      'Good communication skills',
      'Ability to think from user perspective',
    ],
    perks: [
      'Flexible schedule',
      'Design mentor guidance',
      'Stipend plus portfolio project',
    ],
    additionalInfo:
      'Selected interns will receive interactive workshops and showcase opportunities.',
    openings: 3,
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    location: 'Remote',
    startDate: 'May 2025',
    duration: '4 months',
    stipend: '₹35,000/month',
    tags: ['Internship'],
    postedDaysAgo: '3 hours ago',
    activelyHiring: true,
    aboutCompany:
      'Analytics Pro provides data-driven insights for retail, healthcare, and finance enterprises.',
    aboutInternship:
      'Work with real datasets to solve business problems using Python, pandas, and machine learning models. You will clean datasets, build dashboards, and support model experimentation with guidance from data scientists.',
    skillsRequired: ['Python', 'Pandas', 'Machine learning', 'Data analysis', 'Statistics'],
    whoCanApply: [
      'Statistics/Data Science students',
      'Python programming skills',
      'Familiarity with ML libraries',
    ],
    perks: [
      'Hands-on mentorship',
      'Stipend and certification',
      'Potential conversion to full-time',
    ],
    additionalInfo:
      'This role is remote-first, requires 20-25 hours/week contribution.',
    openings: 4,
  },
];
