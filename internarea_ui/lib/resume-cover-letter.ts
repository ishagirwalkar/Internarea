import mammoth from 'mammoth/mammoth.browser';
import type { ListingDetail } from './sample-listings';

export type ResumeInsights = {
	rawText: string;
	skills: string[];
	education: string[];
	projects: string[];
};

const KNOWN_SKILLS = [
	'React',
	'Next.js',
	'TypeScript',
	'JavaScript',
	'Node.js',
	'Express',
	'MongoDB',
	'PostgreSQL',
	'Python',
	'Java',
	'C++',
	'HTML',
	'CSS',
	'Tailwind CSS',
	'Git',
	'Docker',
	'AWS',
	'Firebase',
	'Rest API',
	'SQL',
	'Figma',
	'UI/UX',
	'Data Structures',
	'Algorithms',
];

const SECTION_TITLES = ['education', 'skills', 'projects', 'experience', 'achievements', 'certifications'];

function unique(values: string[]) {
	return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function normalizeText(text: string) {
	return text.replace(/\r/g, '').replace(/\t/g, ' ').replace(/\u0000/g, '');
}

function getLines(text: string) {
	return normalizeText(text)
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean);
}

function collectSection(lines: string[], titles: string[]) {
	const index = lines.findIndex((line) => titles.some((title) => line.toLowerCase() === title || line.toLowerCase().startsWith(`${title}:`)));

	if (index === -1) {
		return [];
	}

	const collected: string[] = [];

	for (let currentIndex = index + 1; currentIndex < lines.length; currentIndex += 1) {
		const currentLine = lines[currentIndex];
		const lowered = currentLine.toLowerCase();

		if (SECTION_TITLES.some((title) => lowered === title || lowered.startsWith(`${title}:`))) {
			break;
		}

		collected.push(currentLine.replace(/^[-*•]\s*/, ''));
	}

	return collected;
}

function findEducation(lines: string[]) {
	const sectionValues = collectSection(lines, ['education']);

	if (sectionValues.length > 0) {
		return unique(sectionValues).slice(0, 2);
	}

	return unique(
		lines.filter((line) => /(b\.tech|btech|b\.e\.|be |m\.tech|bca|mca|bsc|msc|computer science|engineering|university|college)/i.test(line))
	).slice(0, 2);
}

function findProjects(lines: string[]) {
	const sectionValues = collectSection(lines, ['projects', 'project']);

	if (sectionValues.length > 0) {
		return unique(sectionValues).slice(0, 3);
	}

	return unique(
		lines.filter((line) => /(project|built|developed|designed|created|implemented)/i.test(line))
	).slice(0, 3);
}

function findSkills(lines: string[], rawText: string) {
	const sectionValues = collectSection(lines, ['skills', 'technical skills']);
	const inlineSkills = sectionValues.flatMap((line) => line.split(/,|\||\/|•/)).map((value) => value.trim());
	const detectedSkills = KNOWN_SKILLS.filter((skill) => new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'i').test(rawText));

	return unique([...inlineSkills, ...detectedSkills]).slice(0, 6);
}

async function extractPdfText(file: File) {
	const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
	pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

	const typedArray = new Uint8Array(await file.arrayBuffer());
	const pdfDocument = await pdfjs.getDocument({ data: typedArray }).promise;
	const pages: string[] = [];

	for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
		const page = await pdfDocument.getPage(pageNumber);
		const content = await page.getTextContent();
		const pageText = content.items
			.map((item) => ('str' in item ? item.str : ''))
			.join(' ');
		pages.push(pageText);
	}

	return pages.join('\n');
}

async function extractResumeText(file: File) {
	const fileName = file.name.toLowerCase();

	if (fileName.endsWith('.pdf')) {
		return extractPdfText(file);
	}

	if (fileName.endsWith('.docx')) {
		const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
		return result.value;
	}

	if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
		return file.text();
	}

	throw new Error('Unsupported resume format. Please upload a PDF, DOCX, TXT, or MD file.');
}

export async function extractResumeInsights(file: File): Promise<ResumeInsights> {
	const rawText = normalizeText(await extractResumeText(file));
	const lines = getLines(rawText);

	return {
		rawText,
		skills: findSkills(lines, rawText),
		education: findEducation(lines),
		projects: findProjects(lines),
	};
}

export function generateCoverLetter(options: {
	candidateName: string;
	listing: ListingDetail;
	insights: ResumeInsights;
}) {
	const { candidateName, listing, insights } = options;
	const introduction = candidateName.trim() ? `My name is ${candidateName.trim()}, and ` : '';
	const skills = insights.skills.length > 0 ? insights.skills.slice(0, 4).join(', ') : 'modern web development, problem solving, and collaborative product work';
	const education = insights.education[0] ?? 'a strong academic foundation in technology';
	const projects = insights.projects[0] ?? 'hands-on academic and personal projects';

	return `Dear Hiring Team,\n\n${introduction}I am excited to apply for the ${listing.title} role at ${listing.company}. With ${education} and practical experience in ${skills}, I am eager to contribute to a fast-moving team that values thoughtful execution and continuous learning. My work on ${projects} has helped me strengthen both my technical foundation and my ability to turn ideas into clear, user-focused outcomes.\n\nThrough coursework and project-based experience, I have learned how to adapt quickly, work through unfamiliar problems, and stay accountable for measurable results. I am especially motivated by opportunities where I can learn from experienced mentors while contributing meaningfully from day one. The chance to support ${listing.company} in building strong product experiences is especially appealing to me because it aligns with both my technical interests and my long-term growth goals.\n\nI would welcome the opportunity to bring curiosity, ownership, and a strong learning mindset to this role. Thank you for your time and consideration.`;
}