import React from 'react'
import PropTypes from 'prop-types'
import { useReports } from '../hooks/useReports'
import ReportsPage from '../components/reports/base/ReportsPage'
import { REPORT_CATEGORIES, UI_MESSAGES } from '../constants/constants'

/**
 * Core Reports page component for displaying core functionality test reports.
 *
 * This page shows Cypress test reports specifically for core system functionality,
 * which includes critical business logic and essential features. The page provides:
 * - Statistics overview of core test executions
 * - Date-based filtering capabilities
 * - Paginated list of test reports organized by date
 * - Individual execution management (view/delete)
 *
 * Uses the base ReportsPage component for consistent layout and functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Navigation function to return to home or other pages
 * @returns {JSX.Element} The core reports page layout
 *
 * @example
 * ```jsx
 * <CoreReports onNavigate={(page) => setCurrentPage(page)} />
 * ```
 */
function CoreReports({ onNavigate }) {
  const reportsData = useReports(REPORT_CATEGORIES.CORE)

  return (
    <ReportsPage
      title="Reportes de Testing Core"
      description="Funcionalidades básicas y críticas del sistema"
      category="Core"
      emptyMessage={UI_MESSAGES.NO_CORE_REPORTS}
      onNavigate={onNavigate}
      reportsData={reportsData}
      loading={reportsData.loading}
      error={reportsData.error}
    />
  )
}

CoreReports.propTypes = {
  onNavigate: PropTypes.func.isRequired,
}

export default CoreReports;