import React, { useState } from 'react'
import logoImage from '../assets/images/logo-legis-act-D-yCoXSC.png'

function Layout({ children }) {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setIsMenuOpen(false) // Cerrar menú al navegar
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Pass navigation function to children
  const childrenWithNavigation = React.Children.map(children, (child) =>
    React.cloneElement(child, { onNavigate: handleNavigate, currentPage })
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header - Only show when not on home */}
      {currentPage !== 'home' && (
        <>
          <nav className="relative z-30 border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex items-center space-x-4">
                {/* Hamburger Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Abrir menú principal</span>
                  {/* Hamburger icon */}
                  <div className="flex h-6 w-6 flex-col items-center justify-center space-y-1">
                    <span className={`block h-0.5 w-5 transform bg-current transition-all duration-300 ${isMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
                    <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-5 transform bg-current transition-all duration-300 ${isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
                  </div>
                </button>

                {/* Logo */}
                <img
                  src={logoImage}
                  alt="Legislatura Logo"
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
          </div>
        )}

        {/* Mobile Menu Panel */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-full flex-col">
            {/* Menu Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <img
                src={logoImage}
                alt="Legislatura Logo"
                className="h-8 w-auto"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Cerrar menú</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 space-y-2 px-4 py-6">
              <button
                onClick={() => handleNavigate('home')}
                className={`w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                  currentPage === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate('core')}
                className={`w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                  currentPage === 'core'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Core Reports
              </button>
              <button
                onClick={() => handleNavigate('features')}
                className={`w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                  currentPage === 'features'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Features Reports
              </button>
              <button
                onClick={() => handleNavigate('mixed')}
                className={`w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                  currentPage === 'mixed'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Mixed Reports
              </button>
            </div>
          </div>
        </div>
        </>
      )}
      <div className="container mx-auto px-4 py-8">
        {childrenWithNavigation}
      </div>
    </div>
  )
}

export default Layout