
const Person = (props) => {

  const removePerson = () => {
    props.removePerson(props.id, props.data.name)
  }

  if (props.data.show){
    return (
      <li>
        {props.data.name} {props.data.number}
        <button onClick={removePerson}>delete</button>
      </li>
    )
  } else {
    return <></>
  }
}


const Persons = (props) => {

    return (
        <ul>
            {props.data.map(person =>
                <Person
                key={person.id.toString()}
                id={person.id}
                data={person}
                removePerson={props.removePerson}/>
            )}
        </ul>
    )
}

export default Persons
