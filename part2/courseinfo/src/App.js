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
      <h2>
        {props.name}
      </h2>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {
        courses.map((course) => <Course course={course} key={course.id.toString()}/>)
      }
    </div>
  )
}

export default App
