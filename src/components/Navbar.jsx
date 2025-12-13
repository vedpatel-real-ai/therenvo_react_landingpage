import './Navbar.css';
import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen(prev => !prev);
        // Prevent body scroll when menu is open
        document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
    }, [mobileMenuOpen]);

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false);
        document.body.style.overflow = '';
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const handleResize = () => {
            if (window.innerWidth > 768 && mobileMenuOpen) {
                closeMobileMenu();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen, closeMobileMenu]);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                closeMobileMenu();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [mobileMenuOpen, closeMobileMenu]);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/features', label: 'Features' },
        { to: '/pricing', label: 'Pricing' },
    ];

    return (
        <>
            <nav 
                className={`renvo-nav ${scrolled ? 'renvo-nav--scrolled' : ''}`} 
                aria-label="Main navigation"
            >
                <div className="renvo-nav__container">
                    {/* Logo */}
                    <NavLink to="/" className="renvo-nav__logo" onClick={closeMobileMenu}>
                        <span className="renvo-nav__logo-text">The Renvo</span>
                        <span className="renvo-nav__logo-dot">.</span>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="renvo-nav__desktop">
                        <ul className="renvo-nav__links">
                            {navLinks.map(({ to, label }) => (
                                <li key={to} className="renvo-nav__item">
                                    <NavLink 
                                        to={to} 
                                        className={({ isActive }) => 
                                            `renvo-nav__link ${isActive ? 'renvo-nav__link--active' : ''}`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <NavLink to="/download" className="renvo-nav__cta">
                            <span>Download</span>
                            <svg 
                                className="renvo-nav__cta-icon" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className={`renvo-nav__toggle ${mobileMenuOpen ? 'renvo-nav__toggle--active' : ''}`}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="renvo-mobile-menu"
                        onClick={toggleMobileMenu}
                    >
                        <span className="renvo-nav__toggle-line"></span>
                        <span className="renvo-nav__toggle-line"></span>
                        <span className="renvo-nav__toggle-line"></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`renvo-nav__overlay ${mobileMenuOpen ? 'renvo-nav__overlay--visible' : ''}`}
                onClick={closeMobileMenu}
                aria-hidden="true"
            />

            {/* Mobile Menu */}
            <div 
                id="renvo-mobile-menu"
                className={`renvo-nav__mobile ${mobileMenuOpen ? 'renvo-nav__mobile--open' : ''}`}
                aria-hidden={!mobileMenuOpen}
            >
                <div className="renvo-nav__mobile-content">
                    <ul className="renvo-nav__mobile-links">
                        {navLinks.map(({ to, label }, index) => (
                            <li 
                                key={to} 
                                className="renvo-nav__mobile-item"
                                style={{ transitionDelay: `${index * 50 + 100}ms` }}
                            >
                                <NavLink 
                                    to={to} 
                                    className={({ isActive }) => 
                                        `renvo-nav__mobile-link ${isActive ? 'renvo-nav__mobile-link--active' : ''}`
                                    }
                                    onClick={closeMobileMenu}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div 
                        className="renvo-nav__mobile-cta-wrapper"
                        style={{ transitionDelay: '250ms' }}
                    >
                        <NavLink 
                            to="/download" 
                            className="renvo-nav__mobile-cta"
                            onClick={closeMobileMenu}
                        >
                            <span>Download Now</span>
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path 
                                    fillRule="evenodd" 
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;