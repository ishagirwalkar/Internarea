import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid - 5 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Column 1: Internships by Places */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Internships by Places</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/internships/new-york"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  New York
                </Link>
              </li>
              <li>
                <Link
                  href="/internships/los-angeles"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Los Angeles
                </Link>
              </li>
              <li>
                <Link
                  href="/internships/chicago"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Chicago
                </Link>
              </li>
              <li>
                <Link
                  href="/internships/san-francisco"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  San Francisco
                </Link>
              </li>
              <li>
                <Link
                  href="/internships/miami"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Miami
                </Link>
              </li>
              <li>
                <Link
                  href="/internships/seattle"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Seattle
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Internship by Stream */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Internship by Stream</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/media-kit"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Media Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Job Places */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Job Places</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/help-center"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Jobs by Stream */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Jobs by Stream</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/jobs/startups"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Startups
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/enterprise"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Enterprise
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/government"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Government
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/saas"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  SaaS
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/marketplaces"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Marketplaces
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/ecommerce"
                  className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm"
                >
                  Ecommerce
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Resources */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Company & Resources</h3>
            
            {/* About Us Sub-section */}
            <div className="mb-6">
              <h4 className="text-white font-semibold text-sm mb-2">About Us</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about/startup"
                    className="text-gray-400 hover:text-blue-400 transition duration-300 text-xs"
                  >
                    Startup
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/enterprise"
                    className="text-gray-400 hover:text-blue-400 transition duration-300 text-xs"
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            {/* Team Diary Sub-section */}
            <div className="mb-6">
              <h4 className="text-white font-semibold text-sm mb-2">Team Diary</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/team-diary/startups"
                    className="text-gray-400 hover:text-blue-400 transition duration-300 text-xs"
                  >
                    Startups
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team-diary/enterprise"
                    className="text-gray-400 hover:text-blue-400 transition duration-300 text-xs"
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            {/* Terms and Conditions Sub-section */}
            <div className="mb-6">
              <h4 className="text-white font-semibold text-sm mb-2">Terms and Conditions</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms/startups"
                    className="text-gray-400 hover:text-blue-400 transition duration-300 text-xs"
                  >
                    Startups
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms/enterprise"
                    className="text-gray-400 hover:text-blue-400 transition duration-300 text-xs"
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sitemap Sub-section */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-2">Sitemap</h4>
              <ul>
                <li>
                  <Link
                    href="/sitemap"
                    className="text-gray-400 hover:text-blue-400 transition duration-300 text-xs"
                  >
                    Startups
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Social Media Icons Section */}
        <div className="flex flex-col items-center mb-8">
          <h4 className="text-white font-semibold text-sm mb-4">Follow Us</h4>
          <div className="flex gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300 transform hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition duration-300 transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} InternArea. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
