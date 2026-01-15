import Intro from "./components/Intro"
import Boilerplate from "./components/Boilerplate"
import { useState, useEffect } from "react"
import { dataFetch } from "./dataFetch"

export default function App() {
  const [toggle, setToggle] = useState(true)
  const [result, setResult] = useState([])
  const [userInput, setUserInput] = useState([])
  const [submitted, setSubmitted] = useState(false)

  function startGame() {
    setToggle(false)
  }


  async function loadData() {
    const data = await dataFetch()

    const mapped = data.map(item => ({
      question: item.question,
      answers: [...item.answers].sort(() => Math.random() - 0.5),
      correctAnswer: item.correctAnswer
    }))

    setResult(mapped)
  }

 
  useEffect(() => {
    loadData()
  }, [])

  function handleClick(questionIndex, value) {
    setUserInput(prev => {
      const exists = prev.find(ans => ans.q === questionIndex)
      if (exists) return prev
      return [...prev, { q: questionIndex, v: value }]
    })
  }


  const rightGuess = userInput.filter(
    ans => result[ans.q]?.correctAnswer === ans.v
  ).length

  const wrongGuess = userInput.length - rightGuess

 
  const rendered = result.map((item, index) => {
    const selected = userInput.find(ans => ans.q === index)?.v

    return (
      <Boilerplate
        key={index}
        ques={item.question}
        ans={item.answers}
        index={index}
        selected={selected}
        correct={item.correctAnswer}
        submitted={submitted}
        click={handleClick}
      />
    )
  })


  function playAgain() {
    setUserInput([])
    setSubmitted(false)
    loadData()
  }

  return (
    <>
      {toggle && <Intro click={startGame} />}

      {!toggle && rendered}

      <footer>
        {!submitted && userInput.length === result.length && (
          <button className="checkBtn" onClick={() => setSubmitted(true)}>
            Check answers
          </button>
        )}
      </footer>

      {submitted && (
        <div className="result-box">
          <p>
            You scored {rightGuess}/{rightGuess + wrongGuess} correct answers
          </p>
          <button className="checkBtn" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
    </>
  )
}
