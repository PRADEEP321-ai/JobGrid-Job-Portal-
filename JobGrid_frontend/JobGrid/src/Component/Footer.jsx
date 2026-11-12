
import React from 'react';

const Footer = () => {
  return (
    <>
      {/* Download Apps */}
      <section className="border-b border-gray-100 bg-white px-5 py-12 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#071727]">
              Download Our Best Apps
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#app-store"
              className="rounded-md bg-[#2446f3] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
               App Store
            </a>

            <a
              href="#google-play"
              className="rounded-md bg-[#2446f3] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              ▷ Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Logo and Contact */}
          <div>
            <a href="/" className="inline-flex text-xl font-bold">
              <span className="rounded-l-lg bg-[#2446f3] px-3 py-1 text-white">
                Job
              </span>
              <span className="rounded-r-lg bg-[#071727] px-3 py-1 text-white">
                Grids
              </span>
            </a>

            <p className="mt-5 text-sm leading-6 text-gray-500">
              Start building your career with our awesome template.
            </p>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              <strong className="text-gray-700">Address:</strong>{' '}
              555 Wall Street, Pune, India
              <br />

              <strong className="text-gray-700">Email:</strong>{' '}
              <a
                href="mailto:support@jobgrids.com"
                className="hover:text-[#2446f3]"
              >
                support@jobgrids.com
              </a>
              <br />

              <strong className="text-gray-700">Call:</strong>{' '}
              +91 555-555-1234
            </p>

            <div className="mt-5 flex gap-2">
              {['f', '♥', 'in', '◎'].map((social) => (
                <a
                  key={social}
                  href="#social"
                  aria-label={`Social media ${social}`}
                  className="flex h-9 w-9 items-center justify-center rounded bg-gray-100 text-sm font-semibold text-gray-600 transition hover:bg-[#2446f3] hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Candidates */}
          <div>
            <h3 className="font-semibold text-[#071727]">
              For Candidates
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-500">
              <li>
                <a href="/candidate/dashboard" className="transition hover:text-[#2446f3]">
                  User Dashboard
                </a>
              </li>
              <li>
                <a href="/candidate/resume" className="transition hover:text-[#2446f3]">
                  CV Packages
                </a>
              </li>
              <li>
                <a href="/jobs" className="transition hover:text-[#2446f3]">
                  Jobs Featured
                </a>
              </li>
              <li>
                <a href="/candidate/applications" className="transition hover:text-[#2446f3]">
                  Jobs Urgent
                </a>
              </li>
              <li>
                <a href="/candidates" className="transition hover:text-[#2446f3]">
                  Candidate List
                </a>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="font-semibold text-[#071727]">
              For Employers
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-500">
              <li>
                <a href="/company/post-job" className="transition hover:text-[#2446f3]">
                  Post New
                </a>
              </li>
              <li>
                <a href="/companies" className="transition hover:text-[#2446f3]">
                  Employer List
                </a>
              </li>
              <li>
                <a href="/company/dashboard" className="transition hover:text-[#2446f3]">
                  Employers Grid
                </a>
              </li>
              <li>
                <a href="/company/jobs" className="transition hover:text-[#2446f3]">
                  Job Packages
                </a>
              </li>
              <li>
                <a href="/jobs" className="transition hover:text-[#2446f3]">
                  Jobs Listing
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-[#071727]">
              Join Our Newsletter
            </h3>

            <p className="mt-5 text-sm leading-6 text-gray-500">
              Subscribe to get the latest jobs posted.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Newsletter backend is not connected yet.');
              }}
              className="mt-5 space-y-3"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#2446f3] focus:ring-2 focus:ring-[#2446f3]/20"
              />

              <button
                type="submit"
                className="w-full rounded-md bg-[#2446f3] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Subscribe Now!
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
          <p>Designed and Developed for JobGrids</p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/terms" className="transition hover:text-[#2446f3]">
              Terms of Use
            </a>
            <a href="/privacy" className="transition hover:text-[#2446f3]">
              Privacy Policy
            </a>
            <a href="/faq" className="transition hover:text-[#2446f3]">
              FAQ
            </a>
            <a href="/contact" className="transition hover:text-[#2446f3]">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-[#2446f3] text-xl text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        ↑
      </button>
    </>
  );
};

export default Footer;
