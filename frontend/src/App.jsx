import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import { loadResources } from "./api/openapi";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResourcePage from "./pages/ResourcePage";

function ResourceRoute({ resources }) {
  const { key } = useParams();
  const resource = resources.find((r) => r.key === key);
  if (!resource) return <Navigate to="/" replace />;
  return <ResourcePage resource={resource} />;
}

function AdminShell() {
  const { logout } = useAuth();
  const [resources, setResources] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResources().then(setResources).catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="center-note error">Failed to load API schema: {error}</div>;
  if (!resources) return <div className="center-note">Loading…</div>;

  return (
    <div className="shell">
      <aside>
        <div className="brand">Pratheeksha</div>
        <nav>
          {resources.map((r) => (
            <NavLink key={r.key} to={`/r/${r.key}`}>{r.title}</NavLink>
          ))}
        </nav>
        <button className="secondary logout" onClick={logout}>Log out</button>
      </aside>
      <main>
        <Routes>
          <Route path="/r/:key" element={<ResourceRoute resources={resources} />} />
          <Route path="*" element={<Navigate to={`/r/${resources[0].key}`} replace />} />
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
