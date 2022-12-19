import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personsService from './services/persons'
import Notification from './components/notification'
import './index.css'

const App = () => {

  // states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('notification')

  // send notification when function called
  const sendNotification = (msg, type, length) => {
      setNotificationType(type)
      setNotificationMessage(msg)
      setTimeout(() => {
            setNotificationMessage(null)
      }, length)
  }

  // find persons with name containing string given
  // return [true/false, personObj/null]
  const findP = (name) => {
    const n = name.toLowerCase()
    const p = persons.filter(p => p.name === n)
    const exists = p.length > 0 ? true : false
    return [exists, p[0]]
  }

  // add new person to the list
  const addNewPerson = (e) => {

    e.preventDefault()
    const [exists, p] = findP(newName)

    if (exists) {
      const msg = `${p.name} is already added to the phone book,
        replace the old number with a new one?`
      if (window.confirm(msg)) {
        const newP = {
          ...p,
          number: newNumber
        }

        personsService
        .change(newP)
        .then(response => {
          const msg = `${newP.name} has been updated`
          setPersons(persons.map(p => p.id !== newP.id ? p : newP))
          sendNotification(msg, 'notification', 5000)
        })
        .catch(response => {
          const msg = `information of ${newP.name}
          has already beed removed from the server!`
          sendNotification(msg, 'error', 5000)
        })
      }
    } else {
      const pObj = {
        name: newName,
        number: newNumber,
        show: true
      }

      personsService
      .create(pObj)
      .then(response => {
        const msg = `Added ${response.name}`
        setPersons(persons.concat(response))
        sendNotification(msg,'notification',5000)
      })
    }

    // clear fields
    setNewName('')
    setNewNumber('')
  }

  // update name typed
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  // updated number typed
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  // update show tag on each person based on search query
  const handleSearchChange = (e) => {
    const updatedSearch = e.target.value.toLowerCase()

    // create new updated list of persons
    const newPs = persons.reduce((l, p) => {
      const pName = p.name.toLowerCase()
      const newP = {
        ...p,
        show: pName.includes(updatedSearch)
      }
      return l.concat(newP)
    },[])

    // set the new list
    setPersons(newPs)
  }

  // fetch persons from server
  useEffect(() => {
    personsService
    .getAll()
    .then(response => setPersons(response))
  }, [])

  // remove person from server
  const removePerson = (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      personsService
      .remove(p.id)
      .then(response => {
        const newPs = persons.filter(x => x.id !== p.id)
        const msg = `${p.name} removed`
        setPersons(newPs)
        sendNotification(msg,'notification',5000)
      })
      .catch(error => {
        const msg = `${p.name} already been removed`
        sendNotification(msg,'error',5000)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notificationMessage}
        type={notificationType}
      />
      <Filter
        change={handleSearchChange}
      />
      <h2>add a new</h2>
      <PersonForm
        formOnSubmit={addNewPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        removeP={removePerson}
      />
    </div>
  )
}

export default App
