import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BriefcaseBusiness, ArrowLeft } from "lucide-react";
import { API_BASE } from "../../config.js";
// API URL
const API_URL = `${API_BASE}/api/jobs/create-job`;

// Common Tailwind classes
const blue = "bg-blue-700 hover:bg-blue-800";

const inputClass =
  "mt-2 w-full rounded border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const labelClass = "text-sm font-medium text-gray-700";

// Reusable input field
const Field = ({
  label,
  name,
  type = "text",
  required = false,
  form,
  update,
}) => (
  <div>
    <label className={labelClass} htmlFor={name}>
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>

    <input
      id={name}
      name={name}
      type={type}
      required={required}
      min={type === "number" ? "0" : undefined}
      step={type === "number" ? "any" : undefined}
      value={form[name]}
      onChange={update}
      className={inputClass}
    />
  </div>
);

// Reusable dropdown
const SelectField = ({
  label,
  name,
  options,
  required = false,
  form,
  update,
}) => (
  <div>
    <label className={labelClass} htmlFor={name}>
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>

    <select
      id={name}
      name={name}
      required={required}
      value={form[name]}
      onChange={update}
      className={inputClass}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Reusable textarea
const TextArea = ({
  label,
  name,
  required = false,
  form,
  update,
}) => (
  <div>
    <label className={labelClass} htmlFor={name}>
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>

    <textarea
      id={name}
      name={name}
      required={required}
      value={form[name]}
      onChange={update}
      rows={5}
      className={`${inputClass} resize-y`}
    />
  </div>
);

const initialForm = {
  title: "",
  category: "UX/UI Designer",
  jobType: "Full Time",
  deadline: "",
  salaryMin: "",
  salaryMax: "",
  currency: "INR (₹)",
  salaryPeriod: "Yearly",
  description: "",
  company: "",
  website: "",
  industry: "",
  facebook: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  companyDescription: "",
  recruiter: "",
  email: "",
  agreed: false,
};

const AdminAddJob = () => {
  const navigate = useNavigate(); // used to open another page from code

  const [form, setForm] = useState(initialForm);
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update form values
  const update = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate company logo
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setLogo(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      e.target.value = "";
      setLogo(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Please select an image smaller than 2 MB.");
      e.target.value = "";
      setLogo(null);
      return;
    }

    setError("");
    setLogo(file);
  };

  // Submit job to Spring Boot
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formElement = e.currentTarget; // used to clear the file input later
    const minSalary = Number(form.salaryMin);
    const maxSalary = Number(form.salaryMax);

    if (form.salaryMin.trim() === "" || form.salaryMax.trim() === "") {
      setError("Please enter both minimum and maximum salary.");
      return;
    }

    if (
      !Number.isFinite(minSalary) ||
      !Number.isFinite(maxSalary) ||
      minSalary < 0 ||
      maxSalary < 0
    ) {
      setError("Please enter valid, non-negative salary amounts.");
      return;
    }

    if (maxSalary < minSalary) {
      setError("Maximum salary must be greater than or equal to minimum salary.");
      return;
    }

    // data we send to Spring Boot (field names must match JobDto)
    const jobData = {
      title: form.title.trim(),
      category: form.category,
      jobType: form.jobType,
      deadline: form.deadline || null,
      salaryMin: minSalary,
      salaryMax: maxSalary,
      currency: form.currency,
      salaryPeriod: form.salaryPeriod,
      description: form.description.trim(),
      companyName: form.company.trim(), // JobDto uses "companyName"
      website: form.website,
      industry: form.industry,
      facebook: form.facebook,
      linkedin: form.linkedin,
      twitter: form.twitter,
      instagram: form.instagram,
      companyDescription: form.companyDescription.trim(),
      recruiter: form.recruiter.trim(),
      email: form.email.trim(),
    };

    try {
      setLoading(true);

      // POST /api/jobs/create-job  (needs the JWT saved at login)
      await axios.post(API_URL, jobData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // success -> clear the form so another job can be added
      alert("Job posted successfully!");
      setForm(initialForm);
      setLogo(null);
      formElement.reset(); // clears the file input
    } catch (err) {
      console.error("Error creating job:", err);

      // not logged in, or token expired
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      // logged in, but role is not allowed
      if (err.response?.status === 403) {
        setError("You are not allowed to post jobs with this account.");
        return;
      }

      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        err.message ||
        "Failed to post job. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <Link
          to="/admin"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <BriefcaseBusiness size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Add New Job
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new job posting for a company.
            </p>
          </div>
        </div>

        {/* Job form */}
        <main className="bg-slate-50 py-8">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-4xl space-y-8 rounded-lg bg-white p-5 shadow-sm sm:p-8 md:p-10"
          >
            {/* Job information */}
            <section className="space-y-5">
              <h2 className="text-xl font-semibold">
                Job Information
              </h2>

              <Field
                label="Job Title"
                name="title"
                required
                form={form}
                update={update}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <SelectField
                  label="Category"
                  name="category"
                  required
                  options={[
                    "UX/UI Designer",
                    "Software Development",
                    "Web Development",
                    "Java Developer",
                    "React Developer",
                    "Data Analyst",
                    "Marketing",
                    "Human Resources",
                  ]}
                  form={form}
                  update={update}
                />

                <SelectField
                  label="Job Type"
                  name="jobType"
                  required
                  options={[
                    "Full Time",
                    "Part Time",
                    "Internship",
                    "Contract",
                    "Remote",
                  ]}
                  form={form}
                  update={update}
                />

                <Field
                  label="Application Deadline"
                  name="deadline"
                  type="date"
                  form={form}
                  update={update}
                />
              </div>
            </section>

            {/* Salary information */}
            <section className="space-y-5">
              <h2 className="text-xl font-semibold">
                Salary Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Minimum Salary"
                  name="salaryMin"
                  type="number"
                  required
                  form={form}
                  update={update}
                />

                <Field
                  label="Maximum Salary"
                  name="salaryMax"
                  type="number"
                  required
                  form={form}
                  update={update}
                />

                <SelectField
                  label="Salary Currency"
                  name="currency"
                  required
                  options={[
                    "INR (₹)",
                    "USD ($)",
                    "EUR (€)",
                    "GBP (£)",
                  ]}
                  form={form}
                  update={update}
                />

                <SelectField
                  label="Salary Period"
                  name="salaryPeriod"
                  required
                  options={[
                    "Yearly",
                    "Monthly",
                    "Weekly",
                    "Hourly",
                  ]}
                  form={form}
                  update={update}
                />
              </div>

              <p className="text-sm text-gray-500">
                Example: ₹400000–₹600000 per year.
              </p>
            </section>

            {/* Job description */}
            <section className="space-y-5">
              <TextArea
                label="Job Description"
                name="description"
                required
                form={form}
                update={update}
              />
            </section>

            {/* Company information */}
            <section className="space-y-5">
              <h2 className="text-xl font-semibold">
                Company Information
              </h2>

              <Field
                label="Company Name"
                name="company"
                required
                form={form}
                update={update}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Company Website"
                  name="website"
                  type="url"
                  form={form}
                  update={update}
                />

                <Field
                  label="Company Industry"
                  name="industry"
                  form={form}
                  update={update}
                />

                <Field
                  label="Facebook Page (Link)"
                  name="facebook"
                  type="url"
                  form={form}
                  update={update}
                />

                <Field
                  label="LinkedIn Page (Link)"
                  name="linkedin"
                  type="url"
                  form={form}
                  update={update}
                />

                <Field
                  label="Twitter Page (Link)"
                  name="twitter"
                  type="url"
                  form={form}
                  update={update}
                />

                <Field
                  label="Instagram Page (Link)"
                  name="instagram"
                  type="url"
                  form={form}
                  update={update}
                />
              </div>

              <TextArea
                label="Company Description"
                name="companyDescription"
                required
                form={form}
                update={update}
              />

              {/* Company logo (selected here, not uploaded yet: the API takes JSON only) */}
              <div>
                <label className={labelClass} htmlFor="logo">
                  Company Logo (Optional)
                </label>

                <p className="mb-3 mt-1 text-sm text-gray-500">
                  Select an image. Maximum file size: 2 MB.
                </p>

                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                />

                {logo && (
                  <p className="mt-2 text-sm text-green-700">
                    Selected: {logo.name}
                  </p>
                )}
              </div>
            </section>

            {/* Recruiter information */}
            <section className="space-y-5">
              <h2 className="text-xl font-semibold">
                Recruiter Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Full Name"
                  name="recruiter"
                  required
                  form={form}
                  update={update}
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  form={form}
                  update={update}
                />
              </div>
            </section>

            {/* Terms and conditions */}
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <input
                id="agreed"
                name="agreed"
                type="checkbox"
                checked={form.agreed}
                onChange={update}
                required
                className="mt-1 accent-blue-700"
              />

              <label htmlFor="agreed">
                By clicking this checkbox, you agree to our{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline"
                >
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline"
                >
                  Privacy Policy
                </a>.
              </label>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`${blue} rounded px-7 py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {loading ? "Posting Job..." : "Post A Job"}
            </button>
          </form>
        </main>

        {/* App download banner */}
        <section className="border-b border-gray-100 bg-white">
          <div className="flex flex-col justify-between gap-6 px-5 py-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Download Our Best Apps
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                Find jobs, explore opportunities and stay updated
                with the latest openings.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className={`${blue} rounded px-5 py-3 text-sm text-white`}
              >
                 App Store
              </a>

              <a
                href="#"
                className={`${blue} rounded px-5 py-3 text-sm text-white`}
              >
                ▷ Google Play
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminAddJob;