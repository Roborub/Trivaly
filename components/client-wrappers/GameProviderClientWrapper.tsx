"use client";
import { ReactNode } from "react";
import { GameProvider } from "../providers/GameProvider";

 // ✅ Only this component becomes a client component

export default function GameProviderWrapper({ children }: Readonly<{ children: ReactNode }>) {
    return <GameProvider>{children}</GameProvider>;
}
