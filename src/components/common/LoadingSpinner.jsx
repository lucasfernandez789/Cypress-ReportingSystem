import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de spinner de carga para mostrar estados de carga.
 *
 * Proporciona un indicador de carga consistente con tamaño y mensaje personalizables.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.size='medium'] - Tamaño del spinner ('small', 'medium', 'large')
 * @param {string} [props.message='Cargando...'] - Mensaje de carga a mostrar
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @returns {JSX.Element} Componente spinner de carga
 *
 * @example
 * ```jsx
 * <LoadingSpinner size="large" message="Cargando reportes..." />
 * ```
 */
function LoadingSpinner({ size = 'medium', message = 'Cargando...', className = '' }) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${spinnerSize}`}
        aria-hidden="true"
      />
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  message: PropTypes.string,
  className: PropTypes.string,
};

export default LoadingSpinner;