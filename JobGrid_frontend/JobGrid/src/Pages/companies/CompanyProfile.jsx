import { useEffect, useState } from "react";
import { API_BASE } from "../../config";

const API_URL = `${API_BASE}/api/company`;
const MAX_LOGO_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

const emptyProfile = {
  name: "",
  email: "",
  industry: "",
  location: "",
  website: "",
  size: "",
  founded: "",
  phone: "",
  description: "",
  logoUrl: "",
};

// Backend DTO -> form/profile object
const fromDto = (dto) => ({
  name: dto.companyName ?? "",
  email: dto.companyEmail ?? "",
  industry: dto.industry ?? "",
  location: dto.location ?? "",
  website: dto.website ?? "",
  size: dto.companySize ?? "",
  founded: dto.foundedYear ? String(dto.foundedYear) : "",
  phone: dto.phoneNumber ? String(dto.phoneNumber) : "",
  description: dto.aboutCompany ?? "",
  logoUrl: dto.logoUrl ?? "",
});

// Form object -> backend DTO
const toDto = (form) => ({
  companyName: form.name,
  companyEmail: form.email,
  industry: form.industry,
  location: form.location,
  website: form.website,
  companySize: form.size,
  foundedYear: Number(form.founded),
  phoneNumber: Number(form.phone),
  aboutCompany: form.description,
});

const logoSrc = (url) =>
  !url ? "" : url.startsWith("http") ? url : `${API_URL}${url}`;

function CompanyProfile({ companyId = 1 }) {
  const [profile, setProfile] = useState(emptyProfile);
  const [formData, setFormData] = useState(emptyProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  // Load company from the API
  useEffect(() => {
    const loadCompany = async () => {
      try {
        const res = await fetch(`${API_URL}/api/company/${companyId}`);
        if (!res.ok) throw new Error(await readError(res));
        const data = await res.json();
        const loaded = fromDto(data);
        setProfile(loaded);
        setFormData(loaded);
      } catch (err) {
        setMessage({ type: "error", text: err.message });
      } finally {
        setLoading(false);
      }
    };
    loadCompany();
  }, [companyId]);

  // Free the preview URL when it changes or the component unmounts
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const readError = async (res) => {
    try {
      const body = await res.json();
      return body.message || "Something went wrong";
    } catch {
      return "Something went wrong";
    }
  };

  const startEditing = () => {
    setFormData(profile);
    setLogoFile(null);
    setLogoPreview("");
    setIsEditing(true);
    setMessage({ type: "", text: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setMessage({ type: "error", text: "Only PNG, JPG or WEBP images are allowed." });
      e.target.value = "";
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      setMessage({ type: "error", text: "Logo must be smaller than 2MB." });
      e.target.value = "";
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setMessage({ type: "", text: "" });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setMessage({ type: "error", text: "Phone number must be 10 digits." });
      return;
    }
    if (!/^[0-9]{4}$/.test(formData.founded)) {
      setMessage({ type: "error", text: "Enter a valid 4 digit founded year." });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Save text fields
      const res = await fetch(`${API_URL}/api/company/${companyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toDto(formData)),
      });
      if (!res.ok) throw new Error(await readError(res));
      let saved = await res.json();

      // 2. Upload logo only if a new one was selected
      if (logoFile) {
        const body = new FormData();
        body.append("file", logoFile);

        const logoRes = await fetch(`${API_URL}/api/company/${companyId}/logo`, {
          method: "POST",
          body, // no Content-Type header, the browser sets it
        });
        if (!logoRes.ok) throw new Error(await readError(logoRes));
        saved = await logoRes.json();
      }

      const updated = fromDto(saved);
      setProfile(updated);
      setFormData(updated);
      setLogoFile(null);
      setLogoPreview("");
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setLogoFile(null);
    setLogoPreview("");
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
        Loading company profile...
      </div>
    );
  }

  const currentLogo = logoPreview || logoSrc(profile.logoUrl);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
            <p className="mt-2 text-gray-500">
              Manage your company information and public details.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={startEditing}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {message.text && (
          <div
            className={`mb-5 rounded-lg border p-4 text-sm ${
              message.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Company banner */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-36 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 sm:h-44" />

          <div className="px-6 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-blue-50 text-3xl font-bold text-blue-700 shadow-sm">
                {currentLogo ? (
                  <img
                    src={currentLogo}
                    alt={`${profile.name} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile.name?.charAt(0) || "C"
                )}
              </div>

              <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                Company Account
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="mt-1 text-gray-500">{profile.industry}</p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span>📍</span> {profile.location}
              </span>
              <span className="flex items-center gap-2">
                <span>👥</span> {profile.size}
              </span>
              <span className="flex items-center gap-2">
                <span>📅</span> Founded {profile.founded}
              </span>
            </div>
          </div>
        </div>

        {isEditing ? (
          /* Edit form */
          <form
            onSubmit={handleSave}
            className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Edit Company Details
            </h2>

            {/* Logo upload */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-gray-300 bg-gray-50">
                {currentLogo ? (
                  <img
                    src={currentLogo}
                    alt="Logo preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No logo</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="logo"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Company Logo
                </label>
                <input
                  id="logo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoChange}
                  className="text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-600 hover:file:bg-blue-100"
                />
                <p className="mt-1 text-xs text-gray-400">PNG, JPG or WEBP, max 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                { label: "Company Name", name: "name" },
                { label: "Company Email", name: "email", type: "email" },
                { label: "Industry", name: "industry" },
                { label: "Location", name: "location" },
                { label: "Website", name: "website", type: "url" },
                { label: "Company Size", name: "size" },
                { label: "Founded Year", name: "founded", maxLength: 4 },
                { label: "Phone Number", name: "phone", type: "tel", maxLength: 10 },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    maxLength={field.maxLength}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  About Company
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  maxLength={2000}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          /* Profile information */
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">About Company</h2>
                <p className="mt-4 leading-7 text-gray-600">{profile.description}</p>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">Company Information</h2>

                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Info label="Industry" value={profile.industry} />
                  <Info label="Company Size" value={profile.size} />
                  <Info label="Founded In" value={profile.founded} />
                  <Info label="Headquarters" value={profile.location} />
                </div>
              </section>
            </div>

            <div>
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>

                <div className="mt-5 space-y-5">
                  <Info label="Company Email" value={profile.email} />
                  <Info label="Phone Number" value={profile.phone} />

                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    {profile.website ? (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block break-all font-medium text-blue-600 hover:underline"
                      >
                        {profile.website}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-gray-900">-</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={startEditing}
                  className="mt-6 w-full rounded-lg border border-blue-600 px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Update Information
                </button>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 break-words font-medium text-gray-900">{value || "-"}</p>
    </div>
  );
}

export default CompanyProfile;