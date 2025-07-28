import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  // const navItems = footerData?.navItems || []
  const description = footerData?.description
  const followUs = footerData?.followUs
  const aboutUs = footerData?.aboutUs
  const copyright = footerData?.copyright
  const privacyPolicy = footerData?.privacyPolicy
  const termsOfUse = footerData?.termsOfUse
  const cookiePolicy = footerData?.cookiePolicy

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        {/* <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div> */}
      </div>
      <div className="container pb-8 flex flex-col md:flex-row gap-8 text-sm justify-between">
        {/* Description */}
        {description && (
          <div className="mb-8 md:mb-0 max-w-96">
            <RichText data={description} enableGutter={false} />
          </div>
        )}
        <div className="flex gap-4">
          {/* About Us */}
          {aboutUs && (
            <div className="flex-1">
              {aboutUs.title && <div className="font-bold mb-2">{aboutUs.title}</div>}
              {Array.isArray(aboutUs.linkActions) && (
                <ul>
                  {aboutUs.linkActions.map((action, i) => (
                    <li key={i}>
                      <CMSLink className="underline" {...action.link} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {/* Follow Us */}
          {followUs && (
            <div className="flex-1">
              {followUs.title && <div className="font-bold mb-2">{followUs.title}</div>}
              {followUs.description && <div className="mb-2">{followUs.description}</div>}
              {Array.isArray(followUs.linkActions) && (
                <div className="flex gap-2">
                  {followUs.linkActions.map((action, i) => (
                    <a
                      key={i}
                      href={action.link?.url || '#'}
                      aria-label={action.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      {/* {action.icon && (
                      // You may want to replace this with your own image/media component
                      <img src={action.icon?.url} alt={action.name} className="w-5 h-5 mr-1" />
                    )} */}
                      {action.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="pb-4 flex flex-col md:flex-row gap-4 text-xs border-t border-border pt-4">
        {/* Copyright */}
        {copyright && <RichText className="mb-8" data={copyright} enableGutter={false} />}
        {/* Policies */}
        <div className="flex gap-1">
          {privacyPolicy && <RichText data={privacyPolicy} />}
          {termsOfUse && <RichText data={termsOfUse} />}
          {cookiePolicy && <RichText data={cookiePolicy} />}
        </div>
      </div>
    </footer>
  )
}
