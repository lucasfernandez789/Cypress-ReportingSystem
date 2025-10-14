import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

console.log('App component imports loaded')

function App() {
  console.log('App function called')
  try {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <div style={{
              backgroundColor: 'purple',
              color: 'white',
              fontSize: '20px',
              padding: '15px'
            }}>
              <h2>🏠 HOME PAGE</h2>
              <p>This is the home page content.</p>
            </div>
          } />
        </Route>
      </Routes>
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