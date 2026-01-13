import QuestionAnswer from "../base/QuestionAnswer";

export class TrueOrFalseQuestionAnswer implements QuestionAnswer {
    constructor(public answer: string, public isCorrect: boolean, public explanation: string) {}

    renderAnswer(): React.ReactNode {
        return (
            <>
                <h3 className="text-darker dark:text-lighter">Answer</h3>
                <h1>{this.explanation}</h1>
            </>
        );
    }
} 