import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

const Footer = () => {
  const navigate = useNavigate();

  // Handle navigation for internal links
  const handleNavigate = (path, section = null) => {
    if (section && window.location.pathname === '/') {
      // If on home page, scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Handle external links
  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Three Column Layout */}
          <div className="footer-content">
            {/* Product Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Product</h3>
              <ul className="footer-links">
                <li>
                  <button
                    className="footer-link"
                    onClick={() => handleNavigate('/', 'features')}
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link"
                    onClick={() => handleNavigate('/', 'process')}
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link"
                    onClick={() => handleNavigate('/dashboard')}
                  >
                    Try Now
                  </button>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Support</h3>
              <ul className="footer-links">
                <li>
                  <button
                    className="footer-link"
                    onClick={() => handleExternalLink('https://help.emailduplicator.com')}
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link"
                    onClick={() => handleExternalLink('mailto:support@emailduplicator.com')}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Legal</h3>
              <ul className="footer-links">
                <li>
                  <button
                    className="footer-link"
                    onClick={() => handleExternalLink('https://emailduplicator.com/privacy')}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    className="footer-link"
                    onClick={() => handleExternalLink('https://emailduplicator.com/terms')}
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="footer-bottom">
            <div className="footer-brand">
              <Icon name="Mail" size={20} className="footer-logo-icon" />
              <span className="footer-brand-text">Email Duplicator Checker</span>
            </div>
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} Email Duplicator Checker. All rights reserved.</p>
            </div>
            {/* Optional: Social Links */}
            <div className="footer-social">
              <button
                className="social-link"
                onClick={() => handleExternalLink('https://twitter.com/emailduplicator')}
                aria-label="Twitter"
              >
                <Icon name="Twitter" size={18} />
              </button>
              <button
                className="social-link"
                onClick={() => handleExternalLink('https://linkedin.com/company/emailduplicator')}
                aria-label="LinkedIn"
              >
                <Icon name="Linkedin" size={18} />
              </button>
              <button
                className="social-link"
                onClick={() => handleExternalLink('https://github.com/emailduplicator')}
                aria-label="GitHub"
              >
                <Icon name="Github" size={18} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .footer {
          background-color: var(--primary-black);
          color: var(--primary-white);
          padding: var(--spacing-3xl) 0 var(--spacing-xl);
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        /* Footer Content - Three Column Layout */
        .footer-content {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-2xl);
          margin-bottom: var(--spacing-3xl);
        }

        .footer-column {
          display: flex;
          flex-direction: column;
        }

        .footer-column-title {
          font-size: 1rem;
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-lg);
          color: var(--primary-white);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .footer-link {
          font-size: 0.9375rem;
          color: var(--gray-400);
          transition: all var(--transition-normal);
          text-align: left;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          width: fit-content;
        }

        .footer-link:hover {
          color: var(--primary-white);
          transform: translateX(4px);
        }

        /* Footer Bottom */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--spacing-xl);
          border-top: 1px solid var(--gray-800);
          flex-wrap: wrap;
          gap: var(--spacing-lg);
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .footer-logo-icon {
          color: var(--primary-white);
          flex-shrink: 0;
        }

        .footer-brand-text {
          font-size: 0.875rem;
          font-weight: var(--font-weight-medium);
          color: var(--primary-white);
        }

        .footer-copyright {
          flex: 1;
          text-align: center;
        }

        .footer-copyright p {
          font-size: 0.875rem;
          color: var(--gray-500);
        }

        .footer-social {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background-color: var(--gray-800);
          color: var(--gray-400);
          transition: all var(--transition-normal);
          cursor: pointer;
        }

        .social-link:hover {
          background-color: var(--gray-700);
          color: var(--primary-white);
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer {
            padding: var(--spacing-2xl) 0 var(--spacing-lg);
          }

          .footer-content {
            grid-template-columns: repeat(1, 1fr);
            gap: var(--spacing-xl);
            text-align: center;
          }

          .footer-column {
            align-items: center;
          }

          .footer-links {
            align-items: center;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: var(--spacing-md);
          }

          .footer-social {
            order: -1;
            margin-bottom: var(--spacing-md);
          }

          .footer-copyright {
            order: 1;
            flex: none;
            width: 100%;
          }

          .footer-brand {
            order: 0;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 0 var(--spacing-sm);
          }

          .footer-column-title {
            font-size: 0.875rem;
            margin-bottom: var(--spacing-md);
          }

          .footer-link {
            font-size: 0.875rem;
          }

          .footer-brand-text {
            font-size: 0.75rem;
          }

          .footer-copyright p {
            font-size: 0.75rem;
          }

          .social-link {
            width: 32px;
            height: 32px;
          }
        }

        /* Tablet Responsive */
        @media (min-width: 769px) and (max-width: 1024px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--spacing-lg);
          }

          .footer-column-title {
            font-size: 0.875rem;
            margin-bottom: var(--spacing-md);
          }

          .footer-link {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
