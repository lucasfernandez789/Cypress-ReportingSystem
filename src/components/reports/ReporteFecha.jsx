import React from 'react'
import ReporteItem from './ReporteItem'

function ReporteFecha({ report, isExpanded, onToggleExpansion, onDeleteExecution }) {
  return (
    <div className="date-section overflow-hidden rounded-lg bg-white shadow-md" data-date={report.date}>
      {/* Header de fecha - Clickable para expandir/colapsar */}
      <div
        className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white transition-colors duration-200 hover:from-blue-700 hover:to-indigo-700"
        onClick={() => onToggleExpansion(report.date)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-xl font-semibold">{report.dateFormatted}</h3>
              <p className="text-sm text-blue-100">{report.files ? report.files.length : 0} ejecuciones de tests</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Última ejecución</div>
            <div className="font-semibold">{report.lastExecution}</div>
          </div>
        </div>
      </div>

      {/* Contenido desplegable */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          <div className="grid gap-4">
            {report.files && report.files.map((file, fileIndex) => (
              <ReporteItem
                key={fileIndex}
                file={file}
                fileIndex={fileIndex}
                date={report.date}
                onDelete={onDeleteExecution}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReporteFecha