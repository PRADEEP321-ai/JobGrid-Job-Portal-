import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  FileText,
  CheckCircle2,
  Timer,
  Eye,
  Trash2,
  ChevronRight,
  SlidersHorizontal,
  Building2,
  ArrowUpRight,
  X,
  IndianRupee,
} from "lucide-react";

const STORAGE_KEY = "jobgrid_applications";

const statusStyles = {
  Applied: "bg-blue-50 text-blue-700 border-blue-200",
  "Under Review": "bg-amber-50 text-amber-700 border-amber-200",
  Shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Interview: "bg-violet-50 text-violet-700 border-violet-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

const statuses = [
  "All",
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Rejected",
];

// Read applications saved by JobDetail.jsx
function getApplications() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Convert your Spring Boot job fields into display fields
function prepareApplication(app) {
  const appliedAt = app.appliedAt || app.appliedDate;

  let appliedDate = "Date unavailable";

  if (appliedAt) {
    const date = new Date(appliedAt);

    if (!Number.isNaN(date.getTime())) {
      appliedDate = date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  let salary = "Not specified";

  if (app.salary) {
    salary = app.salary;
  } else if (app.salaryMin != null || app.salaryMax != null) {
    const min =
      app.salaryMin != null
        ? Number(app.salaryMin).toLocaleString("en-IN")
        : null;

    const max =
      app.salaryMax != null
        ? Number(app.salaryMax).toLocaleString("en-IN")
        : null;

    salary = `${app.currency || "INR"} ${
      min && max
        ? `${min} - ${max}`
        : min
          ? `From ${min}`
          : `Up to ${max}`
    }${app.salaryPeriod ? ` / ${app.salaryPeriod}` : ""}`;
  }

  return {
    ...app,
    role: app.role || app.title || "Untitled Job",
    company: app.company || "Company not specified",
    location: app.location || "Location not specified",
    type: app.type || app.jobType || "Not specified",
    description: app.description || "No description available.",
    skills: Array.isArray(app.skills) ? app.skills : [],
    status: app.status || "Applied",
    appliedDate,
    salary,
    logo: (app.company || "J").charAt(0).toUpperCase(),
    logoColor: "bg-blue-100 text-blue-700",
  };
}

function StatCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={23} />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function CandidateApplications() {
  const [applications, setApplications] = useState(getApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [notice, setNotice] = useState("");

  // Sync application changes with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  // Read again when the user returns to this tab
  useEffect(() => {
    function refreshApplications() {
      setApplications(getApplications());
    }

    window.addEventListener("focus", refreshApplications);

    return () => {
      window.removeEventListener("focus", refreshApplications);
    };
  }, []);

  const displayApplications = applications.map(prepareApplication);

  const total = applications.length;

  const shortlisted = displayApplications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const interviews = displayApplications.filter(
    (app) => app.status === "Interview"
  ).length;

  const inProgress = displayApplications.filter((app) =>
    ["Applied", "Under Review"].includes(app.status)
  ).length;

  const filteredApplications = displayApplications.filter((app) => {
    const searchText =
      `${app.role} ${app.company} ${app.location}`.toLowerCase();

    const matchesSearch = searchText.includes(search.trim().toLowerCase());

    const matchesStatus =
      statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleWithdraw(id) {
    const application = applications.find(
      (app) => String(app.id) === String(id)
    );

    if (!application) return;

    const confirmed = window.confirm(
      `Are you sure you want to withdraw your application for ${
        application.title || application.role || "this job"
      }?`
    );

    if (!confirmed) return;

    const updatedApplications = applications.filter(
      (app) => String(app.id) !== String(id)
    );

    setApplications(updatedApplications);
    setSelectedApplication(null);
    setNotice("Application removed from your application list.");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link to="/candidate/dashboard" className="hover:text-blue-700">
                Dashboard
              </Link>
              <ChevronRight size={15} />
              <span className="font-medium text-slate-800">
                My Applications
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Applications
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Track your applications and hiring progress.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Search size={17} />
            Find More Jobs
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Notice */}
        {notice && (
          <div
            role="status"
            className="mt-5 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800"
          >
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              className="font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Statistics */}
        <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={total}
            description="All your applications"
            icon={FileText}
            color="bg-blue-50 text-blue-700"
          />

          <StatCard
            title="In Progress"
            value={inProgress}
            description="Applied or under review"
            icon={Timer}
            color="bg-amber-50 text-amber-700"
          />

          <StatCard
            title="Shortlisted"
            value={shortlisted}
            description="Companies interested in you"
            icon={CheckCircle2}
            color="bg-emerald-50 text-emerald-700"
          />

          <StatCard
            title="Interviews"
            value={interviews}
            description="Applications at interview stage"
            icon={CalendarDays}
            color="bg-violet-50 text-violet-700"
          />
        </section>

        {/* Applications */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              All Applications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              You have {total} application{total !== 1 ? "s" : ""}.
            </p>

            {/* Search */}
            <div className="mt-5 flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by job title, company or location..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="relative lg:w-56">
                <SlidersHorizontal
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "All" ? "All Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status chips */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {statuses.map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                    statusFilter === status
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Application cards */}
          <div className="divide-y divide-slate-100">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <article key={app.id} className="p-5 hover:bg-slate-50 sm:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold ${app.logoColor}`}
                      >
                        {app.logo}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                            {app.role}
                          </h3>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                              statusStyles[app.status] ||
                              "border-slate-200 bg-slate-50 text-slate-700"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                          <Building2 size={15} />
                          {app.company}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 sm:text-sm">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={15} />
                            {app.location}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <BriefcaseBusiness size={15} />
                            {app.type}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={15} />
                            Applied {app.appliedDate}
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                          {app.description}
                        </p>

                        {app.skills.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {app.skills.map((skill, index) => (
                              <span
                                key={`${skill}-${index}`}
                                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 lg:min-w-44 lg:flex-col lg:items-end lg:border-0 lg:pt-0">
                      <p className="flex items-center text-sm font-bold text-slate-900">
                        {app.salary !== "Not specified" && (
                          <IndianRupee size={15} />
                        )}
                        {app.salary}
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedApplication(app)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={15} />
                          Details
                        </button>

                        {app.status !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() => handleWithdraw(app.id)}
                            aria-label={`Withdraw application for ${app.role}`}
                            className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <FileText size={27} />
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  {total === 0
                    ? "You haven't applied for any jobs yet"
                    : "No applications found"}
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                  {total === 0
                    ? "Browse jobs and click Apply Now. Your applications will appear here."
                    : "Try another search or change your status filter."}
                </p>

                {total === 0 ? (
                  <Link
                    to="/jobs"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Browse Jobs
                    <ArrowUpRight size={16} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                    }}
                    className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Details modal */}
        {selectedApplication && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedApplication(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="application-modal-title"
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="application-modal-title"
                    className="text-xl font-bold text-slate-900"
                  >
                    Application Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedApplication.company}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
                  aria-label="Close details"
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedApplication.role}
                </h3>

                <span
                  className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                    statusStyles[selectedApplication.status] || ""
                  }`}
                >
                  {selectedApplication.status}
                </span>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {selectedApplication.description}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedApplication.location}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Job Type</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedApplication.type}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Salary</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedApplication.salary}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs text-slate-500">Applied Date</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedApplication.appliedDate}
                  </p>
                </div>
              </div>

              {selectedApplication.skills.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-bold text-slate-900">
                    Skills
                  </h4>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedApplication.skills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>

                {selectedApplication.status !== "Rejected" && (
                  <button
                    type="button"
                    onClick={() => handleWithdraw(selectedApplication.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                    Withdraw Application
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Helpful note */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
          <h3 className="text-sm font-bold text-slate-900">
            Keep track of your applications
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            New applications start with Applied status. Status updates from
            employers will require backend integration.
          </p>
        </div>
      </main>
    </div>
  );
}

export default CandidateApplications;
