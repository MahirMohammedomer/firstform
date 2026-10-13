import { useLang } from "../context/LanguageContext";
import { cn } from "../utils/cn";

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}
const pad = (n: number) => n.toString().padStart(2, "0");

/** Compact inline timer, e.g. "2d 04:12:33" */
export function CountdownInline({ ms, className }: { ms: number; className?: string }) {
  const { d, h, m, s } = split(ms);
  return (
    <span className={cn("tabular-nums", className)} aria-live="off">
      {d > 0 && <>{d}d </>}
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}

/** Large boxed timer for the pricing section */
export function CountdownBoxes({ ms, light, className }: { ms: number; light?: boolean; className?: string }) {
  const { t } = useLang();
  const v = split(ms);
  const cells: Array<[keyof typeof v, string]> = [
    ["d", t.offer.units.d],
    ["h", t.offer.units.h],
    ["m", t.offer.units.m],
    ["s", t.offer.units.s],
  ];
  return (
    <div className={cn("flex items-start gap-2 sm:gap-3", className)} role="timer" aria-label={`${t.offer.endsIn} ${v.d}d ${v.h}h ${v.m}m`}>
      {cells.map(([k, label], i) => (
        <div key={k} className="flex items-start gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "grid h-14 w-14 place-items-center rounded-2xl text-[26px] font-semibold tracking-tightest tabular-nums shadow-soft sm:h-16 sm:w-16 sm:text-3xl",
                light ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-white text-ink-950 ring-1 ring-ink-900/8",
              )}
            >
              {pad(v[k])}
            </div>
            <span className={cn("mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em]", light ? "text-white/50" : "text-ink-400")}>{label}</span>
          </div>
          {i < cells.length - 1 && <span className={cn("pt-3.5 text-2xl font-semibold sm:pt-4", light ? "text-white/30" : "text-ink-300")}>:</span>}
        </div>
      ))}
    </div>
  );
}
