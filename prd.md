# 📄 Product Requirements Document (PRD)

## 1. Overview
We are building a **simple web app** using **React + Vite** that allows users to upload a file (CSV/XLSX), check for duplicate entries in a chosen column (default: email), remove duplicates, generate a report, and download the cleaned file. The app should have a **modern, professional UI** with a **classic black-and-white color scheme**.

---

## 2. Goals
- Provide a **fast, intuitive tool** for cleaning email/contact lists.
- Ensure **cross-file support** (CSV, XLSX).
- Deliver a **clear report** after duplicate removal.
- Enable **easy file download** of cleaned data.

---

## 3. Features
### Landing Page
- Minimalist hero section with black background, white text.
- Headline: *“Clean Your Email Lists Effortlessly”*
- CTA button → Dashboard.

### Dashboard
- **File Upload Component**
  - Drag-and-drop or file input.
  - Accept `.csv`, `.xlsx`.
- **Duplicate Detection**
  - Parse file → convert to JSON.
  - User selects column (default: email).
  - Remove duplicates, keep first occurrence.
- **Report**
  - Show:
    - Total rows
    - Duplicate count
    - Cleaned rows
    - Column analyzed
- **Download**
  - Export cleaned file as `.csv` or `.xlsx`.

---

## 4. Technical Requirements
- **Frontend:** React + Vite
- **Libraries:**
  - `xlsx` → Excel parsing
  - `papaparse` → CSV parsing
  - `file-saver` → file download
- **Component Structure:**
  ```
  src/
   ├── components/
   │    ├── FileUploader.jsx
   │    ├── Report.jsx
   │    ├── Dashboard.jsx
   │    └── LandingPage.jsx
   ├── utils/
   │    ├── fileParser.js
   │    └── duplicateChecker.js
   ├── App.jsx
   └── main.jsx
  ```

---

## 5. UI/UX Guidelines
- **Color Scheme:** Black background, white text, inverted hover states.
- **Typography:** Inter or Roboto.
- **Layout:** Responsive grid/flex.
- **Style:** Rounded cards, smooth hover transitions.

---

## 6. Example Report
| Metric            | Value |
|-------------------|-------|
| Total Rows        | 1200  |
| Duplicate Emails  | 150   |
| Cleaned Rows      | 1050  |
| Column Analyzed   | Email |
| Duplicate Count   | 150   |
| Duplicate Percentage | 12.5% |
