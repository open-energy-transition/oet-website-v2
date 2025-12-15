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
      <div className="mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h1>
        </header>
        <div>
          <div className="grid gap-6 md:grid-cols-3">
            {(posts ?? []).map((post: any) => (
              <div key={post.id} className="border rounded-xl p-4 shadow">
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
                        className="inline-block px-4 py-2 text-black border rounded transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
                {post.shortDescription && (
                  <div className="text-sm text-gray-600 my-2 dark:text-white">
                    {post.shortDescription}
                  </div>
                )}
                {/* Add Read More button */}
                <div className="mt-auto pt-4 text-end">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-block px-4 py-2 rounded transition-colors"
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
