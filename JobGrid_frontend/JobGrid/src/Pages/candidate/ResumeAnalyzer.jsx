
import { useState } from "react";
import {
  UploadCloud,
  FileText,
  Sparkles,
  Search,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  Tags,
  LayoutTemplate,
  Trash2,
  LoaderCircle,
  Target,
  ArrowRight,
} from "lucide-react";
import { API_BASE } from "../../config";

const API_URL = `${API_BASE}/api/resume/analyze`;

const colorStyles = {
  green: {
    icon: "bg-emerald-50 text-emerald-600",
    bar: "bg-emerald-500",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600",
    bar: "bg-blue-500",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600",
    bar: "bg-orange-500",
  },
  cyan: {
    icon: "bg-cyan-50 text-cyan-600",
    bar: "bg-cyan-500",
  },
  pink: {
    icon: "bg-rose-50 text-rose-600",
    bar: "bg-rose-500",
  },
  purple: {
    icon: "bg-purple-50 text-purple-600",
    bar: "bg-purple-500",
  },
};

const iconByTitle = {
  "Contact Information": UserRound,
  Skills: Tags,
  "Work Experience": BriefcaseBusiness,
  Experience: BriefcaseBusiness,
  Education: GraduationCap,
  "Keywords (ATS)": Target,
  "Resume Format": LayoutTemplate,
};

