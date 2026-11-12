
import { useState } from "react";
import { Link } from "react-router-dom";

function CompanyDashboard() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Java Full Stack Developer",
      type: "Full-time",
      applicants: 25,
      status: "Active",
      postedDate: "18 Oct 2026",
    },
    {
      id: 2,
      title: "React Developer",
      type: "Internship",
      applicants: 18,
      status: "Active",
      postedDate: "16 Oct 2026",
    },
    {
      id: 3,
      title: "Backend Developer",
      type: "Full-time",
      applicants: 12,
      status: "Closed",
      postedDate: "14 Oct 2026",
    },
  ]);

  const [applicants] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      jobTitle: "Java Full Stack Developer",
      experience: "Fresher",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Patil",
      jobTitle: "React Developer",
      experience: "1 Year",
      status: "Shortlisted",
    },
    {
      id: 3,
      name: "Amit Kulkarni",
      jobTitle: "Backend Developer",
      experience: "2 Years",
      status: "Pending",
    },
  ]);

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) => job.status === "Active"
  ).length;

  const totalApplicants = jobs.reduce(
    (total, job) => total + job.applicants,
    0
  );

  const pendingApplicants = applicants.filter(
    (applicant) => applicant.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Welcome Section */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              COMPANY WORKSPACE
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Company Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Welcome back, TechNova Solutions!
              Manage your jobs and candidates in one place.
            </p>
          </div>

          <Link
            to="/company/post-job"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Post a New Job
          </Link>
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/company/post-job"
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-xl">
                +
              </div>
              <h3 className="font-semibold text-gray-900">
                Post a Job
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Create a new job opening.
              </p>
            </Link>

            <Link
              to="/company/manage-jobs"
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 text-xl">
                ≡
              </div>
              <h3 className="font-semibold text-gray-900">
                Manage Jobs
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                View and manage job postings.
              </p>
            </Link>

            <Link
              to="/company/applicants"
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-xl">
                ♙
              </div>
              <h3 className="font-semibold text-gray-900">
                Applicants
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Review candidate applications.
              </p>
            </Link>

            <Link
              to="/company/profile"
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-100 text-xl">
                ◉
              </div>
              <h3 className="font-semibold text-gray-900">
                Company Profile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Update company information.
              </p>
            </Link>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Overview
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Jobs"
              value={totalJobs}
              description="All job postings"
              icon="▤"
              iconStyle="bg-blue-100 text-blue-700"
            />

            <StatCard
              title="Active Jobs"
              value={activeJobs}
              description="Currently accepting applications"
              icon="✓"
              iconStyle="bg-green-100 text-green-700"
            />

            <StatCard
              title="Total Applicants"
              value={totalApplicants}
              description="Across all job postings"
              icon="♙"
              iconStyle="bg-purple-100 text-purple-700"
            />

            <StatCard
              title="Pending Applications"
              value={pendingApplicants}
              description="Awaiting review"
              icon="◷"
              iconStyle="bg-orange-100 text-orange-700"
            />
          </div>
        </section>

        {/* Recent Jobs */}
        <section className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Job Postings
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Overview of your latest job openings.
              </p>
            </div>

            <Link
              to="/company/manage-jobs"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              View All Jobs →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Job Title</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Applicants</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Posted Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {job.title}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {job.type}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {job.applicants}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {job.postedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Applicants */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Applicants
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Candidates who recently applied for your jobs.
              </p>
            </div>

            <Link
              to="/company/applicants"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              View All Applicants →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Candidate</th>
                  <th className="px-6 py-4 font-semibold">Applied For</th>
                  <th className="px-6 py-4 font-semibold">Experience</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {applicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                          {applicant.name.charAt(0)}
                        </div>

                        <span className="font-semibold text-gray-900">
                          {applicant.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {applicant.jobTitle}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {applicant.experience}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          applicant.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : applicant.status === "Shortlisted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {applicant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

function StatCard({ title, value, description, icon, iconStyle }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg text-xl font-bold ${iconStyle}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default CompanyDashboard;
