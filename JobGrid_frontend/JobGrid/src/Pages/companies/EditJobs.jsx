import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CATEGORIES = ["UX/UI Designer", "Web Developer", "Mobile Developer", "Data Analyst", "Marketing", "Sales", "HR", "Finance"];
const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Internship", "Freelance"];
const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const PERIODS = ["Yearly", "Monthly", "Weekly", "Hourly"];

const options = (list, current) =>
  (current && !list.includes(current) ? [current, ...list] : list).map((o) => (
    <option key={o} value={o}>{o}</option>
  ));

function Field({ label, required, error, full, children }) {
  return (
    <div className={`mj-field ${full ? "full" : ""}`}>
      <label>
        {label} {required && <span className="req">*</span>}
      </label>
      {children}
      {error && <small className="mj-error">{error}</small>}
    </div>
  );
}

function EditJobs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [company, setCompany] = useState({});
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getJob(id)
      .then((job) => {
        setCompany(job);
        setForm({
          title: job.title || "",
          category: job.category || "",
          jobType: job.jobType || "",
          deadline: job.deadline || "",
          salaryMin: job.salaryMin ?? "",
          salaryMax: job.salaryMax ?? "",
          currency: job.currency || "",
          salaryPeriod: job.salaryPeriod || "",
          description: job.description || "",
          recruiter: job.recruiter || "",
          email: job.email || "",
        });
      })
      .catch((e) => setApiError(e.message));
  }, [id]);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.title.trim()) er.title = "Job title is required";
    if (!form.description.trim()) er.description = "Job description is required";
    if (form.salaryMin === "" || Number(form.salaryMin) < 0) er.salaryMin = "Enter a valid minimum salary";
    if (form.salaryMax === "" || Number(form.salaryMax) < 0) er.salaryMax = "Enter a valid maximum salary";
    if (!er.salaryMin && !er.salaryMax && Number(form.salaryMax) < Number(form.salaryMin))
      er.salaryMax = "Maximum must be greater than or equal to minimum";
    if (!form.recruiter.trim()) er.recruiter = "Recruiter name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    setSaving(true);
    try {
      await updateJob(id, {
        ...form,
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax),
        deadline: form.deadline || null,
      });
      navigate("/manage-jobs");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return (
      <div className="mj-page">
        <div className="mj-container" style={{ padding: 40 }}>
          {apiError ? <div className="mj-alert">{apiError}</div> : <p className="mj-muted">Loading job...</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="mj-page">
      <div className="mj-header">
        <div className="mj-container narrow">
          <Link to="/manage-jobs" className="mj-back">← Back to Manage Jobs</Link>
          <div className="mj-title-row">
            <div className="mj-icon">✏️</div>
            <div>
              <h1>Edit Job</h1>
              <p>Update the details of this job posting.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mj-body">
        <div className="mj-container narrow">
          <form className="mj-card mj-form" onSubmit={handleSubmit} noValidate>
            {apiError && <div className="mj-alert">{apiError}</div>}

            <h2>Job Information</h2>
            <div className="mj-grid">
              <Field label="Job Title" required full error={errors.title}>
                <input className="mj-input" name="title" value={form.title} onChange={change} maxLength={150} />
              </Field>

              <Field label="Category" required>
                <select className="mj-input" name="category" value={form.category} onChange={change}>
                  {options(CATEGORIES, form.category)}
                </select>
              </Field>

              <Field label="Job Type" required>
                <select className="mj-input" name="jobType" value={form.jobType} onChange={change}>
                  {options(JOB_TYPES, form.jobType)}
                </select>
              </Field>

              <Field label="Application Deadline">
                <input type="date" className="mj-input" name="deadline" value={form.deadline} onChange={change} />
              </Field>
            </div>

            <h2>Salary Information</h2>
            <div className="mj-grid">
              <Field label="Minimum Salary" required error={errors.salaryMin}>
                <input type="number" min="0" className="mj-input" name="salaryMin" value={form.salaryMin} onChange={change} />
              </Field>

              <Field label="Maximum Salary" required error={errors.salaryMax}>
                <input type="number" min="0" className="mj-input" name="salaryMax" value={form.salaryMax} onChange={change} />
              </Field>

              <Field label="Salary Currency" required>
                <select className="mj-input" name="currency" value={form.currency} onChange={change}>
                  {options(CURRENCIES, form.currency)}
                </select>
              </Field>

              <Field label="Salary Period" required>
                <select className="mj-input" name="salaryPeriod" value={form.salaryPeriod} onChange={change}>
                  {options(PERIODS, form.salaryPeriod)}
                </select>
              </Field>

              <Field label="Job Description" required full error={errors.description}>
                <textarea className="mj-input" rows={7} name="description" value={form.description} onChange={change} maxLength={5000} />
              </Field>
            </div>

            <h2>Company Information</h2>
            <div className="mj-grid">
              <Field label="Company Name" full>
                <input className="mj-input" value={company.company || ""} disabled />
              </Field>
              <Field label="Company Website">
                <input className="mj-input" value={company.website || ""} disabled />
              </Field>
              <Field label="Company Industry">
                <input className="mj-input" value={company.industry || ""} disabled />
              </Field>
              <Field label="Facebook Page (Link)">
                <input className="mj-input" value={company.facebook || ""} disabled />
              </Field>
              <Field label="LinkedIn Page (Link)">
                <input className="mj-input" value={company.linkedin || ""} disabled />
              </Field>
              <Field label="Twitter Page (Link)">
                <input className="mj-input" value={company.twitter || ""} disabled />
              </Field>
              <Field label="Instagram Page (Link)">
                <input className="mj-input" value={company.instagram || ""} disabled />
              </Field>
              <Field label="Company Description" full>
                <textarea className="mj-input" rows={4} value={company.companyDescription || ""} disabled />
              </Field>
            </div>
            <small className="mj-muted">Company details are managed from your company profile.</small>

            <h2>Recruiter Information</h2>
            <div className="mj-grid">
              <Field label="Full Name" required error={errors.recruiter}>
                <input className="mj-input" name="recruiter" value={form.recruiter} onChange={change} maxLength={150} />
              </Field>

              <Field label="Email" required error={errors.email}>
                <input type="email" className="mj-input" name="email" value={form.email} onChange={change} maxLength={150} />
              </Field>
            </div>

            <div className="mj-form-actions">
              <button type="submit" className="mj-btn mj-btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <Link to="/manage-jobs" className="mj-btn mj-btn-light">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditJobs;