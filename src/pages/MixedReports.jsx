import React from 'react'
import PropTypes from 'prop-types'
import { useReports } from '../hooks/useReports'
import ReportsPage from '../components/reports/base/ReportsPage'
import { UI_MESSAGES } from '../constants/constants'

/**
 * Mixed Reports page component for displaying mixed test reports.
 *
 * This page shows Cypress test reports for combined core and features functionality.
 * Uses the base ReportsPage component for consistent layout and functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Navigation function
 * @returns {JSX.Element} The mixed reports page layout
 */
function MixedReports({ onNavigate }) {
  const reportsData = useReports('mixed')

  return (
    <ReportsPage
      title="Reportes Mixtos"
      description="Funcionalidades combinadas de core y features"
      category="Mixed"
      emptyMessage={UI_MESSAGES.NO_MIXED_REPORTS}
      onNavigate={onNavigate}
      reportsData={reportsData}
      loading={reportsData.loading}
      error={reportsData.error}
      selectedSystem={reportsData.selectedSystem}
      onSystemChange={reportsData.onSystemChange}
      availableSystems={reportsData.availableSystems}
    />
  )
}

MixedReports.propTypes = {
  onNavigate: PropTypes.func.isRequired,
}

export default MixedReports