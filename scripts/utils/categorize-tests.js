/**
 * Utilidad para determinar la categoría de los tests
 */

function getTestCategory(specFile) {
  if (!specFile) return 'mixed';
  
  const normalizedPath = specFile.replace(/\\/g, '/').toLowerCase();
  
  if (normalizedPath.includes('/e2e/core/')) {
    return 'core';
  } else if (normalizedPath.includes('/e2e/features/')) {
    return 'features';
  }
  
  return 'mixed';
}

function getCategoryFromResults(results) {
  if (!results || !Array.isArray(results)) return 'mixed';

  const categories = new Set();
  
  function processTest(test) {
    if (test.file) {
      categories.add(getTestCategory(test.file));
    } else if (test.fullFile) {
      categories.add(getTestCategory(test.fullFile));
    }
  }

  function processSuite(suite) {
    if (suite.file) {
      categories.add(getTestCategory(suite.file));
    }
    
    if (suite.tests) {
      suite.tests.forEach(processTest);
    }
    
    if (suite.suites) {
      suite.suites.forEach(processSuite);
    }
  }

  results.forEach(result => {
    if (result.suites) {
      result.suites.forEach(processSuite);
    } else {
      processTest(result);
    }
  });

  categories.delete('mixed');
  
  if (categories.size === 0) return 'mixed';
  if (categories.size === 1) return Array.from(categories)[0];
  return 'mixed';
}

export { getTestCategory, getCategoryFromResults };