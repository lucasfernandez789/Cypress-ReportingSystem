import React from 'react'
import PropTypes from 'prop-types'
import { useReports } from '../hooks/useReports'
import ReportsPage from '../components/reports/base/ReportsPage'
import { UI_MESSAGES } from '../constants/constants'

/**
 * Features Reports page component for displaying features test reports.
 *
 * This page shows Cypress test reports specifically for features functionality.
 * Uses the base ReportsPage component for consistent layout and functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onNavigate - Navigation function
 * @returns {JSX.Element} The features reports page layout
 */
function FeatureReports({ onNavigate }) {
  const reportsData = useReports('features')

  return (
    <ReportsPage
      title="Reportes de Testing Features"
      description="Funcionalidades específicas y avanzadas del sistema"
      category="Features"
      emptyMessage={UI_MESSAGES.NO_FEATURES_REPORTS}
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

FeatureReports.propTypes = {
  onNavigate: PropTypes.func.isRequired,
}

export default FeatureReports