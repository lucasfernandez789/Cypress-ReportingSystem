import React from 'react'
import BotonesAccion from './BotonesAccion'

function ReporteItem({ file, fileIndex, date, onDelete }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 hover:border-blue-300 report-item">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${file.stats.failures > 0 ? 'bg-red-500' : 'bg-green-500'}`}></span>
          <span className="font-semibold text-gray-700">
            Ejecución {fileIndex + 1}
            <span className="ml-2 text-sm">
              ({file.stats.passes}/{file.stats.total} tests exitosos)
            </span>
          </span>
          {file.category && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              file.category === 'core'
                ? 'bg-gray-100 text-gray-800'
                : file.category === 'features'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800' // mixed
            }`}>
              {file.category === 'core' ? '🔧 Core' :
               file.category === 'features' ? '✨ Features' :
               '🔀 Mixed'}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {file.time}
        </span>
      </div>

      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-1">Archivo:</div>
        <div className="text-xs font-mono text-gray-800 bg-gray-50 p-2 rounded">
          {file.path}
        </div>
      </div>

      <BotonesAccion
        filePath={file.path}
        date={date}
        onDelete={onDelete}
      />
    </div>
  )
}

export default ReporteItem