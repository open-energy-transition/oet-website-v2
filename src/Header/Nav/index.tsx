'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  return (
    <nav className="flex gap-8 items-center">
      {navItems.map(({ link }, i) => {
        const hasSublinks = link?.sublinks && link.sublinks.length > 0

        return (
          <div
            key={i}
            className="relative group"
            onMouseEnter={() => hasSublinks && setActiveDropdown(i)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center">
              <CMSLink
                {...link}
                appearance={'link'}
                className="text-black font-poppins font-normal text-[14px] leading-[16px] tracking-[0%] items-center"
              />
            </div>

            {hasSublinks && (
              <div
                className={`absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-200 z-50 ${
                  activeDropdown === i ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {link.sublinks?.map((sublink, j) => {
                  const href =
                    link.type === 'reference' &&
                    typeof link.reference?.value === 'object' &&
                    link.reference.value.slug
                      ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}#${sublink.hash}`
                      : `${link.url}#${sublink.hash}`

                  return (
                    <a
                      key={j}
                      href={href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                      {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={() => setActiveDropdown(null)}
                    >
                      {sublink.label}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
