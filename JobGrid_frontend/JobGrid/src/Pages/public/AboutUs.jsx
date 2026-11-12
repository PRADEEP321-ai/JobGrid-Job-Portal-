
import React from "react";

const AboutUs = () => {
  const features = [
    {
      icon: "▦",
      title: "#1 Jobs site in UK",
      description:
        "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches.",
    },
    {
      icon: "⌕",
      title: "Seamless searching",
      description:
        "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.",
    },
    {
      icon: "↗",
      title: "Hired in top companies",
      description:
        "Podcasting operational change management inside of workflows to establish.",
    },
  ];

  const steps = [
    {
      icon: "♙",
      title: "Register Your Account",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: "▣",
      title: "Upload Your Resume",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: "▱",
      title: "Apply for Dream Job",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  const plans = [
    { name: "BASIC PACK", price: 30 },
    { name: "STANDARD PACK", price: 40 },
    { name: "PREMIUM PACK", price: 60 },
  ];

  const benefits = [
    "5+ Listings",
    "Contact With Agent",
    "Contact With Agent",
    "7×24 Fully Support",
    "50GB Space",
  ];

  const companies = [
    "GRAYGRIDS",
    "UIdeck",
    "logitech",
    "∞ Linelcons",
    "PageBulb",
    "GRAYGRIDS",
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#08172b] mt-9">

      {/* About Banner - No Navbar */}
      <section className="relative overflow-hidden bg-[#2446e8]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 via-blue-700/80 to-blue-600/70" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            About Us
          </h1>

          <div className="mt-4 h-1 w-12 bg-white" />

          <p className="mt-4 max-w-lg text-sm leading-6 text-blue-50">
            Business plan draws on a wide range of knowledge from different
            business disciplines. Business draws on a wide range of different
            business.
          </p>

          <div className="mt-7 flex items-center gap-3 text-sm text-white">
            <a href="/" className="transition hover:text-blue-200">
              Home
            </a>
            <span className="text-blue-200">|</span>
            <span>About Us</span>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Image Collage */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="grid grid-cols-2 items-center gap-3 sm:gap-4">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80"
                alt="People discussing job opportunities"
                className="h-48 w-full rounded-lg object-cover sm:h-56"
              />

              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
                alt="Professional working on a laptop"
                className="mt-8 h-48 w-full rounded-lg object-cover sm:h-56"
              />

              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80"
                alt="Modern office workspace"
                className="h-48 w-full rounded-lg object-cover sm:h-56"
              />

              <div className="flex h-40 flex-col justify-center rounded-lg bg-[#2446f3] p-5 text-white shadow-xl sm:h-48 sm:p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/20 text-xl">
                  ✓
                </div>
                <h3 className="mt-3 text-lg font-bold">Job alert!</h3>
                <p className="mt-1 text-xs leading-5 text-blue-50">
                  104 new jobs are available in this week!
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-5 right-0 -z-10 h-24 w-24 opacity-50">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-blue-300" />
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="max-w-md text-2xl font-bold leading-snug sm:text-3xl">
              Help You To Get The
              <br className="hidden sm:block" /> Best Job That Fits You
            </h2>

            <div className="mt-8 space-y-7">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#eef0ff] text-xl font-bold text-[#2446f3]">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#08172b]">
                      {feature.title}
                    </h3>
                    <p className="mt-1 max-w-md text-sm leading-6 text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Three Steps */}
      <section className="bg-[#2446f3] px-5 py-12 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="flex items-start gap-4 text-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 text-2xl">
                {step.icon}
              </div>

              <div>
                <h3 className="font-bold">{step.title}</h3>
                <div className="mt-3 h-0.5 w-8 bg-white/70" />
                <p className="mt-3 max-w-xs text-sm leading-6 text-blue-100">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-[#f5f8fc] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-xl text-center">
            <span className="inline-block rounded-sm bg-[#2446f3] px-4 py-2 text-xs font-semibold text-white">
              PRICING TABLE
            </span>

            <h2 className="mt-4 text-3xl font-bold">
              Our Pricing Plan
            </h2>

            <div className="mx-auto mt-3 h-0.5 w-10 bg-[#2446f3]" />

            <p className="mt-4 text-sm leading-6 text-gray-500">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-md border border-gray-100 bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-xl sm:p-9"
              >
                <h3 className="text-sm font-semibold">{plan.name}</h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-xs text-gray-400">per month</span>
                </div>

                <div className="my-5 h-px bg-gray-100" />

                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li
                      key={`${benefit}-${index}`}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-[#2446f3] text-xs text-white">
                        ✓
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="mt-8 rounded-sm bg-[#2446f3] px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="bg-[#f9faff] px-5 py-10 sm:px-8 sm:py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12">
          {companies.map((company, index) => (
            <span
              key={`${company}-${index}`}
              className="text-lg font-bold tracking-tight text-gray-400 transition hover:text-gray-600 sm:text-xl"
            >
              {company}
            </span>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default AboutUs;
