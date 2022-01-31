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

const Button = (props) => {
  <button onClick={props.handleClick}>
    {props.text}
  </button>
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, sum: 0
  })
  const header1 = 'give feedback'
  const headerStat = 'statistics'
  const textGood = 'good'
  const textNeutral = 'neutral'
  const textBad = 'bad'
  const textAll = 'all'
  const textAv = 'average'
  const textPos = 'pos'


  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)

  const handGoodClick = () => 
    setClicks({ ...clicks, good: clicks.good + 1, sum: clicks.sum + 1 })


    const handleNeutralClick = () =>
      setClicks({ ...clicks, neutral: clicks.neutral + 1, sum: clicks.sum + 1 })


    const handleBadClick = () =>
      setClicks({ ...clicks, bad: clicks.bad + 1, sum: clicks.sum + 1 })

    return (
      <div >
        <Header title={header1} />
        <button onClick={handGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
        <Header title={headerStat} />
        <StatText category={textGood} state={clicks.good} />
        <StatText category={textNeutral} state={clicks.neutral} />
        <StatText category={textBad} state={clicks.bad} />
        <StatText category={textAll} state={clicks.sum} />
      </div>
    )
  }

  export default App;