import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { getColumnStats } from "../utils/duplicateChecker";
import Icon from "./common/Icon";

const ColumnSelector = () => {
  const {
    fileData,
    selectedColumn,
    handleColumnSelection,
    handleDuplicateCheck,
    isProcessing,
  } = useAppContext();

  const columnStats = useMemo(() => {
    if (!fileData || !selectedColumn) return null;
    return getColumnStats(fileData.data, selectedColumn);
  }, [fileData, selectedColumn]);

  if (!fileData) return null;

  const hasEmailColumn = fileData.columns.some((col) =>
    col.toLowerCase().includes("email"),
  );

  return (
    <div className="column-selector-container">
      <div className="column-selector-card">
        <div className="selector-header">
          <h2 className="selector-title">
            <Icon name="Target" size={24} className="selector-icon" />
            Select Column to Analyze
          </h2>
          <p className="selector-subtitle">
            Choose the column that contains the data you want to check for
            duplicates
          </p>
        </div>

        <div className="selector-content">
          <div className="form-group">
            <label htmlFor="column-select" className="form-label">
              Available Columns:
            </label>
            <div className="select-wrapper">
              <select
                id="column-select"
                value={selectedColumn}
                onChange={(e) => handleColumnSelection(e.target.value)}
                className="column-select"
                disabled={isProcessing}
              >
                {fileData.columns.map((column) => (
                  <option key={column} value={column}>
                    {column}{" "}
                    {hasEmailColumn && column.toLowerCase().includes("email")
                      ? "📧"
                      : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {columnStats && (
            <div className="column-stats">
              <h3 className="stats-title">Column Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">
                    {columnStats.total.toLocaleString()}
                  </div>
                  <div className="stat-label">Total Rows</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {columnStats.uniqueCount.toLocaleString()}
                  </div>
                  <div className="stat-label">Unique Values</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {columnStats.emptyCount.toLocaleString()}
                  </div>
                  <div className="stat-label">Empty Cells</div>
                </div>
              </div>
            </div>
          )}

          <div className="action-section">
            <button
              onClick={handleDuplicateCheck}
              disabled={isProcessing || !selectedColumn}
              className="analyze-button"
            >
              {isProcessing ? (
                <>
                  <div className="button-spinner"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Icon name="Search" size={20} className="button-icon" />
                  Analyze for Duplicates
                </>
              )}
            </button>
          </div>
        </div>

        <div className="selector-footer">
          <div className="file-info">
            <span className="info-label">File contains:</span>
            <span className="info-value">
              {fileData.data.length.toLocaleString()} rows,{" "}
              {fileData.columns.length} columns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelector;
