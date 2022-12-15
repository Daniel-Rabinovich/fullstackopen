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

export default Course
