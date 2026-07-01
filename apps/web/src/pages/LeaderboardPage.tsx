import { useState } from "react";
import { Leaderboard, Segmented, SectionHeader, type SegmentOption } from "@whycasino/ui";
import { DAILY, WEEKLY } from "../mock/players";

type Tab = "daily" | "weekly";

const OPTIONS: SegmentOption<Tab>[] = [
  { key: "daily", label: "Giornaliera", accent: "var(--wc-gold)" },
  { key: "weekly", label: "Settimanale", accent: "var(--wc-gold)" },
];

export function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("daily");
  return (
    <>
      <SectionHeader title="Classifiche della crew" icon="trophy" accent="var(--wc-gold)" />
      <div style={{ marginBottom: 22 }}>
        <Segmented id="board" options={OPTIONS} value={tab} onChange={setTab} />
      </div>
      <Leaderboard entries={tab === "daily" ? DAILY : WEEKLY} variant={tab} />
    </>
  );
}
