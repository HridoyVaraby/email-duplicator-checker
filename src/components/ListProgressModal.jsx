import React from "react";
import Icon from "./common/Icon";

const ListProgressModal = ({ isOpen, progress }) => {
  if (!isOpen) return null;

  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return "Calculating...";
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    if (mins > 0) {
      return `${mins}m ${secs}s remaining`;
    } else {
      return `${secs}s remaining`;
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="modal-overlay">
      <div className="progress-modal">
        <div className="modal-header">
          <div className="modal-icon-container">
            <Icon name="Loader2" size={32} className="spinner" />
          </div>
          <h2 className="modal-title">Processing Your List</h2>
          <p className="modal-subtitle">
            {progress.currentOperation === "processing" 
              ? "Transforming your data..." 
              : "Preparing your data..."}
          </p>
        </div>

        <div className="progress-content">
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress.percentage || 0}%` }}
              ></div>
            </div>
            <div className="progress-percentage">
              {Math.round(progress.percentage || 0)}%
            </div>
          </div>

          {/* Progress Details */}
          <div className="progress-details">
            <div className="progress-row">
              <span className="progress-label">Rows Processed:</span>
              <span className="progress-value">
                {formatNumber(progress.processedRows || 0)} / {formatNumber(progress.totalRows || 0)}
              </span>
            </div>
            
            {progress.estimatedTimeRemaining !== null && (
              <div className="progress-row">
                <span className="progress-label">Time Remaining:</span>
                <span className="progress-value">
                  {formatTime(progress.estimatedTimeRemaining)}
                </span>
              </div>
            )}

            {progress.startTime && (
              <div className="progress-row">
                <span className="progress-label">Elapsed Time:</span>
                <span className="progress-value">
                  {formatTime((Date.now() - progress.startTime) / 1000)}
                </span>
              </div>
            )}
          </div>

          {/* Processing Steps */}
          <div className="processing-steps">
            <div className={`step ${progress.currentOperation === "parsing" ? "active" : "completed"}`}>
              <Icon name="FileText" size={16} className="step-icon" />
              <span className="step-text">Parsing file</span>
            </div>
            <div className={`step ${progress.currentOperation === "processing" ? "active" : ""} ${progress.currentOperation === "processing" ? "" : "pending"}`}>
              <Icon name="Settings" size={16} className="step-icon" />
              <span className="step-text">Transforming data</span>
            </div>
            <div className={`step pending`}>
              <Icon name="CheckCircle" size={16} className="step-icon" />
              <span className="step-text">Finalizing results</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <p className="modal-note">
            Please don't close this window while processing is in progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListProgressModal;