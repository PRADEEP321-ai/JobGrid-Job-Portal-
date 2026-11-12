
import React, { useState } from "react";
import {
  Users,
  Search,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  BriefcaseBusiness,
  X,
} from "lucide-react";

const AdminCandidates = () => {
  // Sample candidate data
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Pradeep Gauddab",
      email: "pradeep@gmail.com",
      skills: "Java, React, MySQL",
      location: "Pune, India",
      experience: "Fresher",
      appliedJobs: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Sneha Patil",
      email: "sneha@gmail.com",
      skills: "Python, Django, SQL",
      location: "Mumbai, India",
      experience: "1 Year",
      appliedJobs: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Rohit Sharma",
      email: "rohit@gmail.com",
      skills: "Java, Spring Boot",
      location: "Pune, India",
      experience: "2 Years",
      appliedJobs: 4,
      status: "Active",
    },
    {
      id: 4,
      name: "Anjali Deshmukh",
      email: "anjali@gmail.com",
      skills: "React, Tailwind, JavaScript",
      location: "Bangalore, India",
      experience: "Fresher",
      appliedJobs: 3,
      status: "Inactive",
    },
    {
      id: 5,
      name: "Amit Kulkarni",
      email: "amit@gmail.com",
      skills: "Java, MySQL, Spring Boot",
      location: "Hyderabad, India",
      experience: "1 Year",
      appliedJobs: 6,
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editingCandidate, setEditingCandidate] = useState(null);

  // Search candidates and filter by status
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase()) ||
      candidate.skills.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Delete candidate
  const deleteCandidate = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (confirmed) {
      setCandidates(
        candidates.filter((candidate) => candidate.id !== id)
      );
    }
  };

  // Change candidate status
  const changeStatus = (id, status) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status } : candidate
      )
    );
  };

  // Save edited candidate
  const saveCandidate = (e) => {
    e.preventDefault();

    setCandidates(
      candidates.map((candidate) =>
        candidate.id === editingCandidate.id
          ? editingCandidate
          : candidate
      )
    );

    setEditingCandidate(null);
  };

  // Dashboard statistics
  const stats = [
    {
      title: "Total Candidates",
      value: candidates.length,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Candidates",
      value: candidates.filter((c) => c.status === "Active").length,
      icon: BriefcaseBusiness,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Inactive Candidates",
      value: candidates.filter((c) => c.status === "Inactive").length,
      icon: Users,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f8fe] p-5 md:p-8">

      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#10234d] md:text-3xl">
          Manage Candidates
        </h1>

        <p className="mt-2 text-sm text-[#58709e]">
          View and manage candidates registered on JobGrids.
        </p>
      </div>

      {/* Statistics cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                <p className="text-sm text-[#58709e]">
                  {item.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#10234d]">
                  {item.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidates table */}
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">

        {/* Search and filter */}
        <div className="flex flex-col gap-4 border-b border-blue-50 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-bold text-[#10234d]">
              All Candidates
            </h2>

            <p className="mt-1 text-xs text-[#58709e]">
              {filteredCandidates.length} candidates found
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
                placeholder="Search candidates..."
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
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Responsive table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-[#f2f7fd] text-xs text-[#344c79]">
              <tr>
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">Skills</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Experience</th>
                <th className="px-5 py-4">Applied Jobs</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="border-b border-blue-50 text-sm hover:bg-blue-50/40"
                >
                  {/* Candidate information */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                        {candidate.name
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div>
                        <p className="font-semibold text-[#10234d]">
                          {candidate.name}
                        </p>

                        <p className="mt-1 text-xs text-[#58709e]">
                          {candidate.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[#58709e]">
                    {candidate.skills}
                  </td>

                  <td className="px-5 py-4 text-[#58709e]">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {candidate.location}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-[#58709e]">
                    {candidate.experience}
                  </td>

                  <td className="px-5 py-4 font-medium text-[#344c79]">
                    {candidate.appliedJobs}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        candidate.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </td>

                  {/* Candidate actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        title="View candidate"
                        onClick={() => setSelectedCandidate(candidate)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
                        title="Edit candidate"
                        onClick={() =>
                          setEditingCandidate({ ...candidate })
                        }
                        className="text-emerald-600 hover:text-emerald-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        title="Delete candidate"
                        onClick={() => deleteCandidate(candidate.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCandidates.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View candidate popup */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#10234d]">
                Candidate Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-blue-600">
              {selectedCandidate.name}
            </h3>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <p>Email: {selectedCandidate.email}</p>
              <p>Skills: {selectedCandidate.skills}</p>
              <p>Location: {selectedCandidate.location}</p>
              <p>Experience: {selectedCandidate.experience}</p>
              <p>Applied Jobs: {selectedCandidate.appliedJobs}</p>
              <p>Status: {selectedCandidate.status}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  changeStatus(
                    selectedCandidate.id,
                    selectedCandidate.status === "Active"
                      ? "Inactive"
                      : "Active"
                  )
                }
                className="flex-1 rounded-lg border border-blue-200 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                Toggle Status
              </button>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit candidate popup */}
      {editingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={saveCandidate}
            className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#10234d]">
                Edit Candidate
              </h2>

              <button
                type="button"
                onClick={() => setEditingCandidate(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                required
                value={editingCandidate.name}
                onChange={(e) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                required
                type="email"
                value={editingCandidate.email}
                onChange={(e) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Skills
              </label>

              <input
                required
                value={editingCandidate.skills}
                onChange={(e) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    skills: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={editingCandidate.status}
                onChange={(e) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    status: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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

export default AdminCandidates;
