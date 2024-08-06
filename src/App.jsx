import { useState } from "react"
import Questions from "./components/Questions"
import OpenScreen from "./components/OpenScreen"

const App = () => {
	const [startGame, setStartGame] = useState(false)

	const clickStartGame = () => {
		setStartGame(true)
	}
	return (
		<main className="main">
			{startGame ? <Questions /> : <OpenScreen startGame={clickStartGame} />}
		</main>
	)
}

export default App
