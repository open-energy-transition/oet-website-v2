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
              <h2 className="text-5xl font-semibold text-gray-black-500 dark:text-white mb-4">
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
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16817 16.6667L4.16797 11.6667"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
              <path
                d="M4.16797 9.16662V3.33325"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
              <path
                d="M7.5 6.66666H12.5"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
              <path
                d="M1.66797 11.6667H6.66797"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
              <path
                d="M13.332 10H18.332"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
              <path
                d="M10 6.66668L10.0002 3.33334"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
              <path
                d="M10.0003 16.6667L10 9.16666"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
              <path
                d="M15.832 9.99995V3.33325"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
              <path
                d="M15.8323 16.6667L15.832 12.5"
                stroke="#4A4C56"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="dark:stroke-white"
              />
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
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-10">
              <button
                onClick={() => {
                  setSortBy('category')
                  setShowSortDropdown(false)
                }}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-t-lg',
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

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => {
          const postCategories = Array.isArray(post.categories)
            ? post.categories.filter(
                (cat): cat is Category => typeof cat === 'object' && cat !== null,
              )
            : []

          return (
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
          )
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No posts found in this category.
        </div>
      )}
    </div>
  )
}
