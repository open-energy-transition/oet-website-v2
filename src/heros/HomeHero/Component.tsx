'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { tsParticles } from '@tsparticles/engine'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// Initialize particles engine
loadSlim(tsParticles)

export const HomeHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white min-h-screen"
      data-theme="dark"
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        className="absolute inset-0"
        options={{
          detectRetina: false,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: 'bubble',
              },
              onHover: {
                enable: true,
                mode: 'bubble',
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              bubble: {
                distance: 200,
                duration: 2,
                opacity: 8,
                size: 10,
                speed: 3,
              },
              connect: {
                distance: 40,
                links: {
                  opacity: 0.5,
                },
                radius: 250,
              },
              grab: {
                distance: 300,
                links: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 4,
              },
              remove: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ['#ffffff'],
            },
            links: {
              blink: false,
              color: 'random',
              distance: 60,
              enable: true,
              opacity: 0.8,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: false,
              },
              value: 150,
            },
            opacity: {
              animation: {
                enable: true,
                speed: 2,
                sync: false,
                startValue: 'min',
              },
              value: 0.8,
            },
            shape: {
              type: 'circle',
            },
            size: {
              animation: {
                enable: false,
                speed: 20,
                sync: false,
              },
              value: { min: 3, max: 8 },
            },
          },
        }}
      />
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-4xl text-center">
          {richText && (
            <RichText
              className="mb-8 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-6 mt-8">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      className="px-8 py-4 text-lg font-semibold rounded-lg bg-white text-black hover:bg-gray-100 transition-colors"
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover opacity-80" priority resource={media} />
        )}
      </div>
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/20" />
    </div>
  )
}
