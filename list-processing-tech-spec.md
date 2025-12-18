# List Processing Feature Technical Specification

## Feature Overview

The list processing feature allows users to transform email lists into a standardized format with three columns: `email`, `name`, and `attributes`. The feature operates entirely client-side and supports CSV and XLSX file formats.

## Technical Requirements

### Input File Support
- **CSV files**: Comma-separated values with headers
- **XLSX files**: Excel format with headers in the first row
- **File size limit**: Up to 50MB (configurable)
- **Encoding**: UTF-8 support with automatic detection

### Output Format
```csv
email,name,attributes
user1@mail.com,"User One","{""age"": 42, ""planet"": ""Mars""}"
user2@mail.com,"User Two","{""age"": 24, ""job"": ""Time Traveller""}"
```

### Transformation Rules

1. **Email Column Standardization**
   - Detect email column using patterns: `email`, `e-mail`, `email_address`, `emailaddress`
   - Rename to `email` (case-insensitive)
   - Validate email format using regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

2. **Name Column Creation**
   - Detect `firstname` and `lastname` columns
   - Combine with space: `"firstname" + " " + "lastname"`
   - Handle missing columns:
     - If only `firstname`: use `firstname` only
     - If only `lastname`: use `lastname` only
     - If neither: leave empty string
   - Name column is always quoted in output

3. **Attributes Column Creation**
   - All remaining columns become attributes
   - Convert to JSON string with proper escaping
   - Handle empty values (exclude from JSON)
   - Handle special characters in values

## Component Specifications

### ListProcessor Component

**Purpose**: Main workflow container for list processing

**Props**: None (uses AppContext)

**State Management**:
- Uses AppContext for global state
- Manages local UI state (errors, modals)

**Key Functions**:
```javascript
const ListProcessor = () => {
  const { 
    listFileData, 
    listColumnMappings, 
    listProcessResults, 
    listCurrentStep,
    handleListFileProcessed,
    handleListColumnSelection,
    handleListProcess,
    handleListDownload,
    handleListReset
  } = useAppContext();
  
  // Step navigation logic
  // Error handling
  // Progress tracking coordination
};
```

### ListColumnSelector Component

**Purpose**: Interface for column mapping and selection

**Props**:
- `fileData`: Object with data and columns
- `initialMappings`: Pre-detected column mappings
- `onSelectionChange`: Callback for mapping updates
- `onConfirm`: Callback to start processing

**State**:
```javascript
const [mappings, setMappings] = useState({
  emailColumn: detectedEmailColumn,
  firstNameColumn: detectedFirstNameColumn,
  lastNameColumn: detectedLastNameColumn,
  attributeColumns: detectedAttributeColumns
});

const [previewData, setPreviewData] = useState([]);
const [showPreview, setShowPreview] = useState(false);
```

**Key Functions**:
```javascript
// Column detection
const detectColumns = (columns) => {
  // Auto-detect email, name, and attribute columns
};

// Preview generation
const generatePreview = () => {
  // Generate sample of transformed data
};

// Validation
const validateMappings = () => {
  // Ensure required columns are selected
};
```

### ListProgressModal Component

**Purpose**: Display processing progress for large files

**Props**:
- `isOpen`: Boolean to control visibility
- `progress`: Progress state object
- `onCancel`: Optional cancel callback

**Progress State Structure**:
```javascript
{
  isProcessing: boolean,
  currentOperation: 'parsing' | 'processing' | 'exporting',
  totalRows: number,
  processedRows: number,
  percentage: number,
  estimatedTimeRemaining: number | null,
  startTime: Date
}
```

### ListReport Component

**Purpose**: Display processing results and export options

**Props**:
- `results`: Processed data object
- `downloadFormat`: 'csv' | 'xlsx'
- `onDownload`: Callback for download
- `onFormatChange`: Callback for format change
- `onNewFile`: Callback to start new process

**Results Structure**:
```javascript
{
  originalCount: number,
  processedCount: number,
  emailValidCount: number,
  invalidEmailCount: number,
  processedData: Array,
  processingTime: number,
  sampleData: Array
}
```

## Utility Functions Specification

### listProcessor.js

#### Column Detection Functions

```javascript
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
```

#### Data Processing Functions

```javascript
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
  const firstName = firstNameColumn ? (row[firstNameColumn] || '').trim() : '';
  const lastName = lastNameColumn ? (row[lastNameColumn] || '').trim() : '';
  const name = [firstName, lastName].filter(Boolean).join(' ');
  
  // Create attributes JSON
  const attributes = createAttributesJSON(row, attributeColumns);
  
  return {
    email,
    name,
    attributes
  };
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
```

#### Validation Functions

```javascript
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
```

## Performance Optimizations

### Memory Management
- Process data in chunks for large files
- Clear temporary data after processing
- Use streaming for very large files (future enhancement)

### Processing Optimization
- Debounce column detection
- Cache compiled regex patterns
- Use efficient JSON stringification
- Implement Web Workers for background processing (future)

## Error Handling

### File Processing Errors
- Invalid file format
- Corrupted file data
- Missing headers
- Encoding issues

### Data Processing Errors
- Invalid email formats
- Malformed data rows
- JSON serialization errors
- Memory overflow for large files

### User Experience Errors
- Clear error messages
- Recovery suggestions
- Retry options
- Progress feedback

## Testing Requirements

### Unit Tests
- Column detection accuracy
- Data transformation correctness
- Email validation logic
- JSON serialization

### Integration Tests
- End-to-end workflow
- File upload/download
- State management
- Error scenarios

### Performance Tests
- Large file processing
- Memory usage
- Processing time benchmarks
- Concurrent operations

## Security Considerations

### Input Validation
- File type validation
- File size limits
- Data sanitization
- XSS prevention

### Data Privacy
- Client-side processing only
- No data persistence
- Memory cleanup
- Secure file handling