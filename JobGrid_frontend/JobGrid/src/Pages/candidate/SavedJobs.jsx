
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock,
  ArrowUpRight,
  Trash2,
  SlidersHorizontal,
  Building2,
  CalendarDays,
  Sparkles,
  IndianRupee,
} from "lucide-react";

const STORAGE_KEY = "jobgrid_saved_jobs";
const categories = ["All", "Java", "Frontend", "Backend"];

// Get saved jobs
const getSavedJobs = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

// Format salary
const formatSalary = (job) => {
  if (job.salary) return job.salary;

  if (job.salaryMin == null && job.salaryMax == null) {
    return "Salary not specified";
  }

  const min = job.salaryMin != null
    ? Number(job.salaryMin).toLocaleString("en-IN")
    : null;

  const max = job.salaryMax != null
    ? Number(job.salaryMax).toLocaleString("en-IN")
    : null;

  const salary = min && max
    ? `${min} - ${max}`
    : min
      ? `From ${min}`
      : `Up to ${max}`;

  return `${job.currency || "INR"} ${salary}${
    job.salaryPeriod ? ` / ${job.salaryPeriod}` : ""
  }`;
};

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState(getSavedJobs);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  // Remove saved job
  const removeSavedJob = (id) => {
    if (!window.confirm("Are you sure you want to remove this job?")) return;

    const updatedJobs = savedJobs.filter(
      (job) => String(job.id) !== String(id)
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  };

  // Search, filter and sort
  const filteredJobs = savedJobs
    .filter((job) => {
      const searchText = search.trim().toLowerCase();
      const skills = Array.isArray(job.skills) ? job.skills : [];

      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.category,
        job.industry,
        job.description,
        ...skills,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const jobCategory = [
        job.title,
        job.category,
        job.industry,
        ...skills,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchText);

      const matchesCategory =
        category === "All" ||
        (category === "Java" && jobCategory.includes("java")) ||
        (category === "Frontend" &&
          /frontend|react|web development|javascript|html|css/.test(jobCategory)) ||
        (category === "Backend" &&
          /backend|spring boot|python|node.js|server-side/.test(jobCategory));

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) =>
      sortBy === "company"
        ? (a.company || "").localeCompare(b.company || "")
        : (b.savedAt || 0) - (a.savedAt || 0)
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <Bookmark size={17} />
              <span>My Career</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Saved Jobs
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Keep track of the opportunities you want to apply for.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Search size={18} />
            Find More Jobs
          </Link>
        </div>

        {/* Summary card */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Bookmark size={27} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Saved Jobs
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {savedJobs.length}
              </p>
            </div>

            <div className="ml-auto hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 sm:block">
              <Sparkles size={15} className="mr-1 inline" />
              Your job shortlist
            </div>
          </div>
        </div>

        {/* Search and sorting */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by job title, company, location or skill..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="shrink-0 text-slate-500" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 sm:w-48"
              >
                <option value="recent">Recently Saved</option>
                <option value="company">Company Name</option>
              </select>
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Results heading */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Your Shortlist
          </h2>

          <p className="text-sm text-slate-500">
            {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
          </p>
        </div>

        {/* Saved job cards */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row">

                  {/* Company logo */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                    {(job.company || "J").charAt(0).toUpperCase()}
                  </div>

                  {/* Job details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {job.title || "Untitled job"}
                        </h3>

                        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-600">
                          <Building2 size={16} />
                          {job.company || "Company not specified"}
                        </p>
                      </div>

                      <span className="h-fit w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        {job.jobType || job.type || "Not specified"}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {job.location || "Location not specified"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <IndianRupee size={16} />
                        {formatSalary(job)}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <BriefcaseBusiness size={16} />
                        {job.experience || "Experience not specified"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {job.posted || "Saved job"}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                      {job.description || "No description available."}
                    </p>

                    {/* Skills */}
                    {Array.isArray(job.skills) && job.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="flex items-center gap-2 text-xs text-slate-400">
                        <CalendarDays size={15} />
                        Saved to your shortlist
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => removeSavedJob(job.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>

                        <Link
                          to={`/candidate_jobs/${job.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          View Details
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Bookmark size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No saved jobs found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {savedJobs.length === 0
                ? "You have not saved any jobs yet. Open a job and click Save Job to add it here."
                : "Try changing your search or selecting another category."}
            </p>

            <Link
              to="/candidate_jobs"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Jobs
              <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default SavedJobs;
