import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

console.log('Testing React Router - BrowserRouter only')

function App() {
  console.log('App function called')

  return (
    <Router>
      <div style={{backgroundColor: 'blue', color: 'white', padding: '20px'}}>
        <h1>🔵 BLUE TEST - REACT ROUTER</h1>
        <p>BrowserRouter is working</p>
        <p>Time: {new Date().toLocaleString()}</p>
      </div>
    </Router>
  )
}

export default App
