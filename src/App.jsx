import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Reports from './pages/Reports'
import CoreReports from './pages/CoreReports'
import FeatureReports from './pages/FeatureReports'

function App() {
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
}

export default App