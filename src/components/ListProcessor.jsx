import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Header from "./common/Header";
import FileUploader from "./FileUploader";
import ListColumnSelector from "./ListColumnSelector";
import ListReport from "./ListReport";
import ListProgressModal from "./ListProgressModal";
import Icon from "./common/Icon";

const ListProcessor = () => {
  const navigate = useNavigate();
  const {
    listFileData,
    listProcessResults,
    listDownloadFormat,
    setListDownloadFormat,
    listCurrentStep,
    error,
    setError,
    clearError,
    handleListReset,
    handleListDownload,
    progressState,
  } = useAppContext();

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleNewFile = () => {
    handleListReset();
  };

  return (
    <div className="list-processor">
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
      <main className="list-processor-main">
        <div className="workflow-container">
          {/* Progress Indicator */}
          {listFileData && (
            <div className="progress-indicator">
              <div className="progress-steps">
                <div
                  className={`progress-step ${listCurrentStep === "upload" ? "active" : "completed"}`}
                >
                  <div className="step-indicator">
                    {listCurrentStep === "upload" ? "1" : "✓"}
                  </div>
                  <span className="step-label">Upload File</span>
                </div>

                <div
                  className={`progress-step ${listCurrentStep === "select" ? "active" : listCurrentStep === "report" ? "completed" : ""}`}
                >
                  <div className="step-indicator">
                    {listCurrentStep === "select"
                      ? "2"
                      : listCurrentStep === "report"
                        ? "✓"
                        : "2"}
                  </div>
                  <span className="step-label">Select Columns</span>
                </div>

                <div
                  className={`progress-step ${listCurrentStep === "report" ? "active" : ""}`}
                >
                  <div className="step-indicator">
                    {listCurrentStep === "report" ? "3" : "3"}
                  </div>
                  <span className="step-label">View Results</span>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Steps */}
          <div className="workflow-content">
            {/* Step 1: File Upload */}
            <div
              className={`workflow-step ${listCurrentStep === "upload" ? "visible" : "hidden"}`}
            >
              <div className="step-header">
                <h2 className="step-title">Upload Your Email List</h2>
                <p className="step-description">
                  Upload a CSV or Excel file containing your email list. 
                  We'll help you transform it into the standard format with email, name, and attributes columns.
                </p>
              </div>
              <FileUploader mode="list" />
            </div>

            {/* Step 2: Column Selection */}
            <div
              className={`workflow-step ${listCurrentStep === "select" ? "visible" : "hidden"}`}
            >
              <ListColumnSelector />
            </div>

            {/* Step 3: Report */}
            <div
              className={`workflow-step ${listCurrentStep === "report" ? "visible" : "hidden"}`}
            >
              {listProcessResults && (
                <ListReport
                  results={listProcessResults}
                  onDownload={handleListDownload}
                  downloadFormat={listDownloadFormat}
                  setDownloadFormat={setListDownloadFormat}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="list-processor-footer">
        <div className="footer-content">
          <div className="footer-actions">
            <button onClick={handleBackToHome} className="footer-button secondary">
              <Icon name="ArrowLeft" size={16} />
              Back to Home
            </button>
            {listFileData && (
              <button onClick={handleNewFile} className="footer-button primary">
                <Icon name="FilePlus" size={16} />
                Process New File
              </button>
            )}
          </div>
          <p className="footer-text">
            Secure processing • No data stored • Privacy first
          </p>
        </div>
      </footer>

      {/* Progress Modal */}
      <ListProgressModal 
        isOpen={progressState.isProcessing && listCurrentStep === "select"}
        progress={progressState}
      />
    </div>
  );
};

export default ListProcessor;