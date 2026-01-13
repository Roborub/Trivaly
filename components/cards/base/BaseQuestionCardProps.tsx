export type BaseQuestionCardProps = {
    type: string;
    questionToken: string;
    question: string;
    onAnswer: (isCorrect: boolean) => void;
};