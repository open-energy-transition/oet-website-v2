import React from 'react'

export const ButtonColorOption = ({ label, value }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      background: getColorBg(value),
      color: getColorText(value),
      marginRight: 8,
    }}
  >
    {label}
  </span>
)

function getColorBg(value: string) {
  switch (value) {
    case 'primary':
      return '#3b82f6'
    case 'secondary':
      return '#6b7280'
    case 'success':
      return '#22c55e'
    case 'warning':
      return '#facc15'
    case 'danger':
      return '#ef4444'
    case 'gray':
      return '#d1d5db'
    default:
      return '#f3f4f6'
  }
}
function getColorText(value: string) {
  return ['warning', 'default', 'gray'].includes(value) ? '#000' : '#fff'
}
