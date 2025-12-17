# Email Duplicator Checker

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

A modern, client-side web application for detecting and removing duplicate entries from email/contact lists. Built with React and Vite, featuring a sleek black-and-white UI design.

## ✨ Features

- **Multi-format Support**: Upload and process CSV and Excel (XLSX) files
- **Smart Duplicate Detection**: Case-insensitive comparison with configurable column selection
- **Real-time Progress Tracking**: Visual feedback for large file processing
- **Comprehensive Reports**: Detailed analytics on duplicates, unique entries, and data quality
- **Export Options**: Download cleaned data in CSV or XLSX format
- **Privacy First**: All processing happens client-side - no data sent to servers
- **Modern UI**: Clean, professional interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HridoyVaraby/email-duplicator-checker.git
cd email-duplicator-checker/email-duplicator-checker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.10.1
- **File Processing**:
  - `xlsx` - Excel file parsing and export
  - `papaparse` - CSV parsing
  - `file-saver` - File download functionality
- **State Management**: React Context API
- **Styling**: Custom CSS with CSS variables

## 📁 Project Structure

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

## 💡 How It Works

1. **Upload**: Drag and drop your CSV or Excel file containing email data
2. **Select**: Choose the column containing email addresses or data to analyze
3. **Process**: The application automatically detects and removes duplicates, keeping the first occurrence
4. **Review**: View a comprehensive report showing total rows, duplicates found, and cleaned data
5. **Download**: Export your cleaned list in your preferred format

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Professional black-and-white color scheme
- **Progress Indicators**: Real-time feedback during file processing
- **Smooth Animations**: Polished transitions and interactions
- **Accessibility**: ARIA labels and keyboard navigation support

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

- Follow existing code style and patterns
- Ensure all components are properly commented
- Test new features thoroughly
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔒 Privacy & Security

- **No Server Processing**: All file processing happens in your browser
- **No Data Storage**: Your files are never saved or transmitted
- **Secure by Design**: Built with modern security best practices

## 📊 Performance

- **Fast Processing**: Efficient algorithms handle thousands of rows in seconds
- **Memory Optimized**: Streaming processing for large files
- **Lightweight**: Minimal dependencies and optimized bundle size

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The UI library
- [Vite](https://vitejs.dev/) - The build tool
- [SheetJS](https://sheetjs.com/) - Excel file processing
- [PapaParse](https://www.papaparse.com/) - CSV parsing
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - File saving functionality

## 📧 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/HridoyVaraby/email-duplicator-checker/issues) on GitHub.

---

**Built with ❤️ for the community**