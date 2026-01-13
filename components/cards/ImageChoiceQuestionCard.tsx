import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import "@/app/animation.css";
import { BaseQuestionCardProps } from "./base/BaseQuestionCardProps";
import { ImageChoiceQuestionAnswer } from "./answers/ImageChoiceQuestionAnswer";

export type ImageChoiceQuestionCardProps = BaseQuestionCardProps & {
    options: ImageChoiceQuestionAnswer[];
    onAnswer: (isCorrect: boolean) => void;
};

export default function ImageChoiceQuestionCard(props: ImageChoiceQuestionCardProps) {
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
    const [isAnimatingFadeIn, setIsAnimatingFadeIn] = useState<boolean>(true);

    function handleAnswer(userAnswer: any) {
        const selected = props.options.find(option => option.imageSource === userAnswer);
        const isCorrect = selected?.isCorrect ?? false;

        setAnsweredCorrectly(isCorrect);
        props.onAnswer(isCorrect);
    }

    useEffect(() => {
        setIsAnimatingFadeIn(true);

        setTimeout(() => {
            setIsAnimatingFadeIn(false);
        }, 500);
    }, []);

    function getAnsweredClass() {
        if (answeredCorrectly === null) return "bg-lighter dark:bg-darker";
        return answeredCorrectly ? "animate-correct-answer bg-success-light dark:bg-success-dark" : "animate-wrong-answer bg-danger-light dark:bg-danger-dark";
    }

    if (!props.options.length) {
        return <p className="text-dark dark:text-light">No answers for this question!</p>;
    }

    return (
        <section className={`${isAnimatingFadeIn && "animate-zoom-fade"} min-h-[80dvh] relative rounded-lg shadow-md dark:shadow-2xl overflow-hidden ${getAnsweredClass()}`}>
            {answeredCorrectly === false && (
                <>
                    <img src="/images/ui/cracks.svg" className="absolute pointer-events-none inset-0 w-full h-full dark:hidden object-cover" alt="cracks" />
                    <img src="/images/ui/cracks-light.svg" className="absolute pointer-events-none inset-0 w-full h-full hidden dark:block object-cover" alt="cracks" />
                </>
            )}

            <article className="min-h-[80dvh] flex flex-col justify-around text-dark dark:text-light p-6 rounded-lg transition-shadow duration-300">
                <h2 className="text-2xl text-darker dark:text-lighter font-bold mb-4">{props.question}</h2>
                <section className="container flex flex-wrap gap-4 justify-center overflow-y-auto max-h-[400px]">
                    {
                        props.options.map((option, index) => (
                            <article key={`${option.imageAlt}-${index}`}>
                                <Button variant="outline" className="flex w-40 h-40 bg-lighter dark:bg-darker" onClick={() => handleAnswer(option.imageSource)}>
                                    <img src={option.imageSource} alt={option.imageAlt} />
                                </Button>
                            </article>
                        ))
                    }
                </section>
            </article>
        </section>
    );
}