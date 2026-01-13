"use client";

import { Button } from "@/components/ui/button";
import "@/app/animation.css";
import Link from "next/link";
import { useGame } from "@/components/providers/GameProvider";

export default function GameOver() {
    const { resetGame } = useGame();

    return (
        <section className="fixed inset-0 flex flex-col items-center justify-center">
            <div className={`fixed inset-0 -z-10 animate-game-over w-full h-full`} />
            <div className="animate-slide-from-left--stay bg-danger-light dark:bg-danger-dark p-10 rounded-2xl w-fit text-center">
                <h1 className="text-darker dark:text-lighter">Game Over</h1>
            </div>
            <Link href="/categories" className="block mt-4 animate-slide-from-right--stay">
                <Button variant="outline" onClick={resetGame} className="bg-lighter dark:bg-darker cursor-pointer">
                    Play Again
                </Button>
            </Link>
        </section>
    );
}