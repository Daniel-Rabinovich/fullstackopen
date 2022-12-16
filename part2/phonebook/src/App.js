import { useState } from 'react'

const Person = (props) => {
  if (props.show){
    return <li>{props.name} {props.number}</li>
  } else {
    return <></>
  }
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1, show:true },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, show:true },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3, show:true },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, show:true }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewPerson = (e) => {
    e.preventDefault()
    const sameName = persons.filter(person => person.name === newName)
    const nameExists = sameName.length > 0 ? true : false

    if (nameExists) {
      alert(`${newName} is already added to the phonebook!`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length+1,
        show: true
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    const newSearch = e.target.value.toLowerCase()
    const newPersons = persons.reduce((list, person)=>{
      const newPerson = {
        ...person,
        show: person.name.toLowerCase().includes(newSearch)
      }
      return list.concat(newPerson)
    },[])
    setPersons(newPersons)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          filter showen with:
          <input onChange={handleSearchChange}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.id.toString()} name={person.name} number={person.number} show={person.show}/>
        )}
      </ul>
    </div>
  )
}

export default App
