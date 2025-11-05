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
    { label: '🏷️ Categorie', href: '/admin/collections/categories' },
    { label: '🖼️ Media', href: '/admin/collections/media' },
    { label: '👤 User', href: '/admin/collections/users' },
    { label: '👥 Team Members', href: '/admin/collections/team-members' },
    { label: '🗂️ Staff Categories', href: '/admin/collections/staff' },
    { label: '📊 Departments', href: '/admin/collections/departments' },
    { label: '💬 Customer Testimonials', href: '/admin/collections/testimonials' },
    { label: '🖌️ Icons', href: '/admin/collections/icons' },
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
              src="/oet-logo-red-n-subtitle.png"
              width={isCollapsed ? 40 : 140}
              height={isCollapsed ? 40 : 140}
              alt="oet-logo"
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
      </div>
    </aside>
  )
}

export default CustomNav
