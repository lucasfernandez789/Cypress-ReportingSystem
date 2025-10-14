import React from 'react'
import Home from './pages/Home'
import CoreReports from './pages/CoreReports'
import FeatureReports from './pages/FeatureReports'
import MixedReports from './pages/MixedReports'

function App({ onNavigate, currentPage }) {
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={onNavigate} />
      case 'core':
        return <CoreReports onNavigate={onNavigate} />
      case 'features':
        return <FeatureReports onNavigate={onNavigate} />
      case 'mixed':
        return <MixedReports onNavigate={onNavigate} />
      default:
        return <Home onNavigate={onNavigate} />
    }
  }

  return (
    <div>
      {renderCurrentPage()}
    </div>
  )
}

export default App
