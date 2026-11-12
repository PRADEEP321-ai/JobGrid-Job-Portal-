
import React, { useState } from "react";
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  LockKeyhole,
  Pencil,
  Save,
  X,
} from "lucide-react";

const AdminProfile = () => {
  // Admin profile data
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@jobgrids.com",
    phone: "9876543210",
    role: "Administrator",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Update the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Save profile changes in frontend state
  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f3f8fe] p-5 md:p-8">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#10234d] md:text-3xl">
          Admin Profile
        </h1>

        <p className="mt-2 text-sm text-[#58709e]">
          View and manage your administrator account.
        </p>
      </div>

      {/* Profile header card */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Profile avatar */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#10234d]">
              {profile.name}
            </h2>

            <p className="mt-1 text-sm text-[#58709e]">
              {profile.email}
            </p>

            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              <ShieldCheck size={15} />
              {profile.role}
            </span>
          </div>

          {!isEditing && (
            <button
              onClick={() => {
                setIsEditing(true);
                setMessage("");
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Personal information card */}
      <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
            <User size={22} />
          </div>

          <div>
            <h2 className="font-bold text-[#10234d]">
              Personal Information
            </h2>

            <p className="mt-1 text-xs text-[#58709e]">
              Your account details
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-5 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Full name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#344c79]">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm text-[#10234d] outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#344c79]">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm text-[#10234d] outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#344c79]">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm text-[#10234d] outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#344c79]">
                Account Role
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={profile.role}
                  disabled
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Form buttons */}
          {isEditing && (
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setMessage("");
                }}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
