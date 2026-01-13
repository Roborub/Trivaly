import QuestionAnswer from "../base/QuestionAnswer";

export class ShortAnswerQuestionAnswer implements QuestionAnswer {
    constructor(public expectedAnswer: string) {}

    renderAnswer(): React.ReactNode {
        return (<>
            <h3 className="text-darker dark:text-lighter">The correct answer was</h3>
            <h1>{this.expectedAnswer}</h1>
        </>);
    }
} 