import React from 'react'

function TarjetasAcceso({ onNavigate }) {
  return (
    <div className="flex justify-center gap-8">
      {/* Tarjeta Core */}
      <div className="flex w-full max-w-sm flex-col rounded bg-[#DDEAF1] p-2 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex justify-end">
          <button
            className="transition duration-200"
            title="Reportes de testing para funcionalidades básicas y críticas del sistema"
          >
            <img src="/Cypress-ReportingSystem/assets/images/help.svg" alt="icon-help" className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6 flex justify-center">
          <img src="/Cypress-ReportingSystem/assets/images/science_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="science icon" className="w-16 h-16 icon-gray-dark" />
        </div>
        <div className="mb-2 py-2 text-center text-xl font-bold text-gray-800">
          Tests Core
        </div>
        <p className="mb-4 text-center text-gray-600">
          Funcionalidades básicas y críticas del sistema
        </p>
        <button
          onClick={() => onNavigate('core')}
          className="rounded bg-blue-500 px-4 py-2 text-center font-bold text-white transition duration-200 hover:bg-blue-600"
        >
          Ver Reportes Core
        </button>
      </div>

      {/* Tarjeta Features */}
      <div className="flex w-full max-w-sm flex-col rounded bg-[#DDEAF1] p-2 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex justify-end">
          <button
            className="transition duration-200"
            title="Reportes de testing para funcionalidades específicas y avanzadas del sistema"
          >
            <img src="/Cypress-ReportingSystem/assets/images/help.svg" alt="icon-help" className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6 flex justify-center">
          <img src="/Cypress-ReportingSystem/assets/images/extension_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="extension icon" className="w-16 h-16 icon-gray-dark" />
        </div>
        <div className="mb-2 py-2 text-center text-xl font-bold text-gray-800">
          Tests Features
        </div>
        <p className="mb-4 text-center text-gray-600">
          Funcionalidades específicas y avanzadas del sistema
        </p>
        <button
          onClick={() => onNavigate('features')}
          className="rounded bg-blue-500 px-4 py-2 text-center font-bold text-white transition duration-200 hover:bg-blue-600"
        >
          Ver Reportes Features
        </button>
      </div>
    </div>
  )
}

export default TarjetasAcceso