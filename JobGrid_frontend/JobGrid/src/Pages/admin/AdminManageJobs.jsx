
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Search,
  Plus,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  Building2,
  Clock,
  X,
} from "lucide-react";

const AdminManageJobs = () => {
  // Sample jobs for the UI
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Java Developer",
      company: "TechNova Solutions",
      location: "Pune, India",
      type: "Full Time",
      applicants: 24,
      status: "Active",
    },
    {
      id: 2,
      title: "React Developer",
      company: "CodeCraft Technologies",
      location: "Mumbai, India",
      type: "Full Time",
      applicants: 18,
      status: "Active",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "InnovateTech",
      location: "Remote",
      type: "Part Time",
      applicants: 12,
      status: "Pending",
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "CloudPeak Systems",
      location: "Bangalore, India",
      type: "Full Time",
      applicants: 31,
      status: "Active",
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "TechNova Solutions",
      location: "Hyderabad, India",
      type: "Contract",
      applicants: 9,
      status: "Expired",
    },
    {
      id: 6,
      title: "Java Intern",
      company: "InnovateTech",
      location: "Pune, India",
      type: "Internship",
      applicants: 15,
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Search and filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Delete a job
  const deleteJob = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (confirmed) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  // Open edit form
  const openEdit = (job) => {
    setEditingJob({ ...job });
    setShowEdit(true);
  };

  // Save edited job
  const saveEdit = (e) => {
    e.preventDefault();

    setJobs(
      jobs.map((job) =>
        job.id === editingJob.id ? editingJob : job
      )
    );

    setShowEdit(false);
    setEditingJob(null);
  };

  // Summary card data
  const stats = [
    {
      title: "Total Jobs",
      value: jobs.length,
      color: "bg-blue-100 text-blue-600",
      icon: BriefcaseBusiness,
    },
    {
      title: "Active Jobs",
      value: jobs.filter((job) => job.status === "Active").length,
      color: "bg-emerald-100 text-emerald-600",
      icon: Clock,
    },
    {
      title: "Pending Jobs",
      value: jobs.filter((job) => job.status === "Pending").length,
      color: "bg-orange-100 text-orange-600",
      icon: Building2,
    },
    {
      title: "Expired Jobs",
      value: jobs.filter((job) => job.status === "Expired").length,
      color: "bg-purple-100 text-purple-600",
      icon: BriefcaseBusiness,
    },
  ];

  const statusStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "Pending") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-600";
  };

  return (
    <div className="min-h-screen bg-[#f3f8fe] p-5 md:p-8">
      {/* Page heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#10234d] md:text-3xl">
            Manage Jobs
          </h1>

          <p className="mt-2 text-sm text-[#58709e]">
            View, search, edit, and manage all job postings.
          </p>
        </div>

        <Link
          to="/admin/add-job"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add New Job
        </Link>
      </div>

      {/* Summary cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border border-blue-100 bg-white p-5 shadow-sm"
            >
              <div className={`rounded-xl p-3 ${item.color}`}>
                <Icon size={26} />
              </div>

              <div>
                <p className="text-sm text-[#58709e]">{item.title}</p>
                <h2 className="mt-1 text-2xl font-bold text-[#10234d]">
                  {item.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Jobs table */}
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
        {/* Search and filter */}
        <div className="flex flex-col gap-4 border-b border-blue-50 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-bold text-[#10234d]">All Job Postings</h2>
            <p className="mt-1 text-xs text-[#58709e]">
              {filteredJobs.length} jobs found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search job or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Responsive table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-[#f2f7fd] text-xs text-[#344c79]">
              <tr>
                <th className="px-5 py-4">Job Details</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Job Type</th>
                <th className="px-5 py-4">Applicants</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-blue-50 text-sm hover:bg-blue-50/40"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#10234d]">
                      {job.title}
                    </p>

                    <p className="mt-1 text-xs text-[#58709e]">
                      {job.company}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-[#58709e]">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-[#58709e]">
                    {job.type}
                  </td>

                  <td className="px-5 py-4 font-medium text-[#344c79]">
                    {job.applicants}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        title="View job"
                        onClick={() => setSelectedJob(job)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
                        title="Edit job"
                        onClick={() => openEdit(job)}
                        className="text-emerald-600 hover:text-emerald-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        title="Delete job"
                        onClick={() => deleteJob(job.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredJobs.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No jobs found. Try another search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View job popup */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#10234d]">
                Job Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-blue-600">
              {selectedJob.title}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              {selectedJob.company}
            </p>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <p>Location: {selectedJob.location}</p>
              <p>Job Type: {selectedJob.type}</p>
              <p>Applicants: {selectedJob.applicants}</p>
              <p>
                Status:{" "}
                <span className="font-semibold">{selectedJob.status}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit job popup */}
      {showEdit && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={saveEdit}
            className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#10234d]">
                Edit Job
              </h2>

              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Job Title
              </label>

              <input
                required
                value={editingJob.title}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, title: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Company
              </label>

              <input
                required
                value={editingJob.company}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, company: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                required
                value={editingJob.location}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, location: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={editingJob.status}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, status: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminManageJobs;
