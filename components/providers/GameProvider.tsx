"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

enum Upgrade {
    Test = "test"
}

interface GameState {
    lives: number;
    upgrades: Upgrade[],
    setLives: (lives: number) => void;
    setUpgrades: (upgrades: Upgrade[]) => void;
    resetGame: () => void;
}

const GameContext = createContext<GameState>({
    lives: 3,
    upgrades: [],
    setLives: () => {},
    setUpgrades: () => {},
    resetGame: () => {}
});

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}

interface GameProviderProps {
    children: ReactNode;
}

export function GameProvider({ children }: Readonly<GameProviderProps>)
{
    const [lives, setLives] = useState(3);
    const [upgrades, setUpgrades] = useState<Upgrade[]>([]);

    const resetGame = () => {
        setLives(3);
        setUpgrades([]);
    }

    const contextValue = useMemo(() => ({
        lives,
        setLives,
        upgrades,
        setUpgrades,
        resetGame,
    }), [lives, upgrades]);


    return (
        <GameContext.Provider value={ contextValue }>
            { children }
        </GameContext.Provider>
    )
}