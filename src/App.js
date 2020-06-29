import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameSubmit = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
    }

    if (trimmedName === '' || trimmedNumber === '') {
      alert('Please enter both the fields')
      return
    }

    if (persons.map(person => person.name).indexOf(trimmedName) !== -1) {
      const result = window.confirm(`${trimmedName} is already added to phonebook, replace the old number with the new one?`)

      if (result) {
        const person = persons.find(person => person.name === trimmedName)

        personService
          .update(personObject, person.id)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`${returnedPerson.name} has been added to the phonebook.`)
        setTimeout(() => {
          setNotificationMessage(null, 5000)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDeleteOf = (id) => {
    const toBeDeletedPerson = persons.find(p => p.id === id)
    const result = window.confirm(`Delete ${toBeDeletedPerson.name} ?`)

    if (result) {
      personService
        .remove(id)
        .then(removedPerson => {
          setPersons(persons.filter(p => p.id !== id))
          setNotificationMessage(`${toBeDeletedPerson.name} has been deleted.`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Sorry. User not found`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <PersonForm
        handleNameSubmit={handleNameSubmit}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <Notification notificationMessage={notificationMessage} />
      <Error errorMessage={errorMessage} />
      <h2>Numbers</h2>
      <PersonsList
        persons={persons}
        newFilter={newFilter}
        handleDeleteOf={handleDeleteOf} />
    </div >
  )
}

export default App