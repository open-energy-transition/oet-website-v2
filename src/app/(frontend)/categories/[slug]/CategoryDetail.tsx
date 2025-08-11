import React from 'react'
import Image from 'next/image'
import { CalendarIcon, TagIcon } from 'lucide-react'
import RichText from '@/components/RichText'

import type { Category, Post } from '@/payload-types'
import Link from 'next/link'

export const CategoryDetail: React.FC<{ category: Category; posts: Post[] }> = ({
  category,
  posts,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h1>
        </header>
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {(posts ?? []).map((post: any) => (
              <div key={post.id} className="border rounded-lg p-4 shadow bg-white">
                {category.title}
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                {post.subTitle && <div className="text-gray-500 mb-2">{post.subTitle}</div>}
                {post.date && (
                  <div className="text-xs text-gray-400 mb-2">
                    Date: {new Date(post.date).toLocaleDateString()}
                  </div>
                )}
                {post.categories && post.categories.length > 0 && (
                  <div className="mt-2 gap-2 flex flex-wrap">
                    {post.categories.map((category: any) => (
                      <Link
                        key={category.id}
                        href={`/posts/${category.slug}`}
                        className="inline-block px-4 py-2 text-black border border-gray-300 rounded transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
                {post.shortDescription && (
                  <div className="text-sm text-gray-600 mb-2">{post.shortDescription}</div>
                )}
                {/* Add Read More button */}
                <div className="mt-auto pt-4">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
