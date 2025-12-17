import React from "react";
import Icon from "./common/Icon";

const Report = ({ report, onDownload, downloadFormat, setDownloadFormat }) => {
  if (!report) return null;

  const metrics = [
    {
      label: "Total Rows",
      value: report.totalRows.toLocaleString(),
      icon: "BarChart3",
    },
    {
      label: "Duplicate Entries",
      value: report.duplicateCount.toLocaleString(),
      icon: "AlertTriangle",
    },
    {
      label: "Cleaned Rows",
      value: report.cleanedRows.toLocaleString(),
      icon: "CheckCircle",
    },
    {
      label: "Duplicate Percentage",
      value: `${report.duplicatePercentage}%`,
      icon: "TrendingUp",
    },
  ];

  return (
    <div className="report-container">
      <div className="report-header">
        <h2 className="report-title">
          <span className="title-icon">
            <Icon name="ClipboardList" size={28} />
          </span>
          Analysis Report
        </h2>
        <p className="report-subtitle">
          Column Analyzed: <strong>{report.columnAnalyzed}</strong>
        </p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="metric-card"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="metric-icon">
              <Icon name={metric.icon} size={32} />
            </div>
            <div className="metric-content">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
            <div className="metric-decoration"></div>
          </div>
        ))}
      </div>

      <div className="report-summary">
        <div className="summary-card">
          <h3>Summary</h3>
          <p>
            Successfully processed{" "}
            <strong>{report.totalRows.toLocaleString()}</strong> rows and
            identified
            <strong> {report.duplicateCount.toLocaleString()}</strong> duplicate
            entries in the
            <strong> "{report.columnAnalyzed}"</strong> column.
          </p>
          <p>
            Your cleaned dataset now contains{" "}
            <strong>{report.cleanedRows.toLocaleString()}</strong> unique rows,
            representing a <strong>{report.duplicatePercentage}%</strong>{" "}
            reduction from the original file.
          </p>
        </div>
      </div>

      <div className="download-section">
        <div className="download-controls">
          <div className="format-selector">
            <label className="format-label">Export Format:</label>
            <div className="format-buttons">
              <button
                className={`format-button ${downloadFormat === "csv" ? "active" : ""}`}
                onClick={() => setDownloadFormat("csv")}
              >
                <span className="format-icon">
                  <Icon name="FileText" size={18} />
                </span>
                CSV
              </button>
              <button
                className={`format-button ${downloadFormat === "xlsx" ? "active" : ""}`}
                onClick={() => setDownloadFormat("xlsx")}
              >
                <span className="format-icon">
                  <Icon name="BarChart3" size={18} />
                </span>
                XLSX
              </button>
            </div>
          </div>

          <button className="download-button" onClick={onDownload}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
            </svg>
            Download Cleaned File
          </button>
        </div>
      </div>

      <div className="report-visualization">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${report.duplicatePercentage}%`,
              backgroundColor: "#EF4444",
            }}
          ></div>
        </div>
        <div className="progress-labels">
          <span>Clean Data</span>
          <span>Duplicates ({report.duplicatePercentage}%)</span>
        </div>
      </div>
    </div>
  );
};

export default Report;
