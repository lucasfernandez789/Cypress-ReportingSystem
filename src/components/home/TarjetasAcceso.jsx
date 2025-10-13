import React from 'react'
import { Link } from 'react-router-dom'

function TarjetasAcceso() {
  return (
    <div className="flex justify-center gap-8">
      {/* Tarjeta Core */}
      <div className="hover:shadow-lg transition-shadow duration-300 rounded flex flex-col bg-[#DDEAF1] p-2 max-w-sm w-full">
        <div className="flex justify-end">
          <button
            className="transition duration-200"
            title="Reportes de testing para funcionalidades básicas y críticas del sistema"
          >
            <img src="/assets/images/help.svg" alt="icon-help" className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <img src="/assets/images/bug_report.svg" alt="bug-reports" className="h-10" />
        </div>
        <div className="font-bold text-xl mb-2 text-gray-800 text-center py-2">
          Tests Core
        </div>
        <p className="text-gray-600 text-center mb-4">
          Funcionalidades básicas y críticas del sistema
        </p>
        <Link
          to="/core"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center transition duration-200"
        >
          Ver Reportes Core
        </Link>
      </div>

      {/* Tarjeta Features */}
      <div className="hover:shadow-lg transition-shadow duration-300 rounded flex flex-col bg-[#DDEAF1] p-2 max-w-sm w-full">
        <div className="flex justify-end">
          <button
            className="transition duration-200"
            title="Reportes de testing para funcionalidades específicas y avanzadas del sistema"
          >
            <img src="/assets/images/help.svg" alt="icon-help" className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <img src="/assets/images/bug_report.svg" alt="bug-reports" className="h-10" />
        </div>
        <div className="font-bold text-xl mb-2 text-gray-800 text-center py-2">
          Tests Features
        </div>
        <p className="text-gray-600 text-center mb-4">
          Funcionalidades específicas y avanzadas del sistema
        </p>
        <Link
          to="/features"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center transition duration-200"
        >
          Ver Reportes Features
        </Link>
      </div>
    </div>
  )
}

export default TarjetasAcceso