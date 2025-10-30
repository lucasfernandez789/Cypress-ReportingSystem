import React from 'react'
import PropTypes from 'prop-types'

/**
 * Componente Card reutilizable para contenedores con sombra.
 *
 * Proporciona un contenedor consistente con fondo blanco, sombra y padding.
 * Puede incluir un título opcional y personalizar el padding.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del card
 * @param {string} [props.title] - Título opcional del card
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {string} [props.padding='p-6'] - Clase de padding (por defecto 'p-6')
 * @returns {JSX.Element} Card con sombra y contenido
 *
 * @example
 * ```jsx
 * <Card title="Estadísticas">
 *   <p>Contenido del card</p>
 * </Card>
 * ```
 */
function Card({ children, title, className = '', padding = 'p-6' }) {
  return (
    <div className={`rounded-lg bg-white shadow-md ${padding} ${className}`}>
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
      )}
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  padding: PropTypes.string,
}

export default Card