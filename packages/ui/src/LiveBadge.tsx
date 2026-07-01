import { motion } from "framer-motion";

/** Pill "LIVE" pulsante per i giochi in diretta. */
export function LiveBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 9px",
        borderRadius: "var(--wc-radius-pill)",
        background: "rgba(255,92,114,0.15)",
        border: "1px solid rgba(255,92,114,0.5)",
        color: "#ff8494",
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: 0.6,
      }}
    >
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "var(--wc-danger)",
          boxShadow: "0 0 8px var(--wc-danger)",
        }}
      />
      LIVE
    </span>
  );
}
