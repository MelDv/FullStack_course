const Header = (course) => {
  return (
    <div>
      <h1> {course.name}</h1>
    </div>
  )
}

const Content = (course) => {
  return (
    <div>
      <Part partname={course.part1} exercises={course.exercises1} />
      <Part partname={course.part2} exercises={course.exercises2} />
      <Part partname={course.part3} exercises={course.exercises3} />
    </div>
  )
}

const Part = (course) => {
  return (
    <div>
      <p> {course.partname} {course.exercises} </p>
    </div>
  )
}

const Total = (course) => {
  return (
    <div>
      <p> Number of exercises {course.sum} </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header name={course} />
      <Content part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3} />
      <Total sum={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App