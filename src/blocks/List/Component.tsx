import React from 'react'

type ListItem = {
  title: string
  description?: string | null
}

type ListBlockProps = {
  items: ListItem[]
  direction?: 'vertical' | 'horizontal'
  type?: 'normal' | 'tag'
  title?: string
}

export const ListBlockComponent: React.FC<ListBlockProps> = ({ items }) => (
  <ul>
    {items?.map((item, idx) => (
      <li key={idx}>
        <strong>{item.title}</strong>
        {item.description && <p>{item.description}</p>}
      </li>
    ))}
  </ul>
)
