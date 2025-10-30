import React from 'react'
import PropTypes from 'prop-types'

/**
 * Componente Button reutilizable para botones consistentes.
 *
 * Proporciona diferentes variantes de botones con estilos consistentes.
 * Soporta diferentes tamaños, colores y estados.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {string} [props.variant='primary'] - Variante del botón ('primary', 'secondary', 'danger', 'ghost')
 * @param {string} [props.size='md'] - Tamaño del botón ('sm', 'md', 'lg')
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {Function} [props.onClick] - Función a ejecutar al hacer click
 * @param {string} [props.type='button'] - Tipo del botón HTML
 * @returns {JSX.Element} Botón con estilos consistentes
 *
 * @example
 * ```jsx
 * <Button variant="primary" onClick={handleClick}>
 *   Guardar
 * </Button>
 * ```
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
}

export default Button