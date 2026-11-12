
import { createContext, useContext, useState } from "react";

const JobContext = createContext();

function getSavedData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function formatJob(job) {
  const salary =
    job.salaryMin != null || job.salaryMax != null
      ? `₹${job.salaryMin?.toLocaleString("en-IN") ?? "—"} - ₹${
          job.salaryMax?.toLocaleString("en-IN") ?? "—"
        }`
      : "Salary not specified";

  return {
    id: job.id,
    title: job.title,
    role: job.title,
    company: job.company,
    location: job.location || "Not specified",
    type: job.jobType || job.type || "Not specified",
    salary,
    experience: job.experience || "Not specified",
    category: job.category || "Other",
    description: job.description || "No description available.",
    skills: Array.isArray(job.skills) ? job.skills : [],
    logo: job.company?.charAt(0)?.toUpperCase() || "J",
    logoColor: "bg-blue-100 text-blue-700",
    color: "bg-blue-100 text-blue-700",
    deadline: job.deadline,
  };
}

export function JobProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState(() =>
    getSavedData("jobgrid_saved_jobs")
  );

  const [applications, setApplications] = useState(() =>
    getSavedData("jobgrid_applications")
  );

  function saveJob(job) {
    const formattedJob = formatJob(job);

    setSavedJobs((currentJobs) => {
      const alreadySaved = currentJobs.some(
        (item) => String(item.id) === String(formattedJob.id)
      );

      if (alreadySaved) return currentJobs;

      const updatedJobs = [...currentJobs, formattedJob];
      localStorage.setItem(
        "jobgrid_saved_jobs",
        JSON.stringify(updatedJobs)
      );

      return updatedJobs;
    });
  }

  function removeSavedJob(id) {
    setSavedJobs((currentJobs) => {
      const updatedJobs = currentJobs.filter(
        (job) => String(job.id) !== String(id)
      );

      localStorage.setItem(
        "jobgrid_saved_jobs",
        JSON.stringify(updatedJobs)
      );

      return updatedJobs;
    });
  }

  function applyToJob(job) {
    const formattedJob = formatJob(job);

    setApplications((currentApplications) => {
      const alreadyApplied = currentApplications.some(
        (app) => String(app.id) === String(formattedJob.id)
      );

      if (alreadyApplied) return currentApplications;

      const newApplication = {
        ...formattedJob,
        appliedDate: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Applied",
      };

      const updatedApplications = [
        ...currentApplications,
        newApplication,
      ];

      localStorage.setItem(
        "jobgrid_applications",
        JSON.stringify(updatedApplications)
      );

      return updatedApplications;
    });
  }

  function withdrawApplication(id) {
    setApplications((currentApplications) => {
      const updatedApplications = currentApplications.filter(
        (app) => String(app.id) !== String(id)
      );

      localStorage.setItem(
        "jobgrid_applications",
        JSON.stringify(updatedApplications)
      );

      return updatedApplications;
    });
  }

  return (
    <JobContext.Provider
      value={{
        savedJobs,
        applications,
        saveJob,
        removeSavedJob,
        applyToJob,
        withdrawApplication,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobContext);
}
