import React from 'react'

const PersonForm = ({
    handleNameSubmit,
    handleNameChange,
    newName,
    handleNumberChange,
    newNumber }) => {
    return (
        <form onSubmit={handleNameSubmit}>
            <div>
                Name: <input onChange={handleNameChange} value={newName} />
            </div>
            <div>
                Number: <input onChange={handleNumberChange} value={newNumber} />
            </div>
            <button type='submit'>Add</button>
        </form>
    )
}

export default PersonForm