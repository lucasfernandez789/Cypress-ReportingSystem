import React, { useState } from 'react'
import Home from './pages/Home'
import CoreReports from './pages/CoreReports'
import FeatureReports from './pages/FeatureReports'

console.log('FINAL TEST - Manual Navigation App')

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  console.log('App function called - current page:', currentPage)

  const handleNavigate = (page) => {
    console.log('Navigating to:', page)
    setCurrentPage(page)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />
      case 'core':
        return <CoreReports onNavigate={handleNavigate} />
      case 'features':
        return <FeatureReports onNavigate={handleNavigate} />
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  return (
    <div>
      {/* Navigation Header */}
      <nav style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '10px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => handleNavigate('home')}
            style={{
              backgroundColor: currentPage === 'home' ? '#555' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🏠 Home
          </button>
          <button
            onClick={() => handleNavigate('core')}
            style={{
              backgroundColor: currentPage === 'core' ? '#555' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔧 Core Reports
          </button>
          <button
            onClick={() => handleNavigate('features')}
            style={{
              backgroundColor: currentPage === 'features' ? '#555' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ✨ Features Reports
          </button>
          <span style={{ marginLeft: 'auto', fontSize: '14px' }}>
            Current: {currentPage}
          </span>
        </div>
      </nav>

      {/* Page Content */}
      {renderCurrentPage()}
    </div>
  )
}

export default App
