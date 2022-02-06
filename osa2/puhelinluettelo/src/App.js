import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

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
      if (person.name === newName) {
        exists = true
        window.alert(`${newName} is already added to phonebook`)
      }
    })
    if (!exists) {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
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
          <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App