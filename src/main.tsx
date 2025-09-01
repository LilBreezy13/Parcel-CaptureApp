import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./routes/Login";
import Capture from "./routes/Capture";
import History from "./routes/History";
import Officer from "./routes/Officer";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Root() {
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [role, setRole] = React.useState<"scanner"|"officer"|"unknown">("unknown");

  React.useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        setRole((snap.data()?.role) || "scanner");
      } else {
        setRole("unknown");
      }
      setReady(true);
    });
  }, []);

  if (!ready) return <div className="h-screen grid place-items-center">Loading…</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App user={user} role={role} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/capture" element={user ? <Capture /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <History /> : <Navigate to="/login" />} />
        <Route path="/officer" element={user ? <Officer /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><Root /></React.StrictMode>);
