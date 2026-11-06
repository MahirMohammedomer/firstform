import { useLang } from "../context/LanguageContext";
import { Check, Globe, Tag, Zap } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

const CARDS = [
  { icon: Globe, tint: "bg-accent-50 text-accent-600 ring-accent-500/15" },
  { icon: Tag, tint: "bg-accent-50 text-accent-600 ring-accent-500/15" },
  { icon: Zap, tint: "bg-accent-50 text-accent-600 ring-accent-500/15" },
];

export function Services() {
  const { t } = useLang();
  const picks = [t.services.items[0], t.services.items[1], t.services.items[5]];

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-3 lg:gap-6">
          {picks.map((item, i) => {
            const { icon: Icon, tint } = CARDS[i % CARDS.length];
            return (
              <Reveal key={item.title} delay={i * 100} className="h-full">
                <article className="svc-card group h-full">
                  <span className={`svc-icon ${tint}`}>
                    <Icon width={24} height={24} />
                  </span>
                  <h3 className="mt-6 text-center text-[21px] font-bold tracking-tight text-ink-950">{item.title}</h3>
                  <p className="mx-auto mt-3 max-w-[300px] text-center text-[14.5px] leading-relaxed text-ink-500">{item.desc}</p>
                  <ul className="svc-list mt-7">
                    {t.services.bullets[i].map((b) => (
                      <li key={b}>
                        <span className="svc-check"><Check width={11} height={11} /></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
