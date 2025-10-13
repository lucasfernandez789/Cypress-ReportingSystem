import React from 'react'

function FiltrosReportes({
  dateFilter,
  setDateFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onClearFilters,
  onSearch
}) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Filtros de Reportes</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Fecha específica
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Desde
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Hasta
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={onSearch}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
        >
          <span className="material-symbols-outlined text-sm">search</span>
          Buscar
        </button>
        <button
          onClick={onClearFilters}
          className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  )
}

export default FiltrosReportes