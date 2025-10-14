import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log(' Cypress Reporting System Starting...')

const rootElement = document.getElementById('root')
console.log('Root element found:', rootElement)

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

console.log(' App successfully rendered!')
