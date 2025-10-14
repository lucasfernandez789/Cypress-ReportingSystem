import React from 'react'

console.log('App component imports loaded')

function App() {
  console.log('App function called - about to render')

  const result = (
    <div style={{
      backgroundColor: 'purple',
      color: 'white',
      fontSize: '24px',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <h1>� APP IS DEFINITELY RENDERING!</h1>
      <p>If you see this, App component is working perfectly.</p>
      <p>Time: {new Date().toLocaleString()}</p>
      <p>Random number: {Math.random()}</p>
    </div>
  )

  console.log('App JSX created:', result)
  return result
}

export default App