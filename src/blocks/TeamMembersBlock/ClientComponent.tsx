'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { X } from 'lucide-react'

import type { TeamMember, Staff } from '@/payload-types'

export type TeamMembersClientProps = {
  tag?: string
  title?: string
  description?: any
  teamMembers: TeamMember[]
  staffCategories?: Staff[]
  defaultStaffCategory?: string | Staff | number
}

const TeamMemberModal: React.FC<{
  member: TeamMember
  isOpen: boolean
  onClose: () => void
}> = ({ member, isOpen, onClose }) => {
  const { firstName, lastName, description, education } = member

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Modal content */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About {firstName} {lastName}
          </h2>

          {/* Education section */}
          {education && education.length > 0 && (
            <div className="mb-6 space-y-2">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  <div className="flex-1 text-gray-700 dark:text-gray-300">{edu.degree}</div>
                </div>
              ))}
            </div>
          )}

          {description ? (
            <div className="text-gray-700 dark:text-gray-300">
              <RichText data={description} enableGutter={false} enableProse={false} />
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400"></p>
          )}
        </div>
      </div>
    </div>
  )
}

export const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const imageUrl =
    typeof member.image === 'object' && member.image?.url ? member.image.url : undefined
  const { firstName, lastName, jobTitle, linkedIn, externalLink, x, email, categories, github } =
    member
  return (
    <div className="group relative overflow-hidden rounded-lg hover:shadow-md flex flex-col items-center p-6">
      {imageUrl && (
        <div className="mb-4 rounded-3xl overflow-hidden lg:w-96 lg:h-96">
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
                className="inline-block px-2.5 py-1 bg-blue-50 text-xs font-medium text-blue-600 rounded-md dark:border dark:text-white dark:bg-transparent"
                title={`Expertise: ${categoryName}`}
              >
                {categoryName}
              </span>
            )
          })}
        </div>
      )}
      {/* About Me button - always visible */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-600 dark:!text-white hover:underline text-base mb-2 w-full text-left"
      >
        About Me
      </button>

      {/* Team member modal */}
      <TeamMemberModal member={member} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex gap-3.5 mt-2 w-full">
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 text-xs"
          >
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="dark:fill-white"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.5 0.912598C0.67157 0.912598 0 1.58417 0 2.4126V17.4126C0 18.241 0.67157 18.9126 1.5 18.9126H16.5C17.3284 18.9126 18 18.241 18 17.4126V2.4126C18 1.58417 17.3284 0.912598 16.5 0.912598H1.5ZM5.52076 4.91532C5.52639 5.87157 4.81061 6.46079 3.96123 6.45657C3.16107 6.45235 2.46357 5.81532 2.46779 4.91673C2.47201 4.07157 3.13998 3.39235 4.00764 3.41204C4.88795 3.43173 5.52639 4.0772 5.52076 4.91532ZM9.2797 7.67436H6.75971H6.7583V16.2342H9.4217V16.0345C9.4217 15.6546 9.4214 15.2746 9.4211 14.8945C9.4203 13.8807 9.4194 12.8658 9.4246 11.8523C9.426 11.6062 9.4372 11.3503 9.5005 11.1154C9.7381 10.2379 10.5271 9.6712 11.4074 9.8105C11.9727 9.899 12.3467 10.2267 12.5042 10.7597C12.6013 11.0929 12.6449 11.4515 12.6491 11.7989C12.6605 12.8465 12.6589 13.8941 12.6573 14.9418C12.6567 15.3116 12.6561 15.6816 12.6561 16.0514V16.2328H15.328V16.0275C15.328 15.5755 15.3278 15.1236 15.3275 14.6717C15.327 13.5422 15.3264 12.4127 15.3294 11.2828C15.3308 10.7723 15.276 10.2689 15.1508 9.7753C14.9638 9.0412 14.5771 8.4337 13.9485 7.995C13.5027 7.68279 13.0133 7.4817 12.4663 7.4592C12.404 7.45661 12.3412 7.45322 12.2781 7.44981C11.9984 7.43469 11.7141 7.41933 11.4467 7.47326C10.6817 7.62654 10.0096 7.9767 9.5019 8.594C9.4429 8.6648 9.3852 8.7367 9.2991 8.844L9.2797 8.8683V7.67436ZM2.68164 16.237H5.33242V7.67993H2.68164V16.237Z"
                fill="#0B0C0B"
              />
            </svg>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:scale-110"
          >
            <svg
              id="Layer_1"
              width={18}
              height={18}
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 122.88 88.86"
            >
              <title>email</title>
              <path
                className="dark:fill-white"
                d="M7.05,0H115.83a7.07,7.07,0,0,1,7,7.05V81.81a7,7,0,0,1-1.22,4,2.78,2.78,0,0,1-.66,1,2.62,2.62,0,0,1-.66.46,7,7,0,0,1-4.51,1.65H7.05a7.07,7.07,0,0,1-7-7V7.05A7.07,7.07,0,0,1,7.05,0Zm-.3,78.84L43.53,40.62,6.75,9.54v69.3ZM49.07,45.39,9.77,83.45h103L75.22,45.39l-11,9.21h0a2.7,2.7,0,0,1-3.45,0L49.07,45.39Zm31.6-4.84,35.46,38.6V9.2L80.67,40.55ZM10.21,5.41,62.39,47.7,112.27,5.41Z"
              />
            </svg>
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 1024 1024"
              fill="none"
              data-google-analytics-opt-out=""
            >
              <path
                className="dark:fill-white"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="#1B1F23"
              />
            </svg>
          </a>
        )}
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 text-xs"
          >
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="dark:fill-white"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 0.669922C4.03145 0.669922 0 4.70137 0 9.66992C0 14.6385 4.03145 18.6699 9 18.6699C13.9588 18.6699 18 14.6385 18 9.66992C18 4.70137 13.9588 0.669922 9 0.669922ZM14.9447 4.81851C16.0184 6.12654 16.6627 7.79572 16.6822 9.60162C16.4284 9.55282 13.8904 9.03542 11.333 9.35752C11.2744 9.23062 11.2256 9.09402 11.167 8.95732C11.0108 8.58642 10.8352 8.20572 10.6594 7.84452C13.4902 6.69272 14.7787 5.03326 14.9447 4.81851ZM9 1.99747C10.9523 1.99747 12.7386 2.72958 14.0955 3.93023C13.9588 4.12545 12.7972 5.67751 10.064 6.70245C8.8048 4.38901 7.4089 2.4953 7.1942 2.20246C7.77 2.0658 8.3753 1.99747 9 1.99747ZM5.72996 2.71981C5.93494 2.99313 7.3015 4.8966 8.5803 7.16123C4.98807 8.11792 1.81562 8.09832 1.47397 8.09832C1.9718 5.71656 3.58243 3.73499 5.72996 2.71981ZM1.30803 9.67972C1.30803 9.60162 1.30803 9.52352 1.30803 9.44542C1.63991 9.45512 5.36876 9.50402 9.205 8.35212C9.4295 8.78162 9.6345 9.22092 9.8297 9.66012C9.7321 9.68942 9.6247 9.71872 9.5271 9.74802C5.56399 11.0267 3.45553 14.5213 3.27983 14.8141C2.05965 13.4573 1.30803 11.6515 1.30803 9.67972ZM9 17.3619C7.2234 17.3619 5.58352 16.7567 4.28525 15.7415C4.42191 15.4584 5.98371 12.4519 10.3178 10.9389C10.3373 10.9291 10.3471 10.9291 10.3666 10.9194C11.4501 13.7209 11.8894 16.0733 12.0065 16.7469C11.0792 17.1471 10.064 17.3619 9 17.3619ZM13.2852 16.0441C13.2072 15.5755 12.7972 13.3304 11.7917 10.5679C14.2028 10.1872 16.3113 10.812 16.5749 10.8999C16.243 13.0376 15.013 14.8825 13.2852 16.0441Z"
                fill="#0B0C0B"
              />
            </svg>
          </a>
        )}
        {x && (
          <a href={x} target="_blank" rel="noopener noreferrer" className="hover:scale-110 text-xs">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="dark:fill-white"
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
  defaultStaffCategory,
}) => {
  // Extract the ID from defaultStaffCategory if it's an object
  const defaultCategoryId = defaultStaffCategory
    ? typeof defaultStaffCategory === 'object'
      ? String(defaultStaffCategory.id)
      : String(defaultStaffCategory)
    : null

  const [selectedCategory, setSelectedCategory] = useState<string | null>(defaultCategoryId)
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>(teamMembers)
  // Sort staffCategories by _order field (PayloadCMS orderable field)
  const sortedStaffCategories = [...staffCategories]

  // Filter and sort team members by last name when selected category changes
  useEffect(() => {
    // First filter by selected category
    const filtered =
      selectedCategory === null
        ? [...teamMembers] // Create a copy of teamMembers
        : teamMembers.filter((member) => {
            return member.categories.some((category) => {
              // Handle both ID and object
              const categoryId = typeof category === 'object' ? category.id : category
              return String(categoryId) === selectedCategory
            })
          })

    // Find the selected staff category to get the head of department
    const selectedStaffCategory = staffCategories.find((cat) => String(cat.id) === selectedCategory)
    const hodId =
      selectedStaffCategory?.headOfDepartment &&
      typeof selectedStaffCategory.headOfDepartment === 'object'
        ? selectedStaffCategory.headOfDepartment.id
        : selectedStaffCategory?.headOfDepartment
    console.log('hodId', hodId)
    // Sort: Head of Department first, then alphabetically by last name
    const sorted = filtered.sort((a, b) => {
      // Check if either member is the HOD
      const aIsHOD = hodId && String(a.id) === String(hodId)
      const bIsHOD = hodId && String(b.id) === String(hodId)

      // If a is HOD, it comes first
      if (aIsHOD && !bIsHOD) return -1
      // If b is HOD, it comes first
      if (!aIsHOD && bIsHOD) return 1
      // Otherwise, sort alphabetically by last name
      const lastNameA = a.lastName?.toLowerCase() || ''
      const lastNameB = b.lastName?.toLowerCase() || ''
      return lastNameA.localeCompare(lastNameB)
    })

    setFilteredMembers(sorted)
  }, [selectedCategory, teamMembers, staffCategories])

  return (
    <div className="container mx-auto px-4 py-12">
      {(tag || title || description) && (
        <div className="mb-8 text-center">
          {tag && (
            <span className="inline-block mb-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 uppercase tracking-wide dark:text-white dark:bg-transparent dark:border">
              {tag}
            </span>
          )}
          {title && <h2 className="text-3xl w-full font-bold text-gray-900 mb-2">{title}</h2>}
        </div>
      )}

      {/* Staff Categories Filter */}
      {sortedStaffCategories && sortedStaffCategories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {sortedStaffCategories.map((category) => (
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
