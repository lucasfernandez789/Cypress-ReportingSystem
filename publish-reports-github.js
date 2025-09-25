#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function createGitHubReportStructure() {
  const reportsDir = path.join(__dirname, 'cypress', 'reports');
  const githubReportsDir = path.join(__dirname, 'docs', 'reports');

  // Crear directorio docs/reports si no existe
  if (!fs.existsSync(githubReportsDir)) {
    fs.mkdirSync(githubReportsDir, { recursive: true });
  }

  // Copiar index.html a docs/reports/
  const indexPath = path.join(reportsDir, 'index.html');
  const githubIndexPath = path.join(githubReportsDir, 'index.html');

  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, githubIndexPath);
    console.log('✅ Índice copiado a docs/reports/index.html');
  }

  // Copiar directorios de reportes por fecha
  const items = fs.readdirSync(reportsDir);
  for (const item of items) {
    const fullPath = path.join(reportsDir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(item)) {
      const destDir = path.join(githubReportsDir, item);
      copyDirectoryRecursive(fullPath, destDir);
      console.log(`✅ Reportes de ${item} copiados a docs/reports/${item}/`);
    }
  }

  console.log('\n📋 Instrucciones:');
  console.log('1. Hacer commit: git add docs/reports/ && git commit -m "Add test reports"');
  console.log('2. Hacer push: git push origin main');
  console.log('3. Ver reportes en: https://tu-usuario.github.io/tu-repo/reports/');
}

function copyDirectoryRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

createGitHubReportStructure();