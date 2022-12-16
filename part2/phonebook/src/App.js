import { useState } from 'react'

const Person = (props) => <li>{props.name}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNewName = (e) => {
    e.preventDefault()
    const personObject = { name: newName }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} name={person.name}/>
        )}
      </ul>
    </div>
  )
}

export default App
