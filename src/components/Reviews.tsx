import { useEffect, useState, type FormEvent } from "react";
import { useLang } from "../context/LanguageContext";
import { supabase, supabaseConfigured } from "../lib/supabase";
import type { Review } from "../lib/types";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";
import { Check } from "./Icons";
import { cn } from "../utils/cn";

const inputCls =
  "h-12 w-full rounded-2xl border border-ink-200 bg-white px-4 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-300 hover:border-ink-300 focus:border-ink-950 focus:ring-4 focus:ring-ink-950/8 focus:outline-none";
const labelCls = "mb-1.5 block text-[13px] font-medium text-ink-700";

type Status = "idle" | "loading" | "success" | "error";

function Stars({ value, onChange, readonly }: { value: number; onChange?: (n: number) => void; readonly?: boolean }) {
  return (
    <div className="flex gap-1" role={readonly ? "img" : "group"} aria-label={`${value} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(n)}
          className={cn(
            "text-[22px] leading-none transition-transform",
            n <= value ? "text-amber-400" : "text-ink-200",
            !readonly && "hover:scale-110 active:scale-95 cursor-pointer",
            readonly && "cursor-default",
          )}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function Reviews() {
  const { lang } = useLang();
  const [list, setList] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  const copy =
    lang === "am"
      ? {
          eyebrow: "ግምገማዎች",
          title: "ደንበኞቻችን ምን ይላሉ",
          subtitle: "ከእውነተኛ የኢትዮጵያ ንግዶች የተረጋገጡ ግምገማዎች።",
          write: "ግምገማ ጻፍ",
          name: "ስምዎ *",
          namePh: "ለምሳሌ፦ ሳራ",
          project: "ንግድ / ፕሮጀክት",
          projectPh: "ለምሳሌ፦ Galaxy Skate House ወይም የራስዎ ንግድ",
          rating: "ደረጃ",
          body: "ግምገማዎ *",
          bodyPh: "ልምድዎን ያጋሩ…",
          submit: "ግምገማ ላክ",
          sending: "እየተላከ ነው…",
          success: "አመሰግናለን! ግምገማዎ ከጸደቀ በኋላ ይታያል።",
          error: "አልተሳካም። እንደገና ይሞክሩ።",
          empty: "እስካሁን የጸደቁ ግምገማዎች የሉም። የመጀመሪያው ይሁኑ!",
          about: "ስለ",
        }
      : {
          eyebrow: "Reviews",
          title: "What clients say",
          subtitle: "Verified feedback from real Ethiopian businesses.",
          write: "Write a review",
          name: "Your name *",
          namePh: "e.g. Sara",
          project: "Business / project",
          projectPh: "e.g. Galaxy Skate House or your business name",
          rating: "Rating",
          body: "Your review *",
          bodyPh: "Share your experience…",
          submit: "Submit review",
          sending: "Sending…",
          success: "Thank you! Your review will appear after approval.",
          error: "Something went wrong. Please try again.",
          empty: "No approved reviews yet. Be the first!",
          about: "About",
        };

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("reviews")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(24)
      .then(({ data }) => {
        if (data) setList(data as Review[]);
      });
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    if (!name.trim() || !body.trim()) return;
    if (!supabaseConfigured || !supabase) {
      setStatus("error");
      setErrorMsg(copy.error);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase.from("reviews").insert({
      reviewer_name: name.trim(),
      business_or_project: project.trim() || null,
      rating,
      body: body.trim(),
      status: "pending",
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message || copy.error);
      return;
    }

    setStatus("success");
    setName("");
    setProject("");
    setRating(5);
    setBody("");
  }

  return (
    <section id="reviews" className="scroll-mt-24 bg-ink-50/70 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        </Reveal>

        {list.length > 0 ? (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r, i) => (
              <Reveal as="li" key={r.id} delay={Math.min(i * 60, 240)}>
                <article className="flex h-full flex-col rounded-[24px] border border-ink-900/8 bg-white p-6 shadow-soft">
                  <Stars value={r.rating ?? 5} readonly />
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">“{r.body}”</p>
                  <div className="mt-5 border-t border-ink-100 pt-4">
                    <p className="text-[14px] font-semibold text-ink-950">{r.reviewer_name}</p>
                    {r.business_or_project && (
                      <p className="mt-0.5 text-[13px] text-ink-400">
                        {copy.about} <span className="font-medium text-ink-600">{r.business_or_project}</span>
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-center text-[15px] text-ink-400">{copy.empty}</p>
        )}

        <Reveal className="mt-12 flex justify-center" delay={100}>
          {!showForm && status !== "success" ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink-200 bg-white px-6 text-[15px] font-medium text-ink-900 transition-colors hover:border-ink-400"
            >
              {copy.write}
            </button>
          ) : status === "success" ? (
            <div className="flex flex-col items-center rounded-[24px] border border-ink-900/8 bg-white px-8 py-8 text-center shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Check width={24} height={24} />
              </span>
              <p className="mt-4 text-[15px] font-semibold text-ink-950">{copy.success}</p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setShowForm(false);
                }}
                className="mt-4 text-[13px] text-ink-500 underline-offset-2 hover:underline"
              >
                OK
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="w-full max-w-lg rounded-[28px] border border-ink-900/8 bg-white p-6 shadow-soft sm:p-8"
              noValidate
            >
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
              />
              <div>
                <label className={labelCls} htmlFor="rv-name">
                  {copy.name}
                </label>
                <input
                  id="rv-name"
                  required
                  className={inputCls}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={copy.namePh}
                  maxLength={80}
                />
              </div>
              <div className="mt-4">
                <label className={labelCls} htmlFor="rv-project">
                  {copy.project}
                </label>
                <input
                  id="rv-project"
                  className={inputCls}
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder={copy.projectPh}
                  maxLength={120}
                />
              </div>
              <div className="mt-4">
                <label className={labelCls}>{copy.rating}</label>
                <Stars value={rating} onChange={setRating} />
              </div>
              <div className="mt-4">
                <label className={labelCls} htmlFor="rv-body">
                  {copy.body}
                </label>
                <textarea
                  id="rv-body"
                  required
                  rows={3}
                  className="w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all focus:border-ink-950 focus:ring-4 focus:ring-ink-950/8 focus:outline-none"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={copy.bodyPh}
                  maxLength={1000}
                />
              </div>
              {status === "error" && (
                <p className="mt-3 text-[14px] font-medium text-red-600" role="alert">
                  {errorMsg || copy.error}
                </p>
              )}
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="h-11 flex-1 rounded-full border border-ink-200 text-[14px] font-medium text-ink-600 hover:bg-ink-50"
                >
                  {lang === "am" ? "ሰርዝ" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 flex-1 rounded-full bg-ink-950 text-[14px] font-medium text-white hover:bg-ink-800 disabled:opacity-60"
                >
                  {status === "loading" ? copy.sending : copy.submit}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
