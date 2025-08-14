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

export const HomeHero: React.FC<Page['hero']> = ({ links, media, richText, columns }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div
      className="relative z-10 flex items-center justify-center text-white min-h-screen"
      data-theme="dark"
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-max"
        options={{
          background: {
            color: {
              value: '#ffffff',
            },
          },
          fullScreen: {
            enable: false,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'repulse',
              },
              onHover: {
                enable: true,
                mode: 'grab',
              },
            },
            modes: {
              push: {
                distance: 200,
                duration: 15,
              },
              grab: {
                distance: 150,
              },
            },
          },
          particles: {
            color: {
              value: '#000000',
            },
            links: {
              color: '#000000',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 150,
            },
            opacity: {
              value: 1.0,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="container mb-8 mt-48 z-10 relative flex items-center justify-center">
        <div className="max-w-4xl">
          {richText && (
            <RichText enableProse={false} className="mb-8" data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-start gap-6 mt-8">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      className="px-6 py-3 font-oxygen font-normal text-sm rounded-3xl"
                    />
                  </li>
                )
              })}
            </ul>
          )}
          {/* Render columns if present */}
          {Array.isArray(columns) && columns.length === 3 && (
            <div className="flex flex-col md:flex-row gap-8 mt-8">
              {columns.map((col, idx) => (
                <div
                  key={idx}
                  className={`${idx !== 2 ? 'flex-col' : 'flex-col-reverse'} flex-1 flex gap-6`}
                >
                  {/* Media Row */}
                  {col.media && (
                    <div className="h-1/2">
                      {col.media && (
                        <Media
                          className="h-full"
                          resource={col.media}
                          imgClassName="object-cover w-full h-full rounded-3xl"
                        />
                      )}
                    </div>
                  )}
                  {/* Title/Description Row */}
                  <div
                    className={`${idx === 0 ? 'h-full' : 'h-1/2'} rounded-3xl bg-[#E8EFDC4D] border p-8 border-[#0B0C0B26] flex flex-col items-center justify-center text-center min-h-[9rem]`}
                  >
                    {col.title && (
                      <h4 className="font-roboto text-[80px] leading-[120%] tracking-normal font-bold mb-2 text-center">
                        {col.title}
                      </h4>
                    )}
                    {col.description && (
                      <p className="text-base text-black text-center">{col.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover opacity-80" priority resource={media} />
        )}
      </div>
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0" />
    </div>
  )
}
