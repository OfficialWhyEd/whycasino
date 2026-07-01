import { useCallback, useRef, useState } from "react";

export interface Tilt {
  rx: number;
  ry: number;
  /** offset normalizzato -1..1 per layer in parallax (key-art) */
  px: number;
  py: number;
  active: boolean;
}

const REST: Tilt = { rx: 0, ry: 0, px: 0, py: 0, active: false };

/** Tilt 3D dal movimento del puntatore (pattern 21st.dev FloatingCard adattato).
 *  Disattivo su touch/reduced-motion: nessun jitter, solo desktop con mouse fine. */
export function useParallax(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<Tilt>(REST);

  const enabled =
    typeof window !== "undefined" &&
    window.matchMedia?.("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const ny = (e.clientY - r.top) / r.height - 0.5;
      setTilt({
        rx: -ny * maxDeg,
        ry: nx * maxDeg,
        px: nx * 2,
        py: ny * 2,
        active: true,
      });
    },
    [enabled, maxDeg],
  );

  const onLeave = useCallback(() => setTilt(REST), []);

  return { ref, tilt, onMove, onLeave, enabled };
}
