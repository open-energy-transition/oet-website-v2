'use client'
import Link from 'next/link'
import React from 'react'

import type { Model, Post } from '@/payload-types'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const CardModel: React.FC<{
  data: Model
  tag?: string | undefined | null
}> = (props) => {
  const { data, tag } = props
  const { title, description, sourceCode, github, website, documentation } = data

  return (
    <div className="border border-[#77857C] rounded-2xl text-[#0B0C0B] dark:text-white p-4 min-h-[336px] flex flex-col justify-between dark:border-dark-blue-gray">
      <div>
        {tag && <div className="text-poppins-base text-sm">{tag}</div>}
        <div className="text-poppins-2xl underline mt-2">{title}</div>
        <div className="text-poppins-h9 mt-2">{description}</div>
      </div>
      <div className="flex justify-between items-center">
        {sourceCode ? (
          <div className="flex py-1.5 pl-2 pr-5 rounded-[8px] gap-1 shadow dark:!shadow-none dark:border dark:border-dark-blue-gray bg-[#F4F6F0] dark:bg-transparent font-roboto font-medium text-sm leading-[20px] tracking-[0.1%] text-center">
            <span>
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="dark:fill-white"
                  d="M10.5 2.25C8.76942 2.25 7.07769 2.76318 5.63876 3.72464C4.19983 4.6861 3.07832 6.05267 2.41606 7.65152C1.75379 9.25037 1.58051 11.0097 1.91813 12.707C2.25575 14.4044 3.08911 15.9635 4.31282 17.1872C5.53653 18.4109 7.09563 19.2443 8.79296 19.5819C10.4903 19.9195 12.2496 19.7462 13.8485 19.0839C15.4473 18.4217 16.8139 17.3002 17.7754 15.8612C18.7368 14.4223 19.25 12.7306 19.25 11C19.2474 8.68015 18.3247 6.45605 16.6843 4.81567C15.044 3.17528 12.8199 2.25258 10.5 2.25ZM10.5 18C9.11553 18 7.76216 17.5895 6.61101 16.8203C5.45987 16.0511 4.56266 14.9579 4.03285 13.6788C3.50303 12.3997 3.36441 10.9922 3.63451 9.63437C3.9046 8.2765 4.57129 7.02922 5.55026 6.05025C6.52922 5.07129 7.7765 4.4046 9.13437 4.1345C10.4922 3.86441 11.8997 4.00303 13.1788 4.53284C14.4579 5.06266 15.5511 5.95986 16.3203 7.11101C17.0895 8.26215 17.5 9.61553 17.5 11C17.4979 12.8559 16.7597 14.6351 15.4474 15.9474C14.1351 17.2597 12.3559 17.9979 10.5 18ZM10.5 10.5625C10.2679 10.5625 10.0454 10.6547 9.88129 10.8188C9.71719 10.9829 9.625 11.2054 9.625 11.4375V14.0625C9.625 14.2946 9.71719 14.5171 9.88129 14.6812C10.0454 14.8453 10.2679 14.9375 10.5 14.9375C10.7321 14.9375 10.9546 14.8453 11.1187 14.6812C11.2828 14.5171 11.375 14.2946 11.375 14.0625V11.4375C11.375 11.2054 11.2828 10.9829 11.1187 10.8188C10.9546 10.6547 10.7321 10.5625 10.5 10.5625ZM10.5 7.0625C10.2837 7.0625 10.0722 7.12665 9.89235 7.24683C9.71248 7.36701 9.57229 7.53783 9.48951 7.73769C9.40673 7.93755 9.38507 8.15746 9.42727 8.36963C9.46947 8.5818 9.57364 8.77668 9.72661 8.92965C9.87957 9.08261 10.0745 9.18678 10.2866 9.22898C10.4988 9.27119 10.7187 9.24953 10.9186 9.16674C11.1184 9.08396 11.2892 8.94377 11.4094 8.76391C11.5296 8.58404 11.5938 8.37257 11.5938 8.15625C11.5938 7.86617 11.4785 7.58797 11.2734 7.38285C11.0683 7.17773 10.7901 7.0625 10.5 7.0625Z"
                  fill="#26372C"
                />
              </svg>
            </span>
            <Link
              href={sourceCode || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:!text-white no-underline hover:underline"
            >
              Source code
            </Link>
          </div>
        ) : (
          <div className="size-8"></div>
        )}
        <div className="flex items-center justify-center w-max gap-2">
          {documentation ? (
            <div className="p-2 rounded-2xl hover:bg-[#F4F6F0] dark:hover:bg-transparent dark:hover:border-dark-blue-gray dark:hover:border">
              <Link href={documentation || ''} target="_blank" rel="noopener noreferrer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="dark:fill-white"
                    d="M11.5 22C9.96667 22 8.66667 21.4667 7.6 20.4C6.53333 19.3333 6 18.0333 6 16.5V6C6 4.9 6.39167 3.95833 7.175 3.175C7.95833 2.39167 8.9 2 10 2C11.1 2 12.0417 2.39167 12.825 3.175C13.6083 3.95833 14 4.9 14 6V15.5C14 16.2 13.7583 16.7917 13.275 17.275C12.7917 17.7583 12.2 18 11.5 18C10.8 18 10.2083 17.7583 9.725 17.275C9.24167 16.7917 9 16.2 9 15.5V6H10.5V15.5C10.5 15.7833 10.5958 16.0208 10.7875 16.2125C10.9792 16.4042 11.2167 16.5 11.5 16.5C11.7833 16.5 12.0208 16.4042 12.2125 16.2125C12.4042 16.0208 12.5 15.7833 12.5 15.5V6C12.5 5.3 12.2583 4.70833 11.775 4.225C11.2917 3.74167 10.7 3.5 10 3.5C9.3 3.5 8.70833 3.74167 8.225 4.225C7.74167 4.70833 7.5 5.3 7.5 6V16.5C7.5 17.6 7.89167 18.5417 8.675 19.325C9.45833 20.1083 10.4 20.5 11.5 20.5C12.6 20.5 13.5417 20.1083 14.325 19.325C15.1083 18.5417 15.5 17.6 15.5 16.5V6H17V16.5C17 18.0333 16.4667 19.3333 15.4 20.4C14.3333 21.4667 13.0333 22 11.5 22Z"
                    fill="#49454F"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <></>
          )}
          {github ? (
            <div className="p-2 rounded-2xl hover:bg-[#F4F6F0] dark:hover:bg-transparent dark:hover:border-dark-blue-gray dark:hover:border">
              <Link href={github || ''}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3456_1881)">
                    <path
                      className="dark:fill-white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C20.565 21.795 24 17.295 24 12C24 5.37 18.63 0 12 0Z"
                      fill="#49454F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3456_1881">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          ) : (
            <></>
          )}
          {website ? (
            <div className="p-2 rounded-2xl hover:bg-[#F4F6F0] dark:hover:bg-transparent dark:hover:border-dark-blue-gray dark:hover:border">
              <Link href={website || ''}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="dark:stroke-white"
                    d="M11 1C16.5228 0.999999 21 5.47715 21 11M11 1C5.47715 1 0.999999 5.47715 1 11M11 1L11 21M21 11C21 16.5228 16.5228 21 11 21M21 11C18.2616 8.49872 14.708 7.07725 11 7C7.29203 7.07725 3.73835 8.49872 1 11M21 11C18.2616 13.5013 14.708 14.9228 11 15C7.29203 14.9228 3.73835 13.5013 1 11M11 21C5.47715 21 1 16.5228 1 11"
                    stroke="#26372C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
