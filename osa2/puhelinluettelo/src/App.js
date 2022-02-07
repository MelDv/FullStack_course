import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (newName === '') {
      return
    }
    let exists = false
    persons.map(person => {
      if (person.name === newName && person.number !== newNumber && newNumber !== '') {
        exists = true
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const changedPerson = { ...person, number: newNumber }
          personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            })
        }
      } else if (person.name === newName) {
        exists = true
        window.alert(`${newName} is already added to phonebook`)
      }
    })
    if (!exists) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
    }
  }
  const deletePerson = id => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePersonById(id)
        .then(returnedPersons => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const doFiltering = (event) => {
    event.preventDefault()
    let filtered = []

    if (newFilter === '') {
      document.location.reload()
    }
    persons.map(person => {
      if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
        filtered.push(person)
      }
    })
    if (filtered.length === 0) {
      window.alert(`no name contains ${newFilter}`)
      document.location.reload()
    }
    setPersons(filtered)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showAllPersons = () => {
    document.location.reload()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <button onClick={showAllPersons}>show all</button>
      </div>
      <Filter onChange={handleFilterChange} onSubmit={doFiltering} value={newFilter} />
      <NewPerson onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange}
        newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person}
            deletePerson={() => deletePerson(person.id)} />)}
      </ul>
    </div>
  )
}

export default App