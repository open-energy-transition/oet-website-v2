'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import type { Post, Category } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface OurBlogClientProps {
  title?: string | null
  description?: string | null
  blockType: 'ourBlog'
  id?: string
  posts: Post[]
  categories: Category[]
}

export const OurBlogClient: React.FC<OurBlogClientProps> = ({
  title,
  description,
  posts,
  categories,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'category' | 'title' | 'date'>('category')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Set active tab from URL hash on mount and hash change
  useEffect(() => {
    const setTabFromHash = () => {
      const hash = window.location.hash.slice(1) // Remove the # symbol
      if (hash) {
        // Find category by slug matching the hash
        const matchingCategory = categories.find((cat) => cat.slug === hash)
        if (matchingCategory) {
          setActiveTab(matchingCategory.id.toString())
        }
      }
    }

    // Set initial tab from hash
    setTabFromHash()

    // Listen for hash changes
    window.addEventListener('hashchange', setTabFromHash)
    return () => window.removeEventListener('hashchange', setTabFromHash)
  }, [categories])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by category if not "all"
    if (activeTab !== 'all') {
      filtered = posts.filter((post) => {
        if (!post.categories || !Array.isArray(post.categories)) return false
        return post.categories.some((cat) => {
          const categoryId = typeof cat === 'object' ? cat.id : cat
          return categoryId.toString() === activeTab
        })
      })
    }

    // Sort based on selected sort option
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'category': {
          const aCat =
            Array.isArray(a.categories) && a.categories.length > 0
              ? typeof a.categories[0] === 'object'
                ? a.categories[0].title
                : ''
              : ''
          const bCat =
            Array.isArray(b.categories) && b.categories.length > 0
              ? typeof b.categories[0] === 'object'
                ? b.categories[0].title
                : ''
              : ''
          return aCat.localeCompare(bCat)
        }
        case 'title':
          return (a.title || '').localeCompare(b.title || '')
        case 'date': {
          const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
          const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
          return bDate - aDate // Most recent first
        }
        default:
          return 0
      }
    })
  }, [activeTab, posts, sortBy])

  return (
    <div className="container -my-8 lg:my-0">
      {/* Title and Description */}
      {(title || description) && (
        <div className="mb-8 lg:flex">
          <div className="lg:w-1/2">
            {title && (
              <h2 className="font-oxanium text-5xl font-semibold text-gray-black-500 dark:text-white mb-4">
                {title}
              </h2>
            )}
          </div>
          <div className="lg:w-1/2">
            {description && (
              <p className="text-base font-normal text-gray-black-300 dark:text-white">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Category Tabs and Sort Button */}
      <div className="lg:flex items-center justify-between mb-8">
        <nav className="grid mb-4 lg:mb-0 lg:flex lg:space-x-8 lg:overflow-x-auto flex-1">
          <button
            onClick={() => {
              setActiveTab('all')
              window.history.pushState(null, '', '#')
            }}
            className={cn(
              'py-2 px-1 border-b-2 font-heebo lg:text-lg whitespace-nowrap transition-colors min-w-12',
              activeTab === 'all'
                ? 'border-red-600 dark:text-white text-gray-black-500 font-bold'
                : 'border-transparent text-gray-black-300 hover:text-gray-black-500 hover:border-gray-300 dark:text-white dark:hover:text-gray-300',
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveTab(category.id.toString())
                window.history.pushState(null, '', `#${category.slug}`)
              }}
              className={cn(
                'py-2 px-1 border-b-2 font-heebo text-lg whitespace-nowrap transition-colors min-w-12',
                activeTab === category.id.toString()
                  ? 'border-red-600 dark:text-white text-gray-black-500 font-bold'
                  : 'border-transparent text-gray-black-300 hover:text-gray-black-500 hover:border-gray-300 dark:text-white dark:hover:text-gray-300',
              )}
            >
              {category.title}
            </button>
          ))}
        </nav>

        {/* Sort Dropdown */}
        <div ref={dropdownRef} className="relative ml-4 flex lg:block justify-end">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 rounded-3xl py-4 px-6 border border-[#DFE1E7] transition-colors dark:border-dark-blue-gray"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              height="800px"
              width="800px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <g>
                    <path d="M420.418,91.582L335.085,6.248c-0.004-0.004-0.008-0.006-0.011-0.01c-0.494-0.493-1.012-0.96-1.552-1.403     c-0.247-0.203-0.507-0.379-0.761-0.569c-0.303-0.227-0.6-0.462-0.916-0.673c-0.304-0.203-0.619-0.379-0.931-0.565     c-0.286-0.171-0.565-0.35-0.859-0.508c-0.318-0.17-0.644-0.314-0.969-0.467c-0.307-0.145-0.609-0.298-0.923-0.429     c-0.315-0.13-0.637-0.236-0.957-0.35c-0.337-0.121-0.669-0.25-1.013-0.354c-0.32-0.097-0.646-0.168-0.969-0.249     c-0.351-0.089-0.698-0.187-1.055-0.258c-0.375-0.074-0.753-0.119-1.13-0.173c-0.311-0.044-0.617-0.104-0.933-0.135     c-1.4-0.138-2.811-0.138-4.211,0c-0.315,0.031-0.621,0.09-0.933,0.135c-0.377,0.054-0.756,0.098-1.13,0.173     c-0.358,0.071-0.704,0.169-1.055,0.258c-0.324,0.081-0.649,0.152-0.969,0.249c-0.344,0.104-0.677,0.233-1.013,0.354     c-0.32,0.115-0.642,0.22-0.957,0.35c-0.315,0.13-0.616,0.284-0.923,0.429c-0.324,0.153-0.651,0.297-0.969,0.467     c-0.294,0.158-0.573,0.337-0.859,0.508c-0.312,0.186-0.627,0.362-0.931,0.565c-0.316,0.211-0.612,0.446-0.916,0.673     c-0.254,0.19-0.514,0.366-0.761,0.569c-0.54,0.443-1.059,0.91-1.552,1.403c-0.004,0.004-0.008,0.006-0.011,0.01l-85.333,85.333     c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0l48.915-48.915V320c0,11.782,9.551,21.333,21.333,21.333     s21.333-9.551,21.333-21.333V72.837l48.915,48.915c8.331,8.331,21.839,8.331,30.17,0     C428.749,113.42,428.749,99.913,420.418,91.582z" />
                    <path d="M262.248,390.248l-48.915,48.915V192c0-11.782-9.551-21.333-21.333-21.333c-11.782,0-21.333,9.551-21.333,21.333v247.163     l-48.915-48.915c-8.331-8.331-21.839-8.331-30.17,0s-8.331,21.839,0,30.17l85.333,85.333c0.004,0.004,0.008,0.007,0.012,0.011     c0.493,0.492,1.012,0.959,1.551,1.402c0.247,0.203,0.508,0.379,0.762,0.57c0.303,0.227,0.6,0.462,0.915,0.673     c0.304,0.203,0.619,0.379,0.931,0.565c0.286,0.171,0.565,0.35,0.859,0.507c0.318,0.17,0.645,0.314,0.97,0.467     c0.306,0.145,0.608,0.298,0.922,0.428c0.315,0.13,0.637,0.236,0.957,0.35c0.337,0.121,0.669,0.25,1.013,0.354     c0.32,0.097,0.645,0.168,0.969,0.249c0.351,0.089,0.698,0.187,1.056,0.258c0.375,0.074,0.753,0.118,1.13,0.172     c0.311,0.044,0.618,0.104,0.933,0.135c1.4,0.138,2.811,0.138,4.211,0c0.315-0.031,0.621-0.09,0.933-0.135     c0.377-0.054,0.756-0.098,1.13-0.173c0.358-0.071,0.704-0.169,1.055-0.258c0.324-0.081,0.649-0.152,0.969-0.249     c0.344-0.104,0.677-0.233,1.013-0.354c0.32-0.115,0.642-0.22,0.957-0.35c0.314-0.13,0.615-0.283,0.921-0.428     c0.325-0.153,0.653-0.297,0.971-0.468c0.293-0.157,0.572-0.336,0.857-0.506c0.312-0.186,0.628-0.363,0.932-0.566     c0.315-0.211,0.611-0.445,0.913-0.671c0.255-0.191,0.516-0.368,0.764-0.571c0.535-0.439,1.05-0.903,1.54-1.392     c0.008-0.007,0.016-0.014,0.023-0.021l85.333-85.333c8.331-8.331,8.331-21.839,0-30.17S270.58,381.917,262.248,390.248z" />
                  </g>
                </g>
              </g>
            </svg>
            {sortBy === 'category' ? 'Categories' : sortBy === 'title' ? 'Title' : 'Date'}
            <svg
              className={cn('w-4 h-4 transition-transform', showSortDropdown && 'rotate-180')}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.25 6.875L10 13.125L3.75 6.875"
                stroke="#4A4C56"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-lg z-10">
              <button
                onClick={() => {
                  setSortBy('category')
                  setShowSortDropdown(false)
                }}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  sortBy === 'category' && 'bg-gray-100 dark:bg-gray-700 font-medium',
                )}
              >
                Category
              </button>
              <button
                onClick={() => {
                  setSortBy('title')
                  setShowSortDropdown(false)
                }}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  sortBy === 'title' && 'bg-gray-100 dark:bg-gray-700 font-medium',
                )}
              >
                Title
              </button>
              <button
                onClick={() => {
                  setSortBy('date')
                  setShowSortDropdown(false)
                }}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-b-lg',
                  sortBy === 'date' && 'bg-gray-100 dark:bg-gray-700 font-medium',
                )}
              >
                Published Date
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid - 2 rows layout */}
      <div className="space-y-6">
        {/* First row - 3 items */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-start border border-[#D9DCDA] border-t-0 rounded-xl dark:border-dark-blue-gray"
            >
              {post.heroImage && (
                <Media
                  resource={post.heroImage}
                  className="dark:border-t dark:border-dark-blue-gray object-cover w-full h-[217px] rounded-xl overflow-hidden"
                  imgClassName="rounded-xl"
                />
              )}
              <div className="p-6 w-full">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  {post.categories && post.categories.length > 0 && (
                    <div className="mt-2 gap-2 flex flex-wrap">
                      {post.categories
                        .filter(
                          (category): category is Category =>
                            typeof category === 'object' && category !== null,
                        )
                        .map((category, i) => (
                          <Link
                            key={i}
                            href={`/categories/${category.slug}`}
                            className="inline-block px-3 py-1.5 text-gray-black-500 rounded-xl dark:!text-white bg-[#ECEFF3] dark:bg-transparent transition-colors dark:border dark:border-dark-blue-gray"
                          >
                            {category.title}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex text-gray-black-400 dark:text-white text-base mb-4">
                  {post.pDate ? <div>{post.pDate}</div> : <></>}
                  {post.pDate && post.minRead ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C13.11 14 14 13.11 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z"
                        fill="#777980"
                      />
                    </svg>
                  ) : (
                    <></>
                  )}
                  {post.minRead ? <div>{post.minRead}</div> : <></>}
                </div>

                <Link
                  href={`/posts/${post.slug}`}
                  className="text-2xl font-medium mb-1 customTextState-size-h8 text-gray-black-500 min-h-[40px] overflow-hidden line-clamp-3 text-ellipsis dark:!text-white"
                  aria-label={`View details for project: ${post.title}`}
                >
                  {post.title}
                </Link>
                <div className="text-gray-black-400 text-base dark:text-white">
                  {post.shortDescription}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Second row - remaining items, 3 per row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.slice(3).map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-start border border-[#D9DCDA] border-t-0 rounded-xl dark:border-dark-blue-gray"
            >
              {post.heroImage && (
                <Media
                  resource={post.heroImage}
                  className="dark:border-t dark:border-dark-blue-gray object-cover w-full h-[217px] rounded-xl overflow-hidden"
                  imgClassName="rounded-xl"
                />
              )}
              <div className="p-6 w-full">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  {post.categories && post.categories.length > 0 && (
                    <div className="mt-2 gap-2 flex flex-wrap">
                      {post.categories
                        .filter(
                          (category): category is Category =>
                            typeof category === 'object' && category !== null,
                        )
                        .map((category, i) => (
                          <Link
                            key={i}
                            href={`/categories/${category.slug}`}
                            className="inline-block px-3 py-1.5 text-gray-black-500 rounded-xl dark:!text-white bg-[#ECEFF3] dark:bg-transparent transition-colors dark:border dark:border-dark-blue-gray"
                          >
                            {category.title}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex text-gray-black-400 dark:text-white text-base mb-4">
                  {post.pDate ? <div>{post.pDate}</div> : <></>}
                  {post.pDate && post.minRead ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C13.11 14 14 13.11 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z"
                        fill="#777980"
                      />
                    </svg>
                  ) : (
                    <></>
                  )}
                  {post.minRead ? <div>{post.minRead}</div> : <></>}
                </div>

                <Link
                  href={`/posts/${post.slug}`}
                  className="text-2xl font-medium mb-1 customTextState-size-h8 text-gray-black-500 min-h-[40px] overflow-hidden line-clamp-3 text-ellipsis dark:!text-white"
                  aria-label={`View details for project: ${post.title}`}
                >
                  {post.title}
                </Link>
                <div className="text-gray-black-400 text-base dark:text-white">
                  {post.shortDescription}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No posts found in this category.
        </div>
      )}
    </div>
  )
}
