
import { useState } from "react";
import { Link } from "react-router-dom";

const initialApplicants = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    job: "Java Full Stack Developer",
    experience: "Fresher",
    appliedDate: "18 Oct 2026",
    status: "Pending",
    skills: ["Java", "Spring Boot", "MySQL"],
    resume: "#",
  },
  {
    id: 2,
    name: "Priya Patil",
    email: "priya.patil@gmail.com",
    job: "React Developer",
    experience: "1 Year",
    appliedDate: "17 Oct 2026",
    status: "Shortlisted",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    resume: "#",
  },
  {
    id: 3,
    name: "Amit Kulkarni",
    email: "amit.kulkarni@gmail.com",
    job: "Java Full Stack Developer",
    experience: "2 Years",
    appliedDate: "16 Oct 2026",
    status: "Pending",
    skills: ["Java", "Spring Boot", "REST API"],
    resume: "#",
  },
  {
    id: 4,
    name: "Sneha Deshmukh",
    email: "sneha.deshmukh@gmail.com",
    job: "Backend Developer",
    experience: "Fresher",
    appliedDate: "15 Oct 2026",
    status: "Rejected",
    skills: ["Java", "SQL", "Git"],
    resume: "#",
  },
];

function Applicants() {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("All Jobs");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Update applicant status
  const updateStatus = (id, status) => {
    setApplicants((previous) =>
      previous.map((applicant) =>
        applicant.id === id ? { ...applicant, status } : applicant
      )
    );
  };

  // Remove rejected application
  const deleteRejected = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this rejected applicant?"
    );

    if (!confirmDelete) return;

    setApplicants((previous) =>
      previous.filter((applicant) => applicant.id !== id)
    );
  };

  // Search and filter applicants
  const filteredApplicants = applicants.filter((applicant) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      applicant.name.toLowerCase().includes(searchText) ||
      applicant.email.toLowerCase().includes(searchText) ||
      applicant.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    const matchesJob =
      jobFilter === "All Jobs" || applicant.job === jobFilter;

    const matchesStatus =
      statusFilter === "All Status" || applicant.status === statusFilter;

    return matchesSearch && matchesJob && matchesStatus;
  });

  // Statistics
  const pendingCount = applicants.filter(
    (applicant) => applicant.status === "Pending"
  ).length;

  const shortlistedCount = applicants.filter(
    (applicant) => applicant.status === "Shortlisted"
  ).length;

  const rejectedCount = applicants.filter(
    (applicant) => applicant.status === "Rejected"
  ).length;

  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shortlisted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Applicants
            </h1>
            <p className="mt-2 text-gray-500">
              Review candidates who applied for your jobs.
            </p>
          </div>

          <Link
            to="/company/manage-jobs"
            className="w-fit rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Manage Jobs
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Applicants</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {applicants.length}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending Review</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Shortlisted</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {shortlistedCount}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Rejected</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {rejectedCount}
            </h2>
          </div>

        </div>

        {/* Search and filters */}
        <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-5 md:grid-cols-3">

          <input
            type="text"
            placeholder="Search name, email or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option>All Jobs</option>
            <option>Java Full Stack Developer</option>
            <option>React Developer</option>
            <option>Backend Developer</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>

        </div>

        {/* Applicants list */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Candidate Applications
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredApplicants.length} application(s) found
            </p>
          </div>

          {filteredApplicants.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                No applicants found
              </h3>
              <p className="mt-2 text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">

              {filteredApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="p-6 transition hover:bg-gray-50"
                >
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">

                    {/* Candidate details */}
                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                        {applicant.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {applicant.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {applicant.email}
                        </p>

                        <p className="mt-3 font-medium text-gray-800">
                          {applicant.job}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {applicant.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                          <span>
                            Experience: {applicant.experience}
                          </span>
                          <span>
                            Applied: {applicant.appliedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status and actions */}
                    <div className="flex flex-col items-start gap-3 lg:items-end">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[applicant.status]}`}
                      >
                        {applicant.status}
                      </span>

                      <div className="flex flex-wrap gap-2">

                        <a
                          href={applicant.resume}
                          onClick={(e) => {
                            if (applicant.resume === "#") {
                              e.preventDefault();
                              alert("Resume is not connected yet.");
                            }
                          }}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          View Resume
                        </a>

                        <button
                          onClick={() =>
                            updateStatus(applicant.id, "Shortlisted")
                          }
                          disabled={applicant.status === "Shortlisted"}
                          className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Shortlist
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(applicant.id, "Rejected")
                          }
                          disabled={applicant.status === "Rejected"}
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(applicant.id, "Pending")
                          }
                          disabled={applicant.status === "Pending"}
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Reset
                        </button>

                        {/* Remove button appears only for rejected applicants */}
                        {applicant.status === "Rejected" && (
                          <button
                            onClick={() => deleteRejected(applicant.id)}
                            className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Applicants;
