import { useState, useEffect } from "react"
import SingleQuestion from "./SingleQuestion"

const Questions = () => {
	const [questions, setQuestions] = useState([])
	const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])
	const [showWarning, setShowWarning] = useState(false)
	const [numCorrectAnswers, setNumCorrectAnswers] = useState(0)
	const [showResult, setShowResult] = useState(false)
	const API_URL = "https://opentdb.com/api.php?amount=5"

	useEffect(() => {
		if (questions.length === 0) {
			fetchQuestionsFromAPI()
		}
		console.log("render")
	}, [questions])

	const fetchQuestionsFromAPI = async () => {
		const res = await fetch(`${API_URL}`)
		const data = await res.json()

		setQuestions(data.results)

		setQuestionsAndAnswers(
			data.results.map((questionObject) => {
				return {
					question: questionObject.question,
					correct_answer: questionObject.correct_answer,
					all_answers: sortArray([
						questionObject.correct_answer,
						...questionObject.incorrect_answers,
					]),
					selected_answer: "",
				}
			})
		)
	}

	const sortArray = (arr) => arr.sort(() => Math.random() - 0.5)

	const updateAnswer = (currentQuestion, answer) => {
		setQuestionsAndAnswers((prevQuestion) =>
			prevQuestion.map((questionObject) => {
				return questionObject.question === currentQuestion
					? { ...questionObject, selected_answer: answer }
					: questionObject
			})
		)
	}

	const checkAnswers = () => {
		const notAllAnswered = questionsAndAnswers.some(
			(questionObject) => questionObject.selected_answer === ""
		)
		setShowWarning(notAllAnswered)

		if (!notAllAnswered) {
			questionsAndAnswers.forEach((questionObject) => {
				if (questionObject.correct_answer === questionObject.selected_answer) {
					setNumCorrectAnswers((oldValue) => oldValue + 1)
				}
			})
			setShowResult(true)
		}
	}

	const playAgain = () => {
		setQuestions([])
		setQuestionsAndAnswers([])
		setNumCorrectAnswers(0)
		setShowResult(false)
	}

	const questionElement = questionsAndAnswers.map((questionObject, index) => {
		return (
			<SingleQuestion
				key={index}
				question={questionObject.question}
				answers={questionObject.all_answers}
				updateAnswer={updateAnswer}
				selected_answer={questionObject.selected_answer}
				showResult={showResult}
				correct_answer={questionObject.correct_answer}
			/>
		)
	})

	return (
		<div className="questions">
			<div className="questions-container">{questionElement}</div>
			<div className="text-center">
				{showWarning && (
					<p className="warning-message">You have questions not answered yet</p>
				)}

				{questions.length > 0 && !showResult ? (
					<button className="check-btn" onClick={checkAnswers}>
						Check Answers
					</button>
				) : null}

				{showResult && (
					<div className="result-container">
						<p className="result-message">
							You scored {numCorrectAnswers}/{questionsAndAnswers.length}{" "}
							correct answers
						</p>
						<button className="play-again-btn" onClick={playAgain}>
							Play again
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Questions
