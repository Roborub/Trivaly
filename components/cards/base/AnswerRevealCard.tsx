import { ReactNode } from "react";
import { MultipleChoiceQuestionCardProps } from "../MultipleChoiceQuestionCard";
import { ShortAnswerQuestionCardProps } from "../ShortAnswerQuestionCard";
import { BaseQuestionCardProps } from "./BaseQuestionCardProps";
import QuestionAnswer from "./QuestionAnswer";
import { MultipleChoiceQuestionAnswer } from "../answers/MultipleChoiceQuestionAnswer";
import { TrueOrFalseQuestionAnswer } from "../answers/TrueOrFalseQuestionAnswer";
import { ShortAnswerQuestionAnswer } from "../answers/ShortAnswerQuestionAnswer";
import { ImageChoiceQuestionCardProps } from "../ImageChoiceQuestionCard";
import { ImageChoiceQuestionAnswer } from "../answers/ImageChoiceQuestionAnswer";
import { TrueOrFalseQuestionCardProps } from "../TrueOrFalseQuestionCard";

export default function AnswerRevealCard({ question }: Readonly<{ question: BaseQuestionCardProps }>) {
    const errorAnswerResponse = <p>Unknown question type</p>;

    function renderCorrectAnswer(): ReactNode {
        switch (question.type) {
            case "multiple-choice":{
                const multipleChoiceQuestionCardProps = question as MultipleChoiceQuestionCardProps;
                const multipleChoiceAnswer = multipleChoiceQuestionCardProps.options?.filter(o => o.isCorrect)[0];

                return rehydrateAnswer(multipleChoiceAnswer, MultipleChoiceQuestionAnswer).renderAnswer() ?? errorAnswerResponse;
            }
            case "true-or-false": {
                const trueOrFalseCardProps = question as TrueOrFalseQuestionCardProps;
                const trueOrFalseAnswer = trueOrFalseCardProps?.options.filter(o => o.isCorrect)[0];

                trueOrFalseAnswer.explanation = trueOrFalseCardProps.explanation;
                return rehydrateAnswer(trueOrFalseAnswer, TrueOrFalseQuestionAnswer).renderAnswer() ?? errorAnswerResponse;
            }

            case "short-answer":{
                const shortAnswerCardProps = question as ShortAnswerQuestionCardProps;
                const shortAnswerExpectedAnswer = shortAnswerCardProps?.options[0];
                
                return rehydrateAnswer(shortAnswerExpectedAnswer, ShortAnswerQuestionAnswer).renderAnswer() ?? errorAnswerResponse;
            }
            case "image-choice": {
                const imageChoiceCardProps = question as ImageChoiceQuestionCardProps
                const imageChoiceAnswer = imageChoiceCardProps.options?.filter(o => o.isCorrect)[0];

                return rehydrateAnswer(imageChoiceAnswer, ImageChoiceQuestionAnswer).renderAnswer();
            }
            default:
                return errorAnswerResponse;
        }
    }

    // We have an issue where since the answers are being pulled from json
    // using "as ___QuestionCardPros" ends up destroying the renderAnswer function
    function rehydrateAnswer<T extends QuestionAnswer>(answer: T, ctor: new (...args: any[]) => T): T
    {
        return Object.assign(Object.create(ctor.prototype), answer);
    }

    return (
        <div className="absolute p-5 rounded-lg bg-success-light dark:bg-success-dark animate-slide-from-left cursor-none">
            {
                renderCorrectAnswer()
            }
        </div>
    );
}
