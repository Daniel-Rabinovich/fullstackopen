
const Person = ({person, removeP}) => {

  const removePerson = () => removeP(person)

  if (!person.show) return <></>

  return (
    <li>
      {person.name} {person.number}
      <button onClick={removePerson}>delete</button>
    </li>
  )
}



const Persons = ({persons, removeP}) => {

    return (
        <ul>
            {persons.map(p =>
                <Person
                  key={p.id.toString()}
                  person={p}
                  removeP={removeP}
                />
            )}
        </ul>
    )
}

export default Persons
