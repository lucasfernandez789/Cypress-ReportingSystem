import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

console.log('Testing React Router - HashRouter (GitHub Pages compatible)')

function App() {
  console.log('App function called')

  return (
    <Router>
      <div style={{backgroundColor: 'green', color: 'white', padding: '20px'}}>
        <h1>� GREEN TEST - HASH ROUTER</h1>
        <p>HashRouter works with GitHub Pages</p>
        <p>Time: {new Date().toLocaleString()}</p>
      </div>
    </Router>
  )
}

export default App
