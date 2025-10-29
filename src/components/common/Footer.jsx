import React from 'react'
import PropTypes from 'prop-types'

/**
 * Footer component for the Cypress reporting system.
 *
 * Displays basic system information and copyright notice at the bottom
 * of the application. The footer shows the current year dynamically
 * and provides consistent branding across all pages.
 *
 * @component
 * @returns {JSX.Element} The footer element with system information
 *
 * @example
 * ```jsx
 * <Footer />
 * ```
 */
function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-8 text-center text-gray-600">
        Sistema de Reportes de Testing - {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer