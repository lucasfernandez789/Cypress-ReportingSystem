import React from 'react'

function SeccionPrincipal() {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex justify-center mb-4 md:mb-6">
        <img
          src="/assets/images/logo-legis-act-D-yCoXSC.png"
          alt="icon balance"
          className="h-20 sm:h-16 md:h-20 lg:h-24"
        />
      </div>
      <h1 className="text-4xl sm:text-4xl lg:text-4xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
        Sistema de Reportes de Testing
      </h1>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
        Reportes automatizados con timestamps y organización por fecha
      </p>
    </div>
  )
}

export default SeccionPrincipal