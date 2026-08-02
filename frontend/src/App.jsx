import { useState } from "react";
import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FamilyListPage from "./pages/FamilyListPage";
import FamilyProfilePage from "./pages/FamilyProfilePage";
import DependentProfilePage from "./pages/DependentProfilePage";
import StudentsByGradePage from "./pages/StudentsByGradePage";
import AssistantPanel from "./components/AssistantPanel";

function AdminShell() {
  const { logout } = useAuth();
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="brand">Pratheeksha</div>
        <nav>
          <NavLink to="/families">Families</NavLink>
          <NavLink to="/students">Students by Grade</NavLink>
        </nav>
        <button className="secondary" onClick={() => setAssistantOpen(true)}>
          Ask the database
        </button>
        <button className="secondary logout" onClick={logout}>Log out</button>
      </header>
      <AssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
      <main>
        <Routes>
          <Route path="/families" element={<FamilyListPage />} />
          <Route path="/students" element={<StudentsByGradePage />} />
          <Route path="/families/new" element={<FamilyProfilePage isNew />} />
          <Route path="/families/:prfmlId" element={<FamilyProfilePage />} />
          <Route path="/families/:prfmlId/dependents/:dpid" element={<DependentProfilePage />} />
          <Route path="*" element={<Navigate to="/families" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function Gate() {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return (
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }
  return <AdminShell />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Gate />
      </AuthProvider>
    </BrowserRouter>
  );
}
