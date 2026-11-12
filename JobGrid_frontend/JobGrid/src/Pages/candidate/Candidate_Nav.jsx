import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";

// These paths must be same as the paths in your <Route path="..."> list
const navLinks = [
  { name: "Dashboard", path: "/candidate/dashboard" },
  { name: "Find Jobs", path: "/candidate_jobs" },
  { name: "Resume Analyzer", path: "/resume_analyzer" },
  { name: "My Applications", path: "/candidate/applications" },
  { name: "Saved Jobs", path: "/saved_jobs" },
];

const Candidate_Nav = () => {
  const navigate = useNavigate(); // used to open login page after logout

  const [menu, setMenu] = useState(false); // mobile menu open or close
  const [profileMenu, setProfileMenu] = useState(false); // profile dropdown open or close

  // get the logged in user which we saved in the login page
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // if user is not found, show default values
  const name = user ? user.name : "Candidate";
  const email = user ? user.email : "";
  const firstLetter = name.charAt(0).toUpperCase(); // "Pradeep" -> "P"

  // close both menus (used when a link is clicked)
  const closeMenus = () => {
    setMenu(false);
    setProfileMenu(false);
  };

  const handleLogout = () => {
    setProfileMenu(false);

    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      localStorage.removeItem("user"); // remove saved user
      navigate("/login"); // go to login page
    }
  };

  return (
    <div className="sticky top-1 z-50 mx-3 mt-4 sm:mx-4 sm:mt-5">
      <nav className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-md sm:rounded-full sm:px-5">
        <div className="flex items-center justify-between gap-3">

          {/* Logo */}
          <Link
            to="/candidate/dashboard"
            onClick={closeMenus}
            className="flex shrink-0 items-center text-lg font-bold sm:text-2xl"
          >
            <span className="rounded-l-lg bg-[#2446F3] px-2 py-1 text-white sm:px-3">
              Job
            </span>
            <span className="rounded-r-lg bg-[#071727] px-2 py-1 text-white sm:px-3">
              Grids
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-blue-600"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Profile + Mobile Menu */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Round profile icon */}
            <div
              className="relative"
              onMouseEnter={() => setProfileMenu(true)}
              onMouseLeave={() => setProfileMenu(false)}
            >
              <button
                type="button"
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-600 text-lg font-bold text-white transition hover:ring-4 hover:ring-blue-100 sm:h-11 sm:w-11"
              >
                {firstLetter}
              </button>

              {/* Profile dropdown */}
              {profileMenu && (
                <div className="absolute right-0 top-full z-50 w-60 pt-2">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

                    {/* Candidate information */}
                    <div className="border-b border-gray-100 px-4 py-4">
                      <p className="font-semibold text-gray-900">{name}</p>
                      <p className="mt-1 truncate text-sm text-gray-500">{email}</p>
                      <p className="mt-2 text-xs text-blue-600">Candidate Account</p>
                    </div>

                    {/* My Profile */}
                    <Link
                      to="/profile"
                      onClick={closeMenus}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <span>👤</span>
                      <span>My Profile</span>
                    </Link>

                    {/* Settings (you don't have this route yet, add it or delete this link) */}
                    <Link
                      to="/candidate/settings"
                      onClick={closeMenus}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <span>⚙️</span>
                      <span>Settings</span>
                    </Link>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <span>↪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => {
                setMenu(!menu);
                setProfileMenu(false);
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-3xl leading-none text-gray-800 hover:text-blue-600 lg:hidden"
            >
              {menu ? "×" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menu && (
        <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-md lg:hidden">
          <ul className="flex flex-col gap-5">
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeMenus}
                  className="block text-gray-700 transition hover:text-blue-600"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-gray-200 pt-4">
            <Link
              to="/profile"
              onClick={closeMenus}
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              My Profile
            </Link>

            <Link
              to="/candidate/settings"
              onClick={closeMenus}
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              Settings
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="block py-2 text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidate_Nav;