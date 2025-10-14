import React, { useState } from 'react'
import Home from './pages/Home'
import CoreReports from './pages/CoreReports'
import FeatureReports from './pages/FeatureReports'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page) => {
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
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Cypress Reporting System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavigate('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                🏠 Home
              </button>
              <button
                onClick={() => handleNavigate('core')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'core'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                🔧 Core Reports
              </button>
              <button
                onClick={() => handleNavigate('features')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'features'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                ✨ Features Reports
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {renderCurrentPage()}
    </div>
  )
}

export default App
