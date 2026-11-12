
import React from "react";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";

const Contact = () => {
  const contactInfo = [
    {
      icon: "☎",
      text: "+522 672-452-1120",
    },
    {
      icon: "✉",
      text: "example@yourwebsite.com",
    },
    {
      icon: "♧",
      text: "KA-62/1, Travel Agency, 45 Grand Central Terminal, New York.",
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "f" },
    { name: "Twitter", icon: "♥" },
    { name: "LinkedIn", icon: "in" },
    { name: "Pinterest", icon: "p" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted!");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#071727] mt-9">

      {/* Contact Banner */}
      <section className="relative overflow-hidden bg-[#2446f3]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 via-blue-700/80 to-blue-600/70" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Contact Us
          </h1>

          <div className="mt-4 h-0.5 w-12 bg-white" />

          <p className="mt-4 max-w-lg text-sm leading-6 text-white">
            Business plan draws on a wide range of knowledge from different
            business disciplines. Business draws on a wide range of different
            business.
          </p>

          <div className="mt-7 flex items-center gap-3 text-sm text-white">
            <span><Link to="/">Home</Link></span>
            <span>|</span>
            <span>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="bg-[#f5f8fc] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid overflow-hidden rounded-lg bg-white shadow-[0_12px_40px_rgba(0,0,0,0.10)] lg:grid-cols-5">

            {/* Contact Form */}
            <div className="p-6 sm:p-8 lg:col-span-3 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    aria-label="Your name"
                    required
                    className="w-full rounded border border-[#e7e7f5] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#2446f3] focus:ring-2 focus:ring-[#2446f3]/10"
                  />

                  <input
                    type="text"
                    name="subject"
                    placeholder="Your Subject"
                    aria-label="Your subject"
                    required
                    className="w-full rounded border border-[#e7e7f5] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#2446f3] focus:ring-2 focus:ring-[#2446f3]/10"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    aria-label="Your email"
                    required
                    className="w-full rounded border border-[#e7e7f5] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#2446f3] focus:ring-2 focus:ring-[#2446f3]/10"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    aria-label="Your phone"
                    className="w-full rounded border border-[#e7e7f5] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#2446f3] focus:ring-2 focus:ring-[#2446f3]/10"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  aria-label="Your message"
                  rows={6}
                  required
                  className="w-full resize-y rounded border border-[#e7e7f5] px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 focus:border-[#2446f3] focus:ring-2 focus:ring-[#2446f3]/10"
                />

                <button
                  type="submit"
                  className="rounded bg-[#2446f3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Submit Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-100 p-6 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0 lg:p-10">
              <h2 className="text-xl font-semibold">
                Contact Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Business consulting excepturi sint occaecat cupidatat
                consulting non proident.
              </p>

              <div className="mt-7 space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.text}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-0.5 w-5 shrink-0 text-lg text-[#2446f3]">
                      {info.icon}
                    </span>

                    <p className="text-sm leading-6 text-gray-500">
                      {info.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <h3 className="mt-10 font-semibold">
                Follow Us on
              </h3>

              <div className="mt-3 flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href="#social"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded bg-[#e9edf3] text-sm font-bold text-[#071727] transition hover:bg-[#2446f3] hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 overflow-hidden rounded-lg bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.10)]">
            <iframe
              title="Map showing New York"
              src="https://maps.google.com/maps?q=New%20York%20City&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="h-[280px] w-full rounded sm:h-[340px] lg:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
