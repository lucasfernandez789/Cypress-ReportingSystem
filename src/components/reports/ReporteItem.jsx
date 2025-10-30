import React from 'react'
import BotonesAccion from './BotonesAccion'

function ReporteItem({ file, fileIndex, date, onDelete }) {
  return (
    <div className="report-item rounded-lg border border-gray-200 p-4 transition-shadow duration-200 hover:border-blue-300 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${file.stats.failures > 0 ? 'bg-red-500' : 'bg-green-500'}`}></span>
          <span className="font-semibold text-gray-700">
            Ejecución {fileIndex + 1}
            <span className="ml-2 text-sm">
              ({file.stats.passes}/{file.stats.total} tests exitosos)
            </span>
          </span>
          {file.category && (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              file.category === 'core'
                ? 'bg-gray-100 text-gray-800'
                : file.category === 'features'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-purple-100 text-purple-800' // mixed
            }`}>
              {file.category === 'core' ? 'Core' :
               file.category === 'features' ? 'Features' :
               'Mixed'}
            </span>
          )}
        </div>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
          {file.time}
        </span>
      </div>

      <div className="mb-3">
        <div className="mb-1 text-sm text-gray-600">Archivo:</div>
        <div className="rounded bg-gray-50 p-2 font-mono text-xs text-gray-800">
          {file.path}
        </div>
      </div>

      <BotonesAccion
        filePath={file.path}
        date={date}
        onDelete={onDelete}
        category={file.category}
      />
    </div>
  )
}

export default ReporteItem