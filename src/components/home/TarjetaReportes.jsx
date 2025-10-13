import React from 'react'
import { Link } from 'react-router-dom'

function TarjetaReportes() {
  return (
    <div className="flex justify-center">
      <div className="hover:shadow-lg transition-shadow duration-300 rounded flex flex-col bg-[#DDEAF1] p-2 max-w-sm w-full">
        <div className="flex justify-end">
          <button
            className="transition duration-200"
            title="Aquí encontrarás todos los reportes de testing automatizados organizados por fecha y hora, con información detallada sobre cada ejecución"
          >
            <img src="/assets/images/help.svg" alt="icon-help" className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <img src="/assets/images/bug_report.svg" alt="bug-reports" className="h-10" />
        </div>
        <div className="font-bold text-xl mb-2 text-gray-800 text-center py-2">
          Reportes Disponibles
        </div>
        <p className="text-gray-600 text-center mb-4">
          Accede a todos los reportes de testing organizados por fecha y hora
        </p>
        <Link
          to="/reports"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center transition duration-200"
        >
          Ver Reportes de Testing
        </Link>
      </div>
    </div>
  )
}

export default TarjetaReportes