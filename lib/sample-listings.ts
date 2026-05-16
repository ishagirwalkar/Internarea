export type ListingDetail = {
	id: string;
	title: string;
	company: string;
	location: string;
	compensation: string;
	duration: string;
	postedDate: string;
	experience: string;
	workFromHome: boolean;
	partTime: boolean;
	companyWebsite: string;
	aboutCompany: string;
	aboutRole: string;
	whoCanApply: string;
	perks: string[];
	additionalInformation: string;
	openings: number;
};

export const sampleJobs: ListingDetail[] = [
	{
		id: 'software-engineer-google',
		title: 'Software Engineer',
		company: 'Google',
		location: 'Bengaluru, India',
		compensation: '₹18,00,000/year',
		duration: 'Full-time',
		postedDate: 'Posted on March 15, 2025',
		experience: '0-2 years',
		workFromHome: false,
		partTime: false,
		companyWebsite: 'https://careers.google.com',
		aboutCompany:
			'Google builds products and platforms that help billions of users search, learn, create, and collaborate at global scale.',
		aboutRole:
			'You will work with cross-functional engineering teams to build production-ready experiences, improve system reliability, and ship user-facing features with measurable impact.',
		whoCanApply:
			'Candidates with strong fundamentals in data structures, problem solving, and modern software development practices can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'This role includes mentorship from senior engineers, exposure to large-scale systems, and structured performance feedback.',
		openings: 2,
	},
	{
		id: 'product-manager-microsoft',
		title: 'Product Manager',
		company: 'Microsoft',
		location: 'Hyderabad, India',
		compensation: '₹22,00,000/year',
		duration: 'Full-time',
		postedDate: 'Posted on March 18, 2025',
		experience: '1-3 years',
		workFromHome: false,
		partTime: false,
		companyWebsite: 'https://careers.microsoft.com',
		aboutCompany:
			'Microsoft creates cloud, productivity, and AI products used by organizations, developers, and consumers around the world.',
		aboutRole:
			'You will define product requirements, align business priorities with engineering execution, and support new feature delivery across internal stakeholders.',
		whoCanApply:
			'Applicants with experience in product thinking, communication, and user research, along with a strong analytical mindset, can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'The role offers direct collaboration with engineering and design teams and includes access to internal product strategy workshops.',
		openings: 1,
	},
	{
		id: 'data-scientist-amazon',
		title: 'Data Scientist',
		company: 'Amazon',
		location: 'Remote',
		compensation: '₹20,00,000/year',
		duration: 'Full-time',
		postedDate: 'Posted on March 20, 2025',
		experience: '0-2 years',
		workFromHome: true,
		partTime: false,
		companyWebsite: 'https://www.amazon.jobs',
		aboutCompany:
			'Amazon operates global commerce, logistics, and cloud platforms powered by deeply data-driven product and operations decisions.',
		aboutRole:
			'You will analyze large datasets, build predictive models, and partner with business teams to convert data insights into product decisions.',
		whoCanApply:
			'Candidates with Python, SQL, statistics, and machine learning exposure, plus clear communication skills, are encouraged to apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'This is a remote-friendly role with structured onboarding and regular collaboration sessions across distributed teams.',
		openings: 3,
	},
	{
		id: 'frontend-developer-meta',
		title: 'Frontend Developer',
		company: 'Meta',
		location: 'Gurugram, India',
		compensation: '₹16,50,000/year',
		duration: 'Full-time',
		postedDate: 'Posted on March 21, 2025',
		experience: '1-2 years',
		workFromHome: false,
		partTime: false,
		companyWebsite: 'https://www.metacareers.com',
		aboutCompany:
			'Meta builds social platforms and immersive digital experiences focused on communication, community, and creator ecosystems.',
		aboutRole:
			'You will build polished interfaces, collaborate with designers, and improve front-end performance across responsive product surfaces.',
		whoCanApply:
			'Applicants comfortable with React, TypeScript, accessibility, and modern CSS tooling can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'You will work in a high-collaboration environment with access to design reviews and rapid product iteration cycles.',
		openings: 2,
	},
	{
		id: 'ux-designer-apple',
		title: 'UX Designer',
		company: 'Apple',
		location: 'Mumbai, India',
		compensation: '₹14,00,000/year',
		duration: 'Part-time',
		postedDate: 'Posted on March 25, 2025',
		experience: '0-1 years',
		workFromHome: false,
		partTime: true,
		companyWebsite: 'https://jobs.apple.com',
		aboutCompany:
			'Apple designs hardware, software, and services with a focus on craft, usability, and tightly integrated product experiences.',
		aboutRole:
			'You will contribute to interaction design, prototype flows, and collaborate on user-centered product improvements across digital touchpoints.',
		whoCanApply:
			'Candidates with a portfolio showcasing user-centered design, wireframing, and prototype thinking can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'This role offers exposure to structured design critique, design systems, and collaborative product discovery processes.',
		openings: 1,
	},
	{
		id: 'devops-engineer-ibm',
		title: 'DevOps Engineer',
		company: 'IBM',
		location: 'Pune, India',
		compensation: '₹15,50,000/year',
		duration: 'Full-time',
		postedDate: 'Posted on March 27, 2025',
		experience: '2-4 years',
		workFromHome: true,
		partTime: false,
		companyWebsite: 'https://www.ibm.com/careers',
		aboutCompany:
			'IBM delivers enterprise technology, consulting, and cloud solutions for organizations building modern digital operations.',
		aboutRole:
			'You will improve CI/CD pipelines, automate infrastructure workflows, and support secure deployment and monitoring practices.',
		whoCanApply:
			'Applicants with hands-on experience in cloud platforms, infrastructure automation, and deployment tooling can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'The team supports hybrid collaboration and encourages ownership across platform reliability and developer experience.',
		openings: 2,
	},
];

