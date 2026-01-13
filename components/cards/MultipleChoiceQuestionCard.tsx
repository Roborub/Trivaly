import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import "@/app/animation.css";
import { BaseQuestionCardProps } from "./base/BaseQuestionCardProps";
import { MultipleChoiceQuestionAnswer } from "./answers/MultipleChoiceQuestionAnswer";

export type MultipleChoiceQuestionCardProps = BaseQuestionCardProps & {
    options: MultipleChoiceQuestionAnswer[];
    onAnswer: (isCorrect: boolean) => void;
};

export default function MultipleChoiceQuestionCard(props: MultipleChoiceQuestionCardProps) {
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
    const [lightImageUrl, setLightImageUrl] = useState<string>(props.questionToken ?? "/images/question_images/generic--light-theme.svg");
    const [darkImageUrl, setDarkImageUrl] = useState<string>(props.questionToken ?? "/images/question_images/generic--dark-theme.svg");
    const [hasValidated, setHasValidated] = useState<boolean>(false);
    const [isAnimatingFadeIn, setIsAnimatingFadeIn] = useState<boolean>(true);


    useEffect(() => {
        async function validateImages() {
            if (!props.questionToken) return;

            const imagePathLight = `/images/question_images/${props.questionToken}--light-theme.svg`;
            const imagePathDark = `/images/question_images/${props.questionToken}--dark-theme.svg`;

            try {
                const responseLight = await fetch(imagePathLight, { method: "HEAD" }).catch(()=>null);
                setLightImageUrl(responseLight?.ok ? imagePathLight : "/images/question_images/generic--light-theme.svg");
            } catch (error) {
                console.warn("Question has no linked image.", error);
                setLightImageUrl("/images/question_images/generic--light-theme.svg");
            }

            try {
                const responseDark = await fetch(imagePathDark, { method: "HEAD" }).catch(()=>null);
                setDarkImageUrl(responseDark?.ok ? imagePathDark : "/images/question_images/generic--dark-theme.svg");
            } catch (error) {
                console.warn("Question has no linked image.", error);
                setDarkImageUrl("/images/question_images/generic--dark-theme.svg");
            }

            setHasValidated(true);
        }

        validateImages();
    }, [props.questionToken]);

    useEffect(() => {
        setIsAnimatingFadeIn(true);

        setTimeout(() => {
            setIsAnimatingFadeIn(false);
        }, 1000);
    }, []);

    function handleAnswer(userAnswer: any) {
        const selected = props.options.find(option => option.answer === userAnswer);
        const isCorrect = selected?.isCorrect ?? false;

        setAnsweredCorrectly(isCorrect);
        props.onAnswer(isCorrect);
    }

    function getAnsweredClass() {
        if (answeredCorrectly === null) return "bg-lighter dark:bg-darker";
        return answeredCorrectly ? "animate-correct-answer bg-success-light dark:bg-success-dark" : "animate-wrong-answer bg-danger-light dark:bg-danger-dark";
    }

    if (!props.options.length) {
        return <p className="text-dark dark:text-light">No answers for this question!</p>;
    }

    let animationClass = "opacity-0";

    if (hasValidated) {
        animationClass = isAnimatingFadeIn ? "animate-zoom-fade opacity-100" : "opacity-100";
    }

    return (
        <section className={`min-h-[80dvh] relative rounded-lg shadow-md dark:shadow-2xl overflow-hidden ${getAnsweredClass()} ${animationClass}`}>
            {answeredCorrectly === false && (
                <>
                    <img src="/images/ui/cracks.svg" className="absolute pointer-events-none inset-0 w-full h-full dark:hidden object-cover" alt="cracks" />
                    <img src="/images/ui/cracks-light.svg" className="absolute pointer-events-none inset-0 w-full h-full hidden dark:block object-cover" alt="cracks" />
                </>
            )}

            <article className="min-h-[80dvh] flex flex-col justify-between text-dark dark:text-light p-6 rounded-lg transition-shadow duration-300">
                {hasValidated && (
                    <>
                        <img src={lightImageUrl} className="dark:hidden w-1/2 mx-auto" alt={`${props.questionToken}-image-light-theme`} />
                        <img src={darkImageUrl} className="hidden dark:block w-1/2 mx-auto" alt={`${props.questionToken}-image-dark-theme`} />
                    </>
                )}

                <h2 className="text-2xl text-darker dark:text-lighter font-bold mb-4">{props.question}</h2>

                <ul className="list-disc space-y-5 mt-auto">
                    {props.options.map((option, index) => (
                        <li key={`${option.answer}-${index}`} className="list-none decoration-0">
                            <Button className="w-full bg-lighter dark:bg-darker dark:hover:text-lighter" onClick={() => handleAnswer(option.answer)} variant="outline">
                                {option.answer}
                            </Button>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
}