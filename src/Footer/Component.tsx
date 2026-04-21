import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import { LogoMobile } from '@/components/Logo/LogoMobile'

function splitActionName(name?: string): [string, string] {
  if (!name) return ['', '']
  // Split on actual newlines, literal "\\n" sequences, or <br> tags coming from CMS
  const parts = name
    .split(/(?:\r?\n|\\n|<br\s*\/?>)/i)
    .map((p) => p.trim())
    .filter(Boolean)
  const first = parts[0] || ''
  const second = parts.slice(1).join(' ')
  return [first, second]
}

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
    <footer className="mt-auto border-t border-border bg-crimson-red text-white">
      <div className="container flex py-5 lg:py-8 gap-6 lg:pt-16 flex-col lg:flex-row lg:justify-between">
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row mb-4 lg:mb-8">
            <Link className="border-r border-[#FFFFFF3D] pr-5 mr-2 flex items-start " href="/">
              <Logo className="w-[119px] h-[54px]" />
            </Link>

            <div className="flex flex-col lg:flex-row gap-8 text-sm justify-between lg:ml-4 max-w-[75%]">
              {/* Description */}
              {description && (
                <div>
                  <RichText
                    data={description}
                    className="text-poppins-x-small text-white -mt-2 lg:mt-0"
                    enableGutter={false}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-8 pt-8 lg:w-1/2 lg:max-w-2/3">
            {/* About Us */}
            {aboutUs && (
              <div className="flex-1">
                {Array.isArray(aboutUs.linkActions) && (
                  <div className="flex justify-between w-full flex-col gap-6">
                    {aboutUs.linkActions.map((action, i) => (
                      <div className="flex items-center gap-1" key={i}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="-rotate-90"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.00003 8.5C6.59557 8.5 6.23093 8.74364 6.07615 9.11732C5.92137 9.49099 6.00692 9.92111 6.29292 10.2071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L17.7071 10.2071C17.9931 9.92111 18.0787 9.49099 17.9239 9.11732C17.7691 8.74364 17.4045 8.5 17 8.5H7.00003Z"
                            fill="white"
                          />
                        </svg>
                        <CMSLink
                          className="text-poppins-xxs leading-normal text-sm lg:text-base text-[#E9E9EA]"
                          {...action.link}
                          btnTextColor="#ffffff"
                          btnBgColor="transparent"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Contact Us */}
            {contactUs && (
              <div className="flex-1">
                {Array.isArray(contactUs.linkActions) && (
                  <div className="flex justify-between w-full flex-col gap-6">
                    {contactUs.linkActions.map((action, i) => (
                      <div className="flex items-center gap-1" key={i}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="-rotate-90"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.00003 8.5C6.59557 8.5 6.23093 8.74364 6.07615 9.11732C5.92137 9.49099 6.00692 9.92111 6.29292 10.2071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L17.7071 10.2071C17.9931 9.92111 18.0787 9.49099 17.9239 9.11732C17.7691 8.74364 17.4045 8.5 17 8.5H7.00003Z"
                            fill="white"
                          />
                        </svg>
                        <CMSLink
                          className="text-poppins-xxs block leading-normal text-sm lg:text-base text-[#E9E9EA]"
                          {...action.link}
                          btnTextColor="#ffffff"
                          btnBgColor="transparent"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>{' '}
        </div>
        <div className="lg:w-1/4 lg:pl-4 mt-12 lg:mt-0">
          <div>
            <div className="font-bold text-xl">
              <div className="text-sm -mt-2.5 font-medium">{followUs?.title || ''}</div>
              <a href={`mailto:${followUs?.description || ''}`}>{followUs?.description || ''}</a>
            </div>
          </div>
          <div className=" lg:block pt-10">
            {/* Follow Us */}
            {followUs && (
              <div className="flex-1 text-end lg:text-left mt-6">
                {Array.isArray(followUs.linkActions) && (
                  <div className="gap-4 items-center grid grid-cols-2 justify-end lg:justify-start">
                    {followUs.linkActions.map((action, i) => {
                      const [line1, line2] = splitActionName(action?.name)
                      return (
                        <div key={i}>
                          {action.icon &&
                            typeof action.icon === 'object' &&
                            'svg' in action.icon && (
                              <div className="flex">
                                <a
                                  href={action.link}
                                  className="bg-black size-10 bg-dark rounded-[0.375rem] flex items-center justify-center mb-0 me-3"
                                >
                                  <span
                                    className="text-white inline-block footer-icon"
                                    dangerouslySetInnerHTML={{ __html: action.icon.svg }}
                                  />
                                </a>
                                <a href={action.link} className="text-sm text-start">
                                  <strong>{line1}</strong>
                                  {line2 && (
                                    <>
                                      <br />
                                      {line2}
                                    </>
                                  )}
                                </a>
                              </div>
                            )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container pb-4 text-xs pt-4">
        <div className="border-t border-[#FFFFFF3D] border-opacity-15 pt-8 pb-4 justify-between block lg:flex gap-6 dark:border-dark-blue-gray">
          <div>
            {/* Copyright */}
            {copyright && (
              <RichText
                className="text-heebo-small-normal text-center lg:text-start text-xs lg:text-sm text-white"
                data={copyright}
                enableProse={false}
                enableGutter={false}
              />
            )}
            <div className="flex gap-1 items-center justify-center lg:justify-start mt-4 lg:mt-2">
              {/* Policies */}
              {privacyPolicy && (
                <RichText
                  className="text-heebo-small-link text-xs lg:text-sm text-white"
                  enableGutter={false}
                  enableProse={false}
                  data={privacyPolicy}
                />
              )}
              /
              {termsOfUse && (
                <RichText
                  className="text-heebo-small-link text-xs lg:text-sm text-white"
                  enableGutter={false}
                  enableProse={false}
                  data={termsOfUse}
                />
              )}
              /
              {cookiePolicy && (
                <RichText
                  className="text-heebo-small-link text-xs lg:text-sm text-white"
                  enableGutter={false}
                  enableProse={false}
                  data={cookiePolicy}
                />
              )}
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            {/* About Us */}
            {aboutUs && (
              <div className="">
                {Array.isArray(aboutUs.linkActions) && (
                  <div className="flex justify-center lg:justify-between w-full">
                    {aboutUs.linkActions.map((action, i) => (
                      <div key={i}>
                        <CMSLink
                          className="text-poppins-xxs mx-2.5 leading-normal text-xs lg:text-base text-[#E9E9EA] lg:text-white"
                          {...action.link}
                          size="sm"
                          btnSize="sm"
                          btnTextColor="#ffffff"
                          btnBgColor="transparent"
                        />
                        {i != (aboutUs?.linkActions?.length || 1) - 1 && '/'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
