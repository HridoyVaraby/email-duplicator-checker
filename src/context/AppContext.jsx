import React, { createContext, useContext, useState, useCallback } from "react";
import { findAndRemoveDuplicates } from "../utils/duplicateChecker";
import { exportToCSV, exportToXLSX } from "../utils/fileParser";
import {
  processListData,
  detectEmailColumn,
  detectNameColumns,
  validateMappings,
  generatePreview
} from "../utils/listProcessor";
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

  // List processing state
  const [listFileData, setListFileData] = useState(null);
  const [listColumnMappings, setListColumnMappings] = useState({
    emailColumn: null,
    firstNameColumn: null,
    lastNameColumn: null,
    attributeColumns: []
  });
  const [listProcessResults, setListProcessResults] = useState(null);
  const [listCurrentStep, setListCurrentStep] = useState("upload"); // 'upload', 'select', 'report'
  const [listDownloadFormat, setListDownloadFormat] = useState("csv");

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

  // List processing handlers
  const handleListFileProcessed = useCallback((data) => {
    setListFileData(data);
    setError(null);

    // Auto-detect columns
    const emailColumn = detectEmailColumn(data.columns);
    const { firstName, lastName } = detectNameColumns(data.columns);
    
    // Determine attribute columns (all columns except email, firstname, lastname)
    const attributeColumns = data.columns.filter(col =>
      col !== emailColumn && col !== firstName && col !== lastName
    );

    setListColumnMappings({
      emailColumn,
      firstNameColumn: firstName,
      lastNameColumn: lastName,
      attributeColumns
    });

    setListCurrentStep("select");
  }, []);

  const handleListColumnSelection = useCallback((mappings) => {
    setListColumnMappings(mappings);
    setError(null);
  }, []);

  const handleListProcess = useCallback(async (mappings) => {
    if (!listFileData || !mappings.emailColumn) {
      setError("Please select an email column to process");
      return;
    }

    // Validate mappings
    const validation = validateMappings(mappings, listFileData.columns);
    if (!validation.isValid) {
      setError(validation.errors.join(", "));
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const results = processListData(
        listFileData.data,
        mappings,
        (progress) => {
          setProgressState({
            isProcessing: true,
            currentOperation: "processing",
            totalRows: progress.totalRows,
            processedRows: progress.processedRows,
            percentage: progress.percentage,
            startTime: Date.now(),
            estimatedTimeRemaining: progress.estimatedTimeRemaining,
          });
        }
      );
      setListProcessResults(results);
      setListCurrentStep("report");
    } catch (err) {
      setError(
        err.message || "An error occurred while processing the list",
      );
    } finally {
      setIsProcessing(false);
      setProgressState({
        isProcessing: false,
        currentOperation: null,
        totalRows: 0,
        processedRows: 0,
        percentage: 0,
        startTime: null,
        estimatedTimeRemaining: null,
      });
    }
  }, [listFileData]);

  const handleListDownload = useCallback(() => {
    if (!listProcessResults || !listProcessResults.processedData) {
      setError("No data available for download");
      return;
    }

    try {
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `processed-email-list-${timestamp}`;

      let exportData;
      if (listDownloadFormat === "csv") {
        exportData = exportToCSV(listProcessResults.processedData, filename);
      } else {
        exportData = exportToXLSX(listProcessResults.processedData, filename);
      }

      saveAs(exportData.blob, exportData.filename);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to download file");
    }
  }, [listProcessResults, listDownloadFormat]);

  const handleListReset = useCallback(() => {
    setListFileData(null);
    setListColumnMappings({
      emailColumn: null,
      firstNameColumn: null,
      lastNameColumn: null,
      attributeColumns: []
    });
    setListProcessResults(null);
    setListDownloadFormat("csv");
    setIsProcessing(false);
    setError(null);
    setListCurrentStep("upload");
  }, []);

  const value = {
    // Duplicate Checker State
    fileData,
    selectedColumn,
    duplicateResults,
    downloadFormat,
    currentStep,
    
    // List Processing State
    listFileData,
    listColumnMappings,
    listProcessResults,
    listDownloadFormat,
    listCurrentStep,
    
    // Shared State
    isProcessing,
    error,
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
    
    // List Processing Actions
    setListFileData,
    setListColumnMappings,
    setListProcessResults,
    setListDownloadFormat,
    setListCurrentStep,

    // Duplicate Checker Handlers
    handleFileProcessed,
    handleColumnSelection,
    handleDuplicateCheck,
    handleDownload,
    handleReset,
    
    // List Processing Handlers
    handleListFileProcessed,
    handleListColumnSelection,
    handleListProcess,
    handleListDownload,
    handleListReset,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
