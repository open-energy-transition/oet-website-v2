'use client'

import React from 'react'
import './index.scss'

const CustomHeader: React.FC = () => {
  const handleLogout = () => {
    window.location.href = '/admin/logout'
  }

  return (
    <div className="custom-header-actions">
      <button
        onClick={handleLogout}
        className="logout-header-btn"
        title="Logout"
        aria-label="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span>Logout</span>
      </button>
    </div>
  )
}

export default CustomHeader
