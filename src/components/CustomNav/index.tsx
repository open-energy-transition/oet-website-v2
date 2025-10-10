'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { useNav } from '@payloadcms/ui'
// import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import './index.scss'
import Link from 'next/link'

const CustomNav: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { navOpen, setNavOpen } = useNav()
  const pathname = usePathname()

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
  ]

  const globalItems = [
    { label: '🔝 Header', href: '/admin/globals/header' },
    { label: '🔻 Footer', href: '/admin/globals/footer' },
  ]

  const toggleNav = () => {
    setIsCollapsed(!isCollapsed)
    setNavOpen(!navOpen)
  }

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
