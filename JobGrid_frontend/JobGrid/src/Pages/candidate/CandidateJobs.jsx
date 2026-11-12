
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE } from "../../config";

const API_URL = `${API_BASE}/api/jobs/getJobs`;
const PAGE_SIZE = 6;

function CandidateJobs() {
  // Jobs data
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters and pagination
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState(0);
  const [page, setPage] = useState(1);

  // Fetch jobs from Spring Boot
  const getJobs = async () => {
    setLoading(true);
    setError("");

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 

      // Support either a direct array or a wrapped response
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data?.content)
            ? res.data.content
            : [];

      setJobs([...data].reverse());
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Unable to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const title = (job.title || "").toLowerCase();
    const company = (job.company || "").toLowerCase();
    const searchText = search.toLowerCase();

    const matchesSearch =
      title.includes(searchText) || company.includes(searchText);

    const matchesCategory =
      !category || job.category === category;

    const matchesType =
      !type || job.jobType === type;

    const matchesSalary =
      Number(job.salaryMin || 0) >= salary;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesSalary
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const currentJobs = filteredJobs.slice(start, start + PAGE_SIZE);

  // Unique categories and job types from backend data
  const categories = [
    ...new Set(jobs.map((job) => job.category).filter(Boolean)),
  ];

  const jobTypes = [
    ...new Set(jobs.map((job) => job.jobType).filter(Boolean)),
  ];

  // Update filters and reset page
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

  // Format salary
  const getSalary = (job) => {
    const currencySymbols = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
    };

    const symbol = currencySymbols[job.currency] || `${job.currency || ""} `;

    const min = Number(job.salaryMin || 0).toLocaleString("en-IN");
    const max = Number(job.salaryMax || 0).toLocaleString("en-IN");

    const periodLabels = {
      YEAR: "year",
      MONTH: "month",
      DAY: "day",
      HOUR: "hour",
    };

    const period =
      periodLabels[(job.salaryPeriod || "YEAR").toUpperCase()] ||
      (job.salaryPeriod || "year").toLowerCase();

    return `${symbol}${min} - ${symbol}${max} / ${period}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-7">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            CANDIDATE PORTAL
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#071727] sm:text-4xl">
            Find your next job
          </h1>

          <p className="mt-2 text-slate-500">
            Discover opportunities that match your skills and career goals.
          </p>
        </div>

        {/* Search */}
        <section className="mx-auto max-w-7xl pt-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm sm:flex-row"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => changeFilter(setSearch, e.target.value)}
              placeholder="Search job title or company..."
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
        <section className="mx-auto max-w-7xl py-8 sm:py-12">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">

            {/* Filter Sidebar */}
            <aside className="h-fit rounded border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-[#2446F3] hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Category */}
              <div className="mb-5">
                <label className="mb-3 block text-sm font-semibold">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    changeFilter(setCategory, e.target.value)
                  }
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
                <label className="mb-3 block text-sm font-semibold">
                  Job Type
                </label>

                {["", ...jobTypes].map((item) => (
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
                <label className="mb-3 block text-sm font-semibold">
                  Minimum Salary
                </label>

                <select
                  value={salary}
                  onChange={(e) =>
                    changeFilter(setSalary, Number(e.target.value))
                  }
                  className="w-full rounded border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#2446F3]"
                >
                  <option value={0}>Any Salary</option>
                  <option value={300000}>₹3 lakh and above</option>
                  <option value={400000}>₹4 lakh and above</option>
                  <option value={500000}>₹5 lakh and above</option>
                  <option value={800000}>₹8 lakh and above</option>
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
                    type="button"
                    onClick={getJobs}
                    className="mt-4 rounded bg-[#2446F3] px-4 py-2 text-sm text-white"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Job Cards */}
              {!loading && !error && currentJobs.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  {currentJobs.map((job, index) => (
                    <div
                      key={job.id ?? `${job.title}-${index}`}
                      className="rounded border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                          💼
                        </div>

                        <div className="min-w-0 flex-1">
                          <h2 className="font-semibold">
                            {job.title || "Untitled Job"}
                          </h2>

                          <p className="mt-1 text-sm text-gray-500">
                            {job.company || "Company not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="my-4 border-t border-gray-100" />

                      <p className="line-clamp-3 text-sm leading-6 text-gray-500">
                        {job.description || "No description available."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {job.category && (
                          <span className="rounded bg-indigo-50 px-3 py-2 text-gray-600">
                            🗂 {job.category}
                          </span>
                        )}

                        <span className="rounded bg-indigo-50 px-3 py-2 text-[#2446F3]">
                          💰 {getSalary(job)}
                        </span>

                        {job.jobType && (
                          <span className="rounded bg-blue-50 px-3 py-2 text-blue-700">
                            {job.jobType}
                          </span>
                        )}
                      </div>

                      {job.deadline && (
                        <p className="mt-3 text-xs text-gray-500">
                          Apply before: {job.deadline}
                        </p>
                      )}

                      <div className="mt-5">

                        <Link
                          to={`/candidate_jobs/${job.id}`}
                          className="inline-block rounded bg-[#2446F3] px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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
                    type="button"
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
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((previous) => previous - 1)}
                    className="rounded border border-gray-200 bg-white px-4 py-2 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ←
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, i) => i + 1
                  ).map((number) => (
                    <button
                      type="button"
                      key={number}
                      onClick={() => setPage(number)}
                      className={`rounded border px-4 py-2 ${page === number
                        ? "border-[#2446F3] bg-[#2446F3] text-white"
                        : "border-gray-200 bg-white hover:bg-blue-50"
                        }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setPage((previous) => previous + 1)}
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
    </div>
  );
}

export default CandidateJobs;
