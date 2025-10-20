'use client'

import React, { useState } from 'react'
import type { PostsListBlock as PostsListBlockProps } from '@/payload-types'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { RichTextField } from 'payload'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Define better types for our component
interface Category {
  id: string
  title: string
  slug: string
}

interface Author {
  id: string
  name: string
}

interface PostData {
  id: string
  title: string
  shortDescription?: string
  publishedAt?: string
  subTitle?: string
  slug?: string
  categories?: Category[]
  populatedAuthors?: Author[]
  journal?: DefaultTypedEditorState
  doi?: DefaultTypedEditorState | string
  content?: DefaultTypedEditorState
  academic_publications_count?: number
  reports_count?: number
  policy_briefs_count?: number
}

// Simple dialog component
const Dialog = ({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          {children}
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t bg-white rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export const PostsListBlock: React.FC<PostsListBlockProps & { id?: string }> = (props) => {
  const { posts } = props
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = (post: PostData) => {
    setSelectedPost(post)
    setIsDialogOpen(true)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Posts</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {(posts ?? []).map((post) => {
          // Cast to PostData
          const postData = post as unknown as PostData
          return (
            <div key={postData.id} className="border rounded-xl p-4 shadow bg-white">
              <h3 className="text-xl font-semibold mb-2">{postData.title}</h3>
              {postData.subTitle && <div className="text-gray-500 mb-2">{postData.subTitle}</div>}
              {postData.publishedAt && (
                <div className="text-xs text-gray-400 mb-2">
                  Date: {new Date(postData.publishedAt).toLocaleDateString()}
                </div>
              )}
              {postData.categories && postData.categories.length > 0 && (
                <div className="mt-2 gap-2 flex flex-wrap">
                  {postData.categories.map((category: Category) => (
                    <Link
                      key={category.id}
                      href={`/posts/${category.slug}`}
                      className="inline-block px-4 py-2 border border-black text-black rounded transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
              {postData.shortDescription && (
                <div className="text-sm text-gray-600 mb-2">{postData.shortDescription}</div>
              )}
              {/* View Details button that opens dialog */}
              <div className="mt-auto pt-4">
                <button
                  onClick={() => handleOpenDialog(postData)}
                  className="inline-block px-4 py-2 border border-black text-black rounded transition-colors hover:bg-gray-100"
                >
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Publication details dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        {selectedPost && (
          <div className="space-y-4 pt-4">
            <div className="border-b pb-2">
              <h3 className="text-xl font-bold pr-6">{selectedPost.title}</h3>
              {selectedPost.subTitle && <p className="text-gray-600">{selectedPost.subTitle}</p>}
            </div>

            <div className="space-y-2">
              {/* Date */}
              {selectedPost.publishedAt && (
                <div className="flex gap-2">
                  <span className="font-semibold">Date:</span>
                  <span>{new Date(selectedPost.publishedAt).toLocaleDateString()}</span>
                </div>
              )}

              {/* Authors */}
              {selectedPost.populatedAuthors && selectedPost.populatedAuthors.length > 0 && (
                <div className="flex gap-2">
                  <span className="font-semibold">Authors:</span>
                  <span>
                    {selectedPost.populatedAuthors.map((author: Author) => author.name).join(', ')}
                  </span>
                </div>
              )}

              {/* Description */}
              {selectedPost?.content && (
                <div className="block pt-2">
                  <RichText
                    className="max-w-[48rem] mx-auto"
                    data={selectedPost.content}
                    enableGutter={false}
                  />
                </div>
              )}

              {/* Journal */}
              {selectedPost.journal && (
                <div className="block gap-2">
                  <div className="font-semibold">Journal:</div>
                  <RichText
                    className="max-w-[48rem] mx-auto"
                    data={selectedPost.journal}
                    enableGutter={false}
                  />
                </div>
              )}

              {/* DOI */}
              {selectedPost.doi && (
                <div className="flex gap-2 items-center">
                  <div className="font-semibold">DOI:</div>
                  {typeof selectedPost.doi === 'string' ? (
                    <div>
                      <a
                        href={`https://doi.org/${selectedPost.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {selectedPost.doi}
                      </a>
                    </div>
                  ) : (
                    <RichText
                      className="max-w-[48rem] mx-auto"
                      data={selectedPost.doi}
                      enableGutter={false}
                    />
                  )}
                </div>
              )}

              {/* Publication Counts */}
              <div className="mt-6 pt-4 border-t">
                <div className="font-semibold mb-2">Publication Counts:</div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Academic Publications</div>
                    <div className="text-xl font-bold text-blue-700">
                      {selectedPost.academic_publications_count || 0}
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Reports</div>
                    <div className="text-xl font-bold text-green-700">
                      {selectedPost.reports_count || 0}
                    </div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Policy Briefs</div>
                    <div className="text-xl font-bold text-amber-700">
                      {selectedPost.policy_briefs_count || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
