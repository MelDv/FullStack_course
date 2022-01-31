import { useState } from "react"

const Header = (props) => {
  return (
    <div>
      <h1> {props.title} </h1>
    </div>
  )
}

const Statistics = (props) => {
  if (props.parts[3].value < 1) {
    return (
      <div>
        <p> No feedback given </p>
      </div>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine part={props.parts[0]} />
          <StatisticLine part={props.parts[1]} />
          <StatisticLine part={props.parts[2]} />
          <StatisticLine part={props.parts[3]} />
          <StatisticLine part={props.parts[4]} />
          <StatisticLine part={props.parts[5]} />
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <tr><td>{props.part.text}</td><td>{props.part.value}</td></tr>
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

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

  const stats = {
    parts: [
      {
        text: textGood,
        value: good
      },
      {
        text: textNeutral,
        value: neutral
      },
      {
        text: textBad,
        value: bad
      },
      {
        text: textAll,
        value: sum
      },
      {
        text: textAv,
        value: average
      },
      {
        text: textPos,
        value: positives
      }
    ]
  }

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
      <Button handleClick={handGoodClick} text={textGood} />
      <Button handleClick={handleNeutralClick} text={textNeutral} />
      <Button handleClick={handleBadClick} text={textBad} />
      <Header title={headerStat} />
      <Statistics parts={stats.parts} />
    </div>
  )
}

export default App;