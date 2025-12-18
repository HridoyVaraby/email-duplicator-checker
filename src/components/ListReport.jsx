import React, { useState } from "react";
import Icon from "./common/Icon";

const ListReport = ({ results, onDownload, downloadFormat, setDownloadFormat }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSample, setShowSample] = useState(false);

  const formatProcessingTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const getSampleData = () => {
    return results.processedData.slice(0, 5);
  };

  const getEmailValidityRate = () => {
    return ((results.emailValidCount / results.processedCount) * 100).toFixed(1);
  };

  return (
    <div className="list-report">
      <div className="report-header">
        <div className="success-icon-container">
          <Icon name="CheckCircle" size={48} className="success-icon" />
        </div>
        <h2 className="report-title">Processing Complete!</h2>
        <p className="report-subtitle">
          Your email list has been successfully transformed into the standard format.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Icon name="FileText" size={24} className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatNumber(results.processedCount)}</div>
            <div className="stat-label">Total Rows</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-container">
            <Icon name="Mail" size={24} className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatNumber(results.emailValidCount)}</div>
            <div className="stat-label">Valid Emails</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-container">
            <Icon name="AlertCircle" size={24} className="stat-icon warning" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatNumber(results.invalidEmailCount)}</div>
            <div className="stat-label">Invalid Emails</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-container">
            <Icon name="Clock" size={24} className="stat-icon" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{formatProcessingTime(results.processingTime)}</div>
            <div className="stat-label">Processing Time</div>
          </div>
        </div>
      </div>

      {/* Email Validity Rate */}
      <div className="validity-rate-container">
        <div className="validity-header">
          <h3 className="validity-title">Email Validity Rate</h3>
          <span className="validity-percentage">{getEmailValidityRate()}%</span>
        </div>
        <div className="validity-bar">
          <div 
            className="validity-fill" 
            style={{ width: `${getEmailValidityRate()}%` }}
          ></div>
        </div>
        <div className="validity-labels">
          <span>Invalid ({results.invalidEmailCount})</span>
          <span>Valid ({results.emailValidCount})</span>
        </div>
      </div>

      {/* Output Format Information */}
      <div className="format-info">
        <div className="format-header">
          <Icon name="Info" size={20} className="format-icon" />
          <h3 className="format-title">Output Format</h3>
        </div>
        <div className="format-description">
          <p>
            Your data has been transformed into the standard format with three columns:
          </p>
          <div className="format-columns">
            <div className="format-column">
              <code className="column-name">email</code>
              <span className="column-desc">Standardized email address</span>
            </div>
            <div className="format-column">
              <code className="column-name">name</code>
              <span className="column-desc">Combined first and last name</span>
            </div>
            <div className="format-column">
              <code className="column-name">attributes</code>
              <span className="column-desc">JSON string with additional data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Data Preview */}
      <div className="sample-section">
        <div className="sample-header">
          <h3 className="sample-title">Sample Data</h3>
          <button
            onClick={() => setShowSample(!showSample)}
            className="sample-toggle"
          >
            {showSample ? "Hide" : "Show"} Sample
            <Icon 
              name={showSample ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        </div>
        
        {showSample && (
          <div className="sample-table-container">
            <table className="sample-table">
              <thead>
                <tr>
                  <th>email</th>
                  <th>name</th>
                  <th>attributes</th>
                </tr>
              </thead>
              <tbody>
                {getSampleData().map((row, index) => (
                  <tr key={index}>
                    <td className="email-cell">{row.email}</td>
                    <td className="name-cell">{row.name || <em>Empty</em>}</td>
                    <td className="attributes-cell">
                      <code className="json-code">{row.attributes || '{}'}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Download Options */}
      <div className="download-section">
        <div className="download-header">
          <h3 className="download-title">Download Your Processed List</h3>
          <p className="download-subtitle">
            Choose your preferred format and download the transformed data
          </p>
        </div>

        <div className="download-options">
          <div className="format-selector">
            <label className="format-option">
              <input
                type="radio"
                name="format"
                value="csv"
                checked={downloadFormat === "csv"}
                onChange={(e) => setDownloadFormat(e.target.value)}
              />
              <div className="format-card">
                <Icon name="FileSpreadsheet" size={24} className="format-icon" />
                <div className="format-info">
                  <div className="format-name">CSV</div>
                  <div className="format-desc">Comma-separated values</div>
                </div>
              </div>
            </label>

            <label className="format-option">
              <input
                type="radio"
                name="format"
                value="xlsx"
                checked={downloadFormat === "xlsx"}
                onChange={(e) => setDownloadFormat(e.target.value)}
              />
              <div className="format-card">
                <Icon name="File" size={24} className="format-icon" />
                <div className="format-info">
                  <div className="format-name">Excel</div>
                  <div className="format-desc">Microsoft Excel format</div>
                </div>
              </div>
            </label>
          </div>

          <button onClick={onDownload} className="download-button primary">
            <Icon name="Download" size={20} />
            Download {downloadFormat.toUpperCase()} File
          </button>
        </div>
      </div>

      {/* Additional Details */}
      <div className="details-section">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="details-toggle"
        >
          <Icon name="Info" size={16} />
          Processing Details
          <Icon 
            name={showDetails ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
        </button>
        
        {showDetails && (
          <div className="details-content">
            <div className="detail-item">
              <span className="detail-label">Original Rows:</span>
              <span className="detail-value">{formatNumber(results.originalCount)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Processed Rows:</span>
              <span className="detail-value">{formatNumber(results.processedCount)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Validity Rate:</span>
              <span className="detail-value">{getEmailValidityRate()}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Processing Speed:</span>
              <span className="detail-value">
                {formatNumber(Math.round(results.processedCount / (results.processingTime / 1000)))} rows/second
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListReport;