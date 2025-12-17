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

      {/* Features Section - Modern Design */}
      <section id="features-section" className="features-section">
        <div className="features-container">
          <div className="features-header">
            <div className="features-badge">
              <span>FEATURES</span>
            </div>
            <h2 className="features-title">
              Powerful Tools for Data Excellence
            </h2>
            <p className="features-subtitle">
              Everything you need to clean, analyze, and optimize your email
              lists with precision and speed
            </p>
          </div>

          <div className="features-illustration">
            <div className="floating-elements">
              <div className="element element-1">
                <Icon name="FileSpreadsheet" size={20} />
              </div>
              <div className="element element-2">
                <Icon name="Database" size={24} />
              </div>
              <div className="element element-3">
                <Icon name="ShieldCheck" size={18} />
              </div>
              <div className="element element-4">
                <Icon name="Globe" size={22} />
              </div>
            </div>
          </div>

          <div className="features-showcase">
            {/* Feature 1 - Multiple Formats */}
            <div className="feature-modern">
              <div className="feature-visual">
                <div className="icon-hexagon">
                  <Icon name="FolderOpen" size={40} />
                </div>
                <div className="format-badges">
                  <span className="format-badge csv">CSV</span>
                  <span className="format-badge xlsx">XLSX</span>
                  <span className="format-badge txt">TXT</span>
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-name">Universal Format Support</h3>
                <p className="feature-detail">
                  Seamlessly process files from any source. Our intelligent
                  parser handles CSV, Excel, and text files with automatic
                  format detection and encoding support.
                </p>
                <div class="feature-metrics">
                  <span class="metric">
                    <span class="metric-value">3+</span>
                    <span class="metric-label">Formats</span>
                  </span>
                  <span class="metric">
                    <span class="metric-value">100%</span>
                    <span class="metric-label">Accuracy</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 2 - Lightning Fast */}
            <div className="feature-modern reverse">
              <div className="feature-visual">
                <div className="icon-hexagon pulse">
                  <Icon name="Zap" size={40} />
                </div>
                <div className="speed-indicator">
                  <div className="speed-bar">
                    <div className="speed-fill"></div>
                  </div>
                  <span className="speed-text">0.01s/1000 rows</span>
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-name">Blazing Performance</h3>
                <p className="feature-detail">
                  Process millions of records in seconds. Our optimized
                  algorithm uses advanced indexing techniques to identify
                  duplicates with unmatched speed and efficiency.
                </p>
                <div class="feature-metrics">
                  <span class="metric">
                    <span class="metric-value">10M+</span>
                    <span class="metric-label">Rows/min</span>
                  </span>
                  <span class="metric">
                    <span class="metric-value">0.1ms</span>
                    <span class="metric-label">Latency</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 3 - Detailed Reports */}
            <div className="feature-modern">
              <div className="feature-visual">
                <div className="icon-hexagon">
                  <Icon name="BarChart3" size={40} />
                </div>
                <div className="chart-preview">
                  <div className="chart-bar bar-1"></div>
                  <div className="chart-bar bar-2"></div>
                  <div className="chart-bar bar-3"></div>
                  <div className="chart-bar bar-4"></div>
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-name">Intelligent Analytics</h3>
                <p className="feature-detail">
                  Gain deep insights into your data quality. Our reports provide
                  comprehensive metrics, visualizations, and actionable
                  recommendations to optimize your lists.
                </p>
                <div class="feature-metrics">
                  <span class="metric">
                    <span class="metric-value">20+</span>
                    <span class="metric-label">Metrics</span>
                  </span>
                  <span class="metric">
                    <span class="metric-value">100%</span>
                    <span class="metric-label">Coverage</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Stats */}
          <div className="features-stats">
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1M+</div>
              <div class="stat-label">Emails Processed</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500K+</div>
              <div class="stat-label">Duplicates Removed</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Modern Design */}
      <section id="process-section" className="process-section">
        <div className="process-container">
          <div className="process-header">
            <h2 className="process-title">How It Works</h2>
            <div className="process-subtitle">
              <span>Transform your data in three powerful steps</span>
              <div className="title-line"></div>
            </div>
          </div>

          <div className="process-flow">
            {/* Step 1 - Upload */}
            <div className="process-step upload-step">
              <div className="step-visual">
                <div className="visual-container">
                  <Icon name="FileUp" size={48} className="step-icon" />
                  <div className="upload-animation">
                    <div className="file-pulse"></div>
                    <div className="file-pulse delay-1"></div>
                    <div className="file-pulse delay-2"></div>
                  </div>
                </div>
                <div className="connection-line">
                  <svg className="line-svg" viewBox="0 0 200 100">
                    <path
                      d="M 0 50 Q 50 50, 100 0 T 200 50"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;10"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              </div>
              <div className="step-content-modern">
                <span className="step-label">STEP 01</span>
                <h3 className="step-title-modern">Upload Your File</h3>
                <p className="step-desc">
                  Simply drag and drop your CSV or Excel file. Our system
                  instantly recognizes your data structure and prepares it for
                  analysis.
                </p>
                <div className="tech-tags">
                  <span className="tag">CSV</span>
                  <span className="tag">XLSX</span>
                  <span className="tag">Secure</span>
                </div>
              </div>
            </div>

            {/* Step 2 - Analyze */}
            <div className="process-step analyze-step">
              <div className="step-visual">
                <div className="visual-container">
                  <div className="analyzing-animation">
                    <div className="data-circle">
                      <Icon name="Target" size={32} />
                      <div className="scan-ring"></div>
                      <div className="scan-ring delay-1"></div>
                    </div>
                  </div>
                </div>
                <div className="connection-line">
                  <svg className="line-svg" viewBox="0 0 200 100">
                    <path
                      d="M 0 50 Q 50 50, 100 100 T 200 50"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;10"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              </div>
              <div className="step-content-modern">
                <span className="step-label">STEP 02</span>
                <h3 className="step-title-modern">Select & Analyze</h3>
                <p className="step-desc">
                  Our intelligent algorithm automatically detects email columns.
                  Simply confirm your selection and watch as we scan thousands
                  of entries in seconds.
                </p>
                <div className="tech-tags">
                  <span className="tag">AI-Powered</span>
                  <span className="tag">Lightning Fast</span>
                </div>
              </div>
            </div>

            {/* Step 3 - Results */}
            <div className="process-step results-step">
              <div className="step-visual">
                <div className="visual-container">
                  <div className="results-animation">
                    <Icon name="BarChart3" size={48} className="step-icon" />
                    <div className="success-pulse"></div>
                    <div className="success-pulse delay-1"></div>
                    <div className="success-pulse delay-2"></div>
                  </div>
                </div>
              </div>
              <div className="step-content-modern">
                <span className="step-label">STEP 03</span>
                <h3 className="step-title-modern">Download Clean Data</h3>
                <p className="step-desc">
                  Receive a comprehensive report with detailed analytics.
                  Download your cleaned list in your preferred format, ready to
                  use immediately.
                </p>
                <div className="tech-tags">
                  <span className="tag">Detailed Report</span>
                  <span className="tag">Export Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="progress-indicator-horizontal">
            <div className="progress-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="progress-text">
              <span className="progress-label">
                Processing Time: Under 10 seconds
              </span>
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
