import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { generatePreview, validateMappings } from "../utils/listProcessor";
import Icon from "./common/Icon";

const ListColumnSelector = () => {
  const {
    listFileData,
    listColumnMappings,
    handleListColumnSelection,
    handleListProcess,
    isProcessing,
  } = useAppContext();

  const [localMappings, setLocalMappings] = useState(listColumnMappings);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    setLocalMappings(listColumnMappings);
  }, [listColumnMappings]);

  const handleEmailColumnChange = (column) => {
    const newMappings = { ...localMappings, emailColumn: column };
    setLocalMappings(newMappings);
    updatePreview(newMappings);
  };

  const handleFirstNameColumnChange = (column) => {
    const newMappings = { ...localMappings, firstNameColumn: column };
    setLocalMappings(newMappings);
    updatePreview(newMappings);
  };

  const handleLastNameColumnChange = (column) => {
    const newMappings = { ...localMappings, lastNameColumn: column };
    setLocalMappings(newMappings);
    updatePreview(newMappings);
  };

  const handleAttributeColumnToggle = (column) => {
    const newAttributeColumns = localMappings.attributeColumns.includes(column)
      ? localMappings.attributeColumns.filter(col => col !== column)
      : [...localMappings.attributeColumns, column];
    
    const newMappings = { ...localMappings, attributeColumns: newAttributeColumns };
    setLocalMappings(newMappings);
    updatePreview(newMappings);
  };

  const updatePreview = (mappings) => {
    if (mappings.emailColumn && listFileData?.data?.length > 0) {
      const preview = generatePreview(listFileData.data, mappings, 3);
      setPreviewData(preview);
    }
  };

  const handleProcessClick = () => {
    const validation = validateMappings(localMappings, listFileData.columns);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    setValidationErrors([]);
    handleListColumnSelection(localMappings);
    handleListProcess();
  };

  const getAvailableColumns = () => {
    const usedColumns = [
      localMappings.emailColumn,
      localMappings.firstNameColumn,
      localMappings.lastNameColumn,
      ...localMappings.attributeColumns
    ].filter(Boolean);
    
    return listFileData.columns.filter(col => !usedColumns.includes(col));
  };

  if (!listFileData) {
    return <div>No file data available</div>;
  }

  return (
    <div className="list-column-selector">
      <div className="step-header">
        <h2 className="step-title">Configure Your Columns</h2>
        <p className="step-description">
          We've automatically detected your columns. Review and adjust the mappings below to ensure your data is processed correctly.
        </p>
      </div>

      <div className="column-mapping-container">
        {/* Email Column Selection */}
        <div className="mapping-section">
          <div className="mapping-header">
            <Icon name="Mail" size={20} className="mapping-icon" />
            <div>
              <h3 className="mapping-title">Email Column</h3>
              <p className="mapping-description">
                Select the column that contains email addresses
              </p>
            </div>
          </div>
          <select
            value={localMappings.emailColumn || ""}
            onChange={(e) => handleEmailColumnChange(e.target.value)}
            className="column-select"
          >
            <option value="">Select email column...</option>
            {listFileData.columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>

        {/* Name Columns Selection */}
        <div className="mapping-section">
          <div className="mapping-header">
            <Icon name="User" size={20} className="mapping-icon" />
            <div>
              <h3 className="mapping-title">Name Columns</h3>
              <p className="mapping-description">
                Select columns for first name and last name (optional)
              </p>
            </div>
          </div>
          <div className="name-columns">
            <div className="name-column-group">
              <label className="column-label">First Name</label>
              <select
                value={localMappings.firstNameColumn || ""}
                onChange={(e) => handleFirstNameColumnChange(e.target.value)}
                className="column-select"
              >
                <option value="">None</option>
                {listFileData.columns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
            <div className="name-column-group">
              <label className="column-label">Last Name</label>
              <select
                value={localMappings.lastNameColumn || ""}
                onChange={(e) => handleLastNameColumnChange(e.target.value)}
                className="column-select"
              >
                <option value="">None</option>
                {listFileData.columns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Attribute Columns Selection */}
        <div className="mapping-section">
          <div className="mapping-header">
            <Icon name="Settings" size={20} className="mapping-icon" />
            <div>
              <h3 className="mapping-title">Attribute Columns</h3>
              <p className="mapping-description">
                Select additional columns to include in the attributes JSON
              </p>
            </div>
          </div>
          <div className="attribute-columns">
            {getAvailableColumns().map((column) => (
              <label key={column} className="attribute-checkbox">
                <input
                  type="checkbox"
                  checked={localMappings.attributeColumns.includes(column)}
                  onChange={() => handleAttributeColumnToggle(column)}
                />
                <span className="checkbox-label">{column}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {previewData.length > 0 && (
        <div className="preview-section">
          <div className="preview-header">
            <h3 className="preview-title">Preview</h3>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="preview-toggle"
            >
              {showPreview ? "Hide" : "Show"} Preview
              <Icon 
                name={showPreview ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </button>
          </div>
          
          {showPreview && (
            <div className="preview-table-container">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>email</th>
                    <th>name</th>
                    <th>attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
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
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <div className="error-header">
            <Icon name="AlertTriangle" size={20} className="error-icon" />
            <span>Please fix the following issues:</span>
          </div>
          <ul className="error-list">
            {validationErrors.map((error, index) => (
              <li key={index} className="error-item">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={handleProcessClick}
          disabled={!localMappings.emailColumn || isProcessing}
          className="process-button primary"
        >
          {isProcessing ? (
            <>
              <Icon name="Loader2" size={16} className="spinner" />
              Processing...
            </>
          ) : (
            <>
              <Icon name="Play" size={16} />
              Process List
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ListColumnSelector;