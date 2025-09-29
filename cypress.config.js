require('dotenv').config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
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
      PASS: process.env.PASS
    }
  },
});
