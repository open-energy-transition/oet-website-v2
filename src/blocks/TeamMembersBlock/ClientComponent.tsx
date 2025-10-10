'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

import type { TeamMember, Staff } from '@/payload-types'

export type TeamMembersClientProps = {
  tag?: string
  title?: string
  description?: any
  teamMembers: TeamMember[]
  staffCategories?: Staff[]
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const imageUrl =
    typeof member.image === 'object' && member.image?.url ? member.image.url : undefined
  const { firstName, lastName, jobTitle, linkedIn, externalLink, x, description, categories } =
    member
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white hover:shadow-md flex flex-col items-center p-6">
      {imageUrl && (
        <div className="mb-4 rounded-3xl overflow-hidden w-96 h-96">
          <Image
            src={imageUrl}
            alt="Team Member Image"
            width={384}
            height={384}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold font-heebo text-gray-900 text-left w-full">
        {firstName} {lastName}
      </h3>
      {jobTitle && (
        <p className="mt-1 text-lg font-heebo font-normal text-gray-600 text-left w-full">
          {jobTitle}
        </p>
      )}

      {/* Display categories */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 mb-3 w-full">
          {categories.map((category, index) => {
            // Handle both ID and object
            const categoryName = typeof category === 'object' ? category.name : null
            if (!categoryName) return null

            return (
              <span
                key={index}
                className="inline-block px-2.5 py-1 bg-blue-50 text-xs font-medium text-blue-600 rounded-md"
                title={`Expertise: ${categoryName}`}
              >
                {categoryName}
              </span>
            )
          })}
        </div>
      )}
      {description && (
        <div className="mb-2 w-full">
          <RichText data={description} enableGutter={false} enableProse={false} />
        </div>
      )}
      <div className="flex gap-3.5 mt-2 w-full">
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.5 0.912598C0.67157 0.912598 0 1.58417 0 2.4126V17.4126C0 18.241 0.67157 18.9126 1.5 18.9126H16.5C17.3284 18.9126 18 18.241 18 17.4126V2.4126C18 1.58417 17.3284 0.912598 16.5 0.912598H1.5ZM5.52076 4.91532C5.52639 5.87157 4.81061 6.46079 3.96123 6.45657C3.16107 6.45235 2.46357 5.81532 2.46779 4.91673C2.47201 4.07157 3.13998 3.39235 4.00764 3.41204C4.88795 3.43173 5.52639 4.0772 5.52076 4.91532ZM9.2797 7.67436H6.75971H6.7583V16.2342H9.4217V16.0345C9.4217 15.6546 9.4214 15.2746 9.4211 14.8945C9.4203 13.8807 9.4194 12.8658 9.4246 11.8523C9.426 11.6062 9.4372 11.3503 9.5005 11.1154C9.7381 10.2379 10.5271 9.6712 11.4074 9.8105C11.9727 9.899 12.3467 10.2267 12.5042 10.7597C12.6013 11.0929 12.6449 11.4515 12.6491 11.7989C12.6605 12.8465 12.6589 13.8941 12.6573 14.9418C12.6567 15.3116 12.6561 15.6816 12.6561 16.0514V16.2328H15.328V16.0275C15.328 15.5755 15.3278 15.1236 15.3275 14.6717C15.327 13.5422 15.3264 12.4127 15.3294 11.2828C15.3308 10.7723 15.276 10.2689 15.1508 9.7753C14.9638 9.0412 14.5771 8.4337 13.9485 7.995C13.5027 7.68279 13.0133 7.4817 12.4663 7.4592C12.404 7.45661 12.3412 7.45322 12.2781 7.44981C11.9984 7.43469 11.7141 7.41933 11.4467 7.47326C10.6817 7.62654 10.0096 7.9767 9.5019 8.594C9.4429 8.6648 9.3852 8.7367 9.2991 8.844L9.2797 8.8683V7.67436ZM2.68164 16.237H5.33242V7.67993H2.68164V16.237Z"
                fill="#0B0C0B"
              />
            </svg>
          </a>
        )}
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 0.669922C4.03145 0.669922 0 4.70137 0 9.66992C0 14.6385 4.03145 18.6699 9 18.6699C13.9588 18.6699 18 14.6385 18 9.66992C18 4.70137 13.9588 0.669922 9 0.669922ZM14.9447 4.81851C16.0184 6.12654 16.6627 7.79572 16.6822 9.60162C16.4284 9.55282 13.8904 9.03542 11.333 9.35752C11.2744 9.23062 11.2256 9.09402 11.167 8.95732C11.0108 8.58642 10.8352 8.20572 10.6594 7.84452C13.4902 6.69272 14.7787 5.03326 14.9447 4.81851ZM9 1.99747C10.9523 1.99747 12.7386 2.72958 14.0955 3.93023C13.9588 4.12545 12.7972 5.67751 10.064 6.70245C8.8048 4.38901 7.4089 2.4953 7.1942 2.20246C7.77 2.0658 8.3753 1.99747 9 1.99747ZM5.72996 2.71981C5.93494 2.99313 7.3015 4.8966 8.5803 7.16123C4.98807 8.11792 1.81562 8.09832 1.47397 8.09832C1.9718 5.71656 3.58243 3.73499 5.72996 2.71981ZM1.30803 9.67972C1.30803 9.60162 1.30803 9.52352 1.30803 9.44542C1.63991 9.45512 5.36876 9.50402 9.205 8.35212C9.4295 8.78162 9.6345 9.22092 9.8297 9.66012C9.7321 9.68942 9.6247 9.71872 9.5271 9.74802C5.56399 11.0267 3.45553 14.5213 3.27983 14.8141C2.05965 13.4573 1.30803 11.6515 1.30803 9.67972ZM9 17.3619C7.2234 17.3619 5.58352 16.7567 4.28525 15.7415C4.42191 15.4584 5.98371 12.4519 10.3178 10.9389C10.3373 10.9291 10.3471 10.9291 10.3666 10.9194C11.4501 13.7209 11.8894 16.0733 12.0065 16.7469C11.0792 17.1471 10.064 17.3619 9 17.3619ZM13.2852 16.0441C13.2072 15.5755 12.7972 13.3304 11.7917 10.5679C14.2028 10.1872 16.3113 10.812 16.5749 10.8999C16.243 13.0376 15.013 14.8825 13.2852 16.0441Z"
                fill="#0B0C0B"
              />
            </svg>
          </a>
        )}
        {x && (
          <a
            href={x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1761 0.912598H16.9362L10.9061 7.69L18 16.9126H12.4456L8.0951 11.3192L3.11723 16.9126H0.35544L6.80517 9.6634L0 0.912598H5.69545L9.6279 6.02522L14.1761 0.912598ZM13.2073 15.288H14.7368L4.86441 2.45188H3.2232L13.2073 15.288Z"
                fill="#0B0C0B"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export const TeamMembersClient: React.FC<TeamMembersClientProps> = ({
  tag,
  title,
  description,
  teamMembers,
  staffCategories = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>(teamMembers)

  // Filter team members when selected category changes
  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredMembers(teamMembers)
    } else {
      setFilteredMembers(
        teamMembers.filter((member) => {
          return member.categories.some((category) => {
            // Handle both ID and object
            const categoryId = typeof category === 'object' ? category.id : category
            return String(categoryId) === selectedCategory
          })
        }),
      )
    }
  }, [selectedCategory, teamMembers])

  return (
    <div className="container mx-auto px-4 py-12">
      {(tag || title || description) && (
        <div className="mb-8 text-center">
          {tag && (
            <span className="inline-block mb-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 uppercase tracking-wide">
              {tag}
            </span>
          )}
          {title && <h2 className="text-3xl w-full font-bold text-gray-900 mb-2">{title}</h2>}
          {description && (
            <div className="max-w-2xl mx-auto text-gray-600">
              <RichText data={description} />
            </div>
          )}
        </div>
      )}

      {/* Staff Categories Filter */}
      {staffCategories && staffCategories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {staffCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  // Toggle: if already selected, deselect it, otherwise select it
                  setSelectedCategory(
                    selectedCategory === String(category.id) ? null : String(category.id),
                  )
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === String(category.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                aria-pressed={selectedCategory === String(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers && filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div key={member.id} className="animate-fadeIn">
              <TeamMemberCard member={member} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-gray-500 text-center py-12">
            No team members found in this category.
          </div>
        )}
      </div>
    </div>
  )
}
