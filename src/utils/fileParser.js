import * as XLSX from "xlsx";
import Papa from "papaparse";

export const parseFile = (file, onProgress = null) => {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      let processedRows = 0;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        step: (results, parser) => {
          processedRows++;

          if (onProgress) {
            const fileMB = file.size / (1024 * 1024);
            const estimatedRows = fileMB * 10000; // Rough estimate
            const percentage = Math.min(
              (processedRows / estimatedRows) * 100,
              95,
            );

            onProgress({
              currentOperation: "parsing",
              processedRows,
              totalRows: estimatedRows,
              percentage,
              estimatedTimeRemaining:
                estimatedRows > processedRows
                  ? (estimatedRows - processedRows) * 0.001 // Rough estimate
                  : null,
            });
          }
        },
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(
              new Error("CSV parsing error: " + results.errors[0].message),
            );
          } else {
            // Final progress update
            if (onProgress) {
              onProgress({
                currentOperation: "parsing",
                processedRows: results.data.length,
                totalRows: results.data.length,
                percentage: 100,
                estimatedTimeRemaining: 0,
              });
            }

            resolve({
              data: results.data,
              columns: results.meta.fields || [],
            });
          }
        },
        error: (error) => reject(error),
      });
    } else if (fileExtension === "xlsx") {
      const reader = new FileReader();

      if (onProgress) {
        onProgress({
          currentOperation: "parsing",
          processedRows: 0,
          totalRows: null,
          percentage: 10,
          estimatedTimeRemaining: null,
        });
      }

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);

          if (onProgress) {
            onProgress({
              currentOperation: "parsing",
              processedRows: 0,
              totalRows: null,
              percentage: 50,
              estimatedTimeRemaining: null,
            });
          }

          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const columns = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

          if (onProgress) {
            onProgress({
              currentOperation: "parsing",
              processedRows: jsonData.length,
              totalRows: jsonData.length,
              percentage: 100,
              estimatedTimeRemaining: 0,
            });
          }

          resolve({
            data: jsonData,
            columns: columns,
          });
        } catch (error) {
          reject(new Error("Excel parsing error: " + error.message));
        }
      };
      reader.onerror = () => reject(new Error("File reading error"));
      reader.readAsArrayBuffer(file);
    } else {
      reject(
        new Error("Unsupported file format. Please upload CSV or XLSX files."),
      );
    }
  });
};

export const exportToCSV = (data, filename) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  return { blob, filename: `${filename}.csv` };
};

export const exportToXLSX = (data, filename) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return { blob, filename: `${filename}.xlsx` };
};
