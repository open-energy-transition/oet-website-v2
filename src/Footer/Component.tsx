import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import { LogoMobile } from '@/components/Logo/LogoMobile'

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
    <footer className="mt-auto border-t border-border bg-[#070707] dark:bg-card text-white">
      <div className="container py-5 lg:py-8 gap-10 lg:pt-16 flex flex-col md:flex-row md:justify-between">
        <div>
          <Link className="flex items-center " href="/">
            <div className="hidden lg:block">
              <Logo />
            </div>
            <div className="lg:hidden">
              <LogoMobile className="lg:hidden" />
            </div>
          </Link>

          <div className="mt-4 pb-6 lg:pb-8 flex flex-col md:flex-row gap-8 text-sm justify-between">
            {/* Description */}
            {description && (
              <div className="max-w-[503px]">
                <RichText
                  data={description}
                  className="text-poppins-x-small text-gray-black-200"
                  enableGutter={false}
                />
              </div>
            )}
          </div>
          <div className="lg:hidden">
            {/* Follow Us */}
            {followUs && (
              <div className="flex-1 text-end lg:text-start">
                {Array.isArray(followUs.linkActions) && (
                  <div className="flex gap-4 items-center justify-start">
                    {followUs.linkActions.map((action, i) => (
                      <a href={action.link} key={i}>
                        {action.icon && typeof action.icon === 'object' && 'svg' in action.icon && (
                          <span
                            className="text-white inline-block footer-icon"
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

        <div className="flex gap-8 lg:w-[2/3]">
          {/* About Us */}
          {aboutUs && (
            <div className="flex-1">
              {aboutUs.title && (
                <div className="text-poppins-base font-semibold hidden text-lg lg:block lg:mb-5">
                  {aboutUs.title}
                </div>
              )}
              {Array.isArray(aboutUs.linkActions) && (
                <div className="flex justify-between w-full flex-col gap-6">
                  {aboutUs.title && (
                    <div className="lg:hidden text-poppins-base text-base font-medium text-[#E9E9EA] lg:text-white lg:text-lg">
                      {aboutUs.title}
                    </div>
                  )}
                  {aboutUs.linkActions.map((action, i) => (
                    <CMSLink
                      key={i}
                      className="text-poppins-xxs lg:hidden leading-normal text-sm lg:text-base text-[#E9E9EA] lg:text-white"
                      {...action.link}
                      size="sm"
                      btnSize="sm"
                      btnTextColor="#ffffff"
                      btnBgColor="transparent"
                    />
                  ))}
                  {aboutUs.linkActions.map((action, i) => (
                    <CMSLink
                      key={i}
                      className="text-poppins-xxs hidden lg:block leading-normal text-sm lg:text-base text-[#E9E9EA] lg:!text-gray-black-200"
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
            <div className="flex-1 hidden lg:block">
              {contactUs.title && (
                <div className="text-poppins-base font-semibold lg:text-lg ">{contactUs.title}</div>
              )}
              {contactUs.description && (
                <div className="text-poppins-xxs mb-2 text-smg lg:text-base lg:mt-5 lg:text-gray-black-200">
                  {contactUs.description}
                </div>
              )}
            </div>
          )}
          <div className="lg:flex gap-8">
            {/* Contact Us */}
            {contactUs && (
              <div className="flex-1 lg:hidden">
                {contactUs.title && (
                  <div className="text-poppins-base font-meidum">{contactUs.title}</div>
                )}
                {contactUs.description && (
                  <div className="text-poppins-xxs text-sm mb-2 mt-6">{contactUs.description}</div>
                )}
              </div>
            )}
            <div className="hidden lg:block">
              {/* Follow Us */}
              {followUs && (
                <div className="flex-1 text-end lg:text-left">
                  {followUs.title && (
                    <div className="text-poppins-base font-semibold">{followUs.title}</div>
                  )}
                  {followUs.description && (
                    <div className="text-poppins-xxs mb-2">{followUs.description}</div>
                  )}
                  {Array.isArray(followUs.linkActions) && (
                    <div className="flex gap-2 mt-6 items-center justify-end lg:justify-start">
                      {followUs.linkActions.map((action, i) => (
                        <a href={action.link} key={i}>
                          {action.icon &&
                            typeof action.icon === 'object' &&
                            'svg' in action.icon && (
                              <span
                                className="text-white inline-block footer-icon"
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
        </div>
      </div>
      <div className="container pb-4 text-xs pt-4">
        <div className="border-t border-[#FFFFFF3D] border-opacity-15 pt-8 pb-4 justify-between flex flex-col md:flex-row gap-6">
          {/* Copyright */}
          {copyright && (
            <RichText
              className="text-heebo-small-normal text-start lg:text-center lg:text-lg text-gray-black-200"
              data={copyright}
              enableProse={false}
              enableGutter={false}
            />
          )}
          <div className="flex gap-4 lg:gap-8 justify-start">
            {/* Policies */}
            {privacyPolicy && (
              <RichText
                className="text-heebo-small-link lg:text-lg lg:!text-gray-black-200"
                enableGutter={false}
                enableProse={false}
                data={privacyPolicy}
              />
            )}
            {termsOfUse && (
              <RichText
                className="text-heebo-small-link lg:text-lg lg:!text-gray-black-200"
                enableGutter={false}
                enableProse={false}
                data={termsOfUse}
              />
            )}
            {cookiePolicy && (
              <RichText
                className="text-heebo-small-link lg:text-lg lg:!text-gray-black-200"
                enableGutter={false}
                enableProse={false}
                data={cookiePolicy}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
