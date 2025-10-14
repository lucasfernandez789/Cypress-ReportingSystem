import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './components/Layout'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>
)
