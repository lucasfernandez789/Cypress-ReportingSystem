import React from 'react'
import PropTypes from 'prop-types'
import SeccionPrincipal from '../components/home/SeccionPrincipal'
import TarjetasAcceso from '../components/home/TarjetasAcceso'
import Footer from '../components/common/Footer'

/**
 * Home page component for the Cypress reporting system.
 *
 * This component serves as the main landing page displaying:
 * - Main section with logo and system title
 * - Access cards for different report categories
 * - Footer with system information
 *
 * The home page provides an overview and navigation entry point
 * to the different types of test reports available in the system.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Navigation function to change pages
 * @returns {JSX.Element} The home page layout
 *
 * @example
 * ```jsx
 * <Home onNavigate={(page) => setCurrentPage(page)} />
 * ```
 */
function Home({ onNavigate }) {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="container mx-auto flex flex-grow flex-col justify-center px-8 py-12 sm:py-8 md:py-12 xl:h-[70vh] 2xl:py-12">
        <SeccionPrincipal />
        <TarjetasAcceso onNavigate={onNavigate} />
      </div>
      <Footer />
    </div>
  )
}

export default Home

Home.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};