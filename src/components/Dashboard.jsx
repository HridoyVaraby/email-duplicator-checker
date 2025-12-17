import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Header from "./common/Header";
import FileUploader from "./FileUploader";
import ColumnSelector from "./ColumnSelector";
import Report from "./Report";
import Icon from "./common/Icon";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    fileData,
    duplicateResults,
    downloadFormat,
    setDownloadFormat,
    currentStep,
    error,
    setError,
    clearError,
    handleReset,
    handleDownload,
  } = useAppContext();

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleNewFile = () => {
    handleReset();
  };

  return (
    <div className="dashboard">
      <Header />

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          <div className="error-content">
            <Icon name="AlertTriangle" size={20} className="error-icon" />
            <span className="error-message">{error}</span>
            <button onClick={clearError} className="error-close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="workflow-container">
          {/* Progress Indicator */}
          {fileData && (
            <div className="progress-indicator">
              <div className="progress-steps">
                <div
                  className={`progress-step ${currentStep === "upload" ? "active" : "completed"}`}
                >
                  <div className="step-indicator">
                    {currentStep === "upload" ? "1" : "✓"}
                  </div>
                  <span className="step-label">Upload File</span>
                </div>

                <div
                  className={`progress-step ${currentStep === "select" ? "active" : currentStep === "report" ? "completed" : ""}`}
                >
                  <div className="step-indicator">
                    {currentStep === "select"
                      ? "2"
                      : currentStep === "report"
                        ? "✓"
                        : "2"}
                  </div>
                  <span className="step-label">Select Column</span>
                </div>

                <div
                  className={`progress-step ${currentStep === "report" ? "active" : ""}`}
                >
                  <div className="step-indicator">
                    {currentStep === "report" ? "3" : "3"}
                  </div>
                  <span className="step-label">View Report</span>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Steps */}
          <div className="workflow-content">
            {/* Step 1: File Upload */}
            <div
              className={`workflow-step ${currentStep === "upload" ? "visible" : "hidden"}`}
            >
              <FileUploader />
            </div>

            {/* Step 2: Column Selection */}
            <div
              className={`workflow-step ${currentStep === "select" ? "visible" : "hidden"}`}
            >
              <ColumnSelector />
            </div>

            {/* Step 3: Report */}
            <div
              className={`workflow-step ${currentStep === "report" ? "visible" : "hidden"}`}
            >
              {duplicateResults && (
                <Report
                  report={duplicateResults.report}
                  onDownload={handleDownload}
                  downloadFormat={downloadFormat}
                  setDownloadFormat={setDownloadFormat}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p className="footer-text">
            Secure processing • No data stored • Privacy first
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
