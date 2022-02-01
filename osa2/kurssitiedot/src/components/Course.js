const Course = ({ course }) => {
    console.log(course);
    return (
        <div>
            <h1> Courses </h1>
            <ul>
                <Header key={course.id} name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </ul>
        </div>
    )
}

const Header = (course) => {
    return (
        <div>
            <h2> {course.name} </h2>
        </div>
    )
}

const Content = ({ parts }) => {
    console.log(parts);
    return (
        <div>
            <ul>
                {parts.map(part =>
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                )}
            </ul>
        </div>
    )
}

const Part = (part) => {
    console.log(part);
    return (
        <div>
            <li> {part.name} {part.exercises} </li>
        </div>
    )
}

const Total = (course) => {
    const sum = course.parts.reduce((a, b) =>
        a + b.exercises, 0);
    return (
        <div>
            <br/><b> Number of exercises {sum} </b>
        </div>
    )
}

export default Course