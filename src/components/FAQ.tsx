import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeader, TelegramButton, WhatsAppButton } from "./ui";
import { Plus } from "./Icons";
import { cn } from "../utils/cn";

export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-ink-50/70 py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal dir="left">
              <SectionHeader align="left" eyebrow={t.faq.eyebrow} title={t.faq.title} />
            </Reveal>
            <Reveal dir="left" delay={120} className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <WhatsAppButton />
              <TelegramButton />
            </Reveal>
          </div>

          <ul className="divide-y divide-ink-900/8 rounded-[28px] border border-ink-900/8 bg-white px-2 sm:px-4">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              const id = `faq-${i}`;
              return (
                <Reveal as="li" key={item.q} delay={i * 50}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`${id}-panel`}
                      id={`${id}-button`}
                      className="group flex w-full items-center justify-between gap-6 px-4 py-5 text-left sm:py-6"
                    >
                      <span className={cn("text-[17px] font-medium tracking-tight transition-colors", isOpen ? "text-ink-950" : "text-ink-800 group-hover:text-ink-950")}>
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500",
                          isOpen ? "rotate-45 border-ink-950 bg-ink-950 text-white" : "border-ink-200 text-ink-500 group-hover:border-ink-400",
                        )}
                      >
                        <Plus width={16} height={16} />
                      </span>
                    </button>
                  </h3>
                  <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} className="faq-panel" data-open={isOpen}>
                    <div>
                      <p className="px-4 pb-6 text-[15px] leading-relaxed text-ink-500 sm:pr-16">{item.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
