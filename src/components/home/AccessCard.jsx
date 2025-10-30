import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../common/Icon'
import Button from '../common/Button'

/**
 * Componente AccessCard para las tarjetas de navegación en la página home.
 *
 * Representa una tarjeta de acceso a diferentes secciones del sistema
 * con icono, título, descripción y botón de navegación.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.iconName - Nombre del icono SVG
 * @param {string} props.title - Título de la tarjeta
 * @param {string} props.description - Descripción de la funcionalidad
 * @param {string} props.buttonText - Texto del botón
 * @param {Function} props.onNavigate - Función de navegación
 * @param {string} props.navigateTo - Página a navegar
 * @param {string} [props.tooltip] - Tooltip para el botón de ayuda
 * @returns {JSX.Element} Tarjeta de acceso con icono y navegación
 *
 * @example
 * ```jsx
 * <AccessCard
 *   iconName="science_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24"
 *   title="Tests Core"
 *   description="Funcionalidades básicas y críticas del sistema"
 *   buttonText="Ver Reportes Core"
 *   onNavigate={handleNavigate}
 *   navigateTo="core"
 * />
 * ```
 */
function AccessCard({
  iconName,
  title,
  description,
  buttonText,
  onNavigate,
  navigateTo,
  tooltip
}) {
  return (
    <div className="flex w-full max-w-sm flex-col rounded bg-[#DDEAF1] p-2 transition-shadow duration-300 hover:shadow-lg">
      <div className="flex justify-end">
        <button
          className="transition duration-200"
          title={tooltip}
        >
          <Icon name="help" size="h-5 w-5" />
        </button>
      </div>
      <div className="mb-6 flex justify-center">
        <Icon name={iconName} alt={`${title} icon`} size="h-16 w-16" className="icon-gray-dark" />
      </div>
      <div className="mb-2 py-2 text-center text-xl font-bold text-gray-800">
        {title}
      </div>
      <p className="mb-4 text-center text-gray-600">
        {description}
      </p>
      <Button
        variant="primary"
        className="w-full"
        onClick={() => onNavigate(navigateTo)}
      >
        {buttonText}
      </Button>
    </div>
  )
}

AccessCard.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  navigateTo: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
}

export default AccessCard