import React, { useCallback, useState } from "react";
import { parseFile } from "../utils/fileParser";
import ProgressModal from "./ProgressModal";
import { useAppContext } from "../context/AppContext";

const FileUploader = ({ mode = "duplicate" }) => {
  const {
    setProgressState,
    handleFileProcessed,
    handleListFileProcessed,
    setError
  } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const processFile = async (file) => {
    const validTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const validExtensions = [".csv", ".xlsx"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setError("Please upload a CSV or XLSX file");
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    // Initialize progress state
    setProgressState({
      isProcessing: true,
      currentOperation: "parsing",
      totalRows: 0,
      processedRows: 0,
      percentage: 0,
      startTime: Date.now(),
      estimatedTimeRemaining: null,
    });

    try {
      const result = await parseFile(file, (progress) => {
        setProgressState((prev) => ({
          ...prev,
          ...progress,
          estimatedTimeRemaining: progress.startTime
            ? Math.max(
                0,
                (((Date.now() - progress.startTime) / progress.processedRows) *
                  (progress.totalRows - progress.processedRows)) /
                  1000,
              )
            : progress.estimatedTimeRemaining,
        }));
      });

      // Clear progress state
      setProgressState({
        isProcessing: false,
        currentOperation: null,
        totalRows: 0,
        processedRows: 0,
        percentage: 0,
        startTime: null,
        estimatedTimeRemaining: null,
      });

      if (mode === "list") {
        handleListFileProcessed(result);
      } else {
        handleFileProcessed(result);
      }
    } catch (error) {
      setError(error.message);
      // Clear progress state on error
      setProgressState({
        isProcessing: false,
        currentOperation: null,
        totalRows: 0,
        processedRows: 0,
        percentage: 0,
        startTime: null,
        estimatedTimeRemaining: null,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="file-uploader-container">
      <div
        className={`file-uploader ${isDragging ? "dragging" : ""} ${isProcessing ? "processing" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-input"
          accept=".csv,.xlsx"
          onChange={handleFileSelect}
          className="file-input"
          disabled={isProcessing}
        />

        <label htmlFor="file-input" className="file-input-label">
          <div className="upload-icon">
            {isProcessing ? (
              <div className="spinner"></div>
            ) : (
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 13V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <div className="upload-text">
            {isProcessing ? (
              <>
                <p className="upload-title">Processing {fileName}...</p>
                <p className="upload-subtitle">Analyzing your data</p>
              </>
            ) : (
              <>
                <p className="upload-title">Drop your file here</p>
                <p className="upload-subtitle">or click to browse</p>
                <p className="upload-formats">CSV or XLSX files accepted</p>
              </>
            )}
          </div>
        </label>

        {isDragging && (
          <div className="drag-overlay">
            <p>Release to upload</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
