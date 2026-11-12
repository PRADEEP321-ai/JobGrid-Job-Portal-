
import { useEffect, useState } from "react";
import { API_BASE } from "../../config";

const JOBS_URL = `${API_BASE}/api/jobs`;

const initialForm = {
  title: "",
  category: "",
  jobType: "",
  deadline: "",
  salaryMin: "",
  salaryMax: "",
  currency: "INR",
  salaryPeriod: "YEAR",
};

// Format date
const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Get job status
const getStatus = (job) => {
  if (!job.deadline) return "Active";

  const deadline = new Date(`${job.deadline}T23:59:59`);

  return deadline < new Date() ? "Closed" : "Active";
};

// Format salary
const getSalary = (job) => {
  if (job.salaryMin == null && job.salaryMax == null) {
    return "Salary not specified";
  }

  const min =
    job.salaryMin != null
      ? Number(job.salaryMin).toLocaleString("en-IN")
      : "";

  const max =
    job.salaryMax != null
      ? Number(job.salaryMax).toLocaleString("en-IN")
      : "";

  const salary =
    min && max ? `${min} - ${max}` : min || max;

  return `${job.currency || "INR"} ${salary} / ${
    job.salaryPeriod || "YEAR"
  }`;
};

// Normalize job type
const normalizeType = (value) =>
  (value || "").toLowerCase().replace(/[-_\s]/g, "");

