import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Icon from "./common/Icon";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="landing-page">
      <Header />
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Clean Your Email Lists
              <span className="title-accent">Effortlessly</span>
            </h1>
            <p className="hero-subtitle">
              Remove duplicate entries from your email lists with professional
              precision. Upload, analyze, and download cleaned data in seconds.
            </p>
          </div>

          <div className="hero-actions">
            <button onClick={handleGetStarted} className="cta-button">
              <span className="cta-text">Get Started</span>
              <svg
                className="cta-arrow"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="features-section">
        <div className="features-container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="FolderOpen" size={32} />
              </div>
              <h3 className="feature-title">Multiple Formats</h3>
              <p className="feature-description">
                Support for CSV and Excel files with drag-and-drop upload
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="Zap" size={32} />
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Process thousands of rows in seconds with efficient duplicate
                detection
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="BarChart3" size={32} />
              </div>
              <h3 className="feature-title">Detailed Reports</h3>
              <p className="feature-description">
                Get comprehensive analytics on duplicates, unique entries, and
                data quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process-section" className="process-section">
        <div className="process-container">
          <h2 className="process-title">How It Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Upload Your File</h3>
                <p className="step-description">
                  Drag and drop your CSV or Excel file containing email data
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Select Column</h3>
                <p className="step-description">
                  Choose the column containing email addresses or data to
                  analyze
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Get Results</h3>
                <p className="step-description">
                  View detailed reports and download your cleaned list
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Clean Your Data?</h2>
          <p className="cta-subtitle">
            Join thousands of professionals who trust our tool for data cleaning
          </p>
          <button onClick={handleGetStarted} className="cta-button secondary">
            Start Cleaning Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
