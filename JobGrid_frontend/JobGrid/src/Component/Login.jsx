import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

// Backend login endpoint (POST). Must match @PostMapping("/login") in AuthController.
const API_URL = `${API_BASE}/api/auth/login`;

// jobs shown in the right side card (only for design)
const recommendedJobs = [
  { letter: "T", title: "Java Developer", company: "Tech Solutions · Pune", tag: "Full-time", color: "bg-blue-100 text-blue-700", tagColor: "text-green-600" },
  { letter: "W", title: "React Developer", company: "WebWorks · Remote", tag: "Remote", color: "bg-purple-100 text-purple-700", tagColor: "text-blue-600" },
  { letter: "N", title: "Junior Software Engineer", company: "NextGen Systems · Pune", tag: "New", color: "bg-orange-100 text-orange-700", tagColor: "text-orange-600" },
];

const Login = () => {
  const navigate = useNavigate(); // used to open another page from code

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // runs when user clicks the Log In button
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    setLoading(true);
    setError("");

    try {
      // remove any old/expired token so it is never sent by mistake
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 1. send email + password to Spring Boot (POST, JSON body)
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      // 2. wrong credentials
      if (response.status === 401) {
        throw new Error("Wrong email or password.");
      }

      // 3. any other server problem
      if (!response.ok) {
        throw new Error("Unable to connect to server. Please try again.");
      }

      // 4. backend returns { token, id, name, email, role }
      const data = await response.json();

      if (!data.token) {
        throw new Error("Login failed: no token received from server.");
      }

      // 5. save token (plain string, no JSON.stringify) and user (no password)
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      // 6. open dashboard according to role
      const role = (data.role || "").toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "COMPANY") {
        navigate("/company/dashboard");
      } else if (role === "CANDIDATE") {
        navigate("/candidate/dashboard");
      } else {
        throw new Error("Unknown role: " + data.role);
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6 lg:p-10">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">

        {/* Left: Login Form */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">

          {/* Logo */}
          <a href="/" className="flex w-fit items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-2xl font-bold text-white">
              J
            </span>
            <span className="text-2xl font-bold text-gray-900">
              Job<span className="text-indigo-600">Grid</span>
            </span>
          </a>

          {/* Login Form */}
          <div className="mx-auto my-12 w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Welcome Back
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your email and password to access your JobGrid account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  id="login-email"
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
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
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

              {/* Error message */}
              {error && (
                <p className="text-sm font-medium text-red-600">{error}</p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-indigo-600"
                  />
                  Remember Me
                </label>

                <a
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-500">Or Login With</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert("Google login is not connected yet.")}
                className="rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Google
              </button>

              <button
                type="button"
                onClick={() => alert("Apple login is not connected yet.")}
                className="rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                GitHub
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:underline"
              >
                Register Now
              </Link>
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
            <p>Copyright © 2026 JobGrid.</p>
            <a href="/privacy" className="hover:text-indigo-600">
              Privacy Policy
            </a>
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
              Discover exciting opportunities, connect with top companies,
              and take the next step in your career with JobGrid.
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

export default Login; 