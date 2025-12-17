import React, { createContext, useContext, useState, useCallback } from "react";
import { findAndRemoveDuplicates } from "../utils/duplicateChecker";
import { exportToCSV, exportToXLSX } from "../utils/fileParser";
import { saveAs } from "file-saver";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [fileData, setFileData] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState("email");
  const [duplicateResults, setDuplicateResults] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState("csv");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState("upload"); // 'upload', 'select', 'report'

  // Progress tracking state
  const [progressState, setProgressState] = useState({
    isProcessing: false,
    currentOperation: null, // 'parsing', 'validating', 'deduplication'
    totalRows: 0,
    processedRows: 0,
    percentage: 0,
    startTime: null,
    estimatedTimeRemaining: null,
  });

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleFileProcessed = useCallback((data) => {
    setFileData(data);
    setError(null);

    // Auto-select first column that contains 'email' or first column
    const emailColumn = data.columns.find((col) =>
      col.toLowerCase().includes("email"),
    );
    if (emailColumn) {
      setSelectedColumn(emailColumn);
    } else if (data.columns.length > 0) {
      setSelectedColumn(data.columns[0]);
    }

    setCurrentStep("select");
  }, []);

  const handleColumnSelection = useCallback((columnName) => {
    setSelectedColumn(columnName);
    setError(null);
  }, []);

  const handleDuplicateCheck = useCallback(async () => {
    if (!fileData || !selectedColumn) {
      setError("Please select a column to analyze");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const results = findAndRemoveDuplicates(fileData.data, selectedColumn);
      setDuplicateResults(results);
      setCurrentStep("report");
    } catch (err) {
      setError(
        err.message || "An error occurred while checking for duplicates",
      );
    } finally {
      setIsProcessing(false);
    }
  }, [fileData, selectedColumn]);

  const handleDownload = useCallback(() => {
    if (!duplicateResults || !duplicateResults.cleanedData) {
      setError("No data available for download");
      return;
    }

    try {
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `cleaned-email-list-${timestamp}`;

      let exportData;
      if (downloadFormat === "csv") {
        exportData = exportToCSV(duplicateResults.cleanedData, filename);
      } else {
        exportData = exportToXLSX(duplicateResults.cleanedData, filename);
      }

      saveAs(exportData.blob, exportData.filename);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to download file");
    }
  }, [duplicateResults, downloadFormat]);

  const handleReset = useCallback(() => {
    setFileData(null);
    setSelectedColumn("email");
    setDuplicateResults(null);
    setDownloadFormat("csv");
    setIsProcessing(false);
    setError(null);
    setCurrentStep("upload");
  }, []);

  const value = {
    // State
    fileData,
    selectedColumn,
    duplicateResults,
    downloadFormat,
    isProcessing,
    error,
    currentStep,
    progressState,

    // Actions
    setFileData,
    setSelectedColumn,
    setDuplicateResults,
    setDownloadFormat,
    setIsProcessing,
    setError,
    clearError,
    setCurrentStep,
    setProgressState,

    // Handlers
    handleFileProcessed,
    handleColumnSelection,
    handleDuplicateCheck,
    handleDownload,
    handleReset,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
