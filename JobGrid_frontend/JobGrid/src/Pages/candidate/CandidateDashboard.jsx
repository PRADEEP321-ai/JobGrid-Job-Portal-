
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Bookmark,
  FileText,
  CalendarDays,
  Search,
  MapPin,
  Clock,
  ArrowUpRight,
  ChevronRight,
  UserRound,
  Bell,
  CircleCheck,
  TrendingUp,
  Building2,
  ExternalLink,
} from "lucide-react";

const initialApplications = [
  {
    id: 1,
    role: "Java Full Stack Developer",
    company: "TechNova Solutions",
    location: "Pune, Maharashtra",
    date: "16 Oct 2026",
    status: "Under Review",
    type: "Full-time",
    logo: "T",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    role: "React Developer",
    company: "CodeCraft Technologies",
    location: "Remote",
    date: "14 Oct 2026",
    status: "Shortlisted",
    type: "Full-time",
    logo: "C",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    role: "Software Developer",
    company: "InnovateTech",
    location: "Mumbai, Maharashtra",
    date: "12 Oct 2026",
    status: "Applied",
    type: "Full-time",
    logo: "I",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 4,
    role: "Frontend Developer",
    company: "PixelWorks",
    location: "Pune, Maharashtra",
    date: "10 Oct 2026",
    status: "Interview",
    type: "Full-time",
    logo: "P",
    color: "bg-orange-100 text-orange-700",
  },
];

const recommendedJobs = [
  {
    id: 101,
    role: "Java Full Stack Developer",
    company: "TechNova Solutions",
    location: "Pune",
    salary: "₹4–6 LPA",
    type: "Full-time",
    posted: "2 days ago",
    logo: "T",
    color: "bg-blue-100 text-blue-700",
    skills: ["Java", "Spring Boot", "React"],
  },
  {
    id: 102,
    role: "React Developer",
    company: "WebSphere Labs",
    location: "Remote",
    salary: "₹3–5 LPA",
    type: "Full-time",
    posted: "1 day ago",
    logo: "W",
    color: "bg-violet-100 text-violet-700",
    skills: ["React", "JavaScript", "Tailwind"],
  },
  {
    id: 103,
    role: "Backend Java Developer",
    company: "CloudPeak Systems",
    location: "Pune",
    salary: "₹5–7 LPA",
    type: "Full-time",
    posted: "3 days ago",
    logo: "C",
    color: "bg-emerald-100 text-emerald-700",
    skills: ["Java", "Spring Boot", "MySQL"],
  },
];

const statusStyles = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  "Under Review": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Shortlisted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Interview: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Rejected: "bg-red-50 text-red-700 ring-red-600/20",
};