export const sampleInternships: ListingDetail[] = [
	{
		id: 'frontend-developer-intern-tech-innovators',
		title: 'Frontend Developer Intern',
		company: 'Tech Innovators',
		location: 'Remote',
		compensation: '$500/month',
		duration: '3 Months',
		postedDate: 'Posted on March 15, 2025',
		experience: '0-1 years',
		workFromHome: true,
		partTime: true,
		companyWebsite: 'https://example.com/tech-innovators',
		aboutCompany:
			'Tech Innovators is a product-focused startup building modern SaaS tools for digital teams that value speed, usability, and collaboration.',
		aboutRole:
			'You will help build and polish front-end features, translate designs into responsive UI, and support product improvements across web experiences.',
		whoCanApply:
			'Students or recent graduates with knowledge of HTML, CSS, JavaScript, and React, plus an interest in shipping clean interfaces, can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'This internship includes weekly mentorship sessions, portfolio-focused review feedback, and close collaboration with product designers.',
		openings: 2,
	},
	{
		id: 'product-management-intern-microsoft',
		title: 'Product Management Intern',
		company: 'Microsoft',
		location: 'Hyderabad, India',
		compensation: '₹55,000/month',
		duration: '6 Months',
		postedDate: 'Posted on March 17, 2025',
		experience: '0-2 years',
		workFromHome: false,
		partTime: false,
		companyWebsite: 'https://careers.microsoft.com',
		aboutCompany:
			'Microsoft develops cloud, productivity, and platform products used by enterprises, developers, and consumers worldwide.',
		aboutRole:
			'You will support market research, document product requirements, and help coordinate product delivery across design and engineering teams.',
		whoCanApply:
			'Students with strong communication, analytical thinking, and interest in product development can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'The internship includes guided mentorship, product planning exposure, and opportunities to present findings to cross-functional stakeholders.',
		openings: 2,
	},
	{
		id: 'software-engineering-intern-google',
		title: 'Software Engineering Intern',
		company: 'Google',
		location: 'Mountain View, CA',
		compensation: '₹60,000/month',
		duration: '3 Months',
		postedDate: 'Posted on March 16, 2025',
		experience: '0-1 years',
		workFromHome: false,
		partTime: false,
		companyWebsite: 'https://careers.google.com',
		aboutCompany:
			'Google creates products and platforms that help billions of users access information, collaborate, and build digital businesses.',
		aboutRole:
			'You will contribute to production-grade engineering tasks, collaborate on feature development, and gain exposure to large-scale systems.',
		whoCanApply:
			'Students with strong programming fundamentals, problem-solving ability, and curiosity for real-world software systems can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'The program includes engineering mentorship, peer learning sessions, and ownership of scoped product work.',
		openings: 3,
	},
	{
		id: 'data-science-intern-amazon',
		title: 'Data Science Intern',
		company: 'Amazon',
		location: 'Bengaluru, India',
		compensation: '₹58,000/month',
		duration: '4 Months',
		postedDate: 'Posted on March 18, 2025',
		experience: '0-1 years',
		workFromHome: false,
		partTime: false,
		companyWebsite: 'https://www.amazon.jobs',
		aboutCompany:
			'Amazon runs global commerce and cloud businesses powered by experimentation, analytics, and scalable systems.',
		aboutRole:
			'You will work with structured datasets, prepare analyses, and help teams identify actionable business insights.',
		whoCanApply:
			'Students with exposure to Python, SQL, and statistics, along with strong analytical reasoning, can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'The internship offers applied learning on real business problems and coaching from experienced data professionals.',
		openings: 2,
	},
	{
		id: 'ux-design-intern-apple',
		title: 'UX Design Intern',
		company: 'Apple',
		location: 'Mumbai, India',
		compensation: '₹50,000/month',
		duration: '3 Months',
		postedDate: 'Posted on March 20, 2025',
		experience: '0-1 years',
		workFromHome: false,
		partTime: false,
		companyWebsite: 'https://jobs.apple.com',
		aboutCompany:
			'Apple creates thoughtful product ecosystems that emphasize usability, craft, and seamless digital experiences.',
		aboutRole:
			'You will assist with user research, interface ideation, and prototyping for product improvements and design explorations.',
		whoCanApply:
			'Applicants with a design portfolio, understanding of user flows, and interest in product experience design can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'This internship gives exposure to critique sessions, design systems, and collaborative design iteration.',
		openings: 1,
	},
	{
		id: 'devops-engineer-intern-ibm',
		title: 'DevOps Engineer Intern',
		company: 'IBM',
		location: 'Pune, India',
		compensation: '₹48,000/month',
		duration: '6 Months',
		postedDate: 'Posted on March 22, 2025',
		experience: '1-2 years',
		workFromHome: true,
		partTime: false,
		companyWebsite: 'https://www.ibm.com/careers',
		aboutCompany:
			'IBM supports enterprise technology transformation through cloud platforms, consulting, and infrastructure solutions.',
		aboutRole:
			'You will help automate workflows, support deployment pipelines, and contribute to platform reliability improvements.',
		whoCanApply:
			'Students with basic cloud, Linux, scripting, or CI/CD knowledge and a strong willingness to learn can apply.',
		perks: ['Certificate', 'Letter of Recommendation', 'Flexible Work Hours'],
		additionalInformation:
			'The internship includes structured shadowing, hands-on automation tasks, and support from senior platform engineers.',
		openings: 2,
	},
];

