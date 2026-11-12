
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  X,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

const AdminCompanies = () => {
  // Sample company data
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechNova Solutions",
      industry: "IT & Software",
      location: "Pune, India",
      email: "contact@technova.com",
      jobs: 4,
      employees: "100-250",
      status: "Verified",
    },
    {
      id: 2,
      name: "CodeCraft Technologies",
      industry: "Software Development",
      location: "Mumbai, India",
      email: "info@codecraft.com",
      jobs: 3,
      employees: "50-100",
      status: "Verified",
    },
    {
      id: 3,
      name: "InnovateTech",
      industry: "Technology",
      location: "Bangalore, India",
      email: "hello@innovatetech.com",
      jobs: 2,
      employees: "10-50",
      status: "Pending",
    },
    {
      id: 4,
      name: "CloudPeak Systems",
      industry: "Cloud Computing",
      location: "Hyderabad, India",
      email: "info@cloudpeak.com",
      jobs: 5,
      employees: "100-250",
      status: "Verified",
    },
    {
      id: 5,
      name: "Digital Wave",
      industry: "Digital Services",
      location: "Delhi, India",
      email: "team@digitalwave.com",
      jobs: 1,
      employees: "10-50",
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);

  // Search and filter companies
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || company.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Verify or reject a company's registration
  const updateStatus = (id, status) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, status } : company
      )
    );
  };

  // Delete a company
  const deleteCompany = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (confirmed) {
      setCompanies(companies.filter((company) => company.id !== id));
    }
  };

  // Save edited company information
  const saveCompany = (e) => {
    e.preventDefault();

    setCompanies(
      companies.map((company) =>
        company.id === editingCompany.id ? editingCompany : company
      )
    );

    setEditingCompany(null);
  };

  const stats = [
    {
      title: "Total Companies",
      value: companies.length,
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Verified Companies",
      value: companies.filter((c) => c.status === "Verified").length,
      icon: Users,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Pending Approvals",
      value: companies.filter((c) => c.status === "Pending").length,
      icon: BriefcaseBusiness,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f8fe] p-5 md:p-8">
      {/* Heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#10234d] md:text-3xl">
            Manage Companies
          </h1>
          <p className="mt-2 text-sm text-[#58709e]">
            View, verify, and manage companies registered on JobGrids.
          </p>
        </div>

        <Link
          to="/admin"
          className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Summary cards */}
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
                <p className="text-sm text-[#58709e]">{item.title}</p>
                <h2 className="mt-1 text-2xl font-bold text-[#10234d]">
                  {item.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Companies table */}
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-blue-50 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-bold text-[#10234d]">All Companies</h2>
            <p className="mt-1 text-xs text-[#58709e]">
              {filteredCompanies.length} companies found
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
                placeholder="Search companies..."
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
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#f2f7fd] text-xs text-[#344c79]">
              <tr>
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Industry</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Jobs</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCompanies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-blue-50 text-sm hover:bg-blue-50/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                        {company.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-[#10234d]">
                          {company.name}
                        </p>
                        <p className="mt-1 text-xs text-[#58709e]">
                          {company.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[#58709e]">
                    {company.industry}
                  </td>

                  <td className="px-5 py-4 text-[#58709e]">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {company.location}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-medium text-[#344c79]">
                    {company.jobs}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        company.status === "Verified"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        title="View company"
                        onClick={() => setSelectedCompany(company)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
                        title="Edit company"
                        onClick={() =>
                          setEditingCompany({ ...company })
                        }
                        className="text-emerald-600 hover:text-emerald-800"
                      >
                        <Pencil size={18} />
                      </button>

                      {company.status === "Pending" && (
                        <button
                          type="button"
                          title="Verify company"
                          onClick={() =>
                            updateStatus(company.id, "Verified")
                          }
                          className="text-xs font-semibold text-emerald-600 hover:underline"
                        >
                          Verify
                        </button>
                      )}

                      <button
                        type="button"
                        title="Delete company"
                        onClick={() => deleteCompany(company.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCompanies.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View company popup */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#10234d]">
                Company Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-blue-600">
              {selectedCompany.name}
            </h3>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <p>Email: {selectedCompany.email}</p>
              <p>Industry: {selectedCompany.industry}</p>
              <p>Location: {selectedCompany.location}</p>
              <p>Employees: {selectedCompany.employees}</p>
              <p>Jobs Posted: {selectedCompany.jobs}</p>
              <p>Status: {selectedCompany.status}</p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCompany(null)}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit company popup */}
      {editingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={saveCompany}
            className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#10234d]">
                Edit Company
              </h2>

              <button
                type="button"
                onClick={() => setEditingCompany(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Company Name
              </label>

              <input
                required
                value={editingCompany.name}
                onChange={(e) =>
                  setEditingCompany({
                    ...editingCompany,
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
                type="email"
                required
                value={editingCompany.email}
                onChange={(e) =>
                  setEditingCompany({
                    ...editingCompany,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Industry
              </label>

              <input
                required
                value={editingCompany.industry}
                onChange={(e) =>
                  setEditingCompany({
                    ...editingCompany,
                    industry: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
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

export default AdminCompanies;
