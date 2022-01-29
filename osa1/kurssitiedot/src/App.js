const Header = (course) => {
  return (
    <div>
      <h1> {course.name}</h1>
    </div>
  )
}

const Content = (courses) => {
  return (
    <div>
      <Part part={courses.part1} />
      <Part part={courses.part2} />
      <Part part={courses.part3} />
    </div>
  )
}

const Part = (course) => {
  return (
    <div>
      <p> {course.part.name} {course.part.exercises} </p>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header name={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total sum={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App