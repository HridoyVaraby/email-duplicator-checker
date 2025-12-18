import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ListProcessor from "./components/ListProcessor";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-processor" element={<ListProcessor />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
