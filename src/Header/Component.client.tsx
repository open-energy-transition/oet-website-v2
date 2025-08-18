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

  return (
    <div className="bg-[#F9F9F9]">
      <header className="container relative z-20 " {...(theme ? { 'data-theme': theme } : {})}>
        <div className="flex justify-between items-center  h-[84px]">
          <Link href="/">
            <Logo type="red" loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
          <HeaderNav data={data} />
          <button className="bg-[#E31937] rounded-[12px] text-white px-8 py-2">Contact Us</button>
        </div>
      </header>
    </div>
  )
}
