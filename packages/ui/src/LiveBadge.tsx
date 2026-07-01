/** Pill "LIVE" pulsante per i giochi in diretta.
 *  Pulse via CSS keyframe (hardware-accelerated, nessun re-render React). */
export function LiveBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 8px",
        borderRadius: "var(--wc-radius-pill)",
        background: "rgba(255,92,114,0.16)",
        border: "1px solid rgba(255,92,114,0.5)",
        color: "#ff9aa6",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.7,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--wc-danger)",
          boxShadow: "0 0 8px var(--wc-danger)",
          animation: "wc-pulse-dot 1.4s ease-in-out infinite",
        }}
      />
      LIVE
    </span>
  );
}
