import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useLang } from "../context/LanguageContext";
import { PROJECTS } from "../i18n";
import { supabase } from "../lib/supabase";
import type { Project } from "../lib/types";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";
import { ArrowUpRight, Smartphone } from "./Icons";
import { cn } from "../utils/cn";

type DisplayProject = {
  id: string;
  url: string;
  name: string;
  accent: string;
  category: string;
  desc: string;
  tags: string[];
  featured: boolean;
};

const ACCENTS = [
  "from-violet-100 via-indigo-50 to-white",
  "from-amber-100 via-orange-50 to-white",
  "from-stone-200 via-stone-100 to-white",
  "from-yellow-100 via-amber-50 to-white",
  "from-sky-100 via-blue-50 to-white",
  "from-emerald-100 via-teal-50 to-white",
];

function fallbackProjects(t: ReturnType<typeof useLang>["t"]): DisplayProject[] {
  return PROJECTS.map((p, i) => {
    const copy = t.showcase.projects[i] ?? {
      category: "Project",
      desc: "",
      tags: [] as string[],
    };
    return {
      id: p.id,
      url: p.url,
      name: p.name,
      accent: p.accent,
      category: copy.category,
      desc: copy.desc,
      tags: copy.tags,
      featured: false,
    };
  });
}

/* -------------------------------------------------------------------------
 * Live screenshots
 * Captured on demand from each real website. thum.io is tried first for a faster
 * first paint, with WordPress mshots as a fallback. Screenshot services can return
 * a small generating placeholder, so we detect that and retry briefly.
 * ---------------------------------------------------------------------- */
type Shot = { kind: "desktop" | "phone" };

const mshots = (url: string, w: number, vpw: number, vph: number, bust: number) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&vpw=${vpw}&vph=${vph}${bust ? `&r=${bust}` : ""}`;

const thum = (url: string, w: number) => `https://image.thum.io/get/width/${w}/crop/${Math.round(w * 0.75)}/noanimate/${url}`;

function useLiveShot(url: string, kind: Shot["kind"]) {
  const cfg = kind === "desktop" ? { w: 1200, vpw: 1280, vph: 960, min: 900 } : { w: 420, vpw: 390, vph: 844, min: 300 };
  const sources = [
    () => thum(url, cfg.w),
    (b: number) => mshots(url, cfg.w, cfg.vpw, cfg.vph, b),
  ];
  const [srcIdx, setSrcIdx] = useState(0);
  const [bust, setBust] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [enabled, setEnabled] = useState(false);
  const retries = useRef(0);
  const timer = useRef<number | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEnabled(true);
        setStatus("loading");
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(node);
    return () => { observer.disconnect(); if (timer.current) window.clearTimeout(timer.current); };
  }, []);

  const src = enabled && srcIdx < sources.length ? sources[srcIdx](bust) : null;

  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // Screenshot services can return a tiny placeholder while generating — retry shortly.
    if (img.naturalWidth < cfg.min && retries.current < 4) {
      retries.current += 1;
      timer.current = window.setTimeout(() => setBust(Date.now()), 2200);
      return;
    }
    if (img.naturalWidth < 200) {
      onError();
      return;
    }
    setStatus("ready");
  };

  const onError = () => {
    if (srcIdx + 1 < sources.length) {
      setSrcIdx((i) => i + 1);
      setStatus("loading");
    } else {
      setStatus("failed");
    }
  };

  return { src, status, onLoad, onError, hostRef };
}

