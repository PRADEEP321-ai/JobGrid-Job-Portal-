import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

// Public pages
import Navbar from './Pages/public/Navbar';
import Home from './Pages/public/Home';
import Jobs from './Pages/public/Jobs';
import Blog from './Pages/public/Blog';
import AboutUs from './Pages/public/AboutUs';
import Contact from './Pages/public/Contact';

// Common components
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import Footer from './Component/Footer';
import ProtectedRoute from './Component/ProtectedRoute';

// Company pages
import Company_Nav from './Pages/companies/Company_Nav';
import CompanyDashboard from './Pages/companies/CompanyDashboard';
import AddJobs from './Pages/companies/AddJobs';
import Manage_jobs from './Pages/companies/Manage_jobs';
import EditJobs from './Pages/companies/EditJobs';
import Applicants from './Pages/companies/Applicants';
import CompanyProfile from './Pages/companies/CompanyProfile';

// Candidate pages
import Candidate_Nav from './Pages/candidate/Candidate_Nav';
import CandidateDashboard from './Pages/candidate/CandidateDashboard';
import CandidateJobs from './Pages/candidate/CandidateJobs';
import ResumeAnalyzer from './Pages/candidate/ResumeAnalyzer';
import CandidateApplications from './Pages/candidate/CandidateApplications';
import SavedJobs from './Pages/candidate/SavedJobs';
import CandidateProfile from './Pages/candidate/CandidateProfile';
import JobDetail from './Pages/candidate/JobDetail';

// Admin pages
import AdminNavbar from './Pages/admin/AdminNavbar';
import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminAddJob from './Pages/admin/AdminAddJob';
import AdminManageJobs from './Pages/admin/AdminManageJobs';
import AdminCompanies from './Pages/admin/AdminCompanies';
import AdminCandidates from './Pages/admin/AdminCandidates';
import AdminProfile from './Pages/admin/AdminProfile';

// Public layout: Navbar + Page + Footer
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

// Company layout
function CompanyLayout() {
  return (
    <>
      <Company_Nav />
      <Outlet />
      <Footer />
    </>
  );
}

// Candidate layout
function CandidateLayout() {
  return (
    <>
      <Candidate_Nav />
      <Outlet />
      <Footer />
    </>
  );
}

// Admin layout
function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* ---------- Public pages ---------- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ---------- Authentication pages ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ---------- Company pages (COMPANY only) ---------- */}
      <Route
        element={
          <ProtectedRoute allowedRole="COMPANY">
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/addjobs" element={<AddJobs />} />            {/* post a job   */}
        <Route path="/manageJobs" element={<Manage_jobs />} />     {/* list + delete */}
        <Route path="/manageJobs/:id" element={<EditJobs />} />    {/* edit a job   */}
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/c_profile" element={<CompanyProfile />} />
      </Route>

      {/* ---------- Candidate pages (CANDIDATE only) ---------- */}
      <Route
        element={
          <ProtectedRoute allowedRole="CANDIDATE">
            <CandidateLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate_jobs" element={<CandidateJobs />} />
        <Route path="/candidate_jobs/:id" element={<JobDetail />} />
        <Route path="/resume_analyzer" element={<ResumeAnalyzer />} />
        <Route path="/candidate/applications" element={<CandidateApplications />} />
        <Route path="/saved_jobs" element={<SavedJobs />} />
        <Route path="/profile" element={<CandidateProfile />} />
      </Route>

      {/* ---------- Admin pages (ADMIN only) ---------- */}
      <Route
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-job" element={<AdminAddJob />} />
        <Route path="/admin/manage-jobs" element={<AdminManageJobs />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/candidates" element={<AdminCandidates />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Route>

      {/* ---------- Unknown URL -> home page ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;