import React from 'react'
import { ExternalLink } from 'lucide-react'

import type { EventCta } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

type Panel = NonNullable<EventCta['panels']>[number]

const panelBg = (variant: Panel['variant']): string =>
  variant === 'light'
    ? 'bg-[#F9F9F9] dark:bg-[#12151c]'
    : 'bg-[#ECEAE5] dark:bg-[#1b1f2a]'

const CtaButton: React.FC<{ button: Panel['button'] }> = ({ button }) => {
  const solid = button.style === 'solid'
  const className = cn(
    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors',
    solid
      ? 'bg-[#E31937] text-white hover:bg-[#c31530]'
      : 'border border-[#E31937] text-[#E31937] hover:bg-[#FDECEE] dark:hover:bg-transparent',
  )

  const content = (
    <>
      {button.label}
      {(solid || button.newTab) && button.url && <ExternalLink className="h-4 w-4" />}
    </>
  )

  if (!button.url) {
    return <span className={className}>{content}</span>
  }

  return (
    <a
      href={button.url}
      className={className}
      {...(button.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  )
}

export const EventFooterCta: React.FC = async () => {
  const data = (await getCachedGlobal('event-cta', 1)()) as EventCta

  const panels = data?.panels || []
  if (panels.length === 0) return null

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {panels.map((panel, index) => (
        <div
          key={panel.id || index}
          className={cn('px-6 py-14 lg:px-16 lg:py-20', panelBg(panel.variant))}
        >
          <h2 className="whitespace-pre-line font-oxanium text-3xl font-semibold leading-tight text-gray-black-500 dark:text-white lg:text-5xl">
            {panel.heading}
          </h2>
          <p className="mt-6 text-lg font-medium text-gray-black-500 dark:text-white lg:text-2xl">
            {panel.lead}
          </p>
          {panel.note && (
            <p className="mt-4 max-w-xl text-sm text-gray-black-300 dark:text-gray-300 lg:text-base">
              {panel.note}
            </p>
          )}
          <div className="mt-8">
            <CtaButton button={panel.button} />
          </div>
        </div>
      ))}
    </section>
  )
}
