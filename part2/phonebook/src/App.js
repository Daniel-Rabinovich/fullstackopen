import { useState } from 'react'

const Person = (props) => <li>{props.name} {props.phone}</li>

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phone: '123456789'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')


  const addNewPerson = (e) => {
    e.preventDefault()
    const sameName = persons.filter(person => person.name === newName)
    const nameExists = sameName.length > 0 ? true : false

    if (nameExists) {
      alert(`${newName} is already added to the phonebook!`)
    } else {
      const personObject = {
        name: newName,
        phone: newPhone
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewPhone('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newPhone}
          onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} name={person.name} phone={person.phone}/>
        )}
      </ul>
    </div>
  )
}

export default App
