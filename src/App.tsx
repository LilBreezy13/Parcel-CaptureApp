import { Link, Navigate } from "react-router-dom";
import { auth } from "./firebase";

export default function App({ user, role }: { user: any, role: "scanner"|"officer"|"unknown" }) {
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">Parcel Scan</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user.displayName}</span>
          <button className="px-3 py-1.5 rounded-md bg-gray-200" onClick={() => auth.signOut()}>Sign out</button>
        </div>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/capture" className="p-6 rounded-xl bg-white shadow hover:shadow-md transition">
          <div className="text-brand-600 font-semibold mb-1">Capture parcels</div>
          <div className="text-sm text-gray-600">Single / double / triple shots, auto-framing, OCR prefill, submit.</div>
        </Link>
        <Link to="/history" className="p-6 rounded-xl bg-white shadow hover:shadow-md transition">
          <div className="text-brand-600 font-semibold mb-1">My history</div>
          <div className="text-sm text-gray-600">See all your submissions by time and status.</div>
        </Link>
        <Link to="/officer" className="p-6 rounded-xl bg-white shadow hover:shadow-md transition">
          <div className="text-brand-600 font-semibold mb-1">Parcel officer</div>
          <div className="text-sm text-gray-600">Review queue, day grouping, search, metrics, export.</div>
        </Link>
      </div>
      <p className="text-xs text-gray-500 mt-6">Role: {role}</p>
    </div>
  );
}
