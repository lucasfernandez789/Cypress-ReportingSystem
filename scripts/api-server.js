#!/usr/bin/env node
/**
 * Servidor API simple para manejar operaciones de reportes
 * Uso: node scripts/api-server.js
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const generateReportsJson = require('./generate-reports-json');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para eliminar una ejecución específica
app.delete('/api/delete-report', (req, res) => {
  try {
    const { date, filePath } = req.body;

    if (!date || !filePath) {
      return res.status(400).json({
        error: 'Se requieren los parámetros "date" y "filePath"'
      });
    }

    console.log(`Eliminando ejecución: ${date} - ${filePath}`);

    const cypressReportsDir = path.join(__dirname, '..', 'cypress', 'reports');
    const publicReportsDir = path.join(__dirname, '..', 'public', 'reports');
    const docsReportsDir = path.join(__dirname, '..', 'docs', 'reports');

    // Función para eliminar archivo si existe
    const deleteFileIfExists = (baseDir, file) => {
      const fullPath = path.join(baseDir, file);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`✅ Eliminado: ${fullPath}`);
        return true;
      }
      return false;
    };

    // Eliminar de cypress/reports
    const deletedFromCypress = deleteFileIfExists(cypressReportsDir, filePath);

    // Eliminar de public/reports
    const deletedFromPublic = deleteFileIfExists(publicReportsDir, filePath);

    // Eliminar de docs/reports
    const deletedFromDocs = deleteFileIfExists(docsReportsDir, filePath);

    if (deletedFromCypress || deletedFromPublic || deletedFromDocs) {
      console.log('🔄 Regenerando archivo report.json...');

      // Regenerar el archivo JSON sin la ejecución eliminada
      const outputFile = path.join(docsReportsDir, 'report.json');
      generateReportsJson(cypressReportsDir, outputFile);

      // Copiar a public/reports
      const publicJsonPath = path.join(publicReportsDir, 'report.json');
      fs.copyFileSync(outputFile, publicJsonPath);

      console.log('✅ Archivo report.json actualizado');

      res.json({
        success: true,
        message: 'Ejecución eliminada correctamente',
        deleted: {
          cypress: deletedFromCypress,
          public: deletedFromPublic,
          docs: deletedFromDocs
        }
      });
    } else {
      res.status(404).json({
        error: 'Archivo no encontrado'
      });
    }

  } catch (error) {
    console.error('Error al eliminar ejecución:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
});

// Endpoint para recargar reportes (útil para verificar cambios)
app.get('/api/reports', (req, res) => {
  try {
    const reportsPath = path.join(__dirname, '..', 'public', 'reports', 'report.json');

    if (fs.existsSync(reportsPath)) {
      const reports = JSON.parse(fs.readFileSync(reportsPath, 'utf8'));
      res.json(reports);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error al cargar reportes:', error);
    res.status(500).json({ error: 'Error al cargar reportes' });
  }
});

// Endpoint de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server corriendo en http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗑️  Eliminar reporte: DELETE http://localhost:${PORT}/api/delete-report`);
  console.log(`📋 Obtener reportes: GET http://localhost:${PORT}/api/reports`);
});