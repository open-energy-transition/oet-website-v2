import React from 'react'

export const IconOption = ({ data }: { data: any }) => {
  console.log(123123)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Render SVG if available */}
      {data.svg && (
        <span
          style={{ width: 24, height: 24, display: 'inline-block' }}
          dangerouslySetInnerHTML={{ __html: data.svg }}
        />
      )}
      <span className="2312321">{data.name}</span>
    </div>
  )
}
