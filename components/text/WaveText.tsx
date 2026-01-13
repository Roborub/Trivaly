import React from "react";
import styles from "./WaveText.module.css";   

type WaveTextProps = 
{
    text: string;
    duration?: number;
    className?: string;
}

export default function WaveText({ text, duration = 1, className }: Readonly<WaveTextProps>) {
    return (
        <h1 className={`${styles.wave} text-4xl ${className}`}>
            {
                text.split("").map((character, index) => (
                    <span   key={`${character}-${index}`} 
                            style= {
                                { animationDelay: `${index * 0.1}s`,
                                  animationDuration: `${duration}s` }
                            }>
                        {character}
                    </span>
                ))
            }
        </h1>
    );
};