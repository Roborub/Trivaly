import QuestionAnswer from "../base/QuestionAnswer";

export class MultipleChoiceQuestionAnswer implements QuestionAnswer {
    constructor(public answer: string, public isCorrect: boolean) {}

    renderAnswer(): React.ReactNode {
        return (<>
            <h3 className="text-darker dark:text-lighter">The correct answer was:</h3>
            <h1>{this.answer}</h1>
        </>);
    }
} 