const defaultColors = [
  "green",
  "blue",
  "orange",
  "cyan",
  "pink",
  "purple",
];

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Validate uploaded resume
  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    setFile(null);
    setResult(null);

    const validExtension = /\.(pdf|docx)$/i.test(selectedFile.name);

    if (!validExtension) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size === 0) {
      setError("The selected file is empty.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must not exceed 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  // Upload resume and receive analysis from Spring Boot
  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");

      console.log("Token exists:", !!token);
      console.log("Token length:", token?.length);

      if (!token) {
        throw new Error(
          "Please login first. Authentication token not found."
        );
      }

      // Prepare multipart request
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || `Analysis failed with status ${response.status}.`
        );
      }

      const data = await response.json();

      // Validate backend response
      if (
        typeof data.atsScore !== "number" ||
        !Array.isArray(data.components) ||
        !Array.isArray(data.suggestions) ||
        data.atsScore < 0 ||
        data.atsScore > 100
      ) {
        throw new Error(
          "The server returned an unexpected response format."
        );
      }

      setResult(data);

    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Cannot connect to Spring Boot. Check your backend and CORS configuration."
          : err.message || "Unable to analyze your resume."
      );
    } finally {
      setLoading(false);
    }
  };

  // Remove uploaded resume and analysis
  const removeFile = () => {
    setFile(null);
    setResult(null);
    setError("");
  };

  const score = result?.atsScore ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2 text-blue-600">
            <Sparkles size={25} />
            <span className="text-sm font-semibold">
              AI POWERED TOOL
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            AI Resume Analyzer
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Upload your resume to review its ATS readiness and
            discover practical ways to improve it.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

          {/* Left column */}
          <div className="space-y-6 lg:col-span-5">

            {/* Upload section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Upload Your Resume
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select your latest resume to get started.
                </p>
              </div>

              {/* Drag and drop upload */}
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  handleFile(e.dataTransfer.files[0]);
                }}
                className={`flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${dragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-blue-200 bg-blue-50/40 hover:border-blue-400 hover:bg-blue-50"
                  }`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <UploadCloud size={30} />
                </div>

                <p className="font-semibold text-slate-800">
                  Drag and drop your resume
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  or click below to browse files
                </p>

                <span className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">
                  Choose File
                </span>

                <p className="mt-4 text-xs text-slate-400">
                  PDF or DOCX · Maximum 5 MB
                </p>

                <input
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) => {
                    handleFile(e.target.files[0]);
                    e.target.value = "";
                  }}
                />
              </label>

              {/* Error message */}
              {error && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600"
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />
                  <p>{error}</p>
                </div>
              )}

              {/* Selected file */}
              {file && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <FileText size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {file.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {(file.size / 1024).toFixed(0)} KB · Ready to analyze
                    </p>
                  </div>

                  <button
                    onClick={removeFile}
                    type="button"
                    aria-label="Remove resume"
                    disabled={loading}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}

              {/* Analyze button */}
              <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={19}
                      className="animate-spin"
                    />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Search size={19} />
                    Analyze Resume
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Results are generated by your connected backend.
              </p>
            </section>

            {/* Information section */}
            <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-3 text-blue-600 shadow-sm">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    What will be analyzed?
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Skills, education, experience, job-related
                    keywords and resume structure.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6 lg:col-span-7">

            {/* ATS Score */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                <div className="flex shrink-0 flex-col items-center justify-center sm:w-40">
                  <div className="relative flex h-36 w-36 items-center justify-center">

                    <svg
                      viewBox="0 0 120 120"
                      className="absolute inset-0 h-full w-full -rotate-90"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="49"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                      />

                      <circle
                        cx="60"
                        cy="60"
                        r="49"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="10"
                        strokeDasharray={`${score * 3.08} 308`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>

                    <div className="text-center">
                      <p className="text-4xl font-bold text-slate-900">
                        {result ? score : "--"}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        ATS Score
                      </p>
                    </div>
                  </div>

                  <span className="mt-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                    {result ? "Analysis complete" : "Awaiting analysis"}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle
                        className="mt-0.5 shrink-0 text-blue-600"
                        size={22}
                      />

                      <div>
                        <h3 className="font-bold text-blue-800">
                          {result
                            ? "Your resume analysis is ready"
                            : "Ready to improve your resume?"}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-blue-700">
                          {result
                            ? result.summary
                            : "Upload your resume and analyze it to see your results and improvement areas."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Analysis statistics */}
                  <div className="mt-4 grid grid-cols-3 gap-2">

                    <div className="rounded-xl border border-slate-200 p-3">
                      <Target size={19} className="text-blue-600" />
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {result ? `${score}%` : "--"}
                      </p>
                      <p className="text-xs text-slate-500">
                        ATS Score
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-3">
                      <AlertCircle size={19} className="text-orange-500" />
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {result ? result.issueCount : "--"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Issues
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-3">
                      <Lightbulb size={19} className="text-purple-600" />
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {result ? result.suggestions.length : "--"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Suggestions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Component Breakdown */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <FileText size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Component Breakdown
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    See which parts need attention.
                  </p>
                </div>
              </div>

              {!result ? (
                <div className="rounded-xl border border-dashed border-slate-200 px-5 py-8 text-center">
                  <FileText
                    size={28}
                    className="mx-auto text-slate-300"
                  />
                  <p className="mt-3 font-semibold text-slate-700">
                    No analysis available
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Upload a resume to see component scores.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {result.components.map((item, index) => {
                    const Icon = iconByTitle[item.title] || FileText;
                    const color = defaultColors[index % defaultColors.length];
                    const styles = colorStyles[color];

                    return (
                      <div
                        key={`${item.title}-${index}`}
                        className="grid grid-cols-[42px_minmax(0,1fr)] gap-3"
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}
                        >
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-slate-800">
                              {item.title}
                            </h3>
                            <span className="text-sm font-bold text-slate-700">
                              {item.score}%
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${styles.bar}`}
                              style={{
                                width: `${item.score}%`,
                              }}
                            />
                          </div>

                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            {item.advice}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* AI Suggestions */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                  <Lightbulb size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Improvement Suggestions
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Personalized recommendations for your resume.
                  </p>
                </div>
              </div>

              {!result ? (
                <div className="rounded-xl border border-dashed border-slate-200 px-5 py-8 text-center">
                  <Sparkles
                    size={28}
                    className="mx-auto text-slate-300"
                  />
                  <p className="mt-3 font-semibold text-slate-700">
                    Suggestions will appear here
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Analyze your resume to receive recommendations.
                  </p>
                </div>
              ) : result.suggestions.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No suggestions were returned.
                </p>
              ) : (
                <div className="space-y-3">
                  {result.suggestions.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="rounded-xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-slate-50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-800">
                              {item.title}
                            </h3>

                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                              {item.category}
                            </span>
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {item.description}
                          </p>
                        </div>

                        <ArrowRight
                          size={17}
                          className="mt-1 shrink-0 text-slate-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          JobGrids Resume Analyzer · AI-generated scores are estimates,
          not official ATS evaluations.
        </p>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
