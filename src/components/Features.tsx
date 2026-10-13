import { useLang } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";
import { Pen, Smartphone, MessageCircle, Search, Languages, Zap, Globe, RefreshCw } from "./Icons";
import type { MouseEvent } from "react";

const icons = [Pen, Smartphone, MessageCircle, Search, Languages, Zap, Globe, RefreshCw];

function handleMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Features() {
  const { t } = useLang();

  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={t.features.eyebrow} title={t.features.title} subtitle={t.features.subtitle} />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal as="li" key={f.title} delay={(i % 4) * 80} className="h-full">
                <article
                  onMouseMove={handleMove}
                  className="spotlight card-lift group flex h-full flex-col rounded-[24px] border border-ink-900/8 bg-white p-6 sm:p-7"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink-50 text-ink-900 ring-1 ring-ink-900/5 transition-all duration-500 group-hover:bg-ink-950 group-hover:text-white">
                    <Icon width={20} height={20} />
                  </span>
                  <h3 className="mt-6 text-[17px] font-semibold leading-snug tracking-tight text-ink-950">{f.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{f.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
