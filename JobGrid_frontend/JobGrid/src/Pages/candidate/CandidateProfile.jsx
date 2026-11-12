
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  Pencil,
  Save,
  X,
  FileText,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  Settings,
  Globe,
  Code,
} from "lucide-react";

function CandidateProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Pradeep",
    lastName: "Gauddab",
    email: "pradeep@example.com",
    phone: "",
    location: "Pune, Maharashtra",
    headline: "Aspiring Java Full Stack Developer",
    about:
      "I am an MCA student interested in Java Full Stack Development. I enjoy building web applications using React, Spring Boot, and MySQL.",
    education: "Master of Computer Applications (MCA)",
    college: "DIMR College, Balewadi",
    graduationYear: "2027",
    experience: "Fresher",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [skills, setSkills] = useState([
    "Java",
    "Spring Boot",
    "React.js",
    "JavaScript",
    "MySQL",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "REST APIs",
    "Git & GitHub",
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState("");

  // Update profile fields
  const updateProfile = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Add a new skill
  const addSkill = () => {
    const skill = newSkill.trim();

    if (
      skill &&
      !skills.some(
        (existing) =>
          existing.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  // Remove a skill
  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  // Upload resume
  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please upload your resume as a PDF file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Resume size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setResumeFile(file);
    setResumeName(file.name);
    setMessage("Resume selected successfully.");
  };

  // Save profile in current React session
  const saveProfile = () => {
    setIsEditing(false);
    setMessage("Profile changes saved in this session.");
  };

  // Profile completion
  const filledFields = [
    profile.firstName,
    profile.lastName,
    profile.email,
    profile.phone,
    profile.location,
    profile.headline,
    profile.about,
    profile.education,
    profile.college,
    resumeName,
    profile.linkedin,
    profile.github,
    profile.portfolio,
  ].filter((value) => value.trim() !== "").length;

  const completion = Math.round((filledFields / 13) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-600">
              Candidate Dashboard / My Profile
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your personal details, skills, education, and resume.
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => {
                setIsEditing(true);
                setMessage("");
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setMessage("");
                }}
                className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <X size={17} />
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-6">

            {/* Profile Card */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-500" />

              <div className="px-6 pb-6">
                <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700">
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {profile.firstName} {profile.lastName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {profile.headline || "Add your professional headline"}
                </p>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p className="flex items-center gap-3 break-all">
                    <Mail size={17} />
                    {profile.email}
                  </p>

                  <p className="flex items-center gap-3">
                    <MapPin size={17} />
                    {profile.location || "Add your location"}
                  </p>

                  <p className="flex items-center gap-3">
                    <BriefcaseBusiness size={17} />
                    {profile.experience}
                  </p>
                </div>

                {/* Social Profile Links */}
                {(profile.linkedin ||
                  profile.github ||
                  profile.portfolio) && (
                    <div className="mt-5 flex gap-3 border-t pt-4">
                      {profile.linkedin && (
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          title="LinkedIn"
                          className="rounded-lg border p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <span className="font-bold text-blue-600">in</span>
                        </a>
                      )}

                      {profile.github && (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub"
                          className="rounded-lg border p-2 text-slate-800 hover:bg-slate-100"
                        >
                          <Github size={20} />
                        </a>
                      )}

                      {profile.portfolio && (
                        <a
                          href={profile.portfolio}
                          target="_blank"
                          rel="noreferrer"
                          title="Portfolio"
                          className="rounded-lg border p-2 text-emerald-600 hover:bg-emerald-50"
                        >
                          <Globe size={20} />
                        </a>
                      )}
                    </div>
                  )}

                {/* Profile Completion */}
                <div className="mt-6 border-t pt-5">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      Profile completion
                    </span>

                    <span className="text-sm font-bold text-blue-600">
                      {completion}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${completion}%` }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Add your details and resume to improve your profile.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Quick Links
              </h3>

              <div className="mt-4 space-y-2">
                <Link
                  to="/candidate/applications"
                  className="flex items-center gap-3 rounded-xl p-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                >
                  <BriefcaseBusiness size={18} />
                  My Applications
                </Link>

                <Link
                  to="/candidate/saved-jobs"
                  className="flex items-center gap-3 rounded-xl p-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                >
                  <FileText size={18} />
                  Saved Jobs
                </Link>

                <Link
                  to="/candidate/settings"
                  className="flex items-center gap-3 rounded-xl p-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                >
                  <Settings size={18} />
                  Account Settings
                </Link>
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="space-y-6 lg:col-span-2">

            {/* Personal Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <UserRound size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your contact and professional details.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={profile.firstName}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={profile.lastName}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Location
                  </label>
                  <input
                    name="location"
                    value={profile.location}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Experience
                  </label>
                  <select
                    name="experience"
                    value={profile.experience}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  >
                    <option>Fresher</option>
                    <option>0–1 years</option>
                    <option>1–3 years</option>
                    <option>3+ years</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Professional Headline
                  </label>
                  <input
                    name="headline"
                    value={profile.headline}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    placeholder="Java Full Stack Developer"
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    About Me
                  </label>
                  <textarea
                    name="about"
                    value={profile.about}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Write about yourself..."
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                {/* LinkedIn */}
                <div className="sm:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <span className="font-bold text-blue-600">in</span>
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                {/* GitHub */}
                <div className="sm:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Code size={18} />
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={profile.github}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    placeholder="https://github.com/your-username"
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                {/* Portfolio */}
                <div className="sm:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Globe size={18} className="text-emerald-600" />
                    Portfolio Website URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={profile.portfolio}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    placeholder="https://yourportfolio.com"
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                  <GraduationCap size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Education
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your academic background.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Degree
                  </label>
                  <input
                    name="education"
                    value={profile.education}
                    onChange={updateProfile}
                    disabled={!isEditing}
                    className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      College / University
                    </label>
                    <input
                      name="college"
                      value={profile.college}
                      onChange={updateProfile}
                      disabled={!isEditing}
                      className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Expected Graduation
                    </label>
                    <input
                      type="number"
                      name="graduationYear"
                      value={profile.graduationYear}
                      onChange={updateProfile}
                      disabled={!isEditing}
                      className="w-full rounded-xl border px-4 py-3 text-sm disabled:bg-slate-50"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <BriefcaseBusiness size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Skills
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Highlight your technical skills.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}

                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-blue-500 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="Enter a skill, e.g. Spring Security"
                    className="min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm"
                  />

                  <button
                    type="button"
                    onClick={addSkill}
                    className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    <Plus size={17} />
                    Add Skill
                  </button>
                </div>
              )}
            </section>

            {/* Resume */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                  <FileText size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Resume
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Upload your latest resume as a PDF.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600">
                    <FileText size={24} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-all text-sm font-semibold text-slate-800">
                      {resumeName || "No resume uploaded yet"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      PDF format · Maximum file size 5 MB
                    </p>
                  </div>

                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                    <Upload size={17} />
                    Upload Resume
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {resumeFile && (
                <p className="mt-3 text-xs text-slate-500">
                  Selected file: {resumeFile.name}. Connect your backend
                  to save it permanently.
                </p>
              )}
            </section>

            {/* Bottom Save Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setMessage("");
                  }}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  onClick={saveProfile}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CandidateProfile;
