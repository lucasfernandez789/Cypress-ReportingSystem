import React, { useState } from 'react'
import PropTypes from 'prop-types'
import logoImage from '../assets/images/logo-legis-act-D-yCoXSC.png'
import { PAGES, ACCESSIBILITY, STYLES } from '../constants/constants'

/**
 * Componente Layout que proporciona navegación y estructura responsiva para el sistema de reportes Cypress.
 *
 * Este componente maneja el layout principal de la aplicación incluyendo:
 * - Encabezado de navegación con menú hamburguesa para móvil
 * - Gestión del estado de navegación por páginas
 * - Visualización del logo y branding
 * - Superposición de menú móvil
 *
 * La navegación solo se muestra cuando no está en la página de inicio, proporcionando
 * una experiencia de landing limpia mientras mantiene acceso fácil a diferentes categorías de reportes.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar dentro del layout
 * @returns {JSX.Element} El wrapper de layout con navegación y área de contenido
 *
 * @example
 * ```jsx
 * <Layout>
 *   <Home onNavigate={handleNavigate} />
 * </Layout>
 * ```
 */
function Layout({ children }) {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  /**
   * Maneja la navegación a diferentes páginas y cierra el menú móvil.
   *
   * @param {string} page - Identificador de página a navegar ('home', 'core', 'features', 'mixed')
   */
  const handleNavigate = (page) => {
    setCurrentPage(page)
    setIsMenuOpen(false) // Cerrar menú al navegar
  }

  /**
   * Toggles the mobile menu open/closed state.
   */
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
      {currentPage !== PAGES.HOME && (
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
                  <span className="sr-only">{ACCESSIBILITY.OPEN_MAIN_MENU}</span>
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
                  alt={ACCESSIBILITY.LOGO_ALT}
                  className={STYLES.LOGO_HEIGHT}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
            role="presentation"
            aria-hidden="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
          </div>
        )}

        {/* Mobile Menu Panel */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex h-full flex-col">
            {/* Menu Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 id="mobile-menu-title" className="sr-only">Menú de navegación</h2>
              <img
                src={logoImage}
                alt={ACCESSIBILITY.LOGO_ALT}
                className={STYLES.LOGO_HEIGHT_MOBILE}
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label={ACCESSIBILITY.CLOSE_MENU}
              >
                <span className="sr-only">{ACCESSIBILITY.CLOSE_MENU}</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 space-y-2 px-4 py-6" role="navigation" aria-label="Navegación principal">
              <button
                onClick={() => handleNavigate(PAGES.HOME)}
                className={`w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                  currentPage === PAGES.HOME
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                aria-current={currentPage === PAGES.HOME ? 'page' : undefined}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate(PAGES.CORE)}
                className={`w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                  currentPage === PAGES.CORE
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                aria-current={currentPage === PAGES.CORE ? 'page' : undefined}
              >
                Core Reports
              </button>
              <button
                onClick={() => handleNavigate(PAGES.FEATURES)}
                className={`w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                  currentPage === PAGES.FEATURES
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                aria-current={currentPage === PAGES.FEATURES ? 'page' : undefined}
              >
                Features Reports
              </button>
              <button
                onClick={() => handleNavigate(PAGES.MIXED)}
                className={`w-full rounded-md px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                  currentPage === PAGES.MIXED
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                aria-current={currentPage === PAGES.MIXED ? 'page' : undefined}
              >
                Mixed Reports
              </button>
            </nav>
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};