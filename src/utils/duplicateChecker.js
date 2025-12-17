export const findAndRemoveDuplicates = (data, columnName) => {
  if (!columnName || !Array.isArray(data)) {
    return {
      cleanedData: [],
      duplicates: [],
      report: {
        totalRows: 0,
        duplicateCount: 0,
        cleanedRows: 0,
        columnAnalyzed: columnName || '',
        duplicatePercentage: 0
      }
    };
  }

  const seen = new Set();
  const duplicates = [];
  const cleanedData = [];

  data.forEach((row, index) => {
    const value = row[columnName];
    if (!value) {
      // Handle empty values - keep the first occurrence
      if (!seen.has('')) {
        seen.add('');
        cleanedData.push(row);
      } else {
        duplicates.push({ ...row, originalIndex: index });
      }
      return;
    }

    const normalizedValue = String(value).toLowerCase().trim();

    if (seen.has(normalizedValue)) {
      duplicates.push({ ...row, originalIndex: index });
    } else {
      seen.add(normalizedValue);
      cleanedData.push(row);
    }
  });

  const totalRows = data.length;
  const duplicateCount = duplicates.length;
  const cleanedRows = cleanedData.length;
  const duplicatePercentage = totalRows > 0 ? ((duplicateCount / totalRows) * 100).toFixed(1) : 0;

  return {
    cleanedData,
    duplicates,
    report: {
      totalRows,
      duplicateCount,
      cleanedRows,
      columnAnalyzed: columnName,
      duplicatePercentage: parseFloat(duplicatePercentage)
    }
  };
};

export const getColumnStats = (data, columnName) => {
  if (!Array.isArray(data) || data.length === 0 || !columnName) {
    return { uniqueCount: 0, emptyCount: 0, total: 0 };
  }

  const values = data.map(row => row[columnName]);
  const total = values.length;
  const nonEmptyValues = values.filter(val => val && String(val).trim() !== '');
  const uniqueValues = new Set(nonEmptyValues.map(val => String(val).toLowerCase().trim()));

  return {
    uniqueCount: uniqueValues.size,
    emptyCount: total - nonEmptyValues.length,
    total
  };
};
