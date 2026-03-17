'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // If the page is visited with the specific hash '#workwithus',
  // redirect client-side to /careers. Hash fragments aren't sent
  // to the server, so this must be handled in the browser.
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const { hash, pathname } = window.location
      if (hash === '#workwithus' && (pathname === '/about-us' || pathname === '/about-us.html')) {
        // Use replace so the back button doesn't return to the anchor URL
        window.location.replace('/careers')
      }
    } catch (e) {
      // ignore
    }
  }, [])

  return <React.Fragment />
}

export default PageClient
