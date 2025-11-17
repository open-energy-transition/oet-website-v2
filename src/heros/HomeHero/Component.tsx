'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import React, { useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { tsParticles } from '@tsparticles/engine'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// Initialize particles engine
loadSlim(tsParticles)

export const HomeHero: React.FC<Page['hero']> = ({ links, media, richText, columns }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  return (
    <div
      className="relative z-10 transition-colors duration-300"
      style={{
        background:
          media && typeof media === 'object'
            ? `linear-gradient(90.01deg, rgba(0,0,0,0.8) -20.3%, rgba(0,0,0,0.64) 39.58%, rgba(0,0,0,0) 99.99%), url(${media.url}) center/cover no-repeat`
            : 'linear-gradient(90.01deg, rgba(0,0,0,0.8) -20.3%, rgba(0,0,0,0.64) 39.58%, rgba(0,0,0,0) 99.99%)',
      }}
    >
      {/* Particles Background */}
      <div className="container py-4 lg:py-[120px] mt-10 lg:mt-0 z-10 relative flex items-center text-white">
        <div className="w-full">
          {richText && (
            <RichText
              enableProse={false}
              className="mb-8 max-w-[788px]"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col lg:flex-row justify-start rounded-4xl mt-10 gap-4 w-full">
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