export function getSampleJobById(id: string) {
	return sampleJobs.find((job) => job.id === id) ?? null;
}

export function generateSampleJobFromId(id: string): ListingDetail {
	// Parse the ID to extract company and role info
	const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'Stripe', 'Uber', 'Twitter'];
	const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'UX Designer', 'ML Engineer', 'QA Engineer', 'Solutions Architect'];
	const locations = ['Bengaluru, India', 'Hyderabad, India', 'Mumbai, India', 'Pune, India', 'Gurgaon, India', 'Remote', 'Mountain View, CA', 'San Francisco, CA', 'New York, NY'];
	const compensations = ['₹16,50,000/year', '₹18,00,000/year', '₹20,00,000/year', '₹22,00,000/year', '₹25,00,000/year', '₹28,00,000/year'];

	// Generate deterministic values based on ID hash
	const hash = id.split('').reduce((h, c) => ((h << 5) - h) + c.charCodeAt(0), 0);
	const absHash = Math.abs(hash);

	const company = companies[absHash % companies.length];
	const role = roles[(absHash >> 3) % roles.length];
	const location = locations[(absHash >> 6) % locations.length];
	const compensation = compensations[(absHash >> 8) % compensations.length];
	const openings = (absHash % 5) + 1;

	const aboutCompanyTexts = [
		`${company} is a leading technology company dedicated to innovation and building world-class products that impact billions of users globally.`,
		`${company} creates cutting-edge solutions in cloud computing, AI, and digital services for enterprises and consumers worldwide.`,
		`${company} is committed to hiring top talent and providing growth opportunities in a fast-paced, innovative environment.`,
		`${company} builds transformative platforms and services that drive digital innovation and business growth globally.`,
	];

	const aboutRoleTexts = [
		'You will work on high-impact projects, collaborate with world-class engineers, and contribute to products used by millions.',
		'You will design and implement scalable solutions, lead technical initiatives, and mentor junior team members.',
		'You will build production-grade systems, participate in architectural decisions, and help shape the company direction.',
		'You will solve complex technical problems, improve system reliability, and push the boundaries of technology.',
	];

	const whoCanApplyTexts = [
		'Candidates with strong fundamentals in computer science, proven problem-solving skills, and software engineering expertise can apply.',
		'Engineers with 0-2 years of professional experience and a passion for technology innovation are encouraged to apply.',
		'Applicants with a strong track record, excellent communication skills, and ability to thrive in fast-paced environments can apply.',
		'Senior engineers with leadership experience and technical depth in relevant domains are welcome to apply.',
	];

	const perksDefault = [
		'Competitive Salary',
		'Health Insurance',
		'Stock Options',
		'Professional Development',
		'Flexible Work Environment',
	];

	const additionalInfoTexts = [
		'This role includes competitive benefits, career growth opportunities, and work with cutting-edge technologies.',
		'You will have access to world-class mentorship, advanced training programs, and career progression opportunities.',
		'The position offers relocation assistance, comprehensive benefits, and a collaborative work environment.',
		'This role provides competitive compensation, flexible work arrangements, and opportunities to work on challenging problems.',
	];

	return {
		id,
		title: role,
		company,
		location,
		compensation,
		duration: 'Full-time',
		postedDate: `Posted on ${new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
		experience: '0-2 years',
		workFromHome: location === 'Remote',
		partTime: false,
		companyWebsite: `https://${company.toLowerCase().replace(/\s+/g, '')}.com`,
		aboutCompany: aboutCompanyTexts[absHash % aboutCompanyTexts.length],
		aboutRole: aboutRoleTexts[(absHash >> 2) % aboutRoleTexts.length],
		whoCanApply: whoCanApplyTexts[(absHash >> 4) % whoCanApplyTexts.length],
		perks: perksDefault,
		additionalInformation: additionalInfoTexts[(absHash >> 5) % additionalInfoTexts.length],
		openings,
	};
}

