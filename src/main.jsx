import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

console.log('🚀 Starting simple test...')

const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (!rootElement) {
  console.error('Root element not found!')
} else {
  console.log('Creating simple React root...')
  try {
    const root = ReactDOM.createRoot(rootElement)
    console.log('Rendering simple test...')
    root.render(
      <div style={{
        backgroundColor: 'red',
        color: 'white',
        fontSize: '24px',
        padding: '20px',
        minHeight: '100vh'
      }}>
        <h1>🚀 REACT IS WORKING!</h1>
        <p>If you see this, React rendering works correctly.</p>
        <p>Time: {new Date().toLocaleString()}</p>
      </div>
    )
    console.log('Simple test rendered successfully!')
  } catch (error) {
    console.error('Error during simple rendering:', error)
    console.error('Error stack:', error.stack)
    // Fallback rendering
    rootElement.innerHTML = `
      <div style="background-color: red; color: white; font-size: 24px; padding: 20px; min-height: 100vh;">
        <h1>🚨 ERROR CAUGHT!</h1>
        <p>Error: ${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `
  }
}