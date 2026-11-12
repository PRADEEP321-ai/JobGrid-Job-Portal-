
import React from 'react'



const categories = [
  { icon: '💻', name: 'Technology', jobs: '120 Jobs' },
  { icon: '📊', name: 'Finance', jobs: '85 Jobs' },
  { icon: '🎨', name: 'Design', jobs: '64 Jobs' },
  { icon: '📢', name: 'Marketing', jobs: '92 Jobs' },
  { icon: '🏥', name: 'Healthcare', jobs: '58 Jobs' },
  { icon: '📚', name: 'Education', jobs: '45 Jobs' },
]

const jobs = [
  { title: 'Java Developer', company: 'Tech Solutions', location: 'Pune, India', type: 'Full Time', salary: '₹4–6 LPA', icon: '💻' },
  { title: 'React Developer', company: 'Digital Works', location: 'Remote', type: 'Full Time', salary: '₹5–8 LPA', icon: '🌐' },
  { title: 'UI/UX Designer', company: 'Creative Studio', location: 'Mumbai, India', type: 'Part Time', salary: '₹3–5 LPA', icon: '🎨' },
  { title: 'Backend Developer', company: 'Code Labs', location: 'Pune, India', type: 'Full Time', salary: '₹5–7 LPA', icon: '⚙️' },
]

const featuredJobs = [
  {
    title: 'Software Engineer',
    company: 'Tech Solutions',
    image: 'photo-1522071820081-009f0129c71c',
    location: 'Pune, India',
  },
  {
    title: 'Product Designer',
    company: 'Creative Studio',
    image: 'photo-1521737711867-e3b97375f902',
    location: 'Mumbai, India',
  },
  {
    title: 'Data Analyst',
    company: 'Data Experts',
    image: 'photo-1551288049-bebda4e38f71',
    location: 'Remote',
  },
]

