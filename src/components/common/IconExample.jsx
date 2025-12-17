import React from 'react';
import Icon from './Icon';

// Example component demonstrating Icon usage
const IconExample = () => {
  return (
    <div className="icon-example" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Icon Component Examples</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Basic usage with default size */}
        <Icon name="Mail" />
        <span>Mail icon (default size: 24px)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Custom size */}
        <Icon name="Search" size={32} />
        <span>Search icon (32px)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* With custom className */}
        <Icon name="Download" size={20} className="feature-icon" style={{ color: '#007acc' }} />
        <span>Download icon with custom color</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Larger icon */}
        <Icon name="FileSpreadsheet" size={48} />
        <span>FileSpreadsheet icon (48px)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Different icon types */}
        <Icon name="CheckCircle" size={24} style={{ color: '#10b981' }} />
        <span>CheckCircle icon (green)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Icon name="AlertCircle" size={24} style={{ color: '#f59e0b' }} />
        <span>AlertCircle icon (orange)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Icon name="XCircle" size={24} style={{ color: '#ef4444' }} />
        <span>XCircle icon (red)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Common UI icons */}
        <Icon name="ChevronLeft" size={20} />
        <Icon name="ChevronRight" size={20} />
        <Icon name="ChevronDown" size={20} />
        <Icon name="ChevronUp" size={20} />
        <span>Chevron icons</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Action icons */}
        <Icon name="Edit" size={20} />
        <Icon name="Trash2" size={20} />
        <Icon name="Copy" size={20} />
        <Icon name="Share" size={20} />
        <span>Action icons</span>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Usage:</h3>
        <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`import { Icon } from './components/common';

// Basic usage
<Icon name="Mail" />

// With custom size
<Icon name="Search" size={32} />

// With custom className and styles
<Icon name="Download" size={20} className="feature-icon" style={{ color: '#007acc' }} />`}
        </pre>
      </div>
    </div>
  );
};

export default IconExample;
