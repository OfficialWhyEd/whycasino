import { motion } from "framer-motion";

export interface SegmentOption<T extends string> {
  key: T;
  label: string;
  /** accento opzionale per l'indicatore attivo (default: viola) */
  accent?: string;
}

/** Segmented control premium: pill scorrevole (layout animation), tap target ≥44px,
 *  scroll orizzontale su mobile. Riusato per filtri categoria e classifiche.
 *  `id` deve essere unico per istanza (namespacing del layoutId). */
export function Segmented<T extends string>({
  id,
  options,
  value,
  onChange,
}: {
  id: string;
  options: SegmentOption<T>[];
  value: T;
  onChange: (key: T) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filtri"
      className="wc-chips"
      style={{
        display: "inline-flex",
        gap: 4,
        padding: 4,
        borderRadius: "var(--wc-radius-pill)",
        background: "var(--wc-surface)",
        border: "1px solid var(--wc-border)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        maxWidth: "100%",
      }}
    >
      {options.map((opt) => {
        const active = opt.key === value;
        const accent = opt.accent ?? "var(--wc-violet-2)";
        return (
          <button
            key={opt.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className="wc-tap"
            style={{
              position: "relative",
              flex: "0 0 auto",
              minHeight: 40,
              padding: "0 16px",
              borderRadius: "var(--wc-radius-pill)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "var(--wc-font-display)",
              fontWeight: 700,
              fontSize: 13.5,
              letterSpacing: -0.1,
              color: active ? "#0b0b12" : "var(--wc-text-dim)",
              transition: "color 0.25s ease",
              WebkitTapHighlightColor: "transparent",
              scrollSnapAlign: "start",
            }}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                aria-hidden
                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "var(--wc-radius-pill)",
                  background: `linear-gradient(140deg, ${accent}, var(--wc-cyan))`,
                  boxShadow: "0 6px 20px -8px rgba(139,92,246,0.7)",
                  zIndex: 0,
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1, whiteSpace: "nowrap" }}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
