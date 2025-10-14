import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

console.log('🚀 Testing React Router...')

const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (!rootElement) {
  console.error('Root element not found!')
} else {
  console.log('Creating React root with Router...')
  try {
    const root = ReactDOM.createRoot(rootElement)
    console.log('Rendering with Router...')
    root.render(
      <Router>
        <div style={{
          backgroundColor: 'blue',
          color: 'white',
          fontSize: '24px',
          padding: '20px',
          minHeight: '100vh'
        }}>
          <h1>🚀 REACT ROUTER WORKS!</h1>
          <p>If you see this, React Router is working correctly.</p>
          <p>Time: {new Date().toLocaleString()}</p>
        </div>
      </Router>
    )
    console.log('Router test rendered successfully!')
  } catch (error) {
    console.error('Error with Router:', error)
    console.error('Error stack:', error.stack)
    // Fallback
    rootElement.innerHTML = `
      <div style="background-color: red; color: white; font-size: 24px; padding: 20px; min-height: 100vh;">
        <h1>🚨 ROUTER ERROR!</h1>
        <p>Error: ${error.message}</p>
      </div>
    `
  }
}