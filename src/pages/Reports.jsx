import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Reports() {
  const [reports, setReports] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [dateFilter, setDateFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [expandedDates, setExpandedDates] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    fetch('/reports/report.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formattedReports = data.map(dateGroup => ({
            date: dateGroup.date,
            dateFormatted: dateGroup.dateFormatted,
            lastExecution: dateGroup.lastExecution,
            files: dateGroup.files.map((file, index) => ({
              path: file.path,
              time: file.time,
              date: file.date,
              stats: {
                passes: 1,
                failures: 0,
                total: 1
              },
              executionNumber: index + 1
            }))
          }));

          setReports(formattedReports);
          const totalExecutions = formattedReports.reduce((sum, report) => sum + report.files.length, 0);
          setTotalReports(totalExecutions);
          setVisibleCount(formattedReports.length);
        } else {
          setReports([]);
          setTotalReports(0);
          setVisibleCount(0);
        }
      })
      .catch((error) => {
        console.error('Error loading reports:', error);
        setReports([]);
        setTotalReports(0);
        setVisibleCount(0);
      });
  };

  const deleteExecution = async (date, filePath) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar esta ejecución?\n\nFecha: ${date}\nArchivo: ${filePath}`)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/delete-report', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, filePath }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Recargar reportes después de eliminar
        loadReports();
        alert('✅ Ejecución eliminada correctamente');
      } else {
        alert(`❌ Error al eliminar la ejecución: ${result.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error deleting execution:', error);
      alert(`❌ Error de conexión. Asegúrate de que el servidor API esté corriendo:\n\nnpm run api-server\n\nError: ${error.message}`);
    }
  };

  const toggleDateExpansion = (date) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  const filterReports = () => {
    if (!reports) return;

    const sections = document.querySelectorAll('.date-section');
    let visible = 0;
    let total = 0;

    sections.forEach((section) => {
      const sectionDate = section.getAttribute('data-date');
      let isVisible = false;

      if (dateFilter) {
        isVisible = sectionDate === dateFilter;
      } else if (dateFrom || dateTo) {
        const dateStr = sectionDate;
        const fromStr = dateFrom || '1900-01-01';
        const toStr = dateTo || '2100-12-31';
        isVisible = dateStr >= fromStr && dateStr <= toStr;
      } else {
        isVisible = true;
      }

      if (isVisible) {
        section.classList.remove('hidden');
        const reportsInSection = section.querySelectorAll('.report-item').length;
        total += reportsInSection;
        visible++;
      } else {
        section.classList.add('hidden');
      }
    });

    setVisibleCount(visible);
    setTotalReports(total);
  };

  const clearFilters = () => {
    setDateFilter('');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
    filterReports();
  };

  // Calcular reportes filtrados y paginados
  const getFilteredAndPaginatedReports = () => {
    let filtered = reports;

    if (dateFilter) {
      filtered = filtered.filter(report => report.date === dateFilter);
    } else if (dateFrom || dateTo) {
      filtered = filtered.filter(report => {
        const dateStr = report.date;
        const fromStr = dateFrom || '1900-01-01';
        const toStr = dateTo || '2100-12-31';
        return dateStr >= fromStr && dateStr <= toStr;
      });
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);

    return { filtered, paginated, totalPages: Math.ceil(filtered.length / itemsPerPage) };
  };

  const { filtered, paginated, totalPages } = getFilteredAndPaginatedReports();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reportes por Fecha</h2>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha específica
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value)
                  setDateFrom('')
                  setDateTo('')
                  setCurrentPage(1)
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Desde
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value)
                  setDateFilter('')
                  setCurrentPage(1)
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hasta
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value)
                  setDateFilter('')
                  setCurrentPage(1)
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Limpiar
              </button>
            </div>
          </div>
          <div id="searchResults" className="mt-4 text-sm text-gray-600">
            {(dateFilter || dateFrom || dateTo) && (
              `Mostrando ${filtered.length} fechas con ${filtered.reduce((sum, report) => sum + report.files.length, 0)} reportes`
            )}
          </div>
        </div>
      </div>

      {/* Lista de reportes con paginación */}
      <div className="space-y-4">
        {paginated && paginated.length > 0 ? (
          <>
            {paginated.map((report, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden date-section" data-date={report.date}>
                {/* Header de fecha - Clickable para expandir/colapsar */}
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200"
                  onClick={() => toggleDateExpansion(report.date)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform duration-200 ${expandedDates.has(report.date) ? 'rotate-90' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="text-xl font-semibold">{report.dateFormatted}</h3>
                        <p className="text-blue-100 text-sm">{report.files ? report.files.length : 0} ejecuciones de tests</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-100">Última ejecución</div>
                      <div className="font-semibold">{report.lastExecution}</div>
                    </div>
                  </div>
                </div>

                {/* Contenido desplegable */}
                {expandedDates.has(report.date) && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="grid gap-4">
                      {report.files && report.files.map((file, fileIndex) => (
                        <div key={fileIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 hover:border-blue-300 report-item">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${file.stats.failures > 0 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                              <span className="font-semibold text-gray-700">
                                Ejecución {fileIndex + 1}
                                <span className="ml-2 text-sm">
                                  ({file.stats.passes}/{file.stats.total} tests exitosos)
                                </span>
                              </span>
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

                          <div className="flex justify-between items-center">
                            <a
                              href={`/reports/${file.path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
                            >
                              Ver reporte
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </a>

                            <button
                              onClick={() => deleteExecution(report.date, file.path)}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm hover:bg-red-100 transition-colors duration-200"
                              title="Eliminar esta ejecución"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Anterior
                  </button>

                  <span className="text-sm text-gray-700">
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  {filtered.length} fechas totales
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No hay reportes disponibles</h3>
            <p className="mt-2 text-sm text-gray-500">
              No se encontraron reportes para mostrar. Ejecuta algunas pruebas primero.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Reports;