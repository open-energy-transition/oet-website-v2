'use client'
import React, { useState } from 'react'

// ReadMoreSection component
type ReadMoreSectionProps = { text: string; project?: any }
const ReadMoreSection: React.FC<ReadMoreSectionProps> = ({ text }) => {
  const [expanded, setExpanded] = useState(false)
  const maxLength = 145
  const isLong = text.length > maxLength
  const displayText = expanded || !isLong ? text : text.slice(0, maxLength) + '...'

  return (
    <div className="font-heebo font-normal text-lg leading-normal mb-9 relative">
      <div>{displayText}</div>
      {isLong && (
        <div className="flex justify-end">
          <button
            className="px-2 py-1 bg-gray-600 absolute text-white rounded hover:bg-gray-700 transition text-sm font-medium"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ReadMoreSection
