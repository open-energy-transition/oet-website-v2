'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useNav } from '@payloadcms/ui'
// import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import './index.scss'
import Link from 'next/link'

const CustomNav: React.FC = () => {
  const [isCollapsed] = useState(false)
  const { navOpen, setNavOpen } = useNav()
  const pathname = usePathname()

  // Check for dark mode from document attribute
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Sync with global theme
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      setIsDarkMode(theme === 'dark')
    }

    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Prevent body scroll when nav is open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 1336 // PayloadCMS mobile breakpoint

    if (navOpen && isMobile) {
      // Prevent scrolling on body only
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'

      // Prevent touch scrolling on mobile
      const preventDefault = (e: TouchEvent) => {
        // Allow scrolling within the navigation
        if (e.target && !(e.target as Element).closest('.nav__scroll')) {
          e.preventDefault()
        }
      }

      document.addEventListener('touchmove', preventDefault, { passive: false })

      // Store the cleanup function
      return () => {
        document.removeEventListener('touchmove', preventDefault)
      }
    } else {
      // Re-enable scrolling
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [navOpen])

  const navItems = [
    { label: '📄 Pages', href: '/admin/collections/pages' },
    { label: '📝 Posts', href: '/admin/collections/posts' },
    { label: '🚀 Projects', href: '/admin/collections/projects' },
    { label: '📱 Models', href: '/admin/collections/models' },
    { label: '🏷️ Categories', href: '/admin/collections/categories' },
    { label: '🖼️ Media', href: '/admin/collections/media' },
    { label: '👤 User', href: '/admin/collections/users' },
    { label: '👥 Team Members', href: '/admin/collections/team-members' },
    { label: '🗂️ Staff Categories', href: '/admin/collections/staff' },
    { label: '📊 Departments', href: '/admin/collections/departments' },
    { label: '💬 Customer Testimonials', href: '/admin/collections/testimonials' },
    { label: '🖌️ Icons', href: '/admin/collections/icons' },
    { label: '📤 Outputs', href: '/admin/collections/outputs' },
  ]

  const globalItems = [
    { label: '🔝 Header', href: '/admin/globals/header' },
    { label: '🔻 Footer', href: '/admin/globals/footer' },
  ]

  // Check if current path matches nav item
  const isActive = (href: string) => {
    if (!pathname) return false
    return pathname === href || pathname.startsWith(href)
  }

  return (
    <aside
      className={`nav nav--nav-animate nav--nav-hydrated custom-nav ${isCollapsed ? 'collapsed' : 'nav--nav-open'}`}
    >
      <div className="nav__scroll">
        {/* Mobile Close Button */}
        <div className="nav-mobile-header">
          <button
            className="nav-mobile-close"
            onClick={() => setNavOpen(false)}
            aria-label="Close Navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Logo Section */}
        <div className="nav-logo">
          <Link href="/admin">
            <Image
              src={isDarkMode ? '/oet-logo-white.png' : '/oet-logo-red-n-subtitle.png'}
              width={isCollapsed ? 40 : 140}
              height={isCollapsed ? 40 : 140}
              alt="oet-logo"
              className="nav-logo-img"
            />
          </Link>
        </div>

        {/* Collections Section */}
        <div className="nav-section">
          {!isCollapsed && <div className="section-title">COLLECTIONS</div>}
          <div className="nav-wrapper">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                title={isCollapsed ? item.label.substring(2) : ''}
              >
                <span className="nav-icon">{item.label.split(' ')[0]}</span>
                {!isCollapsed && <span className="nav-text">{item.label.substring(2)}</span>}
              </a>
            ))}
          </div>
        </div>

        {/* Globals Section */}
        <div className="nav-section">
          {!isCollapsed && <div className="section-title">GLOBALS</div>}
          <div className="nav-wrapper">
            {globalItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                title={isCollapsed ? item.label.substring(2) : ''}
              >
                <span className="nav-icon">{item.label.split(' ')[0]}</span>
                {!isCollapsed && <span className="nav-text">{item.label.substring(2)}</span>}
              </a>
            ))}
          </div>
        </div>
        {/* Dark Mode Toggle */}
        <div className="nav-theme-toggle">
          <button
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              // Sun Icon for Light Mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              // Moon Icon for Dark Mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
            {!isCollapsed && (
              <span className="theme-toggle-text">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default CustomNav
