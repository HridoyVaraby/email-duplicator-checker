import React from 'react';

const ProgressModal = ({
  isOpen,
  title = "Processing",
  progressState,
  onCancel,
  canCancel = false
}) => {
  if (!isOpen) return null;

  const {
    currentOperation,
    totalRows,
    processedRows,
    percentage,
    estimatedTimeRemaining,
  } = progressState || {};

  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return "Calculating...";

    if (seconds < 60) {
      return `${Math.round(seconds)}s remaining`;
    } else if (seconds < 3600) {
      return `${Math.round(seconds / 60)}m ${Math.round(seconds % 60)}s remaining`;
    } else {
      return `${Math.round(seconds / 3600)}h ${Math.round((seconds % 3600) / 60)}m remaining`;
    }
  };

  const getOperationText = (operation) => {
    switch (operation) {
      case 'parsing':
        return "Parsing file...";
      case 'validating':
        return "Validating data...";
      case 'deduplication':
        return "Finding duplicates...";
      case 'exporting':
        return "Exporting cleaned file...";
      default:
        return "Processing...";
    }
  };

  return (
    <div className="progress-modal-overlay">
      <div className="progress-modal">
        <div className="progress-modal-header">
          <h3 className="progress-modal-title">{title}</h3>
          {canCancel && (
            <button
              onClick={onCancel}
              className="progress-modal-close"
              aria-label="Cancel processing"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        <div className="progress-modal-body">
          <div className="progress-status">
            <div className="progress-icon">
              <div className="progress-spinner"></div>
            </div>
            <div className="progress-text">
              <p className="progress-operation">{getOperationText(currentOperation)}</p>
              <p className="progress-details">
                {processedRows !== undefined && totalRows !== undefined
                  ? `${processedRows.toLocaleString()} of ${totalRows.toLocaleString()} rows processed`
                  : "Initializing..."
                }
              </p>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentage || 0}%` }}
              ></div>
            </div>
            <div className="progress-percentage">
              {Math.round(percentage || 0)}%
            </div>
          </div>

          {estimatedTimeRemaining !== null && (
            <div className="progress-time">
              <span className="time-label">Time remaining:</span>
              <span className="time-value">{formatTime(estimatedTimeRemaining)}</span>
            </div>
          )}

          {canCancel && (
            <div className="progress-actions">
              <button
                onClick={onCancel}
                className="cancel-button"
              >
                Cancel Operation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;
