import QuestionAnswer from "../base/QuestionAnswer";

export class ImageChoiceQuestionAnswer implements QuestionAnswer {
    constructor(public imageSource: string, public imageAlt: string, public isCorrect: boolean) {}

    renderAnswer(): React.ReactNode {
        return (<>
            <h3 className="text-darker dark:text-darker">The correct answer was</h3>
            <img className="w-100" src={this.imageSource} alt={this.imageAlt} />
        </>);
    }
} 