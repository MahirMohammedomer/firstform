import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import type { ContactSubmission, Project, Review } from "../lib/types";
import { cn } from "../utils/cn";

type Tab = "projects" | "contacts" | "reviews";

const emptyProject = {
  title: "",
  slug: "",
  description: "",
  url: "",
  category: "",
  is_published: true,
  is_featured: false,
  sort_order: 0,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Admin() {
  const { user, loading, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ ...emptyProject });
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    const [p, c, r] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order", { ascending: true }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
    ]);
    if (p.data) setProjects(p.data as Project[]);
    if (c.data) setContacts(c.data as ContactSubmission[]);
    if (r.data) setReviews(r.data as Review[]);
  }, []);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  if (loading) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <p className="text-ink-400">Loading…</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  function flash(text: string) {
    setMsg(text);
    setTimeout(() => setMsg(""), 2800);
  }

  async function saveProject(e: FormEvent) {
    e.preventDefault();
    if (!supabase || !form.title.trim()) return;
    setBusy(true);
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || slugify(form.title),
      description: form.description.trim() || null,
      url: form.url.trim() || null,
      category: form.category.trim() || null,
      is_published: form.is_published,
      is_featured: form.is_featured,
      sort_order: Number(form.sort_order) || 0,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("projects").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("projects").insert(payload));
    }
    setBusy(false);
    if (error) {
      flash(error.message);
      return;
    }
    flash(editing ? "Project updated" : "Project added");
    setShowForm(false);
    setEditing(null);
    setForm({ ...emptyProject });
    load();
  }

  function startEdit(p: Project) {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description || "",
      url: p.url || "",
      category: p.category || "",
      is_published: p.is_published,
      is_featured: p.is_featured,
      sort_order: p.sort_order,
    });
    setShowForm(true);
  }

  async function toggleProject(id: string, field: "is_published" | "is_featured", value: boolean) {
    if (!supabase) return;
    await supabase.from("projects").update({ [field]: value }).eq("id", id);
    load();
  }

  async function moveProject(id: string, dir: -1 | 1) {
    const idx = projects.findIndex((p) => p.id === id);
    const swap = projects[idx + dir];
    if (!swap || !supabase) return;
    const a = projects[idx];
    await Promise.all([
      supabase.from("projects").update({ sort_order: swap.sort_order }).eq("id", a.id),
      supabase.from("projects").update({ sort_order: a.sort_order }).eq("id", swap.id),
    ]);
    load();
  }

  async function deleteProject(id: string) {
    if (!supabase || !confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    flash("Deleted");
    load();
  }

  async function setContactStatus(id: string, status: ContactSubmission["status"]) {
    if (!supabase) return;
    await supabase.from("contact_submissions").update({ status }).eq("id", id);
    load();
  }

  async function deleteContact(id: string) {
    if (!supabase || !confirm("Delete this submission?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    load();
  }

  async function setReviewStatus(id: string, status: Review["status"]) {
    if (!supabase) return;
    const patch: Partial<Review> = { status };
    if (status === "approved") patch.approved_at = new Date().toISOString();
    await supabase.from("reviews").update(patch).eq("id", id);
    load();
  }

  async function deleteReview(id: string) {
    if (!supabase || !confirm("Delete this review?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    load();
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "projects", label: "Portfolio", count: projects.length },
    { id: "contacts", label: "Contacts", count: contacts.filter((c) => c.status === "new").length },
    { id: "reviews", label: "Reviews", count: reviews.filter((r) => r.status === "pending").length },
  ];

  const inputCls =
    "h-11 w-full rounded-xl border border-ink-200 px-3 text-[14px] focus:border-ink-950 focus:ring-2 focus:ring-ink-950/10 focus:outline-none";

  return (
    <div className="min-h-dvh bg-ink-50">
      <header className="sticky top-0 z-20 border-b border-ink-900/8 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Firstform admin</p>
            <p className="text-[13px] text-ink-500 truncate max-w-[200px] sm:max-w-none">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center rounded-full border border-ink-200 px-3 text-[13px] font-medium text-ink-600 hover:bg-ink-50 sm:inline-flex"
            >
              View site
            </a>
            <button
              type="button"
              onClick={() => signOut()}
              className="h-9 rounded-full bg-ink-950 px-4 text-[13px] font-medium text-white hover:bg-ink-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
        {msg && (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] font-medium text-emerald-800">
            {msg}
          </div>
        )}

        <nav className="flex gap-1 overflow-x-auto rounded-2xl border border-ink-900/8 bg-white p-1.5 shadow-soft">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-colors",
                tab === t.id ? "bg-ink-950 text-white" : "text-ink-500 hover:text-ink-950",
              )}
            >
              {t.label}
              {t.count > 0 && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[11px] font-bold",
                    tab === t.id ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600",
                  )}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* -------- Projects -------- */}
        {tab === "projects" && (
          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-ink-950">Portfolio projects</h2>
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setForm({ ...emptyProject, sort_order: projects.length });
                  setShowForm(true);
                }}
                className="h-9 rounded-full bg-ink-950 px-4 text-[13px] font-medium text-white hover:bg-ink-800"
              >
                + Add project
              </button>
            </div>

            {showForm && (
              <form onSubmit={saveProject} className="mb-6 rounded-[20px] border border-ink-900/8 bg-white p-5 shadow-soft">
                <h3 className="text-[15px] font-semibold text-ink-950">{editing ? "Edit project" : "New project"}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-ink-600">Title *</label>
                    <input
                      required
                      className={inputCls}
                      value={form.title}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          title: e.target.value,
                          slug: editing ? f.slug : slugify(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-ink-600">Slug</label>
                    <input className={inputCls} value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-ink-600">URL</label>
                    <input className={inputCls} value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://" />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-ink-600">Category</label>
                    <input className={inputCls} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Furniture, Business…" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-[12px] font-medium text-ink-600">Description</label>
                    <textarea
                      rows={2}
                      className="w-full rounded-xl border border-ink-200 px-3 py-2 text-[14px] focus:border-ink-950 focus:ring-2 focus:ring-ink-950/10 focus:outline-none"
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-ink-600">Sort order</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={form.sort_order}
                      onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                    />
                  </div>
                  <div className="flex items-end gap-4 pb-1">
                    <label className="flex items-center gap-2 text-[13px] text-ink-700">
                      <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))} />
                      Published
                    </label>
                    <label className="flex items-center gap-2 text-[13px] text-ink-700">
                      <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} />
                      Featured
                    </label>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button type="submit" disabled={busy} className="h-10 rounded-full bg-ink-950 px-5 text-[13px] font-medium text-white disabled:opacity-60">
                    {busy ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditing(null);
                    }}
                    className="h-10 rounded-full border border-ink-200 px-4 text-[13px] text-ink-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <ul className="space-y-2">
              {projects.map((p, i) => (
                <li key={p.id} className="rounded-[16px] border border-ink-900/8 bg-white p-4 shadow-soft">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[15px] font-semibold text-ink-950">{p.title}</h3>
                        {p.is_featured && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">Featured</span>
                        )}
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px] font-bold",
                            p.is_published ? "bg-emerald-100 text-emerald-800" : "bg-ink-100 text-ink-500",
                          )}
                        >
                          {p.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-[13px] text-ink-400">{p.url}</p>
                      {p.category && <p className="mt-0.5 text-[12px] text-ink-500">{p.category}</p>}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button type="button" onClick={() => moveProject(p.id, -1)} disabled={i === 0} className="h-8 w-8 rounded-lg border border-ink-200 text-ink-600 disabled:opacity-30" title="Move up">
                        ↑
                      </button>
                      <button type="button" onClick={() => moveProject(p.id, 1)} disabled={i === projects.length - 1} className="h-8 w-8 rounded-lg border border-ink-200 text-ink-600 disabled:opacity-30" title="Move down">
                        ↓
                      </button>
                      <button type="button" onClick={() => toggleProject(p.id, "is_published", !p.is_published)} className="h-8 rounded-lg border border-ink-200 px-2.5 text-[12px] font-medium text-ink-700">
                        {p.is_published ? "Unpublish" : "Publish"}
                      </button>
                      <button type="button" onClick={() => toggleProject(p.id, "is_featured", !p.is_featured)} className="h-8 rounded-lg border border-ink-200 px-2.5 text-[12px] font-medium text-ink-700">
                        {p.is_featured ? "Unfeature" : "Feature"}
                      </button>
                      <button type="button" onClick={() => startEdit(p)} className="h-8 rounded-lg border border-ink-200 px-2.5 text-[12px] font-medium text-ink-700">
                        Edit
                      </button>
                      <button type="button" onClick={() => deleteProject(p.id)} className="h-8 rounded-lg border border-red-200 px-2.5 text-[12px] font-medium text-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {projects.length === 0 && <p className="py-8 text-center text-[14px] text-ink-400">No projects yet. Add one above.</p>}
            </ul>
          </section>
        )}

        {/* -------- Contacts -------- */}
        {tab === "contacts" && (
          <section className="mt-6">
            <h2 className="mb-4 text-[17px] font-semibold text-ink-950">Contact submissions</h2>
            <ul className="space-y-3">
              {contacts.map((c) => (
                <li key={c.id} className="rounded-[16px] border border-ink-900/8 bg-white p-4 shadow-soft">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-[15px] font-semibold text-ink-950">{c.name}</p>
                      {c.business_name && <p className="text-[13px] text-ink-500">{c.business_name}</p>}
                      <p className="mt-1 text-[13px] text-ink-600">
                        {[c.email, c.phone].filter(Boolean).join(" · ") || "No contact info"}
                      </p>
                      {c.service_needed && (
                        <p className="mt-1 text-[12px] font-medium text-ink-400">Service: {c.service_needed}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-bold capitalize",
                          c.status === "new" ? "bg-blue-100 text-blue-800" : "bg-ink-100 text-ink-500",
                        )}
                      >
                        {c.status}
                      </span>
                      <time className="text-[11px] text-ink-400">{new Date(c.created_at).toLocaleString()}</time>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-ink-700">{c.message}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(["new", "read", "replied", "archived"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setContactStatus(c.id, s)}
                        className={cn(
                          "h-7 rounded-full px-2.5 text-[11px] font-medium capitalize",
                          c.status === s ? "bg-ink-950 text-white" : "border border-ink-200 text-ink-600",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                    <button type="button" onClick={() => deleteContact(c.id)} className="h-7 rounded-full border border-red-200 px-2.5 text-[11px] font-medium text-red-600">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
              {contacts.length === 0 && <p className="py-8 text-center text-[14px] text-ink-400">No submissions yet.</p>}
            </ul>
          </section>
        )}

        {/* -------- Reviews -------- */}
        {tab === "reviews" && (
          <section className="mt-6">
            <h2 className="mb-4 text-[17px] font-semibold text-ink-950">Reviews</h2>
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-[16px] border border-ink-900/8 bg-white p-4 shadow-soft">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-[15px] font-semibold text-ink-950">{r.reviewer_name}</p>
                      {r.business_or_project && (
                        <p className="text-[13px] text-ink-500">
                          About: <span className="font-medium text-ink-700">{r.business_or_project}</span>
                        </p>
                      )}
                      <p className="mt-1 text-amber-400 text-[14px]">{"★".repeat(r.rating ?? 0)}{"☆".repeat(5 - (r.rating ?? 0))}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-bold capitalize",
                          r.status === "pending" && "bg-amber-100 text-amber-800",
                          r.status === "approved" && "bg-emerald-100 text-emerald-800",
                          r.status === "rejected" && "bg-ink-100 text-ink-500",
                        )}
                      >
                        {r.status}
                      </span>
                      <time className="text-[11px] text-ink-400">{new Date(r.created_at).toLocaleString()}</time>
                    </div>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-700">“{r.body}”</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setReviewStatus(r.id, "approved")}
                      className="h-7 rounded-full bg-emerald-600 px-3 text-[11px] font-medium text-white"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewStatus(r.id, "rejected")}
                      className="h-7 rounded-full border border-ink-200 px-3 text-[11px] font-medium text-ink-600"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewStatus(r.id, "pending")}
                      className="h-7 rounded-full border border-ink-200 px-3 text-[11px] font-medium text-ink-600"
                    >
                      Pending
                    </button>
                    <button type="button" onClick={() => deleteReview(r.id)} className="h-7 rounded-full border border-red-200 px-3 text-[11px] font-medium text-red-600">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
              {reviews.length === 0 && <p className="py-8 text-center text-[14px] text-ink-400">No reviews yet.</p>}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
