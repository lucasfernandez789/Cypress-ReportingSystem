import React from 'react'

console.log('App component imports loaded')

function App() {
  console.log('App function called')
  try {
    return (
      <div style={{
        backgroundColor: 'green',
        color: 'white',
        fontSize: '24px',
        padding: '20px',
        minHeight: '100vh'
      }}>
        <h1>🚀 APP COMPONENT WORKS!</h1>
        <p>If you see this, the App component is working correctly.</p>
        <p>Time: {new Date().toLocaleString()}</p>
      </div>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    console.error('Error stack:', error.stack)
    return (
      <div style={{
        backgroundColor: 'red',
        color: 'white',
        fontSize: '24px',
        padding: '20px',
        minHeight: '100vh'
      }}>
        <h1>🚨 APP COMPONENT ERROR!</h1>
        <p>Error: {error.message}</p>
      </div>
    )
  }
}

export default App