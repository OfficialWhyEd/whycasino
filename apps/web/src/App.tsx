import { NavLink, Route, Routes } from "react-router-dom";
import { Navbar } from "@whycasino/ui";
import { MY_WALLET } from "./mock/wallet";
import { LobbyPage } from "./pages/LobbyPage";
import { CategoryPage } from "./pages/CategoryPage";
import { GamePage } from "./pages/GamePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ProfilePage } from "./pages/ProfilePage";

const LINKS = [
  { label: "Lobby", to: "/" },
  { label: "Live", to: "/c/live" },
  { label: "Slot", to: "/c/slot" },
  { label: "Classifiche", to: "/leaderboard" },
  { label: "Profilo", to: "/profile" },
];

function navLinkStyle({ isActive }: { isActive: boolean }): React.CSSProperties {
  return {
    padding: "8px 12px",
    borderRadius: "var(--wc-radius-pill)",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    color: isActive ? "var(--wc-text)" : "var(--wc-text-dim)",
    background: isActive ? "var(--wc-surface-2)" : "transparent",
  };
}

export function App() {
  return (
    <>
      <Navbar coins={MY_WALLET.coins}>
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === "/"} style={navLinkStyle}>
            {l.label}
          </NavLink>
        ))}
      </Navbar>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 64px" }}>
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="/c/:category" element={<CategoryPage />} />
          <Route path="/game/:slug" element={<GamePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  );
}
