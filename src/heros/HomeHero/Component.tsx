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
    <div className="relative z-10 min-h-screen" data-theme="dark">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        className="absolute inset-y-0 right-0 w-full h-full z-max [clip-path:polygon(80%_0,100%_0,80%_0,100%_0,80%_0,100%_0,80%_0,100%_0,100%_100%,5%_100%)]"
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
              value: ['#000000', '#888888'],
            },
            links: {
              color: '#000000',
              distance: 200,
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
                enable: false,
              },
              value: 180,
            },
            opacity: {
              value: 1.0,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 8 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="container mb-8 pt-48 z-10 relative flex items-center">
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
          <div>
            {/* Render columns if present */}
            {Array.isArray(columns) && columns.length === 3 && (
              <div className="flex flex-col md:flex-row gap-8 mt-64">
                {columns.map((col, idx) => (
                  <div
                    key={idx}
                    className={`${idx === 1 ? 'justify-between' : ''} flex-col flex-1 flex gap-6`}
                  >
                    {/* Media Row */}
                    {col.media && (
                      <div className={`${idx === 1 ? 'h-[232px]' : 'h-[269px]'} order-${idx}`}>
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
                      className={`${idx === 0 ? 'h-[502px]' : ''} ${idx === 1 ? 'py-[36.5px] min-h-[241px]' : 'py-[30px]'} px-8  rounded-3xl bg-[#E8EFDC4D] border border-[#0B0C0B26] flex flex-col items-center justify-center text-center min-h-[9rem]`}
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
