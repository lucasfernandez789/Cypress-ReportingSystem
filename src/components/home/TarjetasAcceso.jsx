import React from 'react'
import PropTypes from 'prop-types'
import AccessCard from './AccessCard'

/**
 * Componente TarjetasAcceso para mostrar las tarjetas de navegación en home.
 *
 * Muestra tarjetas de acceso a las diferentes secciones de reportes
 * usando el componente AccessCard reutilizable.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onNavigate - Función de navegación
 * @returns {JSX.Element} Contenedor con tarjetas de acceso
 *
 * @example
 * ```jsx
 * <TarjetasAcceso onNavigate={handleNavigate} />
 * ```
 */
function TarjetasAcceso({ onNavigate }) {
  return (
    <div className="flex justify-center gap-8">
      <AccessCard
        iconName="science_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24"
        title="Tests Core"
        description="Funcionalidades básicas y críticas del sistema"
        buttonText="Ver Reportes Core"
        onNavigate={onNavigate}
        navigateTo="core"
        tooltip="Reportes de testing para funcionalidades básicas y críticas del sistema"
      />

      <AccessCard
        iconName="extension_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24"
        title="Tests Features"
        description="Funcionalidades específicas y avanzadas del sistema"
        buttonText="Ver Reportes Features"
        onNavigate={onNavigate}
        navigateTo="features"
        tooltip="Reportes de testing para funcionalidades específicas y avanzadas del sistema"
      />
    </div>
  )
}

TarjetasAcceso.propTypes = {
  onNavigate: PropTypes.func.isRequired,
}

export default TarjetasAcceso