import type { SVGProps } from "react";

/** Set icone SVG lineari (stroke 2). Niente emoji come icone di sistema. */
export type IconName =
  | "lobby"
  | "live"
  | "games"
  | "trophy"
  | "user"
  | "search"
  | "back"
  | "coin"
  | "flame"
  | "bolt"
  | "star"
  | "lock";

const PATHS: Record<IconName, JSX.Element> = {
  lobby: (
    <>
      <path d="M3 10.5 12 4l9 6.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9.5 20v-5h5v5" />
    </>
  ),
  live: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11" />
      <path d="M4 4a12 12 0 0 0 0 16M20 4a12 12 0 0 1 0 16" opacity="0.55" />
    </>
  ),
  games: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.4" />
      <path d="M8 11v2M7 12h2" />
      <circle cx="15.6" cy="11.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.4" cy="13" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" />
      <path d="M12 13v4M9 20h6M10 17h4v3h-4z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.6-3.6" />
    </>
  ),
  back: <path d="M15 5l-7 7 7 7" />,
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M9.6 9.7c0-1.2 1-2 2.4-2s2.4.8 2.4 1.9-.9 1.6-2.4 1.9-2.4.8-2.4 2 .9 2 2.4 2 2.4-.8 2.4-2" />
    </>
  ),
  flame: (
    <path d="M12 3c1 3-1.5 4-1.5 6.5 0 1 .7 1.8 1.5 1.8s1.5-.8 1.5-1.6c1.6 1.2 2.5 3 2.5 5.1a6 6 0 0 1-12 0c0-2.6 1.6-4.4 3-6 .8 1 .7 2.2 1 3 .3-2.6 1-4.7 1.5-8Z" />
  ),
  bolt: <path d="M13 3 5 13h5l-1 8 8-11h-5l1-7Z" />,
  star: (
    <path d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6L12 16.5 7 19.1l1-5.6-4-4 5.6-.8L12 3.6Z" />
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.4" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
};

export function Icon({
  name,
  size = 22,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
