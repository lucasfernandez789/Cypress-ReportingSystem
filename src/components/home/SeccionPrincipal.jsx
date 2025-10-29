import React from 'react'
import PropTypes from 'prop-types'

/**
 * Main section component for the home page header.
 *
 * Displays the primary branding and introduction section including:
 * - Legislative logo image
 * - Main system title
 * - Descriptive subtitle about automated reporting
 *
 * This component serves as the hero section of the home page,
 * providing visual identity and system description.
 *
 * @component
 * @returns {JSX.Element} The main section with logo and title
 *
 * @example
 * ```jsx
 * <SeccionPrincipal />
 * ```
 */
function SeccionPrincipal() {
  return (
    <div className="mb-8 text-center md:mb-12">
      <div className="mb-4 flex justify-center md:mb-6">
        <img
          src="/Cypress-ReportingSystem/assets/images/logo-legis-act-D-yCoXSC.png"
          alt="icon balance"
          className="h-20 sm:h-16 md:h-20 lg:h-24"
          onError={(e) => console.error('Logo image failed to load:', e)}
        />
      </div>
      <h1 className="mb-3 text-4xl font-bold text-gray-900 sm:mb-4 sm:text-4xl md:text-4xl lg:text-4xl">
        Sistema de Reportes de Testing
      </h1>
      <p className="mx-auto max-w-2xl px-2 text-base text-gray-600 sm:text-lg">
        Reportes automatizados con timestamps y organización por fecha
      </p>
    </div>
  )
}

export default SeccionPrincipal