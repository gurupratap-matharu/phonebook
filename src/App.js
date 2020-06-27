import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

    if (trimmedName === '' || trimmedNumber === '') {
      alert('Please enter both the fields')
      return
    }

    if (persons.map(person => person.name).indexOf(trimmedName) !== -1) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
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
        })
        .catch(error => {
          alert(`Sorry. User not found`)
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
      <h2>Numbers</h2>
      <PersonsList
        persons={persons}
        newFilter={newFilter}
        handleDeleteOf={handleDeleteOf} />
    </div>
  )
}

export default App