import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import "@/app/animation.css";
import { BaseQuestionCardProps } from "./base/BaseQuestionCardProps";
import { ShortAnswerQuestionAnswer } from "./answers/ShortAnswerQuestionAnswer";

export type ShortAnswerQuestionCardProps = BaseQuestionCardProps & {
    options: ShortAnswerQuestionAnswer[];
    similarityToBeCorrect: number;
    onAnswer: (isCorrect: boolean) => void;
};

export default function ShortAnswerQuestionCard(props: ShortAnswerQuestionCardProps) {
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
        }, 1500); // Extended delay for smoother fade-in
    }, []);

    function handleAnswer(userAnswer: string) {
        const isCorrect = getWordSimilarity(userAnswer.toUpperCase(), props.options[0].expectedAnswer.toUpperCase()) > props.similarityToBeCorrect;

        setAnsweredCorrectly(isCorrect);
        props.onAnswer(isCorrect);
    }

    function getWordSimilarity(word1: string, word2: string): number {
        function getLevenshteinDistance(s1: string, s2: string): number {
            const len1 = s1.length;
            const len2 = s2.length;
            const dp: number[][] = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

            for (let i = 0; i <= len1; i++) dp[i][0] = i;
            for (let j = 0; j <= len2; j++) dp[0][j] = j;

            for (let i = 1; i <= len1; i++) {
                for (let j = 1; j <= len2; j++) {
                    const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
                }
            }
            return dp[len1][len2];
        }

        const distance = getLevenshteinDistance(word1, word2);
        const maxLength = Math.max(word1.length, word2.length);

        return maxLength === 0 ? 1 : 1 - distance / maxLength;
    }

    function getAnsweredClass() {
        if (answeredCorrectly === null) return "bg-lighter dark:bg-darker";
        return answeredCorrectly ? "animate-correct-answer bg-success-light dark:bg-success-dark" : "animate-wrong-answer bg-danger-light dark:bg-danger-dark";
    }

    let animationClass = "opacity-0";
    
    if (hasValidated) {
        if (isAnimatingFadeIn) {
            animationClass = "animate-zoom-fade opacity-100";
        } else {
            animationClass = "opacity-100";
        }
    }

    if (!props.options.length) {
        return <p className="text-dark dark:text-light">No answers for this question!</p>;
    }

    return (
        <section className={`min-h-[80dvh] relative rounded-lg shadow-md dark:shadow-2xl overflow-hidden ${getAnsweredClass()} ${animationClass} transition-opacity duration-500`}>
            {answeredCorrectly === false && (
                <>
                    <img src="/images/ui/cracks.svg" className="absolute pointer-events-none inset-0 w-full h-full dark:hidden object-cover" alt="cracks" />
                    <img src="/images/ui/cracks-light.svg" className="absolute pointer-events-none inset-0 w-full h-full hidden dark:block object-cover" alt="cracks" />
                </>
            )}

            <article className="min-h-[80dvh] flex flex-col justify-around text-dark dark:text-light p-6 rounded-lg transition-shadow duration-300">
                {hasValidated && (
                    <>
                        <img src={lightImageUrl} className="dark:hidden w-1/2 mx-auto" alt={`${props.questionToken}-image-light-theme`} />
                        <img src={darkImageUrl} className="hidden dark:block w-1/2 mx-auto" alt={`${props.questionToken}-image-dark-theme`} />
                    </>
                )}

                <h2 className="text-2xl text-darker dark:text-lighter font-bold mb-4">{props.question}</h2>

                <form className="mt-auto"
                    onSubmit={event => {
                        event.preventDefault(); // Prevent page reload
                        const answer = event.currentTarget.elements.namedItem("answer") as HTMLInputElement;
                        handleAnswer(answer?.value ?? "");
                    }}>
                    <input className="bg-light w-full h-12 dark:bg-dark outline-1 px-3 lg:mx-3 rounded-sm lg:w-auto" type="text" name="answer" maxLength={50} />
                    <Button variant="outline" className="bg-lighter dark:bg-darker my-3 w-full lg:w-auto lg:my-0" type="submit">Submit</Button>
                </form>
            </article>
        </section>
    );
}