export function getSampleInternshipById(id: string) {
	return sampleInternships.find((internship) => internship.id === id) ?? null;
}

export function generateSampleInternshipFromId(id: string): ListingDetail {
	// Parse the ID to extract company and role info
	const parts = id.split('-');
	const companies = ['Tech Innovators', 'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'IBM', 'Netflix', 'Tesla', 'Stripe'];
	const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Science', 'Product Manager', 'UX Design', 'DevOps', 'QA Engineer', 'Software Engineer', 'Machine Learning'];
	const locations = ['Remote', 'Bengaluru, India', 'Hyderabad, India', 'Mumbai, India', 'Pune, India', 'Gurgaon, India', 'Mountain View, CA', 'San Francisco, CA'];
	const compensations = ['₹40,000/month', '₹50,000/month', '₹55,000/month', '₹60,000/month', '₹65,000/month', '$400/month', '$500/month', '$600/month'];
	const durations = ['3 Months', '4 Months', '6 Months', '5 Months'];

	// Generate deterministic values based on ID hash
	const hash = id.split('').reduce((h, c) => ((h << 5) - h) + c.charCodeAt(0), 0);
	const absHash = Math.abs(hash);

	const company = companies[absHash % companies.length];
	const role = roles[(absHash >> 3) % roles.length];
	const location = locations[(absHash >> 6) % locations.length];
	const compensation = compensations[(absHash >> 9) % compensations.length];
	const duration = durations[(absHash >> 11) % durations.length];
	const openings = (absHash % 3) + 1;

	const aboutCompanyTexts = [
		`${company} is a leading technology company dedicated to innovation and building world-class products that impact millions of users globally.`,
		`${company} creates cutting-edge solutions in cloud computing, software, and digital services for enterprises and consumers worldwide.`,
		`${company} is committed to fostering talent and providing internship opportunities that accelerate career growth and technical excellence.`,
		`${company} builds innovative platforms and services that connect people, businesses, and drive digital transformation globally.`,
	];

	const aboutRoleTexts = [
		`You will work on production-grade features, collaborate with experienced engineers, and contribute to real-world projects that impact our users.`,
		`You will assist in designing and implementing solutions, participate in code reviews, and learn best practices from senior team members.`,
		`You will help build and improve our core products, participate in sprint planning, and gain hands-on experience with modern technologies.`,
		`You will contribute to feature development, support QA efforts, and collaborate with cross-functional teams to deliver quality solutions.`,
	];

	const whoCanApplyTexts = [
		'Students with strong fundamentals in programming, problem-solving skills, and willingness to learn can apply.',
		'Candidates with relevant coursework or projects in computer science, engineering, or related fields are encouraged to apply.',
		'Applicants with basic knowledge of the tech stack and enthusiasm for growth can apply and learn on the job.',
		'Students or recent graduates with projects in their portfolio and communication skills are welcome to apply.',
	];

	const perksDefault = [
		'Certificate of Completion',
		'Letter of Recommendation',
		'Flexible Work Hours',
		'Mentorship from Senior Engineers',
		'Portfolio-Building Opportunity',
	];

	const additionalInfoTexts = [
		'This internship includes structured mentorship, weekly sync meetings, and opportunities to present work to cross-functional teams.',
		'You will gain exposure to large-scale systems, modern development practices, and have the chance to contribute to meaningful projects.',
		'The program offers hands-on learning, code review feedback, and a collaborative environment with experienced professionals.',
		'This role includes access to internal workshops, networking opportunities, and comprehensive onboarding for interns.',
	];

	return {
		id,
		title: `${role} Intern`,
		company,
		location,
		compensation,
		duration,
		postedDate: `Posted on ${new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
		experience: '0-2 years',
		workFromHome: location === 'Remote',
		partTime: Math.random() > 0.7,
		companyWebsite: `https://${company.toLowerCase().replace(/\s+/g, '')}.com`,
		aboutCompany: aboutCompanyTexts[absHash % aboutCompanyTexts.length],
		aboutRole: aboutRoleTexts[(absHash >> 2) % aboutRoleTexts.length],
		whoCanApply: whoCanApplyTexts[(absHash >> 4) % whoCanApplyTexts.length],
		perks: perksDefault,
		additionalInformation: additionalInfoTexts[(absHash >> 5) % additionalInfoTexts.length],
		openings,
	};
}