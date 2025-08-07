import React from 'react'
import type { PostsListBlock as PostsListBlockProps } from '@/payload-types'

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
            <div className="text-sm text-gray-400 mb-2">Status: {post.postStatus}</div>
            {post.date && (
              <div className="text-xs text-gray-400 mb-2">
                Date: {new Date(post.date).toLocaleDateString()}
              </div>
            )}
            {/* Render post content if needed */}
            {/* <div>{JSON.stringify(post.content)}</div> */}
          </div>
        ))}
      </div>
    </div>
  )
}
