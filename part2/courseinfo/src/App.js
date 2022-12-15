// part 2 of fullstackopen

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

const Content = (props) => {
  const { parts } = props
  return (
    <div>
      {
        parts.map(
          (item) => <Part name={item.name} exercises={item.exercises} key={item.id.toString()} />
        )
      }
      <Statistics parts={parts} />
    </div>
  )
}

const Part = (props) => {
  const { name, exercises , id } = props
  return (
    <li>
      {name} {exercises}
    </li>
  )
}

const Statistics = (props) => {
  const parts = props.parts
  return (
    <div>
      <p>total of {parts.reduce((sum,item) => sum + item.exercises,0)} exercises</p>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      { // added as a test
        name:"Redux",
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
