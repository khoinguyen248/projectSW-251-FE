import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import Layout from "./components/Layout/Layout";

// Pages
import Dashboard from "./routes/Dashboard";
import StudentsList from "./routes/Students/StudentsLists";
import AddStudent from "./routes/Students/AddStudent";
import StudentDetails from "./routes/Students/StudentDetails";
import AddTeacher from "./routes/Teachers/AddTeacher";
import TeacherDetails from "./routes/Teachers/TeacherDetails";
import Events from "./routes/Events";
import Finance from "./routes/Finance";
import Food from "./routes/Food";
import UserDashboard from "./routes/UserDashboard";
import Chat from "./routes/Chat";
import Notifications from "./routes/Notifications";
import ProfileSetup from "./routes/ProfileSetup"; // NEW
import NotFound from "./routes/NotFound";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import TutorList from "./routes/Teachers/TutorList";
import ProgramRegistration from "./routes/ProgramRegistration";
import Session from "./routes/Session";
import TestScheduleSession from "./routes/Session";
import PendingSessions from "./routes/Pending";
import VerifyEmail from "./routes/VerifyEmail";
import ResendVerification from "./routes/ResendVerification";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/resend-verification" element={<ResendVerification />} />
            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/profile-setup" element={<ProfileSetup />} />
                      <Route path="/students" element={<StudentsList />} />
                      <Route path="/students/add" element={<AddStudent />} />
                      <Route path="/students/:id" element={<StudentDetails />} />
                      <Route path="/teachers" element={<TutorList />} />
                      <Route path="/registration" element={<ProgramRegistration />} />
                      <Route path="/teachers/add" element={<AddTeacher />} />
                      <Route path="/pending" element={<PendingSessions />} />

                      <Route path="/teachers/:id" element={<TeacherDetails />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/finance" element={<Finance />} />
                      <Route path="/food" element={<Food />} />
                      <Route path="/user" element={<UserDashboard />} />
                      <Route path="/session" element={<TestScheduleSession />} />

                      <Route path="/chat" element={<Chat />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;