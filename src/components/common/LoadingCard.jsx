import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de carga que muestra un spinner y un mensaje.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.message - Mensaje a mostrar durante la carga
 * @returns {JSX.Element} Componente de carga
 */
const LoadingCard = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mb-4"></div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};

LoadingCard.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoadingCard;