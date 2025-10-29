import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente Error Boundary para capturar y mostrar errores de React.
 *
 * Proporciona una interfaz de respaldo cuando ocurre un error de JavaScript
 * en el árbol de componentes, previniendo que toda la aplicación se bloquee.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos para envolver
 * @param {React.Component} [props.fallback] - Componente de respaldo personalizado para renderizar en caso de error
 * @returns {React.Component} Envoltorio de límite de error
 *
 * @example
 * ```jsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualizar estado para que el siguiente renderizado muestre la interfaz de respaldo
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Registrar el error para depuración
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Renderizar interfaz de respaldo personalizada si se proporciona
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Interfaz de error por defecto
      return (
        <div
          className="flex min-h-screen items-center justify-center bg-gray-50"
          role="alert"
          aria-live="assertive"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  role="img"
                  aria-label="Error icon"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Algo salió mal
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ha ocurrido un error inesperado. Por favor, recarga la página.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-describedby="error-reload-description"
              >
                Recargar página
              </button>
              <div id="error-reload-description" className="sr-only">
                Recarga la página para intentar resolver el error
              </div>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                  Detalles del error (desarrollo)
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-red-50 p-2 text-xs text-red-600">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.element,
};

export default ErrorBoundary;