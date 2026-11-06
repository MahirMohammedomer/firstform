import { useLang } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { Sparkle } from "./Icons";

export function Proof() {
  const { t } = useLang();
  const items = [...t.proof.items, ...t.proof.items];

  return (
    <section aria-label={t.proof.title} className="proof-band relative overflow-hidden py-12 sm:py-16">
      {/* Soft blue wash behind the band so it reads as part of the sky. */}
      <div className="proof-wash" aria-hidden />

      <div className="container-x relative">
        <Reveal>
          <p className="proof-eyebrow">
            <span className="proof-eyebrow-line" />
            {t.proof.title}
            <span className="proof-eyebrow-line" />
          </p>
        </Reveal>

        <Reveal className="proof-track mt-8" delay={100}>
          {/* The marquee is decorative — the readable list follows outside the aria-hidden region. */}
          <ul className="marquee flex w-max gap-3" aria-hidden>
            {items.map((item, i) => (
              <li key={`${item}-${i}`} className="proof-chip">
                <span className="proof-chip-icon">
                  <Sparkle width={11} height={11} />
                </span>
                <span className="proof-chip-text">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="sr-only">
          {t.proof.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
