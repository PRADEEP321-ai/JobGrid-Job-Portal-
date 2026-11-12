
import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Blog = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Rosalina Kelian',
      date: '20th May 2023',
      text: 'Great article! I really enjoyed reading about these useful features.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      name: 'Arista Williamson',
      date: '15th May 2023',
      text: 'Very informative article. Looking forward to more posts like this.',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    {
      id: 3,
      name: 'Arista Williamson',
      date: '12th May 2023',
      text: 'Thank you for sharing these helpful ideas with us.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ])

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newComment = {
      id: Date.now(),
      name: form.name,
      date: 'Just now',
      text: form.message,
      image: 'https://randomuser.me/api/portraits/lego/1.jpg',
    }

    setComments([...comments, newComment])

    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  return (
    <div className="mt-9 min-h-screen bg-[#f5f8fc] text-[#071727]">

      {/* Page Banner */}
      <section className="relative overflow-hidden bg-[#2446F3] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-[#2446F3]/70" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Blog Single
          </h1>

          <div className="mt-4 h-0.5 w-12 bg-white" />

          <p className="mt-4 max-w-lg text-xs leading-5 text-blue-50 sm:text-sm">
            Business plans draw on a wide range of knowledge from
            different business disciplines. Discover ideas and
            insights to help your career grow.
          </p>

          <div className="mt-6 flex gap-3 text-xs sm:text-sm">
            <span><Link to="/">Home</Link></span>
            <span>|</span>
            <span>Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Article */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">

        <article className="rounded-sm bg-white p-4 shadow-sm sm:p-7 md:p-8">

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85"
            alt="Professional looking towards the future"
            className="h-56 w-full rounded object-cover sm:h-80 md:h-[420px]"
          />

          <h2 className="mt-6 text-lg font-semibold sm:text-xl">
            Let's explore 5 cool new features in JobBoard theme
          </h2>

          {/* Blog Information */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
            <span>▣ 20th March 2023</span>
            <span>♧ {comments.length} Comments</span>
            <span>◉ 55 Views</span>
          </div>

          <p className="mt-5 text-sm leading-6 text-gray-500">
            We do embrace the power of knowledge and skills. In
            today's competitive world, staying updated with the
            latest trends is important. Our job board helps
            candidates discover opportunities and employers find
            the right talent. Explore these useful features and
            learn how they can make your job search easier.
          </p>

          {/* Two Images */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80"
              alt="Team meeting"
              className="h-48 w-full rounded object-cover sm:h-56"
            />

            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80"
              alt="Colleagues working together"
              className="h-48 w-full rounded object-cover sm:h-56"
            />
          </div>

          <h3 className="mt-6 text-lg font-semibold">
            A cleansing hot shower or bath
          </h3>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Good work habits and a positive environment
            can improve productivity, creativity, and confidence.
            Taking time to learn new skills can also help you
            grow professionally.
          </p>

          {/* Quote */}
          <div className="relative mt-6 overflow-hidden rounded bg-[#2446F3] p-5 text-white sm:p-7">
            <span className="text-4xl font-bold">“</span>

            <p className="mt-1 text-sm leading-6">
              Don't demand that things happen as you wish, but
              wish that they happen as they do happen, and you
              will go on well.
            </p>

            <p className="mt-4 text-xs text-blue-100">
              — Epictetus, The Enchiridion
            </p>

            <div className="absolute right-0 top-0 text-5xl text-blue-300/50">
              ⋮
            </div>
          </div>

          <h3 className="mt-6 text-lg font-semibold">
            Setting the mood with incense
          </h3>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Remove distractions and focus on your goals. A clear
            plan helps you make better decisions, improve your
            confidence, and prepare for new opportunities.
          </p>

          {/* Article Points */}
          <ul className="mt-5 space-y-3 text-sm text-gray-500">
            <li className="flex items-start gap-3">
              <span className="rounded bg-[#2446F3] px-2 text-white">›</span>
              The happiness of your life depends upon the quality of your thoughts.
            </li>

            <li className="flex items-start gap-3">
              <span className="rounded bg-[#2446F3] px-2 text-white">›</span>
              You have power over your mind, not outside events.
            </li>

            <li className="flex items-start gap-3">
              <span className="rounded bg-[#2446F3] px-2 text-white">›</span>
              The things you think about determine the quality of your mind.
            </li>
          </ul>

          <p className="mt-6 text-sm leading-6 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Keep learning, stay curious, and use every
            opportunity to improve your professional skills.
          </p>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Good preparation and continuous improvement
            can make a meaningful difference in your career.
          </p>

          {/* Tags and Social Links */}
          <div className="mt-7 flex flex-col justify-between gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">

            <div>
              <h3 className="mb-3 text-sm font-semibold">Related Tags</h3>

              <div className="flex flex-wrap gap-2">
                {['Announcement', 'Experiences', 'Market News'].map((tag) => (
                  <span
                    key={tag}
                    className="border border-gray-200 px-3 py-2 text-xs text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold sm:text-right">
                Social Share
              </h3>

              <div className="flex gap-2">
                {['Twitter', 'Facebook', 'Instagram'].map((social) => (
                  <button
                    key={social}
                    onClick={() => alert(`${social} sharing can be added later.`)}
                    className="border border-gray-200 px-3 py-2 text-xs hover:bg-blue-50"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Comments */}
          <section className="mt-7 border border-gray-100 p-4 sm:p-6">

            <h3 className="border-b border-gray-100 pb-4 text-lg font-semibold">
              {comments.length} Comments On This Post
            </h3>

            <div className="divide-y divide-gray-100">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-3 py-5 sm:gap-5"
                >
                  <img
                    src={comment.image}
                    alt=""
                    className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold">
                        {comment.name}
                      </h4>

                      <button
                        onClick={() => {
                          setForm({
                            ...form,
                            message: `@${comment.name} `,
                          })
                          document.getElementById('comment-form')?.scrollIntoView({
                            behavior: 'smooth',
                          })
                        }}
                        className="text-xs text-[#2446F3] hover:underline"
                      >
                        ↩ Reply
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                      {comment.date}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* Comment Form */}
          <section
            id="comment-form"
            className="mt-7 border border-gray-100 p-4 sm:p-6"
          >
            <h3 className="border-b border-gray-100 pb-4 text-lg font-semibold">
              Leave A Comment
            </h3>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#2446F3]"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#2446F3]"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Your Subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#2446F3]"
              />

              <textarea
                name="message"
                placeholder="Your Comments"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full resize-y rounded-sm border border-gray-200 px-4 py-4 text-sm outline-none focus:border-[#2446F3]"
              />

              <button
                type="submit"
                className="rounded-sm bg-[#2446F3] px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Post Comment
              </button>

            </form>
          </section>

        </article>
      </main>

    </div>
  )
}

export default Blog
