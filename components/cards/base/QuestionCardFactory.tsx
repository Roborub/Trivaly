import React from "react";
import MultipleChoiceQuestionCard, { MultipleChoiceQuestionCardProps } from "@/components/cards/MultipleChoiceQuestionCard";
import { BaseQuestionCardProps } from "./BaseQuestionCardProps";
import TrueOrFalseQuestionCard from "../TrueOrFalseQuestionCard";
import ShortAnswerQuestionCard from "../ShortAnswerQuestionCard";
import ImageChoiceQuestionCard from "../ImageChoiceQuestionCard";

const questionComponentMap: Record<string, React.ComponentType<any>> = {
    "multiple-choice": MultipleChoiceQuestionCard,
    "true-or-false": TrueOrFalseQuestionCard,
    "short-answer": ShortAnswerQuestionCard,
    "image-choice": ImageChoiceQuestionCard
};

export function QuestionCardFactory(question: BaseQuestionCardProps, handleAnswer: (isCorrect: boolean) => void) {
    const QuestionComponent = questionComponentMap[question.type];

    return QuestionComponent
        ? <QuestionComponent {...question} onAnswer={handleAnswer} options={(question as MultipleChoiceQuestionCardProps).options ?? []} />
        : <p>Unknown question type!</p>;
}
