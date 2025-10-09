import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="h-screen flex flex-col w-full">
      <div className="flex-grow container mx-auto px-8 py-12 sm:py-8 md:py-12 2xl:py-12 xl:h-[70vh] flex flex-col justify-center">
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
      </div>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-8 text-center text-gray-600">
          Sistema de Reportes de Testing - {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}

export default Home