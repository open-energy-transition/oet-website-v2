'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  url: string
  image?: string
}

export function ShareDialog({ isOpen, onClose, title, description, url, image }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-labelledby="share-dialog-title"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-32px)] max-w-[550px] bg-white dark:bg-gray-900 p-6 lg:px-8 lg:py-10 rounded-xl shadow-xl"
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
        <h2 id="share-dialog-title" className="text-2xl font-semibold mb-4">
          Share
        </h2>

        <div className="h-[0.5px] w-full bg-gray-300 dark:bg-gray-700 mb-6" />

        {/* Content preview */}
        <div className="flex items-stretch gap-6 mb-6">
          {image && (
            <div className="max-w-[150px] flex-shrink-0">
              <img src={image} alt="" className="w-full h-auto object-cover rounded" />
            </div>
          )}
          <div className="flex flex-col justify-between">
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
            )}
          </div>
        </div>

        {/* Share links */}
        <div className="flex flex-col gap-4 mb-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Share this link via
          </h4>
          <div className="flex items-center gap-8">
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-crimson-red  transition-colors"
            >
              Facebook
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-crimson-red transition-colors"
            >
              X (Twitter)
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="h-[0.5px] w-full bg-gray-300 dark:bg-gray-700 mb-6" />

        {/* Copy link */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 rounded-full border border-gray-300 dark:border-gray-700 px-5 py-3">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <input
              className="text-sm w-full bg-transparent outline-none text-gray-600 dark:text-gray-400"
              value={url}
              readOnly
            />
          </div>
          <button
            onClick={handleCopyLink}
            className={cn(
              'w-full py-3 px-5 rounded-full font-medium text-sm transition-colors',
              copied ? 'bg-green-900 text-white' : 'bg-crimson-red hover:bg-red-700 text-white',
            )}
          >
            {copied ? 'Copied to clipboard!' : 'Copy to clipboard'}
          </button>
        </div>
      </div>
    </>
  )
}
