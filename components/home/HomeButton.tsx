"use client";

import { Home } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGame } from "../providers/GameProvider";

export function HomeButton({ className }: Readonly<{ className?: string }>) {
  const { resetGame } = useGame();

  return (
    <span className={className}>
      <Link href="/" >
        <Button className="bg-lighter dark:bg-darker cursor-pointer" onClick={resetGame} variant="outline" size="icon">
          <Home className="hidden text-lighter h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:block" />
          <Home className="h-[1.2rem] text-darker w-[1.2rem] scale-100 rotate-0 transition-all dark:hidden" />
          <span className="sr-only">Home button</span>
        </Button>
      </Link>
    </span>
  )
}
