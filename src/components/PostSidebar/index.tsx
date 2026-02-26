'use client'

import React, { useState } from 'react'
import { TableOfContents } from '@/components/TableOfContents'
import { ShareDialog } from '@/components/ShareDialog'
import { CiteDialog } from '@/components/CiteDialog'
import { HeadingItem } from '@/utilities/extractHeadings'
import type { Post, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

interface PostSidebarProps {
  post: Post
  headings: HeadingItem[]
  url: string
}

export function PostSidebar({ post, headings, url }: PostSidebarProps) {
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showCiteDialog, setShowCiteDialog] = useState(false)

  // Get authors from populatedAuthors (includes users and team members)
  const populatedAuthorsNames =
    post.populatedAuthors?.map((author) => author.name).filter(Boolean) || []

  const customAuthorsData = post.customAuthors || []
  const customAuthorsNames = customAuthorsData.map((author) => author.fullName)

  const allAuthors = [...populatedAuthorsNames, ...customAuthorsNames] as string[]

  // Get meta image
  const metaImage =
    typeof post.meta?.image === 'object' && post.meta?.image !== null
      ? (post.meta.image as Media).url || ''
      : ''

  // Get related posts
  const relatedPosts = post.relatedPosts?.filter((p) => typeof p === 'object' && p !== null) || []

  // Get resources
  const resources = post.resources || []
  console.log('post.authors', post, customAuthorsData)
  return (
    <>
      <div className="hidden lg:block min-h-full w-[0.5px] bg-gray-300 dark:bg-gray-700" />

      <div className="min-h-full w-full flex-1 lg:max-w-[350px]">
        <div className="sticky top-[calc(var(--header-height,80px)+16px)] flex h-full flex-col gap-4 overflow-hidden lg:max-h-[calc(100vh-var(--header-height,80px)-32px)]">
          {/* Authors Section */}
          {((post.populatedAuthors && post.populatedAuthors.length > 0) ||
            (customAuthorsData && customAuthorsData.length > 0)) && (
            <div className="flex flex-col gap-4 border-b border-gray-300 dark:border-gray-700 pb-8">
              <h5 className="text-xs uppercase text-gray-600 dark:text-gray-400 font-medium">
                Authors
              </h5>
              <div className="flex flex-col space-y-6">
                {post.populatedAuthors?.map((author, index) => {
                  if (typeof author === 'object' && author !== null) {
                    return (
                      <div key={index} className="flex items-start gap-4">
                        {author.image ? (
                          <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 relative">
                            <Image
                              src={author.image}
                              alt={author.name || ''}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {author.name?.charAt(0).toUpperCase() || '?'}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col justify-between">
                          <p className="text-sm font-medium">{author.name}</p>
                          {author.jobTitle && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {author.jobTitle}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
                {customAuthorsData.map((author, index) => (
                  <div key={`custom-${index}`} className="flex items-start gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {author.fullName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="text-sm font-medium">{author.fullName}</p>
                      {author.title && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{author.title}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8 overflow-y-auto">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <aside className="flex flex-col gap-4 border-b border-gray-300 dark:border-gray-700 pb-8">
                <h5 className="text-xs uppercase text-gray-600 dark:text-gray-400 font-medium">
                  On this page
                </h5>
                <TableOfContents headings={headings} />
              </aside>
            )}

            {/* Resources Section */}
            {resources.length > 0 && (
              <div className="flex flex-col gap-4 border-b border-gray-300 dark:border-gray-700 pb-8">
                <h5 className="text-xs uppercase text-gray-600 dark:text-gray-400 font-medium">
                  Resources
                </h5>
                <div className="flex flex-col gap-2">
                  {resources.map((resource, index) => {
                    const fileUrl =
                      resource.resourceType === 'upload' &&
                      typeof resource.file === 'object' &&
                      resource.file !== null
                        ? (resource.file as Media).url
                        : resource.externalLink

                    return (
                      <a
                        key={index}
                        href={fileUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium flex items-center gap-2 hover:text-crimson-red transition-colors"
                      >
                        <span className="rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </span>
                        <span>{resource.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Share & Cite Buttons */}
            <div className="flex gap-2 border-b border-gray-300 dark:border-gray-700 pb-8">
              <button
                onClick={() => setShowShareDialog(true)}
                className="text-sm px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Share
              </button>
              <button
                onClick={() => setShowCiteDialog(true)}
                className="text-sm px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cite
              </button>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="pb-8">
                <div className="flex flex-col gap-4">
                  <h5 className="text-xs uppercase text-gray-600 dark:text-gray-400 font-medium">
                    Related articles
                  </h5>
                  <div className="flex flex-col gap-4">
                    {relatedPosts.map((relatedPost) => {
                      const postData = relatedPost as Post
                      return (
                        <Link
                          key={postData.id}
                          href={`/posts/${postData.slug}`}
                          className="flex items-baseline gap-2 group"
                        >
                          <h4 className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {postData.title}
                          </h4>
                          <svg
                            className="w-2.5 h-2.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        title={post.title}
        description={post.shortDescription}
        url={url}
        image={metaImage}
      />

      <CiteDialog
        isOpen={showCiteDialog}
        onClose={() => setShowCiteDialog(false)}
        title={post.title}
        authors={allAuthors}
        publishedDate={post.publishedAt || undefined}
        url={url}
      />
    </>
  )
}
