import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Navbar, MobileTabBar, type TabItem } from "@whycasino/ui";
import { MY_WALLET } from "./mock/wallet";
import { LobbyPage } from "./pages/LobbyPage";
import { CategoryPage } from "./pages/CategoryPage";
import { GamePage } from "./pages/GamePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ProfilePage } from "./pages/ProfilePage";

const LINKS = [
  { label: "Lobby", to: "/" },
  { label: "Live", to: "/c/live" },
  { label: "Giochi", to: "/c/all" },
  { label: "Classifiche", to: "/leaderboard" },
  { label: "Profilo", to: "/profile" },
];

const TABS: TabItem[] = [
  { label: "Lobby", to: "/", icon: "lobby" },
  { label: "Live", to: "/c/live", icon: "live" },
  { label: "Giochi", to: "/c/all", icon: "games" },
  { label: "Classifica", to: "/leaderboard", icon: "trophy" },
  { label: "Profilo", to: "/profile", icon: "user" },
];

function navLinkStyle({ isActive }: { isActive: boolean }): React.CSSProperties {
  return {
    padding: "8px 13px",
    borderRadius: "var(--wc-radius-pill)",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    color: isActive ? "var(--wc-text)" : "var(--wc-text-dim)",
    background: isActive ? "var(--wc-surface-2)" : "transparent",
    border: isActive ? "1px solid var(--wc-border)" : "1px solid transparent",
    transition: "color 0.2s ease, background 0.2s ease",
  };
}

function isTabActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  if (to === "/c/all") return pathname.startsWith("/c/") && pathname !== "/c/live";
  return pathname.startsWith(to);
}

export function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar coins={MY_WALLET.coins}>
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === "/"} style={navLinkStyle}>
            {l.label}
          </NavLink>
        ))}
      </Navbar>

      <main
        className="wc-container"
        style={{
          paddingTop: 8,
          paddingBottom: "calc(var(--wc-tabbar-h) + var(--wc-safe-bottom) + 28px)",
        }}
      >
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="/c/:category" element={<CategoryPage />} />
          <Route path="/game/:slug" element={<GamePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <div className="wc-mobile-only">
        <MobileTabBar
          items={TABS.map((t) => ({ ...t, active: isTabActive(pathname, t.to) }))}
          renderLink={(item, content) => (
            <NavLink
              key={item.to}
              to={item.to}
              aria-label={item.label}
              style={{ textDecoration: "none", display: "block" }}
            >
              {content}
            </NavLink>
          )}
        />
      </div>
    </>
  );
}
