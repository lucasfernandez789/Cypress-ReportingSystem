import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

console.log('🚀 NEW VERSION - App starting...')

const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (!rootElement) {
  console.error('Root element not found!')
} else {
  console.log('Creating React root with App...')
  try {
    const root = ReactDOM.createRoot(rootElement)
    console.log('Rendering App component...')
    root.render(
      <Router>
        <App />
      </Router>
    )
    console.log('App component test rendered successfully!')
  } catch (error) {
    console.error('Error with App component:', error)
    console.error('Error stack:', error.stack)
    // Fallback
    rootElement.innerHTML = `
      <div style="background-color: red; color: white; font-size: 24px; padding: 20px; min-height: 100vh;">
        <h1>🚨 APP COMPONENT ERROR!</h1>
        <p>Error: ${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `
  }
}