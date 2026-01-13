"use client";

import WaveText from "@/components/text/WaveText";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration issues by ensuring theme is mounted
  if (!mounted) return null;

  return (
    <main>
      <WaveText text="TRIVALY" duration={4} className="text-dark dark:text-lighter mt-25" />

      <div className="text-dark dark:text-light text-xl mt-10 mb-10">
        A trivia game for the curious mind
      </div>

      <div className="mx-3">
        <Link href="/categories">
          <Button className="bg-lighter dark:bg-darker dark:hover:text-lighter cursor-pointer" variant={theme === "dark" || "system" ? "outline" : "default"}>GO</Button>
        </Link>
      </div>
    </main>
  );
}
