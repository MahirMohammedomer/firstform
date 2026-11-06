import { useLang } from "../context/LanguageContext";
import { Check } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

/* Flat illustrations (Bizplan-style) drawn inline so no external assets are needed */
function WebsiteIllo() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden>
      <rect x="28" y="18" width="184" height="118" rx="10" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="28" y="18" width="184" height="24" rx="10" fill="#eef2ff" />
      <circle cx="42" cy="30" r="3.5" fill="#f4a39d" />
      <circle cx="54" cy="30" r="3.5" fill="#f1cf75" />
      <circle cx="66" cy="30" r="3.5" fill="#8bc7a0" />
      <rect x="44" y="54" width="70" height="10" rx="5" fill="#2563eb" />
      <rect x="44" y="72" width="110" height="6" rx="3" fill="#dbe4f5" />
      <rect x="44" y="84" width="92" height="6" rx="3" fill="#dbe4f5" />
      <rect x="44" y="102" width="46" height="16" rx="8" fill="#f59e0b" />
      <rect x="128" y="54" width="68" height="64" rx="8" fill="#dbeafe" />
      <path d="M132 108 L150 88 L164 98 L192 70" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M196 44 l14 14 -34 34 -18 4 4 -18 z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
      <path d="M206 54 l-4 4" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

function StoreIllo() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden>
      <rect x="52" y="62" width="136" height="74" rx="8" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
      <path d="M44 62 h152 v-14 a10 10 0 0 0 -10 -10 h-132 a10 10 0 0 0 -10 10 z" fill="#ef4444" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${56 + i * 28} 38 h20 l4 24 h-28 z`} fill={i % 2 ? "#fff" : "#fecaca"} stroke="#ef4444" strokeWidth="1.5" />
      ))}
      <rect x="66" y="92" width="34" height="44" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
      <rect x="112" y="88" width="60" height="8" rx="4" fill="#e5e7eb" />
      <rect x="112" y="102" width="48" height="6" rx="3" fill="#eef1f6" />
      <rect x="112" y="114" width="54" height="6" rx="3" fill="#eef1f6" />
      <g transform="translate(158 96)">
        <path d="M0 0 h10 l6 22 h26 l6 -16 h-30" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="20" cy="30" r="4" fill="#2563eb" />
        <circle cx="40" cy="30" r="4" fill="#2563eb" />
      </g>
      <circle cx="40" cy="34" r="12" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      <text x="40" y="39" textAnchor="middle" fontSize="13" fontWeight="800" fill="#92400e">$</text>
      <circle cx="206" cy="30" r="9" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
    </svg>
  );
}

function SystemsIllo() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden>
      <rect x="36" y="22" width="168" height="106" rx="10" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="36" y="22" width="168" height="22" rx="10" fill="#f5f3ff" />
      <circle cx="50" cy="33" r="3.5" fill="#a78bfa" />
      <rect x="60" y="29" width="52" height="7" rx="3.5" fill="#c4b5fd" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={52 + i * 10} y={58 + (2 - i) * 14} width="8" height={14 + i * 14} rx="3" fill={i === 2 ? "#7c3aed" : "#ddd6fe"} />
      ))}
      <path d="M84 96 L112 78 L136 88 L184 56" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="184" cy="56" r="4" fill="#7c3aed" />
      <g transform="translate(168 96)">
        <circle r="17" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" />
        <circle r="6" fill="#7c3aed" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1={Math.cos((a * Math.PI) / 180) * 8} y1={Math.sin((a * Math.PI) / 180) * 8} x2={Math.cos((a * Math.PI) / 180) * 15} y2={Math.sin((a * Math.PI) / 180) * 15} stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
        ))}
      </g>
      <circle cx="30" cy="120" r="6" fill="#c7d2fe" />
      <circle cx="214" cy="24" r="6" fill="#fde68a" />
    </svg>
  );
}

const ILLOS = [WebsiteIllo, StoreIllo, SystemsIllo];

export function Services() {
  const { t } = useLang();
  const picks = [t.services.items[0], t.services.items[1], t.services.items[5]];

  return (
    <section id="services" className="svc-section relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeader eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />
        </Reveal>

        <div className="mt-24 grid gap-x-6 gap-y-16 md:grid-cols-3 lg:gap-x-8">
          {picks.map((item, i) => {
            const Illo = ILLOS[i % ILLOS.length];
            return (
              <Reveal key={item.title} delay={i * 100} className="h-full">
                <article className="svc-card group h-full">
                  <div className="svc-illo" aria-hidden>
                    <Illo />
                  </div>
                  <h3 className="mt-2 text-center text-[22px] font-bold tracking-tight text-ink-950">{item.title}</h3>
                  <p className="mx-auto mt-3 max-w-[300px] text-center text-[14.5px] leading-relaxed text-ink-500">{item.desc}</p>
                  <ul className="svc-list mt-6">
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
