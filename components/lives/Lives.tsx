import { Heart } from "lucide-react";

export default function Lives({ lives } : Readonly<{ lives: number }>)
{
    return (
        <div className="lives flex text-black dark:text-white fixed top-7">
            {
                [...Array(lives)].map((_, index) => (
                    <Heart key={`${_}_${index}`} fill="currentColor" />
                ))
            }
        </div>
    );
}