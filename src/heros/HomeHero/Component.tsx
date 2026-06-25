'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { tsParticles } from '@tsparticles/engine'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// Initialize particles engine
loadSlim(tsParticles)
gsap.registerPlugin(ScrollTrigger)

export const HomeHero: React.FC<Page['hero']> = ({ links, media, richText, columns }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Animate background scale
      if (bgRef.current) {
        tl.fromTo(
          bgRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2 },
          0,
        )
      }

      // Animate text content (fade + slide up)
      if (textRef.current) {
        tl.fromTo(
          textRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          '-=0.6',
        )
      }

      // Animate links (staggered)
      if (linksRef.current) {
        tl.fromTo(
          linksRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          '-=0.4',
        )
      }

      // Parallax on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative z-10 overflow-hidden transition-colors duration-300">
      {/* Background with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            media && typeof media === 'object'
              ? `linear-gradient(90.01deg, rgba(0,0,0,0.8) -20.3%, rgba(0,0,0,0.64) 39.58%, rgba(0,0,0,0) 99.99%), url(${media.url}) center/cover no-repeat`
              : 'linear-gradient(90.01deg, rgba(0,0,0,0.8) -20.3%, rgba(0,0,0,0.64) 39.58%, rgba(0,0,0,0) 99.99%)',
        }}
      />
      <div className="container py-4 lg:py-[120px] mt-10 lg:mt-0 z-10 relative flex items-center text-white">
        <div ref={textRef} className="w-full">
          {richText && (
            <RichText
              enableProse={false}
              className="mb-8 max-w-[788px]"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul
              ref={linksRef}
              className="flex flex-col lg:flex-row justify-start rounded-4xl mt-10 gap-4 w-full"
            >
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      className="px-6 py-4 lg:py-3 font-poppins font-normal text-sm rounded-3xl w-full"
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
