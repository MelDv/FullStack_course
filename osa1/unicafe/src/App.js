import { useState } from "react"

const Header = (props) => {
  return (
    <div>
      <h1> {props.title} </h1>
    </div>
  )
}

const StatText = (props) => {
  return (
    <div>
      <p> {props.category} {props.state} </p>
    </div>
  )
}


const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, sum: 0, average: 0, positives: 0
  })

  const header1 = 'give feedback'
  const headerStat = 'statistics'
  const textGood = 'good'
  const textNeutral = 'neutral'
  const textBad = 'bad'
  const textAll = 'all'
  const textAv = 'average'
  const textPos = 'positive'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)
  const [average, setAverage] = useState(0)
  const [positives, setPositives] = useState(0)

  const handGoodClick = () => {
    setGood(good + 1)
    setSum(sum + 1)
    setAverage((good - bad) / sum * 1.0)
    setPositives(good / sum)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setSum(sum + 1)
    setAverage((good - bad) / sum * 1.0)
    setPositives(good / sum)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setSum(sum + 1)
    setAverage((good - bad) / sum * 1.0)
    setPositives(good / sum)
  }

  return (
    <div >
      <Header title={header1} />
      <button onClick={handGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Header title={headerStat} />
      <StatText category={textGood} state={good} />
      <StatText category={textNeutral} state={neutral} />
      <StatText category={textBad} state={bad} />
      <StatText category={textAll} state={sum} />
      <StatText category={textAv} state={average} />
      <StatText category={textPos} state={positives} />
    </div>
  )
}

export default App;