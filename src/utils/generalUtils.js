/**
 * Funciones de utilidad general para el sistema de reportes Cypress.
 */

/**
 * Retrasa la ejecución de una función para evitar ejecuciones excesivas.
 *
 * @param {Function} func - Función a retrasar
 * @param {number} wait - Tiempo de espera en milisegundos
 * @returns {Function} Función retrasada
 *
 * @example
 * ```js
 * const debouncedSearch = debounce(handleSearch, 300);
 * ```
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Crea un rango de números desde inicio hasta fin (inclusive).
 *
 * @param {number} start - Número inicial
 * @param {number} end - Número final
 * @returns {number[]} Array de números en el rango
 *
 * @example
 * ```js
 * range(1, 5) // Returns [1, 2, 3, 4, 5]
 * ```
 */
export function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Capitaliza la primera letra de una cadena.
 *
 * @param {string} str - Cadena a capitalizar
 * @returns {string} Cadena capitalizada
 *
 * @example
 * ```js
 * capitalize('hello world') // Returns 'Hello world'
 * ```
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Trunca una cadena a una longitud especificada con puntos suspensivos.
 *
 * @param {string} str - Cadena a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Cadena truncada
 *
 * @example
 * ```js
 * truncate('This is a long string', 10) // Returns 'This is a...'
 * ```
 */
export function truncate(str, maxLength) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Verifica si un valor está vacío (null, undefined, cadena vacía, array vacío).
 *
 * @param {*} value - Valor a verificar
 * @returns {boolean} Si el valor está vacío
 *
 * @example
 * ```js
 * isEmpty('') // Returns true
 * isEmpty([1, 2, 3]) // Returns false
 * ```
 */
export function isEmpty(value) {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Obtiene de forma segura una propiedad anidada de un objeto.
 *
 * @param {Object} obj - Objeto del que obtener la propiedad
 * @param {string} path - Ruta separada por puntos a la propiedad
 * @param {*} defaultValue - Valor por defecto si la propiedad no existe
 * @returns {*} Valor de la propiedad o valor por defecto
 *
 * @example
 * ```js
 * const obj = { user: { name: 'John' } };
 * get(obj, 'user.name', 'Unknown') // Returns 'John'
 * get(obj, 'user.age', 25) // Returns 25
 * ```
 */
export function get(obj, path, defaultValue = undefined) {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

/**
 * Agrupa un array de objetos por una función clave.
 *
 * @param {Array} array - Array a agrupar
 * @param {Function|string} keyFn - Función o clave para agrupar
 * @returns {Object} Objeto agrupado
 *
 * @example
 * ```js
 * const data = [{ type: 'A', value: 1 }, { type: 'B', value: 2 }, { type: 'A', value: 3 }];
 * groupBy(data, 'type') // Returns { A: [{...}, {...}], B: [{...}] }
 * ```
 */
export function groupBy(array, keyFn) {
  const keyFunc = typeof keyFn === 'function' ? keyFn : (item) => item[keyFn];

  return array.reduce((groups, item) => {
    const key = keyFunc(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}

/**
 * Calcula la suma de un array de números.
 *
 * @param {number[]} numbers - Array de números
 * @returns {number} Suma de los números
 *
 * @example
 * ```js
 * sum([1, 2, 3, 4]) // Returns 10
 * ```
 */
export function sum(numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

/**
 * Calcula el promedio de un array de números.
 *
 * @param {number[]} numbers - Array de números
 * @returns {number} Promedio de los números
 *
 * @example
 * ```js
 * average([1, 2, 3, 4]) // Returns 2.5
 * ```
 */
export function average(numbers) {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}