function DesktopShot({ url, name, accent }: { url: string; name: string; accent: string }) {
  const { src, status, onLoad, onError, hostRef } = useLiveShot(url, "desktop");
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div ref={hostRef} className={cn("relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-br sm:aspect-[16/10]", accent)}>
      {status !== "ready" && status !== "failed" && <div className="shimmer absolute inset-0" aria-hidden />}
      {src && status !== "failed" && (
        <img
          src={src}
          alt={`Screenshot of the ${name} website, designed and built by Firstform`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          width={1200}
          height={900}
          onLoad={onLoad}
          onError={onError}
          className={cn(
            "screenshot-scroll absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
        />
      )}
      {status === "failed" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-950 text-xl font-semibold text-white shadow-lift">{name.charAt(0)}</span>
          <p className="text-lg font-semibold tracking-tight text-ink-900">{name}</p>
          <p className="text-[13px] text-ink-500">{host}</p>
        </div>
      )}
    </div>
  );
}

function PhoneShot({ url, name }: { url: string; name: string }) {
  const { src, status, onLoad, onError, hostRef } = useLiveShot(url, "phone");
  if (status === "failed" || !src) return null;
  return (
    <div
      ref={hostRef}
      className={cn(
        "absolute right-3 -bottom-3 z-10 w-[26%] max-w-[120px] min-w-[84px] rounded-[18px] border-[3px] border-ink-950 bg-ink-950 shadow-lift transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:rotate-[-2deg] sm:right-5 sm:-bottom-4 sm:rounded-[22px] sm:border-4",
        status === "ready" ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[15px] bg-white sm:rounded-[18px]">
        <span className="absolute top-1.5 left-1/2 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-ink-950" />
        <img
          src={src}
          alt={`${name} on mobile`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={onLoad}
          onError={onError}
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

export function Showcase() {
  const { t } = useLang();
  const [filter, setFilter] = useState(0);
  const [projects, setProjects] = useState<DisplayProject[]>(() => fallbackProjects(t));

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (error || !data?.length) return;
        const mapped: DisplayProject[] = (data as Project[]).map((row, i) => ({
          id: row.id,
          url: row.url || "#",
          name: row.title,
          accent: ACCENTS[i % ACCENTS.length],
          category: row.category || "Project",
          desc: row.description || "",
          tags: row.is_featured ? ["Featured"] : [],
          featured: row.is_featured,
        }));
        setProjects(mapped);
      });
  }, []);

  const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const filters = [t.showcase.filters[0] || "All", ...categories];

  const visible = projects.filter((p) => {
    if (filter === 0) return true;
    return p.category === categories[filter - 1];
  });

  return (
    <section id="work" className="scroll-mt-24 bg-ink-50/70 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={t.showcase.eyebrow} title={t.showcase.title} subtitle={t.showcase.subtitle} />
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10" role="tablist" aria-label="Portfolio filters">
          {filters.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={filter === i}
              onClick={() => setFilter(i)}
              className={cn(
                "rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-300",
                filter === i ? "bg-ink-950 text-white shadow-soft" : "bg-white text-ink-500 ring-1 ring-ink-900/8 hover:text-ink-950",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {visible.map((p, i) => {
            const host = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
            return (
              <Reveal key={p.id} delay={(i % 2) * 120} dir={i % 2 === 0 ? "left" : "right"} className="h-full">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-[24px] border border-ink-900/8 bg-white p-2 shadow-soft transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-lift sm:rounded-[30px] sm:p-3"
                  aria-label={`${t.showcase.visit}: ${p.name}`}
                >
                  {/* Browser frame */}
                  <div className="relative rounded-[16px] sm:rounded-[20px]">
                    <div className="overflow-hidden rounded-[16px] ring-1 ring-ink-900/6 sm:rounded-[20px]">
                      <div className="flex items-center gap-1.5 border-b border-ink-100 bg-white px-3 py-2 sm:px-4 sm:py-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#ff5f57] sm:h-2.5 sm:w-2.5" />
                        <span className="h-2 w-2 rounded-full bg-[#febc2e] sm:h-2.5 sm:w-2.5" />
                        <span className="h-2 w-2 rounded-full bg-[#28c840] sm:h-2.5 sm:w-2.5" />
                        <div className="mx-2 flex h-6 min-w-0 flex-1 items-center justify-center rounded-md bg-ink-50 px-2 text-[11px] text-ink-400 sm:mx-auto sm:max-w-[65%]">
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mr-1 shrink-0 text-emerald-500" aria-hidden>
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span className="truncate">{host}</span>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </span>
                          {t.showcase.previewNote}
                        </span>
                      </div>
                      <DesktopShot url={p.url} name={p.name} accent={p.accent} />
                    </div>
                    <PhoneShot url={p.url} name={p.name} />
                  </div>

                  {/* Meta */}
                  <div className="flex flex-1 flex-col px-3 pt-6 pb-3 sm:px-4 sm:pt-8 sm:pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400 sm:text-[12px]">
                          {p.featured ? "Featured · " : ""}
                          {p.category}
                        </p>
                        <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight text-ink-950 sm:text-[22px]">{p.name}</h3>
                      </div>
                      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-900 transition-all duration-500 group-hover:border-ink-950 group-hover:bg-ink-950 group-hover:text-white sm:h-11 sm:w-11">
                        <ArrowUpRight className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    {p.desc && <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{p.desc}</p>}
                    {p.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
                        {p.tags.map((tag) => (
                          <li key={tag} className="rounded-full bg-ink-50 px-2.5 py-1 text-[12px] font-medium text-ink-600 ring-1 ring-ink-900/5">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-950">
                      {t.showcase.visit}
                      <ArrowUpRight width={15} height={15} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150} className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-6">
          <p className="inline-flex items-center gap-2 text-[13px] text-ink-500">
            <Smartphone width={15} height={15} className="text-ink-400" /> {t.showcase.openPhone}
          </p>
          <span className="hidden h-1 w-1 rounded-full bg-ink-300 sm:block" aria-hidden />
          <p className="text-[13px] text-ink-400">{t.showcase.liveNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