const articles = [
  {
    title: 'How to Write a Professional Resume',
    image: 'photo-1455390582262-044cdead277a',
  },
  {
    title: 'Tips to Prepare for Job Interviews',
    image: 'photo-1521737711867-e3b97375f902',
  },
  {
    title: 'How to Grow Your Career',
    image: 'photo-1522071820081-009f0129c71c',
  },
]

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      <section className="bg-slate-50 ">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:px-8 lg:py-20">

          <div>
            <p className="mb-3 font-semibold text-blue-600">
              YOUR CAREER STARTS HERE
            </p>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Find Your Career
              <br />
              to Make a Better Life
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
              Discover job opportunities, connect with great companies,
              and take the next step in your professional journey.
            </p>


            <form
              onSubmit={(e) => {
                e.preventDefault()
                window.location.href = '/jobs'
              }}
              className="mt-7 grid gap-3 rounded-xl bg-white p-3 shadow-md sm:grid-cols-[1fr_1fr_auto]"
            >
              <input
                type="text"
                placeholder="Job title or keyword"
                className="min-w-0 rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Location"
                className="min-w-0 rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-[#2446F3] px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Search
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-500">
              Popular: <span className="text-blue-600">Java, React, Developer</span>
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
              alt="Professional looking for career opportunities"
              className="h-64 w-full rounded-2xl object-cover shadow-lg sm:h-80 lg:h-[400px]"
            />

            <div className="absolute bottom-4 left-4 rounded-xl bg-white p-4 shadow-lg sm:bottom-6 sm:left-6">
              <p className="text-sm text-gray-500">Explore opportunities</p>
              <p className="font-bold text-blue-600">Build your future</p>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-[#2446F3] text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-2 md:px-8 lg:grid-cols-3">

          <div className="flex items-start gap-4">
            <span className="text-3xl">📄</span>
            <div>
              <h3 className="font-semibold">Build Your Resume</h3>
              <p className="mt-1 text-sm text-blue-100">
                Create your profile and showcase your skills.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-3xl">🔍</span>
            <div>
              <h3 className="font-semibold">Find Your Dream Job</h3>
              <p className="mt-1 text-sm text-blue-100">
                Discover opportunities that match your skills.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-3xl">🚀</span>
            <div>
              <h3 className="font-semibold">Apply with Confidence</h3>
              <p className="mt-1 text-sm text-blue-100">
                Take the next step in your career.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* categories */}
      <section className="bg-[#f5f8fc] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <span className="rounded bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              JOB CATEGORIES
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Choose Your Desired Category
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
              Explore different career fields and find the right opportunity for you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <a
                href="/categories"
                key={category.name}
                className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                  {category.icon}
                </span>
                <h3 className="mt-3 text-sm font-semibold">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {category.jobs}
                </p>
              </a>
            ))}
          </div>

        </div>
      </section>

      <section className="px-5 py-16 md:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

          <div className="grid grid-cols-2 gap-3">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80"
              alt="Team working together"
              className="h-40 w-full rounded-xl object-cover sm:h-52"
            />
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
              alt="Colleagues collaborating"
              className="mt-7 h-40 w-full rounded-xl object-cover sm:h-52"
            />
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80"
              alt="Modern workspace"
              className="h-40 w-full rounded-xl object-cover sm:h-52"
            />
            <div className="flex min-h-40 flex-col justify-center rounded-xl bg-[#2446F3] p-4 text-white sm:min-h-52 sm:p-6">
              <span className="text-3xl">🎯</span>
              <h3 className="mt-3 font-bold">Your Next Career Move</h3>
              <p className="mt-2 text-sm text-blue-100">
                Find a job that fits your goals.
              </p>
            </div>
          </div>

          <div>
            <span className="rounded bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              HOW IT WORKS
            </span>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              How You Get the Best Job That Fits You
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Start your job search with a few simple steps.
            </p>

            <div className="mt-7 space-y-5">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">1</span>
                <div>
                  <h3 className="font-semibold">Create Your Profile</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add your skills, education and experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">2</span>
                <div>
                  <h3 className="font-semibold">Search for Jobs</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Explore jobs that match your interests.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">3</span>
                <div>
                  <h3 className="font-semibold">Apply for Your Dream Job</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Submit your application and follow its progress.
                  </p>
                </div>
              </div>
            </div>

            <a href="/register" className="mt-7 inline-block rounded-lg bg-[#2446F3] px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Get Started
            </a>
          </div>

        </div>
      </section>

      <section className="bg-[#2446F3] px-5 py-12 text-center text-white sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-blue-100">
            READY FOR YOUR NEXT CHALLENGE?
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Don't Just Find a Job. Find Your Future.
          </h2>
          <p className="mt-4 text-sm leading-6 text-blue-100 sm:text-base">
            Create your profile and help employers discover your talent.
          </p>
          <a href="/register" className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50">
            Upload Your Resume
          </a>
        </div>
      </section>

      {/* 6. Latest Jobs */}
      <section className="bg-slate-50 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <span className="rounded bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              NEW OPPORTUNITIES
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Browse Recent Jobs
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Find your next opportunity from our latest job listings.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                      {job.icon}
                    </span>
                    <div>
                      <h3 className="font-bold">{job.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {job.type}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <a href="/jobs" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                    View Job Details →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="/jobs" className="inline-block rounded-lg bg-[#2446F3] px-6 py-3 font-semibold text-white hover:bg-blue-700">
              View All Jobs
            </a>
          </div>

        </div>
      </section>

      {/* 7. Featured Jobs */}
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <span className="rounded bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              FEATURED JOBS
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Browse Featured Jobs
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Discover opportunities from companies looking for talented people.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <div key={job.title} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                <img
                  src={`https://images.unsplash.com/${job.image}?auto=format&fit=crop&w=700&q=80`}
                  alt={job.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-5">
                  <p className="text-sm text-blue-600">{job.company}</p>
                  <h3 className="mt-2 text-lg font-bold">{job.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">📍 {job.location}</p>
                  <a href="/jobs" className="mt-5 inline-block rounded-lg bg-[#2446F3] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="bg-[#071727] px-5 py-14 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold text-blue-300">TESTIMONIALS</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              What Our Candidates Say
            </h2>
            <p className="mt-4 leading-7 text-gray-300">
              Job searching can feel difficult, but the right opportunity
              can change your career. Our goal is to make finding that
              opportunity easier.
            </p>
            <p className="mt-5 font-semibold">— JobGrids Community</p>
          </div>

          <div className="rounded-xl bg-white/10 p-6 sm:p-8">
            <p className="text-lg leading-8 text-gray-100">
              “The simple job search experience helped me explore opportunities
              and take the next step in my career.”
            </p>
            <p className="mt-5 font-semibold">A Happy Candidate</p>
            <p className="mt-1 text-sm text-blue-200">Job seeker</p>
          </div>
        </div>
      </section>

      {/* 9. Pricing Plans */}
      <section className="bg-slate-50 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <span className="rounded bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              PRICING
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Plans for Employers
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Optional plans for companies that need extra recruitment features.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { name: 'Starter', price: 'Free', features: ['Create company profile', 'Browse candidates', 'Basic job listing'] },
              { name: 'Professional', price: '₹999', features: ['Featured job listings', 'Manage applicants', 'Priority visibility'] },
              { name: 'Business', price: '₹1999', features: ['Multiple job listings', 'Advanced recruitment tools', 'Priority support'] },
            ].map((plan) => (
              <div key={plan.name} className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="mt-4 text-3xl font-bold text-blue-600">{plan.price}</p>
                <p className="mt-1 text-sm text-gray-500">Employer plan</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-600">
                      <span className="mr-2 text-blue-600">✓</span>{feature}
                    </li>
                  ))}
                </ul>

                <a href="/register" className="mt-7 block rounded-lg bg-[#2446F3] px-4 py-3 text-center font-semibold text-white hover:bg-blue-700">
                  Choose Plan
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Blog */}
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <span className="rounded bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              OUR BLOG
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Latest News & Blog
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Read useful tips to improve your job search and career.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.title} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                <img
                  src={`https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=700&q=80`}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-xs font-semibold text-blue-600">CAREER ADVICE</p>
                  <h3 className="mt-3 font-bold">{article.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Explore practical ideas to help you prepare for your next career move.
                  </p>
                  <a href="/blog" className="mt-4 inline-block text-sm font-semibold text-blue-600">
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home
