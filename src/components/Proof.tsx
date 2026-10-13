import { useLang } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

export function Proof() {
  const { t } = useLang();
  const items = [...t.proof.items, ...t.proof.items];

  return (
    <section aria-label={t.proof.title} className="py-10 sm:py-14">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-[13px] font-medium uppercase tracking-[0.18em] text-ink-400">{t.proof.title}</p>
        </Reveal>
      </div>
      <Reveal className="mask-fade-x mt-7 overflow-hidden" delay={100}>
        <ul className="marquee flex w-max gap-3 pr-3" aria-hidden>
          {items.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex items-center gap-2.5 rounded-full border border-ink-900/8 bg-white px-5 py-2.5 text-[14px] font-medium text-ink-700 whitespace-nowrap"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500/70" />
              {item}
            </li>
          ))}
        </ul>
        <ul className="sr-only">
          {t.proof.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
