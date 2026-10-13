import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "../utils/cn";

export default function AdminLogin() {
  const { user, loading, configured, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (loading) {
    return (
      <div className="grid min-h-dvh place-items-center bg-ink-50">
        <p className="text-[14px] text-ink-400">Loading…</p>
      </div>
    );
  }

  if (user) return <Navigate to="/admin" replace />;

  if (!configured) {
    return (
      <div className="grid min-h-dvh place-items-center bg-ink-50 px-5">
        <div className="max-w-md rounded-[24px] border border-ink-900/8 bg-white p-8 text-center shadow-soft">
          <h1 className="text-[20px] font-semibold text-ink-950">Supabase not configured</h1>
          <p className="mt-3 text-[14px] text-ink-500">
            Set <code className="rounded bg-ink-100 px-1.5 py-0.5 text-[13px]">VITE_SUPABASE_URL</code> and{" "}
            <code className="rounded bg-ink-100 px-1.5 py-0.5 text-[13px]">VITE_SUPABASE_ANON_KEY</code> then rebuild.
          </p>
        </div>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: err } = await signIn(email.trim(), password);
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    navigate("/admin", { replace: true });
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-ink-50 px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-[28px] border border-ink-900/8 bg-white p-8 shadow-soft"
      >
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-400">Firstform</p>
          <h1 className="mt-2 text-[22px] font-semibold tracking-tight text-ink-950">Admin sign in</h1>
          <p className="mt-2 text-[13px] text-ink-500">Private access only. No public registration.</p>
        </div>

        <label className="mt-8 mb-1.5 block text-[13px] font-medium text-ink-700" htmlFor="admin-email">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-full rounded-2xl border border-ink-200 px-4 text-[15px] focus:border-ink-950 focus:ring-4 focus:ring-ink-950/8 focus:outline-none"
        />

        <label className="mt-4 mb-1.5 block text-[13px] font-medium text-ink-700" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 w-full rounded-2xl border border-ink-200 px-4 text-[15px] focus:border-ink-950 focus:ring-4 focus:ring-ink-950/8 focus:outline-none"
        />

        {error && (
          <p className="mt-3 text-[13px] font-medium text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className={cn(
            "mt-6 h-12 w-full rounded-full bg-ink-950 text-[15px] font-medium text-white transition-all hover:bg-ink-800 active:scale-[0.98] disabled:opacity-60",
          )}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <a href="/" className="mt-5 block text-center text-[13px] text-ink-400 hover:text-ink-700">
          ← Back to site
        </a>
      </form>
    </div>
  );
}
