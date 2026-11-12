
import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import {
  BriefcaseBusiness,
  Building2,
  Users,
  FileText,
  TrendingUp,
  Plus,
  Zap,
  Bell,
  ChevronRight,
} from "lucide-react";

const AdminDashboard = () => {
  // Dashboard statistics
  const stats = [
    {
      title: "Total Jobs",
      value: "24",
      growth: "+12%",
      icon: BriefcaseBusiness,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Companies",
      value: "8",
      growth: "+33%",
      icon: Building2,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Total Candidates",
      value: "156",
      growth: "+18%",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Applications",
      value: "342",
      growth: "+27%",
      icon: FileText,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  // Sample job posting data for the line chart
  const jobData = [4, 7, 5, 9, 12, 15];
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  // Sample application data for the bar chart
  const applicationData = [58, 90, 78, 106, 120, 153];

  // Quick action links
  const actions = [
    {
      title: "Add New Job",
      subtitle: "Post a new job opening",
      path: "/admin/add-job",
      icon: Plus,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Manage Companies",
      subtitle: "View and manage companies",
      path: "/admin/companies",
      icon: Building2,
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      title: "Manage Candidates",
      subtitle: "View candidate profiles",
      path: "/admin/candidates",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Manage Jobs",
      subtitle: "Edit or view all jobs",
      path: "/admin/jobs",
      icon: BriefcaseBusiness,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  // Recent companies
  const companies = [
    {
      name: "TechNova Solutions",
      industry: "IT & Software",
      jobs: 4,
      status: "Verified",
      initial: "T",
      color: "bg-blue-500",
    },
    {
      name: "CodeCraft Technologies",
      industry: "Software Development",
      jobs: 3,
      status: "Verified",
      initial: "C",
      color: "bg-purple-500",
    },
    {
      name: "InnovateTech",
      industry: "Technology",
      jobs: 2,
      status: "Pending",
      initial: "I",
      color: "bg-emerald-500",
    },
    {
      name: "CloudPeak Systems",
      industry: "Cloud Computing",
      jobs: 5,
      status: "Verified",
      initial: "C",
      color: "bg-orange-500",
    },
  ];

  // Recent candidates
  const candidates = [
    {
      name: "Pradeep Gauddab",
      skills: "Java, React, MySQL",
      applied: "Today",
      status: "Active",
      initial: "PG",
    },
    {
      name: "Sneha Patil",
      skills: "Python, Django, SQL",
      applied: "Today",
      status: "Active",
      initial: "SP",
    },
    {
      name: "Rohit Sharma",
      skills: "Java, Spring Boot",
      applied: "Yesterday",
      status: "Active",
      initial: "RS",
    },
    {
      name: "Anjali Deshmukh",
      skills: "React, Tailwind, JS",
      applied: "Yesterday",
      status: "Inactive",
      initial: "AD",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f8fe]">

      <main className="mx-auto max-w-[1600px] space-y-5 p-5 md:p-8">

        {/* Welcome heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#10234d] md:text-3xl">
              Welcome, Admin 👋
            </h1>
            <p className="mt-2 text-sm text-[#58709e] md:text-base">
              Here's what's happening on your platform today.
            </p>
          </div>

          <div className="rounded-xl bg-blue-100/70 px-4 py-3 text-sm text-[#58709e]">
            📅 Sunday, 27 April 2025
          </div>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-blue-100 bg-white p-5 shadow-sm"
              >
                <div className={`rounded-2xl p-4 ${item.color}`}>
                  <Icon size={30} />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#344c79]">
                    {item.title}
                  </p>
                  <h2 className="mt-1 text-3xl font-bold text-[#10234d]">
                    {item.value}
                  </h2>
                  <p className="mt-3 text-sm font-semibold text-emerald-500">
                    ↑ {item.growth}
                  </p>
                  <p className="text-xs text-[#58709e]">
                    vs. last month
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts and quick actions */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">

          {/* Job postings line chart */}
          <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm xl:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <TrendingUp className="text-blue-600" size={25} />
              <h2 className="font-bold text-[#10234d]">
                Job Postings Overview
              </h2>
            </div>

            <div className="relative pl-8">
              <div className="absolute inset-y-0 left-0 flex flex-col justify-between pb-7 text-xs text-[#58709e]">
                <span>20</span>
                <span>15</span>
                <span>10</span>
                <span>5</span>
                <span>0</span>
              </div>

              <div className="relative h-48 border-b border-l border-blue-100">
                {[0, 1, 2, 3, 4].map((line) => (
                  <div
                    key={line}
                    className="absolute w-full border-t border-blue-100"
                    style={{ top: `${line * 25}%` }}
                  />
                ))}

                <svg
                  viewBox="0 0 300 160"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="jobArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  <polygon
                    points="15,128 69,96 123,112 177,80 231,48 285,24 285,160 15,160"
                    fill="url(#jobArea)"
                  />

                  <polyline
                    points="15,128 69,96 123,112 177,80 231,48 285,24"
                    fill="none"
                    stroke="#2677ff"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />

                  {[15, 69, 123, 177, 231, 285].map((x, i) => (
                    <circle
                      key={x}
                      cx={x}
                      cy={[128, 96, 112, 80, 48, 24][i]}
                      r="3"
                      fill="#2677ff"
                    />
                  ))}
                </svg>
              </div>

              <div className="mt-3 flex justify-between text-xs text-[#58709e]">
                {months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Applications bar chart */}
          <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm xl:col-span-4">
            <div className="mb-6 flex items-center gap-3">
              <TrendingUp className="text-blue-600" size={25} />
              <h2 className="font-bold text-[#10234d]">
                Applications Trend
              </h2>
            </div>

            <div className="relative pl-8">
              <div className="absolute inset-y-0 left-0 flex flex-col justify-between pb-7 text-xs text-[#58709e]">
                <span>200</span>
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>

              <div className="relative flex h-48 items-end justify-around border-b border-l border-blue-100 px-2">
                {[0, 1, 2, 3, 4].map((line) => (
                  <div
                    key={line}
                    className="absolute left-0 w-full border-t border-blue-100"
                    style={{ top: `${line * 25}%` }}
                  />
                ))}

                {applicationData.map((value, index) => (
                  <div
                    key={months[index]}
                    className="z-10 w-7 rounded-t-sm bg-blue-500 transition hover:bg-blue-700 sm:w-9"
                    style={{ height: `${(value / 200) * 100}%` }}
                    title={`${value} applications`}
                  />
                ))}
              </div>

              <div className="mt-3 flex justify-between text-xs text-[#58709e]">
                {months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm xl:col-span-3">
            <div className="mb-5 flex items-center gap-3">
              <Zap className="text-blue-600" size={25} />
              <h2 className="font-bold text-[#10234d]">
                Quick Actions
              </h2>
            </div>

            <div className="space-y-3">
              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.title}
                    to={action.path}
                    className={`flex items-center justify-between gap-2 rounded-xl p-3 text-white transition ${action.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white p-2 text-blue-600">
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {action.title}
                        </p>
                        <p className="mt-1 text-xs text-white/90">
                          {action.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight size={20} />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* Recent companies and candidates */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

          {/* Companies table */}
          <section className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <Building2 className="text-blue-600" size={24} />
                <h2 className="font-bold text-[#10234d]">
                  Recent Companies
                </h2>
              </div>

              <Link
                to="/admin/companies"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="overflow-x-auto px-4 pb-4">
              <table className="w-full min-w-[540px] text-left text-xs">
                <thead className="bg-[#f2f7fd] text-[#344c79]">
                  <tr>
                    <th className="rounded-l-lg p-3">Company</th>
                    <th className="p-3">Industry</th>
                    <th className="p-3">Jobs</th>
                    <th className="rounded-r-lg p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {companies.map((company) => (
                    <tr
                      key={company.name}
                      className="border-b border-blue-50 text-[#58709e]"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3 whitespace-nowrap">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${company.color}`}>
                            {company.initial}
                          </div>
                          {company.name}
                        </div>
                      </td>

                      <td className="p-3">{company.industry}</td>
                      <td className="p-3">{company.jobs}</td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 font-semibold ${
                            company.status === "Verified"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {company.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Candidates table */}
          <section className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <Users className="text-blue-600" size={24} />
                <h2 className="font-bold text-[#10234d]">
                  Recent Candidates
                </h2>
              </div>

              <Link
                to="/admin/candidates"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="overflow-x-auto px-4 pb-4">
              <table className="w-full min-w-[540px] text-left text-xs">
                <thead className="bg-[#f2f7fd] text-[#344c79]">
                  <tr>
                    <th className="rounded-l-lg p-3">Name</th>
                    <th className="p-3">Skills</th>
                    <th className="p-3">Applied</th>
                    <th className="rounded-r-lg p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {candidates.map((candidate) => (
                    <tr
                      key={candidate.email || candidate.name}
                      className="border-b border-blue-50 text-[#58709e]"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3 whitespace-nowrap">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                            {candidate.initial}
                          </div>
                          {candidate.name}
                        </div>
                      </td>

                      <td className="p-3">{candidate.skills}</td>
                      <td className="whitespace-nowrap p-3">
                        {candidate.applied}
                      </td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 font-semibold ${
                            candidate.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {candidate.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
