/**
 * List processing utility functions for transforming email lists
 */

/**
 * Detect email column from available columns
 * @param {string[]} columns - Array of column names
 * @returns {string|null} - Detected email column name or null
 */
export function detectEmailColumn(columns) {
  const emailPatterns = [
    /^email$/i,
    /^e[-_]?mail$/i,
    /^email[-_]?address$/i,
    /^emailaddress$/i
  ];
  
  for (const pattern of emailPatterns) {
    const match = columns.find(col => pattern.test(col));
    if (match) return match;
  }
  return null;
}

/**
 * Detect name columns from available columns
 * @param {string[]} columns - Array of column names
 * @returns {Object} - Object with firstName and lastName columns
 */
export function detectNameColumns(columns) {
  const firstNamePatterns = [
    /^first[-_]?name$/i,
    /^fname$/i,
    /^given[-_]?name$/i
  ];
  
  const lastNamePatterns = [
    /^last[-_]?name$/i,
    /^lname$/i,
    /^surname$/i,
    /^family[-_]?name$/i
  ];
  
  const firstName = columns.find(col => 
    firstNamePatterns.some(pattern => pattern.test(col))
  );
  
  const lastName = columns.find(col => 
    lastNamePatterns.some(pattern => pattern.test(col))
  );
  
  return { firstName, lastName };
}

/**
 * Process list data according to column mappings
 * @param {Array} data - Raw data array
 * @param {Object} mappings - Column mapping configuration
 * @param {Function} onProgress - Progress callback
 * @returns {Object} - Processing results
 */
export function processListData(data, mappings, onProgress = null) {
  const startTime = Date.now();
  const results = [];
  let validEmails = 0;
  let invalidEmails = 0;
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    
    // Process each row
    const processedRow = processRow(row, mappings);
    
    // Validate email
    if (isValidEmail(processedRow.email)) {
      validEmails++;
    } else {
      invalidEmails++;
    }
    
    results.push(processedRow);
    
    // Progress callback
    if (onProgress && i % 1000 === 0) {
      const percentage = (i / data.length) * 100;
      onProgress({
        processedRows: i,
        totalRows: data.length,
        percentage,
        estimatedTimeRemaining: calculateETA(startTime, i, data.length)
      });
    }
  }
  
  return {
    originalCount: data.length,
    processedCount: results.length,
    emailValidCount: validEmails,
    invalidEmailCount: invalidEmails,
    processedData: results,
    processingTime: Date.now() - startTime
  };
}

/**
 * Process a single row according to mappings
 * @param {Object} row - Raw row data
 * @param {Object} mappings - Column mappings
 * @returns {Object} - Processed row
 */
export function processRow(row, mappings) {
  const { emailColumn, firstNameColumn, lastNameColumn, attributeColumns } = mappings;
  
  // Extract and standardize email
  const email = row[emailColumn] ? row[emailColumn].trim().toLowerCase() : '';
  
  // Create name
  const name = createNameColumn(row, firstNameColumn, lastNameColumn);
  
  // Create attributes JSON
  const attributes = createAttributesJSON(row, attributeColumns);
  
  return {
    email,
    name,
    attributes
  };
}

/**
 * Create name column from firstname/lastname
 * @param {Object} row - Raw row data
 * @param {string} firstNameCol - First name column name
 * @param {string} lastNameCol - Last name column name
 * @returns {string} - Combined name
 */
export function createNameColumn(row, firstNameCol, lastNameCol) {
  const firstName = firstNameCol ? (row[firstNameCol] || '').trim() : '';
  const lastName = lastNameCol ? (row[lastNameCol] || '').trim() : '';

  if (firstName && !lastName) {
    return firstName;
  } else if (!firstName && lastName) {
    return lastName;
  } else if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return '';
  }
}

/**
 * Create attributes JSON from row data
 * @param {Object} row - Raw row data
 * @param {string[]} attributeColumns - Columns to include in attributes
 * @returns {string} - JSON string of attributes
 */
export function createAttributesJSON(row, attributeColumns) {
  const attributes = {};
  
  for (const column of attributeColumns) {
    const value = row[column];
    if (value !== null && value !== undefined && value !== '') {
      // Handle different data types
      if (isNumeric(value)) {
        attributes[column] = Number(value);
      } else if (isBoolean(value)) {
        attributes[column] = Boolean(value);
      } else {
        attributes[column] = String(value);
      }
    }
  }
  
  return JSON.stringify(attributes);
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if value is numeric
 * @param {any} value - Value to check
 * @returns {boolean} - True if numeric
 */
export function isNumeric(value) {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * Check if value is boolean
 * @param {any} value - Value to check
 * @returns {boolean} - True if boolean
 */
export function isBoolean(value) {
  return typeof value === 'boolean' || 
         ['true', 'false', 'yes', 'no', '1', '0'].includes(String(value).toLowerCase());
}

/**
 * Calculate estimated time remaining
 * @param {number} startTime - Start timestamp
 * @param {number} processed - Number of processed items
 * @param {number} total - Total number of items
 * @returns {number} - Estimated time remaining in seconds
 */
function calculateETA(startTime, processed, total) {
  if (processed === 0) return null;
  
  const elapsed = Date.now() - startTime;
  const rate = processed / elapsed;
  const remaining = total - processed;
  
  return remaining / rate;
}

/**
 * Generate a preview of processed data
 * @param {Array} data - Raw data array
 * @param {Object} mappings - Column mappings
 * @param {number} sampleSize - Number of rows to include in preview
 * @returns {Array} - Preview data
 */
export function generatePreview(data, mappings, sampleSize = 5) {
  const preview = [];
  const sampleData = data.slice(0, Math.min(sampleSize, data.length));
  
  for (const row of sampleData) {
    preview.push(processRow(row, mappings));
  }
  
  return preview;
}

/**
 * Validate column mappings
 * @param {Object} mappings - Column mappings to validate
 * @param {string[]} availableColumns - Available columns in the data
 * @returns {Object} - Validation result with errors
 */
export function validateMappings(mappings, availableColumns) {
  const errors = [];
  
  // Check if email column is selected and valid
  if (!mappings.emailColumn) {
    errors.push('Email column is required');
  } else if (!availableColumns.includes(mappings.emailColumn)) {
    errors.push('Selected email column does not exist in the data');
  }
  
  // Check if attribute columns exist
  for (const col of mappings.attributeColumns) {
    if (!availableColumns.includes(col)) {
      errors.push(`Attribute column "${col}" does not exist in the data`);
    }
  }
  
  // Check if name columns exist (if selected)
  if (mappings.firstNameColumn && !availableColumns.includes(mappings.firstNameColumn)) {
    errors.push('Selected first name column does not exist in the data');
  }
  
  if (mappings.lastNameColumn && !availableColumns.includes(mappings.lastNameColumn)) {
    errors.push('Selected last name column does not exist in the data');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}