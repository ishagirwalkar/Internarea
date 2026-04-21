import Link from 'next/link';

import { footerSections, type FooterLink } from '@/lib/site-content';

const companySummary = {
  name: 'InternArea',
  tagline:
    'Discover internships and jobs with a focused, professional platform built for students and early-career talent.',
};

function FooterLinkItem({ link }: { link: FooterLink }) {
  const Icon = link.icon;
  const isExternal = link.href.startsWith('http');

  return (
    <Link
      href={link.href}
      className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors duration-200 hover:text-white"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {Icon ? <Icon className="h-4 w-4 text-gray-500 transition-colors duration-200 group-hover:text-white" /> : null}
      <span>{link.label}</span>
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-gray-800 pb-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="max-w-sm">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white shadow-lg shadow-blue-600/20">
              I
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">{companySummary.name}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">{companySummary.tagline}</p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              {section.titleHref ? (
                <Link
                  href={section.titleHref}
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-100 transition-colors duration-200 hover:text-white"
                >
                  {section.title}
                </Link>
              ) : (
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-100">
                  {section.title}
                </h3>
              )}
              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="group">
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {companySummary.name}. All rights reserved.
          </p>
          <p>Built for fast, focused career discovery.</p>
        </div>
      </div>
    </footer>
  );
}
