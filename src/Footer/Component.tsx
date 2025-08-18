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
  const contactUs = footerData?.contactUs
  const copyright = footerData?.copyright
  const privacyPolicy = footerData?.privacyPolicy
  const termsOfUse = footerData?.termsOfUse
  const cookiePolicy = footerData?.cookiePolicy

  return (
    <footer className="mt-auto border-t border-border bg-[#E31937] dark:bg-card text-white">
      <div className="container py-8 gap-8 pt-16 flex flex-col md:flex-row md:justify-between">
        <div>
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>

          <div className="mt-4 pb-8 flex flex-col md:flex-row gap-8 text-sm justify-between">
            {/* Description */}
            {description && (
              <div className="mb-8 md:mb-0 max-w-96">
                <RichText
                  data={description}
                  className="text-poppins-x-small"
                  enableGutter={false}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {/* About Us */}
          {aboutUs && (
            <div className="flex-1">
              {aboutUs.title && (
                <div className="text-poppins-base font-semibold">{aboutUs.title}</div>
              )}
              {Array.isArray(aboutUs.linkActions) && (
                <div>
                  {aboutUs.linkActions.map((action, i) => (
                    <CMSLink
                      key={i}
                      className="text-poppins-xxs"
                      {...action.link}
                      btnTextColor="#ffffff"
                      btnBgColor="transparent"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Contact Us */}
          {contactUs && (
            <div className="flex-1">
              {contactUs.title && (
                <div className="text-poppins-base font-semibold mb-2">{contactUs.title}</div>
              )}
              {contactUs.description && (
                <div className="text-poppins-xxs mb-2">{contactUs.description}</div>
              )}
            </div>
          )}
          {/* Follow Us */}
          {followUs && (
            <div className="flex-1">
              {followUs.title && (
                <div className="text-poppins-base font-semibold mb-2">{followUs.title}</div>
              )}
              {followUs.description && (
                <div className="text-poppins-xxs mb-2">{followUs.description}</div>
              )}
              {Array.isArray(followUs.linkActions) && (
                <div className="flex gap-2 mt-6">
                  {followUs.linkActions.map((action, i) => (
                    <a href={action.link} key={i}>
                      {action.icon && typeof action.icon === 'object' && 'svg' in action.icon && (
                        <span
                          className="text-white inline-block"
                          dangerouslySetInnerHTML={{ __html: action.icon.svg }}
                        />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="container pb-4 text-xs pt-4">
        <div className="border-t border-[#0B0C0B26] border-opacity-15 pt-8 pb-4 justify-center flex flex-col md:flex-row gap-4">
          {/* Copyright */}
          {copyright && (
            <RichText
              className="text-heebo-small-normal"
              data={copyright}
              enableProse={false}
              enableGutter={false}
            />
          )}
          {/* Policies */}
          {privacyPolicy && (
            <RichText
              className="text-heebo-small-link"
              enableGutter={false}
              enableProse={false}
              data={privacyPolicy}
            />
          )}
          {termsOfUse && (
            <RichText
              className="text-heebo-small-link"
              enableGutter={false}
              enableProse={false}
              data={termsOfUse}
            />
          )}
          {cookiePolicy && (
            <RichText
              className="text-heebo-small-link"
              enableGutter={false}
              enableProse={false}
              data={cookiePolicy}
            />
          )}
        </div>
      </div>
    </footer>
  )
}
