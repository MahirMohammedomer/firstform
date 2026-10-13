import { useLang } from "../context/LanguageContext";
import { ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

export function Services() {
  const { t } = useLang();
  const primary = [t.services.items[0], t.services.items[1], t.services.items[5], t.services.items[6]];
  const secondary = [t.services.items[2], t.services.items[3], t.services.items[4], t.services.items[7]];

  return (
    <section id="services" className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="services-grid absolute inset-0" />
        <div className="services-glow absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="services-glow absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[130px]" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="container-x relative">
        <Reveal>
          <SectionHeader eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} light />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {primary.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} dir="scale" className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
              <a href="/custom-software-ethiopia" className="service-feature group relative block h-full min-h-[250px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-7 transition duration-700 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.085] sm:p-8">
                <span className="service-index">0{i + 1}</span>
                <span className="service-tag">{item.tag}</span>
                <div className="service-feature-line" />
                <h3 className="relative mt-16 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">{item.title}</h3>
                <p className="relative mt-3 max-w-xl text-[14px] leading-7 text-white/50 sm:text-[15px]">{item.desc}</p>
                <span className="service-arrow absolute bottom-7 right-7 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition duration-500 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-ink-950">
                  <ArrowUpRight width={17} height={17} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={260}>
          <div className="mt-4 rounded-[28px] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">{t.services.built}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {secondary.map((item) => (
                    <a key={item.title} href="/custom-software-ethiopia" className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-[12px] text-white/65 transition hover:border-white/25 hover:bg-white/10 hover:text-white">
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
              <a href="/custom-software-ethiopia" className="inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-white/75 transition hover:text-white">
                {t.pricing.customCta} <ArrowUpRight width={15} height={15} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
