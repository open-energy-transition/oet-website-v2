'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

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
    <div className="bg-[#F9F9F9] sticky top-0 z-40 lg:relative lg:z-20">
      <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
        {/* Desktop Header */}
        <div className="flex justify-between items-center h-[84px]">
          <Link href="/">
            <Logo type="red" loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <HeaderNav data={data} />
          </div>

          {/* Desktop Contact Button */}
          <button className="hidden lg:block bg-[#E31937] rounded-[12px] text-white px-8 py-2">
            Contact Us
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
            <div className="container py-4">
              <HeaderNav data={data} isMobile={true} />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-[#E31937] rounded-[12px] text-white px-8 py-3">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
