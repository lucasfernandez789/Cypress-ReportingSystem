import 'dotenv/config';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Base URL desde variable de entorno
    baseUrl: process.env.CYPRESS_BASE_URL,
    // Configuración de reportes
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json'
    },
    // Directorio donde se guardarán los reportes
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    // Variables de entorno desde .env
    env: {
      USER: process.env.USER,
      PASS: process.env.PASS,
      APP_NAME: process.env.APP_NAME
    }
  },
});
