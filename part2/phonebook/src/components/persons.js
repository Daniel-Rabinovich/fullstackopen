
const Person = (props) => {
  if (props.data.show){
    return <li>{props.data.name} {props.data.number}</li>
  } else {
    return <></>
  }
}


const Persons = (props) => {

    return (
        <ul>
            {props.data.map(person =>
                <Person key={person.id.toString()} data={person}/>
            )}
        </ul>
    )
}

export default Persons
