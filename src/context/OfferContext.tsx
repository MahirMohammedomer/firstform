import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getActiveOffer, OFFER_DISCOUNT, type ActiveOffer } from "../holidays";

interface OfferCtx {
  offer: ActiveOffer | null;
  /** current time in ms (respects ?date= preview) */
  now: number;
  /** ms until the offer ends (0 if none) */
  remaining: number;
  discount: number;
  /** apply the discount to a base price (rounded to nearest 100 ETB) */
  price: (base: number) => number;
  saving: (base: number) => number;
}

const Ctx = createContext<OfferCtx | null>(null);

/** Read ?date=YYYY-MM-DD (or full ISO) to preview the site on a chosen day. */
function clockOffset(): number {
  if (typeof window === "undefined") return 0;
  const q = new URLSearchParams(window.location.search).get("date");
  if (!q) return 0;
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(q) ? new Date(`${q}T12:00:00`) : new Date(q);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime() - Date.now();
}

export function OfferProvider({ children }: { children: ReactNode }) {
  const [offset] = useState(clockOffset);
  const [now, setNow] = useState(() => Date.now() + offset);

  const offer = useMemo(() => getActiveOffer(now), [now]);

  useEffect(() => {
    // Tick every second while an offer is live (for the countdown), otherwise every minute.
    const id = window.setInterval(() => setNow(Date.now() + offset), offer ? 1000 : 60_000);
    return () => window.clearInterval(id);
  }, [offer, offset]);

  const value = useMemo<OfferCtx>(() => {
    const d = offer ? OFFER_DISCOUNT : 0;
    return {
      offer,
      now,
      remaining: offer ? Math.max(0, offer.end - now) : 0,
      discount: d,
      price: (base) => Math.round((base * (1 - d)) / 100) * 100,
      saving: (base) => base - Math.round((base * (1 - d)) / 100) * 100,
    };
  }, [offer, now]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOffer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOffer must be used within OfferProvider");
  return ctx;
}
