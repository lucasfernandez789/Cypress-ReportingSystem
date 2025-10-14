import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Reports from './pages/Reports'
import CoreReports from './pages/CoreReports'
import FeatureReports from './pages/FeatureReports'

console.log('App component imports loaded')
console.log('Layout:', Layout)
console.log('Home:', Home)
console.log('Reports:', Reports)
console.log('CoreReports:', CoreReports)
console.log('FeatureReports:', FeatureReports)

console.log('App component rendering...')

function App() {
  console.log('App function called')
  try {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="core" element={<CoreReports />} />
          <Route path="features" element={<FeatureReports />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    console.error('Error stack:', error.stack)
    return <div style={{color: 'red', fontSize: '24px'}}>Error in App component: {error.message}</div>
  }
}

export default App