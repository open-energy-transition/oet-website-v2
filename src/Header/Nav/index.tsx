'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{
  data: HeaderType
  isMobile?: boolean
  onLinkClick?: () => void
}> = ({ data, isMobile = false, onLinkClick }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  // Set all menu items to be expanded by default for mobile - using array of all indices
  const [activeDropdownMobile, setActiveDropdownMobile] = useState<number[]>(
    navItems.map((_, index) => index),
  )
  // Desktop uses single dropdown at a time (hover-based)
  const [activeDropdownDesktop, setActiveDropdownDesktop] = useState<number | null>(null)

  if (isMobile) {
    return (
      <div className="mt-6 flow-root h-[70vh] overflow-y-auto">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {navItems.map(({ link }, i) => {
              const hasSublinks = link?.sublinks && link.sublinks.length > 0
              const isExpanded = activeDropdownMobile.includes(i)

              return (
                <div key={i}>
                  {/* Main navigation item */}
                  {hasSublinks
                    ? // Expandable item with link and dropdown arrow
                      (() => {
                        const href =
                          link.type === 'reference' &&
                          typeof link.reference?.value === 'object' &&
                          link.reference.value.slug
                            ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}`
                            : link.url || '#'

                        const isActive = pathname === href

                        return (
                          <div
                            className={cn(
                              'flex items-center gap-1 rounded-lg',
                              isActive && 'bg-[#E31937] ml-2 rounded-xl',
                            )}
                          >
                            <Link
                              href={href}
                              onClick={onLinkClick}
                              className={cn(
                                'flex-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xl/7 lg:text-base/7 font-normal dark:!text-white text-gray-black-300',
                                isActive ? '!text-white' : 'hover:bg-white hover:bg-opacity-20',
                              )}
                              {...(link.newTab
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                            >
                              {link.label}
                            </Link>
                            <button
                              onClick={() => {
                                if (isExpanded) {
                                  setActiveDropdownMobile(
                                    activeDropdownMobile.filter((index) => index !== i),
                                  )
                                } else {
                                  setActiveDropdownMobile([...activeDropdownMobile, i])
                                }
                              }}
                              className={cn(
                                'p-2 rounded-lg',
                                isActive ? '' : 'hover:bg-white hover:bg-opacity-20',
                              )}
                              aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
                            >
                              <svg
                                width="9"
                                height="6"
                                viewBox="0 0 9 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`inline-block transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  className={cn(
                                    'dark:text-white dark:fill-white',
                                    isActive && 'text-white',
                                  )}
                                  d="M4.7842 5.5036C4.62722 5.66547 4.37276 5.66547 4.21578 5.5036L0.117729 1.27793C-0.0392429 1.11606 -0.0392429 0.853673 0.117729 0.691808L0.307216 0.496399C0.464187 0.334534 0.718689 0.334534 0.875666 0.496399L4.49999 4.23361L8.12434 0.496399C8.28132 0.334534 8.53578 0.334534 8.69276 0.496399L8.88227 0.691808C9.03924 0.853673 9.03924 1.11606 8.88227 1.27793L4.7842 5.5036Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                        )
                      })()
                    : // Regular link item
                      (() => {
                        const href =
                          link.type === 'reference' &&
                          typeof link.reference?.value === 'object' &&
                          link.reference.value.slug
                            ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}`
                            : link.url || '#'

                        const isActive = pathname === href

                        return (
                          <Link
                            href={href}
                            onClick={onLinkClick}
                            className={cn(
                              'flex items-center gap-2 rounded-lg font-normal px-3 py-2 text-xl/7 lg:text-base/7 dark:!text-white hover:bg-white hover:bg-opacity-20 text-gray-black-300',
                              isActive &&
                                'bg-[#E31937] rounded-xl !text-white hover:bg-[#E31937] ml-2',
                            )}
                            {...(link.newTab
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                          >
                            {link.label}
                          </Link>
                        )
                      })()}

                  {/* Sublinks - shown when expanded */}
                  {hasSublinks && isExpanded && (
                    <div className="mt-2 space-y-1">
                      {link.sublinks?.map((sublink, j) => {
                        const href =
                          link.type === 'reference' &&
                          typeof link.reference?.value === 'object' &&
                          link.reference.value.slug
                            ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}#${sublink.hash}`
                            : `${link.url}#${sublink.hash}`

                        const isActive =
                          pathname + (typeof window !== 'undefined' ? window.location.hash : '') ===
                          href

                        return (
                          <a
                            key={j}
                            href={href}
                            onClick={onLinkClick}
                            className={cn(
                              'flex items-center gap-2 rounded-lg px-3 py-2 text-lg/7 lg:text-base/7 font-normal ml-4 dark:!text-white text-gray-black-300',
                              isActive &&
                                'bg-[#E31937] !text-white hover:bg-[#E31937] ml-4 rounded-xl',
                            )}
                            {...(link.newTab
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                          >
                            {sublink.label}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Desktop navigation
  return (
    <nav className="flex items-center gap-1 xl:gap-8">
      {navItems.map(({ link }, i) => {
        const hasSublinks = link?.sublinks && link.sublinks.length > 0

        return (
          <div
            key={i}
            className="relative group"
            onMouseEnter={() => hasSublinks && setActiveDropdownDesktop(i)}
            onMouseLeave={() => setActiveDropdownDesktop(null)}
          >
            <div className="flex items-center">
              <CMSLink
                {...link}
                appearance={'link'}
                className="text-gray-black-300 dark:!text-white font-poppins font-normal text-[14px] leading-[16px] tracking-[0%] items-center"
              />
            </div>

            {hasSublinks && (
              <div
                className={`absolute left-0 mt-0 w-48 bg-white dark:!bg-[#1a1f2e] shadow-lg rounded-md dark:rounded-none dark:!shadow-none overflow-hidden transition-all duration-200 z-50 ${
                  activeDropdownDesktop === i ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {link.sublinks?.map((sublink, j) => {
                  const href =
                    link.type === 'reference' &&
                    typeof link.reference?.value === 'object' &&
                    link.reference.value.slug
                      ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}#${sublink.hash}`
                      : `${link.url}#${sublink.hash}`

                  return (
                    <a
                      key={j}
                      href={href}
                      className="block px-4 py-2 text-sm text-gray-black-500 hover:bg-gray-100 whitespace-nowrap dark:!text-white"
                      {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={() => setActiveDropdownDesktop(null)}
                    >
                      {sublink.label}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
