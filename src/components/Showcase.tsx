import { useEffect, useState, type SyntheticEvent } from "react";
import { useLang } from "../context/LanguageContext";
import { PROJECTS } from "../i18n";
import { supabase } from "../lib/supabase";
import type { Project } from "../lib/types";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "./Icons";

type DisplayProject = { id: string; url: string; name: string };

/* Live screenshot helpers: thum.io first, WordPress mshots as fallback */
const mshots = (url: string, w: number) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&vpw=800&vph=600`;
const thum = (url: string, w: number) => `https://image.thum.io/get/width/${w}/crop/${Math.round(w * 1.25)}/noanimate/${url}`;

function ArcShot({ url, name }: { url: string; name: string }) {
  const [src, setSrc] = useState(() => thum(url, 480));
  const [failed, setFailed] = useState(false);
  const onError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (src.startsWith("https://image.thum.io")) setSrc(mshots(url, 480));
    else setFailed(true);
  };
  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink-50 text-center">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-950 text-sm font-semibold text-white">{name.charAt(0)}</span>
        <span className="px-2 text-[11px] font-medium text-ink-500">{name}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`Website by Firstform: ${name}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={onError}
      className="h-full w-full object-cover object-top"
    />
  );
}

export function Showcase() {
  const { t } = useLang();
  const [projects, setProjects] = useState<DisplayProject[]>(() =>
    PROJECTS.map((p) => ({ id: p.id, url: p.url, name: p.name })),
  );

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
        setProjects((data as Project[]).map((row) => ({ id: row.id, url: row.url || "#", name: row.title })));
      });
  }, []);

  const shown = projects.slice(0, 7);
  const n = shown.length;

  return (
    <section id="work" className="scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-balance text-[2.2rem] font-semibold leading-[1.08] tracking-tightest text-ink-950 sm:text-5xl">
            {t.showcase.title}
          </h2>
        </Reveal>

        {/* Arc of live site screenshots */}
        <Reveal delay={120}>
          <div className="arc mt-16 sm:mt-20" role="list" aria-label={t.showcase.eyebrow}>
            {shown.map((p, i) => {
              const t01 = n > 1 ? i / (n - 1) : 0.5;
              const rotate = (t01 - 0.5) * 26;
              const y = Math.pow(t01 - 0.5, 2) * 150;
              return (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  className="arc-item group"
                  style={{ transform: `translateY(${y}px) rotate(${rotate}deg)` }}
                  aria-label={`${t.showcase.visit}: ${p.name}`}
                >
                  <div className="arc-frame">
                    <ArcShot url={p.url} name={p.name} />
                    <span className="arc-open">
                      <ArrowUpRight width={13} height={13} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-14 flex justify-center sm:mt-16">
          <a
            href={shown[0]?.url || "#contact"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-950 transition hover:text-accent-600"
          >
            {t.showcase.visit}
            <ArrowUpRight width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
