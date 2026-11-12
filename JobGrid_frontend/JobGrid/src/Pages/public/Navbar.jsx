
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSignUp, onLogin }) => {
  const [menu, setMenu] = useState(false);

  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky top-1 z-50 mx-3 mt-4 sm:mx-4">
      <nav className="rounded-full border border-gray-200 bg-white px-4 py-3 shadow-md sm:px-5">
        <div className="flex items-center justify-between gap-3">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center text-xl font-bold sm:text-2xl"
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
            <li className="hover:text-sky-500">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-sky-500">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:text-sky-500">
              <Link to="/jobs">Jobs</Link>
            </li>
            <li className="hover:text-sky-500">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="hover:text-sky-500">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <Link
              to="/login"
              onClick={onLogin}
              className="text-sky-500 hover:text-blue-700"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={onSignUp}
              className="rounded-full bg-[#2446F3] px-5 py-2 text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenu(!menu)}
            className="flex shrink-0 items-center justify-center text-3xl leading-none text-gray-800 lg:hidden"
            aria-label={menu ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menu}
          >
            {menu ? "×" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menu && (
        <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-md lg:hidden">
          <ul className="flex flex-col gap-5">
            <li>
              <Link to="/" onClick={closeMenu} className="hover:text-sky-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu} className="hover:text-sky-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={closeMenu} className="hover:text-sky-500">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeMenu} className="hover:text-sky-500">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu} className="hover:text-sky-500">
                Contact
              </Link>
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-5">
            <Link
              to="/login"
              onClick={() => {
                closeMenu();
                onLogin?.();
              }}
              className="text-sky-500"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => {
                closeMenu();
                onSignUp?.();
              }}
              className="rounded-full bg-[#2446F3] px-5 py-2 text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
