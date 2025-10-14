import { useState, useEffect } from 'react';

export function useReports(category = null) {
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
    fetch('/Cypress-ReportingSystem/reports/report.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          let formattedReports = data.map(dateGroup => ({
            date: dateGroup.date,
            dateFormatted: dateGroup.dateFormatted,
            lastExecution: dateGroup.lastExecution,
            files: dateGroup.files.map((file, index) => ({
              path: file.path,
              time: file.time,
              date: file.date,
              category: file.category || 'other', // Usar la categoría del JSON
              stats: {
                passes: 1,
                failures: 0,
                total: 1
              },
              executionNumber: index + 1
            }))
          }));

          // Filtrar por categoría si se especifica
          if (category) {
            formattedReports = formattedReports.map(report => ({
              ...report,
              files: report.files.filter(file => file.category === category || file.category === 'mixed')
            })).filter(report => report.files.length > 0);
          }

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

    // Aplicar filtro de fecha específica si existe
    if (dateFilter) {
      filtered = filtered.filter(report => report.date === dateFilter);
    }

    // Aplicar filtro de rango de fechas si existe
    if (dateFrom || dateTo) {
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

  return {
    // Estado
    reports,
    visibleCount,
    totalReports,
    dateFilter,
    dateFrom,
    dateTo,
    expandedDates,
    currentPage,
    filtered,
    paginated,
    totalPages,

    // Setters
    setDateFilter,
    setDateFrom,
    setDateTo,
    setCurrentPage,

    // Funciones
    loadReports,
    deleteExecution,
    toggleDateExpansion,
    filterReports,
    clearFilters,
  };
}