# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React + Vite web application for detecting and removing duplicate entries from email/contact lists in CSV/XLSX files. The application features a modern black-and-white UI design and operates entirely client-side.

## Development Commands

```bash
# Navigate to the app directory first
cd email-duplicator-checker

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Run ESLint checks
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Tech Stack
- **React 19.2.0** with modern hooks and patterns
- **Vite 7.2.4** for fast development and building
- **React Router DOM 7.10.1** for client-side routing
- **No TypeScript** - using plain JavaScript with JSDoc

### Key Libraries
- `xlsx` - Excel file parsing and export
- `papaparse` - CSV parsing
- `file-saver` - File download functionality

### Project Structure
```
email-duplicator-checker/
├── src/
│   ├── components/          # React components
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── FileUploader.jsx
│   │   ├── ColumnSelector.jsx
│   │   ├── Report.jsx
│   │   └── ProgressModal.jsx
│   ├── context/
│   │   └── AppContext.jsx    # Global state management
│   ├── utils/
│   │   ├── duplicateChecker.js  # Core duplicate detection logic
│   │   └── fileParser.js        # File parsing/export utilities
│   ├── App.jsx
│   └── main.jsx
├── public/
└── dist/                    # Build output
```

### State Management
- Uses React Context API (`AppContext`) for global state
- State includes: uploaded data, selected columns, duplicates, progress tracking
- Custom hook `useAppContext` provided for easy context access

### Component Flow
1. **LandingPage** → Entry point with CTA
2. **Dashboard** → Main workflow container
3. **FileUploader** → Handles CSV/XLSX upload
4. **ColumnSelector** → Auto-detects and lets users select columns
5. **ProgressModal** → Shows progress during duplicate detection
6. **Report** → Displays results and download options

## Core Logic

### Duplicate Detection (`utils/duplicateChecker.js`)
- Case-insensitive comparison
- Keeps first occurrence of each value
- Handles empty/undefined values
- Processes large files with progress tracking

### File Processing (`utils/fileParser.js`)
- Supports both CSV and XLSX formats
- Automatic email column detection
- Exports to CSV or XLSX with timestamp
- Maintains original file format where possible

## UI/UX Guidelines
- **Color Scheme**: Black background, white text
- **Typography**: Inter font family
- **Design**: Minimalist, professional, rounded cards
- **Responsive**: Uses flexbox/grid layouts

## Important Implementation Details
- All processing happens client-side - no backend required
- Progress tracking is essential for large files (>1000 rows)
- Auto-detection of email columns uses common patterns (email, e-mail, etc.)
- Duplicate percentage is calculated and displayed in reports
- Exported files include timestamp in filename

## Code Quality
- ESLint configured with React-specific rules
- Uses functional components with hooks
- No external UI libraries - all custom CSS
- Proper error handling throughout the application