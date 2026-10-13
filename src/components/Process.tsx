import { useLang } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeader, WhatsAppButton, TelegramButton } from "./ui";
import { MessageCircle, Eye, Check, Zap } from "./Icons";

const icons = [MessageCircle, Eye, Check, Zap];

export function Process() {
  const { t } = useLang();

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="drift absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-accent-500/20 blur-[140px]" />
        <div className="drift-slow absolute bottom-0 -left-20 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <Reveal>
          <SectionHeader light eyebrow={t.process.eyebrow} title={t.process.title} subtitle={t.process.subtitle} />
        </Reveal>

        <ol className="relative mt-16 grid gap-5 sm:mt-20 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-[38px] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-white/25 to-transparent lg:block" aria-hidden />
          {t.process.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={s.title} delay={i * 110} className="relative">
                <article className="group h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="relative grid h-[52px] w-[52px] place-items-center rounded-2xl bg-white text-ink-950 transition-transform duration-500 group-hover:scale-105">
                      <Icon width={22} height={22} />
                      <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-accent-500 text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/70">{s.day}</span>
                  </div>
                  <h3 className="mt-7 text-[19px] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">{s.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={200} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppButton size="lg" className="w-full sm:w-auto" />
          <TelegramButton size="lg" variant="white" className="w-full sm:w-auto" />
        </Reveal>
      </div>
    </section>
  );
}
