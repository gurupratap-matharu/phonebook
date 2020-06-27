import React from 'react'

const Persons = ({ persons, newFilter }) => {
    return (
        <ul>
            {persons.filter((person) =>
                person.name.toLowerCase().includes(newFilter.toLowerCase()))
                .map(person => <li key={person.id}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default Persons