import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '123-456-789',
  },
  {
    id: 2,
    name: 'Princy',
    number: '123-666-789',
  }, {
    id: 3,
    name: 'Nancy',
    number: '999-456-789',
  }, {
    id: 4,
    name: 'mummy',
    number: '123-555-789',
  },
]
ReactDOM.render(<App persons={persons} />, document.getElementById('root'))