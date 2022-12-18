import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personsService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewPerson = (e) => {
    e.preventDefault()

    const sameName = persons.filter(person => person.name === newName).length
    const nameExists = sameName.length > 0 ? true : false

    if (nameExists) {
      alert(`${newName} is already added to the phonebook!`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        show: true
      }

      personsService
      .create(personObject)
      .then(response => setPersons(persons.concat(response)))
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
    const newPersons = persons.reduce((list, person) => {
      const newPerson = {
        ...person,
        show: person.name.toLowerCase().includes(newSearch)
      }
      return list.concat(newPerson)
    },[])
    setPersons(newPersons)
  }

  // fetch persons from server
  useEffect(() => {
    personsService
    .getAll()
    .then(response => setPersons(response))
  }, [])

  // remove person from server
  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
      .remove(id)
      .then(response => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter change={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        formOnSubmit={addNewPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons data={persons} removePerson={removePerson}/>
    </div>
  )
}

export default App