function StatCard({ title, value, subtitle, icon: Icon, iconStyle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
          <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconStyle}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

 function CandidateDashboard() {
  const [applications, setApplications] = useState(initialApplications);
  const [savedJobs, setSavedJobs] = useState([102]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobSearch, setJobSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [notice, setNotice] = useState("");

  const candidateName = "Pradeep Gauddab";

  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      `${app.role} ${app.company}`.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredJobs = recommendedJobs.filter((job) => {
    const matchesSearch =
      `${job.role} ${job.company} ${job.skills.join(" ")}`
        .toLowerCase()
        .includes(jobSearch.toLowerCase());

    const matchesLocation =
      locationFilter === "All" || job.location === locationFilter;

    return matchesSearch && matchesLocation;
  });

  const toggleSavedJob = (jobId) => {
    setSavedJobs((previous) =>
      previous.includes(jobId)
        ? previous.filter((id) => id !== jobId)
        : [...previous, jobId]
    );

    setNotice(
      savedJobs.includes(jobId)
        ? "Job removed from your saved list."
        : "Job added to your saved list."
    );
  };

  const withdrawApplication = (applicationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmed) return;

    setApplications((previous) =>
      previous.filter((app) => app.id !== applicationId)
    );

    setNotice("Application removed from this dashboard.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
        {/* Welcome section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-xl shadow-blue-200/50 sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-48 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Your career dashboard
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                Welcome back, {candidateName.split(" ")[0]}!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Keep track of your applications, discover new opportunities,
                and take the next step in your career.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
                >
                  <Search size={17} />
                  Find Jobs
                  <ArrowUpRight size={16} />
                </Link>

                <Link
                  to="/candidate/profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <UserRound size={17} />
                  Complete Profile
                </Link>
              </div>
            </div>

            <div className="hidden shrink-0 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm md:block md:w-64">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-blue-700">
                  P
                </div>
                <div>
                  <p className="font-semibold">{candidateName}</p>
                  <p className="mt-1 text-xs text-blue-100">
                    Aspiring Java Full Stack Developer
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/20 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-100">Profile completion</span>
                  <span className="font-bold">75%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-3/4 rounded-full bg-emerald-300" />
                </div>
                <Link
                  to="/candidate/profile"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white hover:underline"
                >
                  Improve your profile <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback message */}
        {notice && (
          <div
            role="status"
            className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800"
          >
            <span>{notice}</span>
            <button
              onClick={() => setNotice("")}
              className="font-semibold hover:text-blue-950"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Statistics */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={applications.length}
            subtitle="Applications in your dashboard"
            icon={FileText}
            iconStyle="bg-blue-50 text-blue-700"
          />
          <StatCard
            title="Shortlisted"
            value={shortlisted}
            subtitle="Companies interested in you"
            icon={CircleCheck}
            iconStyle="bg-emerald-50 text-emerald-700"
          />
          <StatCard
            title="Interviews"
            value={interviews}
            subtitle="Applications at interview stage"
            icon={CalendarDays}
            iconStyle="bg-violet-50 text-violet-700"
          />
          <StatCard
            title="Saved Jobs"
            value={savedJobs.length}
            subtitle="Opportunities saved for later"
            icon={Bookmark}
            iconStyle="bg-amber-50 text-amber-700"
          />
        </section>

        {/* Applications + right sidebar */}
        <section className="mt-8 grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-2">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Applications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Follow the progress of your job applications.
                </p>
              </div>

              <Link
                to="/candidate/applications"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                View all <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 sm:p-6">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search applications..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="All">All statuses</option>
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 transition hover:bg-slate-50/80 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 gap-3">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${app.color}`}
                        >
                          {app.logo}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900">
                            {app.role}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600">
                            {app.company}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={13} /> {app.location}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays size={13} /> {app.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                          statusStyles[app.status] ||
                          "bg-slate-100 text-slate-700 ring-slate-300"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                      <span className="text-xs text-slate-500">
                        {app.type}
                      </span>

                      <button
                        onClick={() => withdrawApplication(app.id)}
                        className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Withdraw application
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <FileText
                    size={30}
                    className="mx-auto text-slate-300"
                  />
                  <p className="mt-3 font-semibold text-slate-800">
                    No applications found
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or status filter.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Quick Actions
                </h2>
                <TrendingUp size={20} className="text-blue-600" />
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  to="/jobs"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="rounded-lg bg-blue-100 p-2.5 text-blue-700">
                    <Search size={19} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Explore Jobs
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Find your next opportunity
                    </p>
                  </div>
                  <ChevronRight
                    size={17}
                    className="text-slate-400 transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/candidate/profile"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="rounded-lg bg-violet-100 p-2.5 text-violet-700">
                    <UserRound size={19} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Update Profile
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Keep your details up to date
                    </p>
                  </div>
                  <ChevronRight
                    size={17}
                    className="text-slate-400 transition group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/candidate/settings"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="rounded-lg bg-amber-100 p-2.5 text-amber-700">
                    <Bell size={19} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Preferences
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Manage your account settings
                    </p>
                  </div>
                  <ChevronRight
                    size={17}
                    className="text-slate-400 transition group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-3 text-blue-700 shadow-sm">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Make your profile stand out
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Help recruiters understand your skills.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-slate-600">Profile completion</span>
                <span className="font-bold text-blue-700">75%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100">
                <div className="h-full w-3/4 rounded-full bg-blue-600" />
              </div>

              <Link
                to="/candidate/profile"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Complete Profile <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Recommended jobs */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                  <BriefcaseBusiness size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recommended Jobs
                </h2>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Explore roles that match your Java and frontend skills.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Browse all jobs <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="Search role, company or skill..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="All">All locations</option>
              <option value="Pune">Pune</option>
              <option value="Remote">Remote</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="flex flex-col rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${job.color}`}
                  >
                    {job.logo}
                  </div>

                  <button
                    onClick={() => toggleSavedJob(job.id)}
                    aria-label={
                      savedJobs.includes(job.id)
                        ? "Remove saved job"
                        : "Save job"
                    }
                    title={
                      savedJobs.includes(job.id)
                        ? "Remove saved job"
                        : "Save job"
                    }
                    className={`rounded-lg border p-2 transition ${
                      savedJobs.includes(job.id)
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-700"
                    }`}
                  >
                    <Bookmark
                      size={18}
                      fill={savedJobs.includes(job.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <h3 className="mt-4 font-bold text-slate-900">{job.role}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                  <Building2 size={15} />
                  {job.company}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {job.type}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 mt-5">
                  <div>
                    <p className="font-bold text-slate-900">{job.salary}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {job.posted}
                    </p>
                  </div>

                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Job <ExternalLink size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="py-10 text-center">
              <Search size={28} className="mx-auto text-slate-300" />
              <p className="mt-3 font-semibold text-slate-800">
                No matching jobs
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try another keyword or location.
              </p>
            </div>
          )}
        </section>

        {/* Footer note */}
        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© 2026 JobGrids. Build your future, one application at a time.</p>
          <p className="flex items-center gap-1">
            Made for your next career move <TrendingUp size={14} />
          </p>
        </footer>
      </main>
    </div>
  );
}

export default CandidateDashboard