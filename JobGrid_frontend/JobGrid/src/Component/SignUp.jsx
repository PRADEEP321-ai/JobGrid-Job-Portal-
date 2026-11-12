import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

const API_URL = `${API_BASE}/api/users/create`;

// jobs shown in the right side card (only for design)
const recommendedJobs = [
  {
    title: "Frontend Developer",
    company: "TechNova Pvt Ltd",
    letter: "T",
    color: "bg-indigo-100 text-indigo-700",
    tag: "Remote",
    tagColor: "text-green-600",
  },
  {
    title: "Java Backend Developer",
    company: "CloudSpring Systems",
    letter: "C",
    color: "bg-blue-100 text-blue-700",
    tag: "Full-time",
    tagColor: "text-blue-600",
  },
  {
    title: "UI/UX Designer",
    company: "PixelCraft Studio",
    letter: "P",
    color: "bg-purple-100 text-purple-700",
    tag: "Hybrid",
    tagColor: "text-purple-600",
  },
];

const SignUp = () => {
  const navigate = useNavigate(); // used to go to login page after sign up

  const [role, setRole] = useState("CANDIDATE");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // runs when user clicks the Sign Up button
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    setError("");
    setSuccess("");

    // 1. check both passwords are same
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // 2. data which we send to Spring Boot
      const newUser = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword, // backend also checks this field
        role: role, // "CANDIDATE" or "COMPANY"
      };

      // 3. call the API (POST request)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      // 4. if backend says error, show its message
      if (!response.ok) {
        const text = await response.text();
        let message = text;

        // backend sends json like {"message":"...","status":"400 BAD_REQUEST"}
        // so we take only the message part
        try {
          message = JSON.parse(text).message;
        } catch (e) {
          // not json, use the text as it is
        }

        throw new Error(message || "Sign up failed. Please try again.");
      }

      // 5. success -> show message and go to login page
      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6 lg:p-10">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">
        {/* Left: Sign Up Form */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          {/* Logo */}
          <Link to="/" className="flex w-fit items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-2xl font-bold text-white">
              J
            </span>
            <span className="text-2xl font-bold text-gray-900">
              Job<span className="text-indigo-600">Grid</span>
            </span>
          </Link>

          {/* Form */}
          <div className="mx-auto my-12 w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Welcome
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Create your JobGrid account and join us to discover exciting
                career opportunities.
              </p>
            </div>

            {/* Role buttons */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("CANDIDATE")}
                className={`rounded-lg border p-3 font-medium ${
                  role === "CANDIDATE"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                Candidate
              </button>

              <button
                type="button"
                onClick={() => setRole("COMPANY")}
                className={`rounded-lg border p-3 font-medium ${
                  role === "COMPANY"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                Company
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  {role === "COMPANY" ? "Company Name" : "Full Name"}
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    role === "COMPANY"
                      ? "Enter your company name"
                      : "Enter your full name"
                  }
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="signup-password"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-16 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-indigo-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-16 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-indigo-600"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Error and success messages */}
              {error && (
                <p className="text-sm font-medium text-red-600">{error}</p>
              )}

              {success && (
                <p className="text-sm font-medium text-green-600">{success}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-500">Or Sign Up With</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert("Google sign up is not connected yet.")}
                className="rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Google
              </button>

              <button
                type="button"
                onClick={() => alert("Apple sign up is not connected yet.")}
                className="rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                GitHub
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
            <p>Copyright © 2026 JobGrid.</p>
            <Link to="/privacy" className="hover:text-indigo-600">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Right: Job Portal Illustration */}
        <div className="relative hidden overflow-hidden bg-indigo-600 p-8 text-white sm:p-10 lg:flex lg:items-center xl:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[45px] border-white/10" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border-[50px] border-white/10" />

          <div className="relative z-10 mx-auto max-w-lg">
            <h2 className="text-3xl font-bold leading-tight xl:text-4xl">
              Find Your Dream Job.
              <br />
              Build Your Future.
            </h2>

            <p className="mt-4 text-sm leading-7 text-indigo-100">
              Discover exciting opportunities, connect with top companies, and
              take the next step in your career with JobGrid.
            </p>

            {/* Dashboard Card */}
            <div className="mt-9 rounded-2xl bg-white p-5 text-gray-800 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-bold">Job Seeker Dashboard</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Your career at a glance
                  </p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-2 text-sm text-indigo-700">
                  Profile
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-gray-500">Applied</p>
                  <p className="mt-2 text-2xl font-bold text-indigo-600">12</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-gray-500">Saved</p>
                  <p className="mt-2 text-2xl font-bold text-blue-600">08</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-xs text-gray-500">Interviews</p>
                  <p className="mt-2 text-2xl font-bold text-purple-600">03</p>
                </div>
              </div>

              <h4 className="mb-3 mt-6 font-bold">Recommended Jobs</h4>

              <div className="space-y-3">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.title}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 p-3"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold ${job.color}`}
                    >
                      {job.letter}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{job.title}</p>
                      <p className="mt-1 text-xs text-gray-500">{job.company}</p>
                    </div>
                    <span className={`text-xs font-medium ${job.tagColor}`}>
                      {job.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-gray-50 p-3 text-center text-xs font-medium text-indigo-600">
                Find opportunities that match your skills →
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-indigo-100">
              Your next career opportunity starts here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;