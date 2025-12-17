import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './Icon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [githubStars, setGithubStars] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.header-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Fetch GitHub stars
  useEffect(() => {
    const fetchGitHubStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/HridoyVaraby/email-duplicator-checker');
        if (response.ok) {
          const data = await response.json();
          setGithubStars(data.stargazers_count);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
      }
    };

    fetchGitHubStars();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  // Handle navigation
  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Handle Get Started click
  const handleGetStarted = () => {
    if (location.pathname === '/') {
      scrollToSection('hero');
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  // Navigation links configuration
  const navLinks = [
    { id: 'features', label: 'Features', type: 'scroll' },
    { id: 'process', label: 'How It Works', type: 'scroll' },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <div className="header-logo" onClick={() => handleNavigate('/')}>
            <Icon name="Mail" size={28} className="logo-icon" />
            <span className="logo-text">Email Duplicator Checker</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    className="nav-link"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <button className="cta-button-header" onClick={handleGetStarted}>
            Get Started
          </button>

          {/* GitHub Badge */}
          <a
            href="https://github.com/HridoyVaraby/email-duplicator-checker"
            target="_blank"
            rel="noopener noreferrer"
            className="github-badge-header"
            aria-label="View on GitHub"
          >
            <Icon name="Github" size={16} />
            {githubStars !== null && (
              <span className="github-stars-count">
                {githubStars >= 1000 ? `${(githubStars / 1000).toFixed(1)}k` : githubStars}
              </span>
            )}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    className="mobile-nav-link"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mobile-cta-container">
                <button
                  className="mobile-cta-button"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Styles */}
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all var(--transition-normal);
          background-color: transparent;
        }

        .header.scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: var(--shadow-md);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          position: relative;
        }

        /* Logo Styles */
        .header-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
          transition: transform var(--transition-normal);
        }

        .header-logo:hover {
          transform: scale(1.02);
        }

        .logo-icon {
          color: var(--primary-black);
          flex-shrink: 0;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: var(--font-weight-bold);
          color: var(--primary-black);
          white-space: nowrap;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: none;
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: var(--spacing-xl);
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          font-size: 1rem;
          font-weight: var(--font-weight-bold);
          color: var(--gray-700);
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--primary-black);
          background-color: var(--gray-100);
        }

        /* CTA Button */
        .cta-button-header {
          display: none;
          align-items: center;
          background-color: var(--primary-black);
          color: var(--primary-white);
          font-size: 1rem;
          font-weight: var(--font-weight-semibold);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
          white-space: nowrap;
        }

        .cta-button-header:hover {
          background-color: var(--gray-800);
          transform: translateY(-1px);
          box-shadow: var(--shadow-lg);
        }

        /* GitHub Badge */
        .github-badge-header {
          display: none;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          height: 40px;
          background-color: var(--gray-100);
          color: var(--gray-700);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
          text-decoration: none;
          margin-left: var(--spacing-sm);
          padding: 0 var(--spacing-sm);
          gap: var(--spacing-xs);
        }

        .github-badge-header:hover {
          background-color: var(--primary-black);
          color: var(--primary-white);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .github-stars-count {
          font-size: 0.75rem;
          font-weight: var(--font-weight-semibold);
          white-space: nowrap;
        }

        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background-color: var(--primary-black);
          margin: 2px 0;
          transition: all var(--transition-normal);
            transform-origin: center;
        }

        .mobile-menu-toggle.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .mobile-menu-toggle.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid var(--gray-200);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-normal);
          box-shadow: var(--shadow-lg);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav {
          padding: var(--spacing-lg) var(--spacing-md);
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .mobile-nav-link {
          display: block;
          width: 100%;
          text-align: left;
          font-size: 1.125rem;
          font-weight: var(--font-weight-bold);
          color: var(--gray-700);
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobile-nav-link:hover {
          color: var(--primary-black);
          background-color: var(--gray-100);
        }

        .mobile-cta-container {
          margin-top: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--gray-200);
        }

        .mobile-cta-button {
          display: block;
          width: 100%;
          background-color: var(--primary-black);
          color: var(--primary-white);
          font-size: 1.125rem;
          font-weight: var(--font-weight-semibold);
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
          cursor: pointer;
        }

        .mobile-cta-button:hover {
          background-color: var(--gray-800);
          transform: translateY(-1px);
        }

        /* Responsive Design */
        @media (min-width: 768px) {
          .desktop-nav {
            display: block;
          }

          .cta-button-header {
            display: flex;
          }

          .github-badge-header {
            display: flex;
          }

          .mobile-menu-toggle {
            display: none;
          }

          .mobile-menu {
            display: none;
          }

          .header.scrolled .logo-text {
            color: var(--primary-black);
          }

          .header.scrolled .nav-link {
            color: var(--gray-700);
          }

          .header.scrolled .nav-link:hover {
            color: var(--primary-black);
          }
        }

        @media (max-width: 767px) {
          .header-container {
            height: 64px;
          }

          .logo-text {
            font-size: 1rem;
          }

          .header:not(.scrolled) {
            background-color: var(--primary-white);
          }

          .header:not(.scrolled).scrolled {
            background-color: rgba(255, 255, 255, 0.95);
          }
        }

        @media (max-width: 480px) {
          .header-container {
            padding: 0 var(--spacing-sm);
          }

          .logo-icon {
            width: 24px;
            height: 24px;
          }

          .logo-text {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
