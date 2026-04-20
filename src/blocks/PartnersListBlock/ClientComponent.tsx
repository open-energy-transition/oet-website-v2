'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'
import type { Partner } from '@/payload-types'

type FilterType = 'all' | 'partner' | 'funder'

type PartnersListClientProps = {
  title?: string
  subTitle?: string
  defaultFilter?: FilterType
  showFilterTabs?: boolean
  partners: Partner[]
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Partners', value: 'partner' },
  { label: 'Funders', value: 'funder' },
]

export const PartnersListClient: React.FC<PartnersListClientProps> = ({
  title,
  subTitle,
  defaultFilter = 'all',
  showFilterTabs = true,
  partners,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>(defaultFilter)

  const filtered =
    activeFilter === 'all' ? partners : partners.filter((p) => p.type === activeFilter)

  if (!partners || partners.length === 0) return null

  return (
    <section>
      <div className="container px-4">
        <div className="text-center mb-8 lg:mb-12">
          {title && <h2 className="text-oxanium-3xl font-semibold mb-4">{title}</h2>}
          {subTitle && <p className="customTextState-size-h8">{subTitle}</p>}
        </div>

        {/* Filter tabs */}
        {showFilterTabs && (
          <div className="flex justify-center gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === f.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                aria-pressed={activeFilter === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Partners grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {filtered.map((partner) => {
              const card = (
                <div className="group h-32 lg:h-40 w-full rounded-lg flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 p-4">
                  {partner.logo ? (
                    <Media
                      resource={partner.logo}
                      className="w-full h-full flex items-center justify-center"
                      alt={partner.name}
                      imgClassName="object-contain w-full h-full mx-auto group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center leading-snug">
                      {partner.name}
                    </span>
                  )}
                </div>
              )

              return partner.website ? (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={partner.name}
                  title={partner.name}
                >
                  {card}
                </a>
              ) : (
                <div key={partner.id} title={partner.name}>
                  {card}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No entries found.</p>
        )}
      </div>
    </section>
  )
}
