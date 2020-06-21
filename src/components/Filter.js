import React from 'react'

const Filter = ({ handleFilterChange, newFilter }) => {
    return (
        <div>
            Find: <input onChange={handleFilterChange} value={newFilter} />
        </div>
    )
}

export default Filter