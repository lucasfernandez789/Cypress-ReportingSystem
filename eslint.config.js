import js from '@eslint/js';
import tsparser from '@typescript-eslint/parser';
import tailwind from 'eslint-plugin-tailwindcss';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      tailwindcss: tailwind
    },
    rules: {
      'no-undef': 'off', // Deshabilitar errores de variables no definidas (globals del browser)
      'no-unused-vars': 'off', // Deshabilitar errores de variables no utilizadas
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'warn'
    },
    settings: {
      tailwindcss: {
        config: './tailwind.config.js'
      }
    }
  }
];