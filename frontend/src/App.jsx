import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FamilyListPage from "./pages/FamilyListPage";
import FamilyProfilePage from "./pages/FamilyProfilePage";
import DependentProfilePage from "./pages/DependentProfilePage";

function AdminShell() {
  const { logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="brand">Pratheeksha</div>
        <nav>
          <NavLink to="/families">Families</NavLink>
        </nav>
        <button className="secondary logout" onClick={logout}>Log out</button>
      </header>
      <main>
        <Routes>
          <Route path="/families" element={<FamilyListPage />} />
          <Route path="/families/new" element={<FamilyProfilePage />} />
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
