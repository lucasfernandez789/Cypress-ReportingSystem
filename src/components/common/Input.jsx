import React from 'react'
import PropTypes from 'prop-types'

/**
 * Componente Input reutilizable para campos de formulario consistentes.
 *
 * Proporciona inputs con estilos consistentes y labels opcionales.
 * Soporta diferentes tipos de input y validación.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.label] - Label opcional del input
 * @param {string} [props.type='text'] - Tipo del input HTML
 * @param {string} [props.placeholder] - Placeholder del input
 * @param {string} [props.value] - Valor del input
 * @param {Function} [props.onChange] - Función para manejar cambios
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {boolean} [props.required=false] - Si el campo es requerido
 * @param {boolean} [props.disabled=false] - Si el campo está deshabilitado
 * @returns {JSX.Element} Input con estilos consistentes
 *
 * @example
 * ```jsx
 * <Input
 *   label="Fecha específica"
 *   type="date"
 *   value={dateValue}
 *   onChange={(e) => setDateValue(e.target.value)}
 * />
 * ```
 */
function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false,
  disabled = false,
  ...props
}) {
  const inputClasses = 'w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed'

  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Input