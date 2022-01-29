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
      <Part part={courses.parts[0]} />
      <Part part={courses.parts[1]} />
      <Part part={courses.parts[2]} />
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
  const sum = course.parts.reduce((a, b) =>
    a + b.exercises, 0);
  return (
    <div>
      <p> Number of exercises {sum} </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App