'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'

interface CiteDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  authors: string[]
  publishedDate?: string
  url: string
}

export function CiteDialog({
  isOpen,
  onClose,
  title,
  authors,
  publishedDate,
  url,
}: CiteDialogProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const authorsString = authors.join(', ')
  const currentYear = new Date().getFullYear()
  const accessDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // APA Format
  const apaCitation = `${authorsString}. (${publishedDate ? new Date(publishedDate).getFullYear() : currentYear}). ${title}. Retrieved ${accessDate}, from ${url}`

  // MLA Format
  const mlaCitation = `${authorsString}. "${title}." Web. ${accessDate}. <${url}>`

  // Chicago Format
  const chicagoCitation = `${authorsString}. "${title}." Accessed ${accessDate}. ${url}.`

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-labelledby="cite-dialog-title"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-32px)] max-w-[600px] bg-white dark:bg-gray-900 p-6 lg:px-8 lg:py-10 rounded-lg shadow-xl max-h-[80vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer hover:opacity-70"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 id="cite-dialog-title" className="text-2xl font-semibold mb-4">
          Cite this article
        </h2>

        <div className="h-[0.5px] w-full bg-gray-300 dark:bg-gray-700 mb-6" />

        {/* Citation formats */}
        <div className="flex flex-col gap-6">
          {/* APA */}
          <div>
            <h3 className="text-sm font-semibold mb-2">APA</h3>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm mb-3">{apaCitation}</p>
              <button
                onClick={() => handleCopy(apaCitation)}
                className={cn(
                  'text-sm px-4 py-2 rounded-full transition-colors',
                  copied ? 'bg-green-900 text-white' : 'bg-crimson-red hover:bg-red-700 text-white',
                )}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* MLA */}
          <div>
            <h3 className="text-sm font-semibold mb-2">MLA</h3>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm mb-3">{mlaCitation}</p>
              <button
                onClick={() => handleCopy(mlaCitation)}
                className={cn(
                  'text-sm px-4 py-2 rounded-full transition-colors',
                  copied ? 'bg-green-900 text-white' : 'bg-crimson-red hover:bg-red-700 text-white',
                )}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Chicago */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Chicago</h3>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm mb-3">{chicagoCitation}</p>
              <button
                onClick={() => handleCopy(chicagoCitation)}
                className={cn(
                  'text-sm px-4 py-2 rounded-full transition-colors',
                  copied ? 'bg-green-900 text-white' : 'bg-crimson-red hover:bg-red-700 text-white',
                )}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
