import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getActiveOffer, OFFER_DISCOUNT, type ActiveOffer } from "../holidays";

interface OfferCtx {
  offer: ActiveOffer | null;
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

  /*
   * The active offer only changes at a handful of boundaries (a few days
   * around a holiday), so it is resolved from the clock on an interval rather
   * than on every tick. This keeps the provider from re-rendering the whole
   * tree once a second just to drive the countdown.
   */
  const [offer, setOffer] = useState<ActiveOffer | null>(() => getActiveOffer(Date.now() + offset));
  const offerRef = useRef(offer);
  offerRef.current = offer;

  useEffect(() => {
    const resolve = () => {
      const next = getActiveOffer(Date.now() + offset);
      const prev = offerRef.current;
      // Only update state when the offer actually changes.
      if (prev?.holiday.id !== next?.holiday.id || prev?.end !== next?.end) {
        offerRef.current = next;
        setOffer(next);
      }
    };
    resolve();
    const id = window.setInterval(resolve, 60_000);
    return () => window.clearInterval(id);
  }, [offset]);

  /*
   * The countdown itself is driven by a dedicated interval so that only the
   * countdown consumers re-render, not every component using `useOffer()`.
   */
  const [remaining, setRemaining] = useState(() => {
    const o = getActiveOffer(Date.now() + offset);
    return o ? Math.max(0, o.end - (Date.now() + offset)) : 0;
  });

  useEffect(() => {
    if (!offer) {
      setRemaining(0);
      return;
    }
    const tick = () => setRemaining(Math.max(0, offer.end - (Date.now() + offset)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [offer, offset]);

  const value = useMemo<OfferCtx>(() => {
    const d = offer ? OFFER_DISCOUNT : 0;
    return {
      offer,
      remaining,
      discount: d,
      price: (base) => Math.round((base * (1 - d)) / 100) * 100,
      saving: (base) => base - Math.round((base * (1 - d)) / 100) * 100,
    };
  }, [offer, remaining]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOffer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOffer must be used within OfferProvider");
  return ctx;
}
