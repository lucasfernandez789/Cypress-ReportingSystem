import React from 'react'
import PropTypes from 'prop-types'

/**
 * Componente Icon reutilizable para manejar rutas de iconos consistentemente.
 *
 * Centraliza la lógica de rutas de iconos para evitar inconsistencias
 * entre desarrollo y producción. Todos los iconos usan rutas absolutas.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.name - Nombre del archivo del icono (sin extensión)
 * @param {string} [props.alt=''] - Texto alternativo para accesibilidad
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {string} [props.size='h-5 w-5'] - Clases de tamaño del icono
 * @returns {JSX.Element} Elemento img con la ruta correcta del icono
 *
 * @example
 * ```jsx
 * <Icon name="arrow_left_alt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24" alt="back" />
 * ```
 */
function Icon({ name, alt = '', className = '', size = 'h-5 w-5' }) {
  const src = `${import.meta.env.BASE_URL}assets/images/${name}.svg`

  return (
    <img
      src={src}
      alt={alt}
      className={`${size} ${className}`}
      onError={(e) => {
        console.error(`Icon not found: ${src}`)
        e.target.style.display = 'none'
      }}
    />
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
}

export default Icon