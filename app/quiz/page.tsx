"use client";

import AnswerRevealCard from "@/components/cards/base/AnswerRevealCard";
import { BaseQuestionCardProps } from "@/components/cards/base/BaseQuestionCardProps";
import { QuestionCardFactory } from "@/components/cards/base/QuestionCardFactory";
import Lives from "@/components/lives/Lives";
import { useGame } from "@/components/providers/GameProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Quiz() {
    const { lives, setLives } = useGame();

    const router = useRouter();

    const [questions, setQuestions] = useState<BaseQuestionCardProps[] | null>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
    const [askedQuestions, setAskedQuestions] = useState<number[]>([]);
    const [showAnswerReveal, setShowAnswerReveal] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    const handleAnswer = (isCorrect: boolean) => {
        const delay = isCorrect ? 1000 : 3000;

        if (!isCorrect) {
            setLives(Math.max(0, lives - 1));
            setShowAnswerReveal(true);
        }

        setTimeout(() => {
            setShowAnswerReveal(false);
            if (lives > 1) {
                const nextIndex = getRandomQuestionIndex();
                
                if (nextIndex !== -1) {
                    setCurrentQuestionIndex(nextIndex);
                } else {
                    setCurrentQuestionIndex(-1);
                }
            }
        }, delay);
    };

    const getRandomQuestionIndex = (): number => {
        if (!Array.isArray(questions) || questions.length === 0 || askedQuestions.length >= questions.length) return -1;

        const remainingIndexes = questions.map((_, index) => index).filter(index => !askedQuestions.includes(index));

        if (remainingIndexes.length === 0) {
            return -1
        };

        const nextIndex = remainingIndexes[Math.floor(Math.random() * remainingIndexes.length)];;

        setAskedQuestions(prev => [...prev, nextIndex]);
        
        return nextIndex;
    };

    useEffect(() => {
        if (lives === 0) {
            setTimeout(() => {
                router.push("/game-over");
            }, 3000);
        }
    }, [lives, router]);


    useEffect(() => console.log("Asked Questions", askedQuestions), [askedQuestions]);

    useEffect(() => {
        fetch(`/api/questions?category=${category}`)
            .then(response => response.json())
            .then(data => setQuestions(data));
    }, []);

    useEffect(() => {
        if (questions && questions.length > 0) {
            const startingQuestion = getRandomQuestionIndex();
            console.log("Starting Question", startingQuestion);
            setCurrentQuestionIndex(startingQuestion);
        }
    }, [questions]);

    return (
        <main className="flex min-h-[80dvh] mt-5 flex-col w-full items-center justify-center p-4">
            <Lives lives={lives} />
            {
                currentQuestionIndex !== -1 && questions && questions.length > 0 && (
                    <div key={currentQuestionIndex}>
                        {
                            QuestionCardFactory(questions[currentQuestionIndex], handleAnswer)
                        }
                    </div>
                )
            }
            {
                questions !== null &&
                questions.length > 0 &&
                askedQuestions.length === questions.length &&
                currentQuestionIndex === -1 &&
                (
                    <div>
                        <h1 className="text-darker dark:text-lighter">There are no more questions!</h1>
                    </div>
                )
            }
            {
                questions === null &&
                <div>
                    <h1 className="text-darker dark:text-lighter">There was an issues loading the questions!</h1>
                </div>
            }
            {
                showAnswerReveal && currentQuestionIndex !== -1 && questions && questions.length > 0 && (
                    <AnswerRevealCard question={questions[currentQuestionIndex]} />
                )}
        </main>
    );
}