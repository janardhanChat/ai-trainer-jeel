"use client";
import { DailyProvider } from "@daily-co/daily-react";

export default function DailyProviderClient({ children }) {
  return <DailyProvider>{children}</DailyProvider>;
}
