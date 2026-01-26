'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  // Set mobile menu open by default
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { theme: globalTheme, setTheme: setGlobalTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="bg-[#F9F9F9] sticky top-0 z-40 lg:relative lg:z-20 dark:border-b dark:border-dark-blue-gray">
      <header className="container relative z-20">
        {/* Desktop Header */}
        <div className="flex justify-between items-center h-[84px]">
          <Link href="/">
            <Logo type="red" loading="eager" priority="high" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <HeaderNav data={data} />

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setGlobalTheme(globalTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
                title={globalTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {globalTheme === 'dark' ? (
                  // Sun Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800 dark:text-gray-200"
                  >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  // Moon Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800 dark:text-gray-200"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Desktop Contact Button */}
          <a
            href="mailto:info@openenergytransition.org"
            className="hidden lg:block bg-[#E31937] rounded-[12px] text-white px-2 xl:px-8 py-2 hover:bg-[#c31530] transition-colors dark:!text-[#e5e7eb]"
          >
            Contact Us
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-transparent fixed inset-0 z-50 overflow-y-auto flex">
            <div className="bg-[#1D1F2CCC] w-1/3 h-ull"></div>
            <div className="w-2/3 bg-white dark:bg-transparent">
              {/* Header area with logo and close button */}
              <div className="flex justify-end items-center mt-4 px-4 ">
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Menu content */}
              <div className="px-4">
                <HeaderNav
                  data={data}
                  isMobile={true}
                  onLinkClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Dark Mode Toggle for Mobile */}
                {mounted && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setGlobalTheme(globalTheme === 'dark' ? 'light' : 'dark')}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Toggle dark mode"
                    >
                      <span className="font-medium text-gray-black-300 dark:text-gray-200">
                        {globalTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                      {globalTheme === 'dark' ? (
                        // Sun Icon
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-800 dark:text-gray-200"
                        >
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                      ) : (
                        // Moon Icon
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-800 dark:text-gray-200"
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                )}

                <div className="mt-4">
                  <button className="hidden lg:block w-full bg-[#E31937] rounded-[12px] text-white px-8 py-3 hover:bg-[#c31530] transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
