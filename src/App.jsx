import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from './components/common/ErrorBoundary'
import Home from './pages/Home'
import CoreReports from './pages/CoreReports'
import FeatureReports from './pages/FeatureReports'
import MixedReports from './pages/MixedReports'

function App({ onNavigate = () => {}, currentPage = 'home' }) {
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
    <ErrorBoundary>
      {renderCurrentPage()}
    </ErrorBoundary>
  )
}

App.propTypes = {
  onNavigate: PropTypes.func,
  currentPage: PropTypes.string,
}

export default App
