import React from 'react'

const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        color: 'var(--theme-text)',
      }}
    >
      🌟 OET CMS
    </div>
  )
}

export default Logo
