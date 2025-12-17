# Icon Component

A reusable wrapper component for Lucide React icons that provides dynamic importing with tree-shaking support.

## Features

- **Dynamic Importing**: Icons are loaded on-demand, enabling tree-shaking to keep bundle sizes minimal
- **Consistent Styling**: Applied base styles ensure visual consistency across the application
- **Accessibility**: Built-in ARIA attributes for screen readers
- **Error Handling**: Graceful fallbacks for missing or failed icon loads
- **Loading States**: Shows placeholder while icons are loading
- **Flexible**: Supports all props from Lucide icons and passes through additional props

## Usage

### Import

```javascript
import { Icon } from './components/common';
// or
import Icon from './components/common/Icon';
```

### Basic Usage

```javascript
// Default size (24px)
<Icon name="Mail" />

// Custom size
<Icon name="Search" size={32} />

// With custom className and styles
<Icon name="Download" size={20} className="feature-icon" style={{ color: '#007acc' }} />

// Pass through any other props
<Icon name="Settings" onClick={handleSettings} title="Settings" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | **(required)** | The name of the Lucide icon to render (e.g., "Mail", "Search", "Settings") |
| `size` | number | 24 | Icon size in pixels |
| `className` | string | '' | Additional CSS classes to apply |
| `...props` | any | - | All other props are passed through to the icon component |

## Available Icons

The Icon component supports all icons from the [Lucide React](https://lucide.dev/) library. Here are some commonly used icons:

### UI Elements
- Mail, Search, Download, Upload, Trash2, Edit, Copy, Share
- ChevronLeft, ChevronRight, ChevronUp, ChevronDown
- ArrowLeft, ArrowRight, ArrowUp, ArrowDown
- Plus, X, Check, AlertCircle, Info

### Files & Folders
- File, FileText, FileSpreadsheet, FilePlus, FileMinus
- Folder, FolderOpen, FolderPlus, FolderMinus
- Archive, Package

### Media
- Image, Video, Camera, Play, Pause
- Volume2, VolumeX, Mic, MicOff

### Communication
- MessageSquare, MessageCircle, Send, Phone, AtSign

### Navigation
- Home, Menu, Settings, HelpCircle, ExternalLink
- Map, MapPin, Navigation, Compass

### Social
- Github, Twitter, Facebook, Instagram, Linkedin
- Chrome, Firefox, Safari, Edge

### And many more...

Visit [Lucide.dev](https://lucide.dev/) for the complete list of available icons.

## Styling

The component includes base styles for consistent display:

```css
.icon-component {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex-shrink: 0;
}
```

Additional styles can be applied via the `className` prop or inline styles.

## Examples

### Button with Icon

```javascript
<button className="btn-primary">
    <Icon name="Download" size={16} />
    Download File
</button>
```

### Icon with Custom Color

```javascript
<Icon 
    name="CheckCircle" 
    size={24} 
    style={{ color: '#10b981' }} // Green color
/>
```

### Icon in Card Header

```javascript
<div className="card-header">
    <Icon name="Folder" size={20} className="card-icon" />
    <h3>Documents</h3>
</div>
```

### Responsive Icons

```javascript
<Icon 
    name="Menu" 
    size={window.innerWidth < 768 ? 24 : 32} 
    className="menu-icon"
/>
```

## Error Handling

If an icon name is not found or fails to load:
- A warning is logged to the console
- A fallback placeholder with a "?" symbol is displayed
- The component maintains the specified size and styling

## Performance Tips

1. **Tree-shaking**: Icons are only loaded when used, keeping bundle sizes minimal
2. **Consistent Naming**: Use the exact Lucide icon names (case-sensitive)
3. **Avoid Frequent Re-renders**: Cache icon components by keeping name prop stable
4. **Size Optimization**: Use appropriate icon sizes for different contexts

## Migration from SVG Icons

To replace existing SVG icons:

```javascript
// Before
<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="..." stroke="currentColor" strokeWidth="2"/>
</svg>

// After
<Icon name="Mail" size={20} />
```

## Accessibility

Icons include these accessibility attributes by default:
- `aria-hidden="true"`
- `role="img"`
- `focusable="false"`

These can be overridden if needed:

```javascript
<Icon 
    name="Info" 
    aria-label="Information"
    aria-hidden={false}
    focusable
/>
```