const Manage_jobs = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Edit modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  // JWT headers
  const authHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };
  };

  // Handle API errors
  const handleError = (err) => {
    if (err.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return;
    }

    setError(err.message || "Something went wrong.");
  };

  // GET ALL JOBS
  const loadJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${JOBS_URL}/getJobs`,
        {
          method: "GET",
          headers: authHeaders(),
        }
      );

      if (!response.ok) {
        const err = new Error("Failed to load jobs.");
        err.status = response.status;
        throw err;
      }

      const data = await response.json();

      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // OPEN EDIT MODAL
  const handleEdit = (job) => {
    setSelectedJob(job);

    setFormData({
      title: job.title || "",
      category: job.category || "",
      jobType: job.jobType || "",
      deadline: job.deadline
        ? job.deadline.substring(0, 10)
        : "",
      salaryMin: job.salaryMin ?? "",
      salaryMax: job.salaryMax ?? "",
      currency: job.currency || "INR",
      salaryPeriod: job.salaryPeriod || "YEAR",
    });

    setShowModal(true);
    setError("");
    setMessage("");
  };

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE JOB API
  const updateJob = async (e) => {
    e.preventDefault();

    if (!selectedJob) return;

    if (
      formData.salaryMin !== "" &&
      formData.salaryMax !== "" &&
      Number(formData.salaryMin) > Number(formData.salaryMax)
    ) {
      setError("Minimum salary cannot be greater than maximum salary.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      // Preserve existing DTO properties while updating form fields.
      const updatedJob = {
        ...selectedJob,
        ...formData,
        salaryMin:
          formData.salaryMin === ""
            ? null
            : Number(formData.salaryMin),
        salaryMax:
          formData.salaryMax === ""
            ? null
            : Number(formData.salaryMax),
      };

      const response = await fetch(
        `${JOBS_URL}/${selectedJob.id}`,
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(updatedJob),
        }
      );

      if (!response.ok) {
        const err = new Error("Failed to update job.");
        err.status = response.status;
        throw err;
      }

      const updatedData = await response.json();

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === selectedJob.id
            ? { ...job, ...updatedData }
            : job
        )
      );

      setMessage("Job updated successfully.");
      setShowModal(false);
      setSelectedJob(null);
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  };

  // DELETE JOB API
  const deleteJob = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${JOBS_URL}/delete/${id}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        }
      );

      if (!response.ok) {
        const err = new Error("Failed to delete job.");
        err.status = response.status;
        throw err;
      }

      setJobs((currentJobs) =>
        currentJobs.filter((job) => job.id !== id)
      );

      setMessage("Job deleted successfully.");
    } catch (err) {
      handleError(err);
    }
  };

  // JOB STATISTICS
  const activeJobs = jobs.filter(
    (job) => getStatus(job) === "Active"
  ).length;

  const closedJobs = jobs.filter(
    (job) => getStatus(job) === "Closed"
  ).length;

  const totalApplicants = jobs.reduce(
    (total, job) =>
      total +
      Number(job.applicants ?? job.applicationsCount ?? 0),
    0
  );

  // SEARCH AND FILTER
  const filteredJobs = jobs.filter((job) => {
    const text = search.toLowerCase();

    const matchesSearch =
      (job.title || "").toLowerCase().includes(text) ||
      (job.category || "").toLowerCase().includes(text) ||
      (job.company || job.companyName || "")
        .toLowerCase()
        .includes(text);

    const matchesStatus =
      statusFilter === "All" ||
      getStatus(job) === statusFilter;

    const matchesType =
      typeFilter === "All" ||
      normalizeType(job.jobType) === normalizeType(typeFilter);

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Manage Jobs
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your job postings and track applicants.
            </p>
          </div>

          <a
            href="/addjobs"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <span className="text-xl">+</span>
            Post a New Job
          </a>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-5 flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <span>{message}</span>

            <button
              onClick={() => setMessage("")}
              className="font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
              className="font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* STATISTICS */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Jobs" value={jobs.length} icon="▤" color="blue" />
          <StatCard title="Active Jobs" value={activeJobs} icon="✓" color="green" />
          <StatCard title="Closed Jobs" value={closedJobs} icon="■" color="orange" />
          <StatCard title="Total Applicants" value={totalApplicants} icon="♙" color="purple" />
        </div>

        {/* JOB TABLE */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* SEARCH AND FILTER */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Your Job Listings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredJobs.length} jobs found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search title, category, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 sm:w-64"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              >
                <option value="All">All Types</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">

              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4">Job Details</th>
                  <th className="px-6 py-4">Job Type</th>
                  <th className="px-6 py-4">Applicants</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {loading && (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center text-slate-500">
                      Loading jobs...
                    </td>
                  </tr>
                )}

                {!loading && filteredJobs.map((job) => {
                  const status = getStatus(job);

                  return (
                    <tr key={job.id} className="transition hover:bg-slate-50">

                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-800">
                          {job.title}
                        </div>

                        <div className="mt-1 text-sm text-slate-500">
                          {job.company || job.companyName || "Company"}
                          {job.category ? ` · ${job.category}` : ""}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {getSalary(job)}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                          {job.jobType || "-"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-800">
                          {job.applicants ?? job.applicationsCount ?? 0}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          applications
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {formatDate(job.deadline)}
                      </td>

                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          <span className={`h-2 w-2 rounded-full ${
                            status === "Active"
                              ? "bg-green-500"
                              : "bg-slate-400"
                          }`} />

                          {status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-4">

                          <button
                            onClick={() => handleEdit(job)}
                            className="font-medium text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteJob(job.id)}
                            className="font-medium text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}

                {!loading && filteredJobs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="text-4xl text-slate-300">⌕</div>

                      <p className="mt-3 font-semibold text-slate-700">
                        No jobs found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {jobs.length === 0
                          ? "You have not posted any jobs yet."
                          : "Try changing your search or filters."}
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:justify-between">
            <span>
              Showing {filteredJobs.length} of {jobs.length} jobs
            </span>

            <span>Manage your postings from one place</span>
          </div>
        </div>
      </div>

      {/* EDIT JOB MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">

          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Edit Job
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your job information.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-slate-500 hover:text-slate-800"
              >
                ×
              </button>
            </div>

            <form onSubmit={updateJob} className="space-y-5 p-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Job Type
                  </label>

                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Application Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Minimum Salary
                  </label>

                  <input
                    type="number"
                    name="salaryMin"
                    min="0"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Maximum Salary
                  </label>

                  <input
                    type="number"
                    name="salaryMax"
                    min="0"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Currency
                  </label>

                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Salary Period
                  </label>

                  <select
                    name="salaryPeriod"
                    value={formData.salaryPeriod}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="YEAR">Yearly</option>
                    <option value="MONTH">Monthly</option>
                    <option value="HOUR">Hourly</option>
                  </select>
                </div>

              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Statistics Card
function StatCard({ title, value, icon, color }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${styles[color]}`}>
          {icon}
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default Manage_jobs;
