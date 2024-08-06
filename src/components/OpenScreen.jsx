const OpenScreen = (props) => {
	return (
		<div className="open-screen">
			<h2 className="open-screen-title">Quizzical</h2>
			<h3 className="open-screen-description">
				Dive into the fun and engaging world of Quizzical, the ultimate trivia
				challenge!{" "}
			</h3>
			<button className="open-screen-start" onClick={() => props.startGame()}>
				Start Quiz
			</button>
		</div>
	)
}

export default OpenScreen
