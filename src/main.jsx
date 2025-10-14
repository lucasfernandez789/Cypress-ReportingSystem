import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './components/Layout'
import App from './App'
import './index.css'

console.log(' Cypress Reporting System Starting...')

const rootElement = document.getElementById('root')
console.log('Root element found:', rootElement)

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>
)

console.log(' App successfully rendered!')
