import React from 'react'

function SeccionPrincipal() {
  console.log('SeccionPrincipal component rendering...')
  return (
    <div className="mb-8 text-center md:mb-12 bg-purple-500 border-4 border-pink-500 p-4">
      <div className="mb-4 flex justify-center md:mb-6 bg-orange-500 border-2 border-black p-2">
        <img
          src="/Cypress-ReportingSystem/assets/images/logo-legis-act-D-yCoXSC.png"
          alt="icon balance"
          className="h-20 sm:h-16 md:h-20 lg:h-24"
          onError={(e) => console.error('Logo image failed to load:', e)}
        />
      </div>
      <h1 className="mb-3 text-4xl font-bold text-gray-900 sm:mb-4 sm:text-4xl md:text-4xl lg:text-4xl bg-green-500 border-2 border-red-500 p-2">
        Sistema de Reportes de Testing
      </h1>
      <p className="mx-auto max-w-2xl px-2 text-base text-gray-600 sm:text-lg bg-yellow-500 border-2 border-blue-500 p-2">
        Reportes automatizados con timestamps y organización por fecha
      </p>
    </div>
  )
}

export default SeccionPrincipal