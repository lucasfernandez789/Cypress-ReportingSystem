import React from 'react'
import { Link } from 'react-router-dom'

function TarjetaReportes() {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-sm flex-col rounded bg-[#DDEAF1] p-2 transition-shadow duration-300 hover:shadow-lg">
        <div className="flex justify-end">
          <button
            className="transition duration-200"
            title="Aquí encontrarás todos los reportes de testing automatizados organizados por fecha y hora, con información detallada sobre cada ejecución"
          >
            <img src="/assets/images/help.svg" alt="icon-help" className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6 flex justify-center">
          <img src="/assets/images/bug_report.svg" alt="bug-reports" className="h-10" />
        </div>
        <div className="mb-2 py-2 text-center text-xl font-bold text-gray-800">
          Reportes Disponibles
        </div>
        <p className="mb-4 text-center text-gray-600">
          Accede a todos los reportes de testing organizados por fecha y hora
        </p>
        <Link
          to="/reports"
          className="rounded bg-blue-500 px-4 py-2 text-center font-bold text-white transition duration-200 hover:bg-blue-600"
        >
          Ver Reportes de Testing
        </Link>
      </div>
    </div>
  )
}

export default TarjetaReportes