'use client'
import React, { useState } from 'react'

// Project type definition
type Project = {
  id: number
  title: string
  subTitle: string
  projectStatus: string
  service?: string
  slug: string
  [key: string]: unknown
}

// Department type definition
type Department = {
  id: number
  department: string
  shortDescription: string
  icon?: {
    svg: string
    [key: string]: unknown
  }
  projects?: Project[]
  [key: string]: unknown
}

// ReadMoreSection component
type ReadMoreSectionProps = {
  text: string
  project?: Project
  department?: Department
}

const ReadMoreSection: React.FC<ReadMoreSectionProps> = ({ text, department }) => {
  const [showModal, setShowModal] = useState(false)
  const maxLength = 145
  const isLong = text.length > maxLength
  const displayText = !isLong ? text : text.slice(0, maxLength) + '...'

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  return (
    <div className="font-heebo font-normal text-lg leading-normal mb-9 relative">
      <div>{displayText}</div>
      <div className="flex justify-end">
        <button
          className="px-2 py-1 bg-gray-600 absolute text-white rounded hover:bg-gray-700 transition text-sm font-medium"
          onClick={openModal}
        >
          Read more
        </button>
      </div>

      {/* Modal/Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Department Header */}
            <div className="mb-6 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-4 mb-4">
                {department?.icon && (
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                    <div dangerouslySetInnerHTML={{ __html: department.icon.svg }} />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {department?.department || 'Department Details'}
                </h2>
              </div>
            </div>

            {/* Department Description */}
            <div className="font-heebo font-normal text-lg leading-normal mb-8">{text}</div>

            {/* Department Projects */}
            {department?.projects && department.projects.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Department Projects</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {department.projects.map((project: Project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{project.title}</h4>
                      <div className="text-sm text-gray-600 mb-2">{project.subTitle}</div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            project.projectStatus === 'completed'
                              ? 'bg-green-500'
                              : project.projectStatus === 'in-progress'
                                ? 'bg-yellow-500'
                                : 'bg-blue-500'
                          }`}
                        ></span>
                        <span className="text-sm font-medium capitalize">
                          {project.projectStatus}
                        </span>
                      </div>
                      {project.service && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.service.split(',').map((service: string, index: number) => (
                            <span
                              key={index}
                              className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                            >
                              {service.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReadMoreSection
