import React from 'react'

const PersonsList = ({ persons, newFilter, handleDeleteOf }) => {
    return (
        <ul>
            {persons.filter((person) =>
                person.name
                    .toLowerCase()
                    .includes(newFilter.toLowerCase()))
                .map(person =>
                    <li key={person.id}>
                        {person.name}{' '}
                        {person.number}{' '}
                        <button onClick={() => { handleDeleteOf(person.id) }}>Delete</button>
                    </li >
                )}
        </ul>
    )
}

export default PersonsList