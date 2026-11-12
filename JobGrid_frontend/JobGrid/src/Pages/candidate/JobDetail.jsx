import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../../config";
import {
  Bookmark,
  Building2,
  MapPin,
  BriefcaseBusiness,
  ArrowLeft,
  IndianRupee,
} from "lucide-react";

const API_URL = `${API_BASE}/api/jobs`;

const SAVED_JOBS_KEY = "jobgrid_saved_jobs";
const APPLICATIONS_KEY = "jobgrid_applications";

function readStorage(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedJobs, setSavedJobs] = useState(() =>
    readStorage(SAVED_JOBS_KEY)
  );
  const [applications, setApplications] = useState(() =>
    readStorage(APPLICATIONS_KEY)
  );

  const isSaved = savedJobs.some(
    (item) => String(item.id) === String(id)
  );

  const isApplied = applications.some(
    (item) => String(item.id) === String(id)
  );

  // Fetch the job from Spring Boot


useEffect(() => {
  const fetchJob = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view job details.");
        return;
      }

      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Backend can return a single job or a wrapped response
      const responseData = response.data;

      const selectedJob = Array.isArray(responseData)
        ? responseData.find(
            (item) => String(item.id) === String(id)
          )
        : responseData?.data
          ? responseData.data
          : responseData;

      if (!selectedJob || String(selectedJob.id) !== String(id)) {
        setError(`Job with ID ${id} was not found.`);
        return;
      }

      setJob(selectedJob);

    } catch (err) {
      console.error("Error fetching job details:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Unable to load job details. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  fetchJob();
}, [id]);



  // Refresh local state if storage changes in another tab.
  useEffect(() => {
    function refreshStorage(event) {
      if (!event || event.key === SAVED_JOBS_KEY) {
        setSavedJobs(readStorage(SAVED_JOBS_KEY));
      }

      if (!event || event.key === APPLICATIONS_KEY) {
        setApplications(readStorage(APPLICATIONS_KEY));
      }
    }

    window.addEventListener("storage", refreshStorage);

    return () => {
      window.removeEventListener("storage", refreshStorage);
    };
  }, []);

  // Save or remove a job
  function handleSaveJob() {
    if (!job) return;

    const currentJobs = readStorage(SAVED_JOBS_KEY);

    const alreadySaved = currentJobs.some(
      (item) => String(item.id) === String(job.id)
    );

    let updatedJobs;

    if (alreadySaved) {
      updatedJobs = currentJobs.filter(
        (item) => String(item.id) !== String(job.id)
      );
    } else {
      updatedJobs = [
        ...currentJobs,
        {
          ...job,
          savedAt: Date.now(),
        },
      ];
    }

    try {
      localStorage.setItem(
        SAVED_JOBS_KEY,
        JSON.stringify(updatedJobs)
      );

      setSavedJobs(updatedJobs);
    } catch (err) {
      console.error("Unable to save job:", err);
      alert("Unable to update saved jobs. Please try again.");
    }
  }

  // Apply for a job
  function handleApply() {
    if (!job) return;

    // Read fresh storage to avoid using stale React state.
    const currentApplications = readStorage(APPLICATIONS_KEY);

    const existingApplication = currentApplications.find(
      (item) => String(item.id) === String(job.id)
    );

    if (existingApplication) {
      setApplications(currentApplications);
      navigate("/candidate/applications");
      return;
    }

    const newApplication = {
      ...job,
      status: "Applied",
      appliedAt: new Date().toISOString(),
    };

    const updatedApplications = [
      ...currentApplications,
      newApplication,
    ];

    try {
      localStorage.setItem(
        APPLICATIONS_KEY,
        JSON.stringify(updatedApplications)
      );

      setApplications(updatedApplications);
      navigate("/candidate/applications");
    } catch (err) {
      console.error("Unable to save application:", err);
      alert("Unable to submit your application. Please try again.");
    }
  }

  function formatSalary(amount) {
    if (amount == null) return null;

    const number = Number(amount);

    return Number.isFinite(number)
      ? number.toLocaleString("en-IN")
      : null;
  }

  const salary =
    job && (job.salaryMin != null || job.salaryMax != null)
      ? `${job.currency || "INR"} ${formatSalary(job.salaryMin) ?? "Not specified"
      } - ${formatSalary(job.salaryMax) ?? "Not specified"
      }${job.salaryPeriod ? ` / ${job.salaryPeriod}` : ""}`
      : job?.salary || "Not specified";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-medium text-blue-600">
          Loading job details...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Job Details
        </h2>

        <p className="text-center text-red-500">
          {error || "Job not found."}
        </p>

        <Link
          to="/candidate_jobs"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-600">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Job Details
          </h1>

          <div className="mt-4 h-0.5 w-16 bg-white" />

          <p className="mt-4 max-w-xl text-sm leading-6 text-blue-50">
            Explore the job description, company information, salary,
            and application deadline.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2 text-sm text-white">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>|</span>
            <Link to="/candidate_jobs" className="hover:underline">
              Browse Jobs
            </Link>
            <span>|</span>
            <span className="text-blue-100">Job Details</span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Main content */}
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-2xl font-bold text-white">
                  {(job.company || "J").charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {job.title || "Untitled Job"}
                  </h2>

                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-blue-600">
                    <Building2 size={16} />
                    {job.company || "Company not specified"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {job.category || "Category not specified"}
                  </p>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="font-semibold text-slate-700">{salary}</p>

                <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {job.jobType || "Job type not specified"}
                </span>
              </div>
            </div>

            {/* Job description */}
            <div className="pt-6">
              <h3 className="border-l-2 border-blue-600 pl-3 text-lg font-bold text-slate-900">
                Job Description
              </h3>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {job.description || "No job description available."}
              </p>
            </div>

            {/* Company information */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="border-l-2 border-blue-600 pl-3 text-lg font-bold text-slate-900">
                Company Information
              </h3>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>
                  <strong className="text-slate-800">Company:</strong>{" "}
                  {job.company || "Not specified"}
                </p>

                <p>
                  <strong className="text-slate-800">Industry:</strong>{" "}
                  {job.industry || "Not specified"}
                </p>

                <p>
                  <strong className="text-slate-800">Recruiter:</strong>{" "}
                  {job.recruiter || "Not specified"}
                </p>

                <p>
                  <strong className="text-slate-800">Email:</strong>{" "}
                  {job.email || "Not specified"}
                </p>

                {job.website && (
                  <p className="break-words">
                    <strong className="text-slate-800">Website:</strong>{" "}
                    <a
                      href={
                        /^https?:\/\//i.test(job.website)
                          ? job.website
                          : `https://${job.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {job.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <button
                type="button"
                onClick={handleSaveJob}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${isSaved
                    ? "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                <Bookmark size={17} />
                {isSaved ? "Remove Saved Job" : "Save Job"}
              </button>

              <button
                type="button"
                onClick={handleApply}
                className="mt-3 w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {isApplied ? "View Application" : "Apply Now"}
              </button>

              <Link
                to="/saved_jobs"
                className="mt-3 block text-center text-sm font-medium text-blue-600 hover:underline"
              >
                View Saved Jobs
              </Link>
            </div>

            {/* Overview */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="border-l-2 border-blue-600 pl-3 text-lg font-bold text-slate-900">
                Job Overview
              </h3>

              <div className="mt-5 space-y-4 text-sm">
                <OverviewItem label="Job Title" value={job.title} />
                <OverviewItem label="Company" value={job.company} />
                <OverviewItem label="Category" value={job.category} />
                <OverviewItem label="Employment Type" value={job.jobType} />
                <OverviewItem label="Salary" value={salary} />
                <OverviewItem
                  label="Application Deadline"
                  value={job.deadline}
                />
              </div>
            </div>

            {/* Location */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="border-l-2 border-blue-600 pl-3 text-lg font-bold text-slate-900">
                Job Location
              </h3>

              <div className="mt-5 flex min-h-32 items-center justify-center rounded-lg bg-slate-100 p-5 text-center">
                <div>
                  <MapPin size={25} className="mx-auto text-blue-600" />

                  <p className="mt-2 font-semibold text-slate-800">
                    {job.location || "Location not specified"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Location provided by the employer
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/jobs"
              className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Back to all jobs
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
}

function OverviewItem({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-slate-800">{label}</p>
      <p className="mt-1 break-words text-slate-500">
        {value || "Not specified"}
      </p>
    </div>
  );
}

export default JobDetail;
