import { useLang } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";
import { Clock, Shield, Award, Plane, Search, TrendingUp } from "./Icons";
import { cn } from "../utils/cn";

const icons = [Clock, Shield, Award, Plane, Search, TrendingUp];
const tones = [
  "from-accent-50 to-white text-accent-600",
  "from-emerald-50 to-white text-emerald-600",
  "from-amber-50 to-white text-amber-600",
  "from-sky-50 to-white text-sky-600",
  "from-rose-50 to-white text-rose-600",
  "from-violet-50 to-white text-violet-600",
];

export function Why() {
  const { t } = useLang();

  return (
    <section id="why" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={t.why.eyebrow} title={t.why.title} subtitle={t.why.subtitle} />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.reasons.map((r, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={r.title} delay={(i % 3) * 100}>
                <article className="card-lift group relative h-full overflow-hidden rounded-[24px] border border-ink-900/8 bg-white p-7">
                  <div
                    className={cn(
                      "pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100",
                      tones[i].split(" ").slice(0, 2).join(" "),
                    )}
                    aria-hidden
                  />
                  <div className="relative flex items-center justify-between">
                    <span className={cn("grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ring-1 ring-ink-900/5", tones[i])}>
                      <Icon width={22} height={22} />
                    </span>
                    <span className="text-[13px] font-semibold tabular-nums text-ink-300">0{i + 1}</span>
                  </div>
                  <h3 className="relative mt-7 text-[19px] font-semibold tracking-tight text-ink-950">{r.title}</h3>
                  <p className="relative mt-2.5 text-[15px] leading-relaxed text-ink-500">{r.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
