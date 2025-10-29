import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from './components/common/ErrorBoundary'
import Home from './pages/Home'
import CoreReports from './pages/CoreReports'
import FeatureReports from './pages/FeatureReports'
import MixedReports from './pages/MixedReports'

/**
 * Main application component that handles page routing.
 *
 * Renders different page components based on the current page state.
 * Wrapped in an ErrorBoundary to catch and handle any rendering errors.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Navigation function to change pages
 * @param {string} props.currentPage - Current active page identifier
 * @returns {JSX.Element} The current page component wrapped in error boundary
 *
 * @example
 * ```jsx
 * <App onNavigate={handleNavigate} currentPage="home" />
 * ```
 */
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
