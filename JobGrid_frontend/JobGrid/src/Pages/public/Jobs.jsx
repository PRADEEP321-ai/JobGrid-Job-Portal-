import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../../config";

const API_URL = `${API_BASE}/api/jobs/getJobs`;
const PAGE_SIZE = 6; // jobs on one page

const Jobs = () => {
  // data
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filters + page
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState(0);
  const [page, setPage] = useState(1);

  // 1. get jobs from backend using axios
  const getJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setJobs(res.data.reverse()); // reverse -> newest job first
    } catch (err) {
      setError("Unable to load jobs. Please try again.");
    }

    setLoading(false);
  };

  // runs one time when page opens
  useEffect(() => {
    getJobs();
  }, []);

  // 2. filter the jobs
  const filteredJobs = jobs
    .filter((job) => job.title.toLowerCase().includes(search.toLowerCase()))
    .filter((job) => category === "" || job.category === category)
    .filter((job) => type === "" || job.jobType === type)
    .filter((job) => job.salaryMin >= salary);

  // 3. pagination (show only 6 jobs of the current page)
  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const currentJobs = filteredJobs.slice(start, start + PAGE_SIZE);

  // all different categories for the dropdown
  const categories = [...new Set(jobs.map((job) => job.category))];

  // change a filter and go back to page 1
  const changeFilter = (setFilter, value) => {
    setFilter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setType("");
    setSalary(0);
    setPage(1);
  };

  // salary text like "₹3,00,000 - ₹6,00,000 / year"
  const getSalary = (job) => {
    const min = Number(job.salaryMin).toLocaleString("en-IN");
    const max = Number(job.salaryMax).toLocaleString("en-IN");
    const period = (job.salaryPeriod || "YEAR").toLowerCase();

    return `₹${min} - ₹${max} / ${period}`;
  };

  return (
    <div className="mt-9 min-h-screen bg-[#f5f8fc] text-[#071727]">

      {/* Banner */}
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
          <h1 className="text-2xl font-bold sm:text-3xl">Browse Jobs</h1>
          <div className="mt-4 h-0.5 w-12 bg-white" />

          <p className="mt-4 max-w-lg text-sm leading-6 text-blue-50">
            Find opportunities that match your skills and career goals.
          </p>

          <div className="mt-6 flex gap-3 text-sm">
            <Link to="/">Home</Link>
            <span>|</span>
            <span>Jobs</span>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm sm:flex-row"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => changeFilter(setSearch, e.target.value)}
            placeholder="Search job title..."
            className="min-w-0 flex-1 rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#2446F3]"
          />

          <button
            type="submit"
            className="rounded bg-[#2446F3] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Search Jobs
          </button>
        </form>
      </section>

      {/* Filters and Jobs */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">

          {/* Filter Sidebar */}
          <aside className="h-fit rounded border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Filters</h2>

              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-[#2446F3] hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="mb-3 block text-sm font-semibold">Category</label>

              <select
                value={category}
                onChange={(e) => changeFilter(setCategory, e.target.value)}
                className="w-full rounded border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#2446F3]"
              >
                <option value="">All Categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div className="mb-5">
              <label className="mb-3 block text-sm font-semibold">Job Type</label>

              {["", "Full Time", "Part Time", "Intern"].map((item) => (
                <label
                  key={item || "all"}
                  className="mb-3 flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                >
                  <input
                    type="radio"
                    name="jobType"
                    checked={type === item}
                    onChange={() => changeFilter(setType, item)}
                    className="h-4 w-4 accent-[#2446F3]"
                  />
                  {item || "All Types"}
                </label>
              ))}
            </div>

            {/* Minimum Salary */}
            <div>
              <label className="mb-3 block text-sm font-semibold">Minimum Salary</label>

              <select
                value={salary}
                onChange={(e) => changeFilter(setSalary, Number(e.target.value))}
                className="w-full rounded border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#2446F3]"
              >
                <option value={0}>Any Salary</option>
                <option value={300000}>₹3 LPA and above</option>
                <option value={400000}>₹4 LPA and above</option>
                <option value={500000}>₹5 LPA and above</option>
                <option value={800000}>₹8 LPA and above</option>
              </select>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              {filteredJobs.length} jobs found
            </p>
          </aside>

          {/* Job List */}
          <div className="lg:col-span-3">

            {/* Loading */}
            {loading && (
              <p className="rounded bg-white p-8 text-center text-gray-500">
                Loading jobs...
              </p>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="rounded border border-red-200 bg-white p-8 text-center">
                <p className="text-sm text-red-600">{error}</p>

                <button
                  onClick={getJobs}
                  className="mt-4 rounded bg-[#2446F3] px-4 py-2 text-sm text-white"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Job cards */}
            {!loading && !error && currentJobs.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50 text-2xl">
                        💼
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="font-semibold">{job.title}</h2>
                        <p className="mt-1 text-sm text-gray-500">{job.company}</p>
                      </div>
                    </div>

                    <div className="my-4 border-t border-gray-100" />

                    <p className="line-clamp-3 text-sm leading-6 text-gray-500">
                      {job.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded bg-indigo-50 px-3 py-2 text-gray-600">
                        🗂 {job.category}
                      </span>

                      <span className="rounded bg-indigo-50 px-3 py-2 text-[#2446F3]">
                        💰 {getSalary(job)}
                      </span>

                      <span className="rounded bg-blue-50 px-3 py-2 text-blue-700">
                        {job.jobType}
                      </span>
                    </div>

                    <div className="mt-5">
                      <Link
                        to={`/login`}
                        className="inline-block rounded bg-[#2446F3] px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && !error && currentJobs.length === 0 && (
              <div className="rounded border border-gray-200 bg-white p-10 text-center">
                <h3 className="font-bold">No jobs found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-4 rounded bg-[#2446F3] px-4 py-2 text-sm text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded border border-gray-200 bg-white px-4 py-2 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`rounded border px-4 py-2 ${
                      page === number
                        ? "border-[#2446F3] bg-[#2446F3] text-white"
                        : "border-gray-200 bg-white hover:bg-blue-50"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded border border-gray-200 bg-white px-4 py-2 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;