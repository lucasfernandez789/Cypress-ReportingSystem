import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente SystemSelector para seleccionar el sistema/fork de reportes.
 *
 * Proporciona un dropdown para filtrar reportes por sistema, permitiendo
 * distinguir entre diferentes forks o aplicaciones en despliegues múltiples.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.selectedSystem - Sistema seleccionado actualmente
 * @param {Function} props.onSystemChange - Función para cambiar el sistema seleccionado
 * @param {Array} props.availableSystems - Lista de sistemas disponibles
 * @returns {JSX.Element} Dropdown selector de sistema
 *
 * @example
 * ```jsx
 * <SystemSelector
 *   selectedSystem="all"
 *   onSystemChange={handleSystemChange}
 *   availableSystems={[
 *     { id: 'all', name: 'Todos los sistemas' },
 *     { id: 'app1', name: 'Aplicación 1' },
 *     { id: 'app2', name: 'Aplicación 2' }
 *   ]}
 * />
 * ```
 */
function SystemSelector({ selectedSystem, onSystemChange, availableSystems }) {
  const selectedSystemName = availableSystems.find(system => system.id === selectedSystem)?.name || 'Todos los sistemas';
  
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="system-selector" className="text-sm font-medium text-gray-700">
        Sistema:
      </label>
      <div className="flex items-center gap-2">
        <select
          id="system-selector"
          value={selectedSystem}
          onChange={(e) => onSystemChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {availableSystems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
        </select>
        {selectedSystem !== 'all' && (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            Filtrando: {selectedSystemName}
          </span>
        )}
      </div>
    </div>
  );
}

SystemSelector.propTypes = {
  selectedSystem: PropTypes.string.isRequired,
  onSystemChange: PropTypes.func.isRequired,
  availableSystems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SystemSelector;