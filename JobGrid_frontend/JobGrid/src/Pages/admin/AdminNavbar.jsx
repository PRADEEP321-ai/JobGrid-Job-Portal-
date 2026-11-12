import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, UserRound, Settings, LogOut } from "lucide-react";

// These paths must be same as the paths in your <Route path="..."> list in App.jsx
const navLinks = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Add Job", path: "/admin/add-job" },
  { name: "Manage Jobs", path: "/admin/manage-jobs" },
  { name: "Companies", path: "/admin/companies" },
  { name: "Candidates", path: "/admin/candidates" },
];

const AdminNavbar = () => {
  const [menu, setMenu] = useState(false); // mobile menu open or close
  const [profileMenu, setProfileMenu] = useState(false); // profile dropdown open or close

  const location = useLocation(); // gives the current page path
  const navigate = useNavigate(); // used to open login page after logout

  // get the logged in user which we saved in the login page
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // if user is not found, show default value
  const name = user ? user.name : "Admin";
  const firstLetter = name.charAt(0).toUpperCase(); // "Admin" -> "A"

  // true if this link is the page which is open now (to show it in blue)
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setProfileMenu(false);
    setMenu(false);

    localStorage.removeItem("user"); // remove saved user
    navigate("/login"); // go to login page
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link to="/admin/dashboard" className="text-2xl font-bold">
          <span className="text-blue-600">Job</span>
          <span className="text-gray-900">Grids</span>
          <span className="ml-2 text-xs text-gray-500">Admin</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition ${
                isActive(link.path)
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Admin Profile */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setProfileMenu(!profileMenu)}
            className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-2 hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
              {firstLetter}
            </div>

            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">{name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {profileMenu && (
            <div className="absolute right-0 mt-3 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
              <Link
                to="/admin/profile"
                onClick={() => setProfileMenu(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                <UserRound size={18} />
                Admin Profile
              </Link>

              {/* Settings (you don't have this route yet, add it or delete this link) */}
              <Link
                to="/admin/settings"
                onClick={() => setProfileMenu(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                <Settings size={18} />
                Settings
              </Link>

              <hr className="my-2 border-gray-100" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="text-gray-700 lg:hidden"
        >
          {menu ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenu(false)}
                className={`text-sm font-medium ${
                  isActive(link.path) ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-gray-100" />

            <Link
              to="/admin/profile"
              onClick={() => setMenu(false)}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <UserRound size={18} />
              Admin Profile
            </Link>

            <Link
              to="/admin/settings"
              onClick={() => setMenu(false)}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <Settings size={18} />
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-left text-sm text-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;