import { decode } from "html-entities"
const SingleQuestion = (props) => {
	const clickAnswer = (currentQuestion, answer) => {
		props.updateAnswer(currentQuestion, answer)
	}

	const answers = props.answers.map((answer, idx) => {
		return (
			<button
				key={idx}
				onClick={() => clickAnswer(props.question, answer)}
				className={`answer-btn ${
					props.selected_answer === answer ? "selected" : ""
				}

                ${
									props.showResult && answer === props.correct_answer
										? "correct"
										: ""
								}

                
                ${
									props.showResult &&
									answer === props.selected_answer &&
									answer !== props.correct_answer
										? "incorrect"
										: ""
								}
                
                ${
									props.showResult && answer !== props.correct_answer
										? "dimmed"
										: ""
								}
                `}
				disabled={props.showResult}
			>
				{decode(answer)}
			</button>
		)
	})

	return (
		<div className="question-container">
			<h1 className="question">{decode(props.question)}</h1>
			<div className="answers-btn-container">{answers}</div>
		</div>
	)
}
export default SingleQuestion
