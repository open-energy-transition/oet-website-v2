import React from 'react'
import type { PostsListBlock as PostsListBlockProps, Post } from '@/payload-types'
import Link from 'next/link'

export const PostsListBlock: React.FC<PostsListBlockProps & { id?: string }> = (props) => {
  const { posts } = props
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {(posts ?? []).map((post: any) => (
          <div key={post.id} className="border rounded-lg p-4 shadow bg-white">
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
                    className="inline-block px-4 py-2 border border-black text-black rounded transition-colors"
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
                className="inline-block px-4 py-2 border border-black text-black rounded transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
