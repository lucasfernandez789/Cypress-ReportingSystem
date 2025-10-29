import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

/**
 * Loading card component for displaying loading states in card layouts.
 *
 * Provides a card-style loading indicator that matches the application's design system.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.message='Cargando datos...'] - Loading message to display
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Loading card component
 *
 * @example
 * ```jsx
 * <LoadingCard message="Cargando estadísticas..." />
 * ```
 */
function LoadingCard({ message = 'Cargando datos...', className = '' }) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow-md ${className}`}>
      <LoadingSpinner message={message} />
    </div>
  );
}

LoadingCard.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default LoadingCard;