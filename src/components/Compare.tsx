import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeader, WhatsAppButton } from "./ui";
import { Check, X } from "./Icons";
import { cn } from "../utils/cn";

export function Compare() {
  const { t, lang } = useLang();
  const c = t.compare;
  const [vs, setVs] = useState(1); // 1 = agency, 2 = social

  const vsLabel = lang === "am" ? "ከማን ጋር ያወዳድሩ" : "Compare with";
  const betterLabel = lang === "am" ? "ፈርስትፎርም" : "Firstform";
  const otherLabel = c.cols[vs];

  return (
    <section id="compare" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
        </Reveal>

        {/* Mobile — ultra simple list */}
        <div className="mt-10 md:hidden">
          <Reveal>
            <p className="mb-2 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              {vsLabel}
            </p>
            <div className="relative grid grid-cols-2 rounded-full bg-ink-100 p-1">
              <span
                aria-hidden
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-soft transition-transform duration-300",
                  vs === 2 ? "translate-x-full" : "translate-x-0",
                )}
                style={{ left: 4 }}
              />
              {[1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setVs(i)}
                  className={cn(
                    "relative z-10 h-10 rounded-full px-2 text-[13px] font-medium truncate",
                    vs === i ? "text-ink-950" : "text-ink-500",
                  )}
                >
                  {c.cols[i]}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-6 space-y-3">
            {c.rows.map((row, i) => {
              const other = row.values[vs];
              const empty = other === "—";
              return (
                <Reveal key={row.label} delay={Math.min(i, 5) * 40}>
                  <div className="rounded-2xl border border-ink-900/8 bg-white p-4 shadow-soft">
                    <p className="text-[13px] font-medium text-ink-500 mb-3">{row.label}</p>
                    <div className="space-y-2.5">
                      {/* Firstform always first and highlighted */}
                      <div className="flex items-center gap-3 rounded-xl bg-ink-950 px-3.5 py-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500">
                          <Check width={12} height={12} className="text-white" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] text-white/50 font-medium">{betterLabel}</p>
                          <p className="text-[15px] font-semibold text-white leading-snug">{row.values[0]}</p>
                        </div>
                      </div>
                      {/* Other option */}
                      <div className="flex items-center gap-3 rounded-xl bg-ink-50 px-3.5 py-3">
                        <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full", empty ? "bg-ink-200" : "bg-ink-200")}>
                          {empty ? <X width={12} height={12} className="text-ink-500" /> : <span className="text-[10px] font-bold text-ink-500">vs</span>}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] text-ink-400 font-medium">{otherLabel}</p>
                          <p className={cn("text-[15px] leading-snug", empty ? "text-ink-400" : "text-ink-700")}>
                            {empty ? (lang === "am" ? "የለም" : "Not available") : other}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={80} className="mt-7">
            <WhatsAppButton size="lg" className="w-full" />
          </Reveal>
        </div>

        {/* Desktop table */}
        <Reveal delay={100} className="mt-16 hidden md:block">
          <div className="overflow-x-auto rounded-[28px] border border-ink-900/8 bg-white shadow-soft">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink-100">
                  <th className="px-6 py-5" />
                  {c.cols.map((col, i) => (
                    <th
                      key={col}
                      className={cn(
                        "px-5 py-5 text-center text-[13px] font-semibold uppercase tracking-[0.12em]",
                        i === 0 ? "bg-ink-950 text-white" : "text-ink-500",
                      )}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row, ri) => (
                  <tr key={row.label} className={ri !== c.rows.length - 1 ? "border-b border-ink-100" : ""}>
                    <th className="px-6 py-5 text-[15px] font-medium text-ink-950 text-left">{row.label}</th>
                    {row.values.map((v, vi) => {
                      const empty = v === "—";
                      return (
                        <td
                          key={vi}
                          className={cn(
                            "px-5 py-5 text-center text-[14px]",
                            vi === 0 ? "bg-ink-950 font-medium text-white" : empty ? "text-ink-300" : "text-ink-600",
                          )}
                        >
                          <span className="inline-flex items-center justify-center gap-1.5">
                            {vi === 0 && <Check width={14} height={14} className="text-emerald-400" />}
                            {empty ? <X width={15} height={15} /> : v}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
