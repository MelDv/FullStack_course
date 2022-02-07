import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import Footer from './components/Footer'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(true)

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
            .catch(error => {
              setError(true)
              setMessage(
                `Information of ${person.name} has already been removed from server.`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
          setError(false)
          setMessage(
            `Changed phone number for ${person.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      } else if (person.name === newName) {
        exists = true
        setError(true)
        setNewName('')
        setNewNumber('')
        setMessage(
          `${newName} is already added to phonebook`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      setError(false)
      setMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
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
      setError(false)
      setMessage(
        `Deleted ${person.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      isError.error = true
      setMessage(
        `no name contains ${newFilter}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError} /><br />
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
      <Footer />
    </div>
  )
}

export default App