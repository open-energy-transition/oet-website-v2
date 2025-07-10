'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@payloadcms/ui'
import './index.scss'

interface Stats {
  totalPages: number
  totalModels: number
  totalProjects: number
  totalPosts: number
  totalCategories: number
  totalMedia: number
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalPages: 0,
    totalModels: 0,
    totalProjects: 0,
    totalPosts: 0,
    totalCategories: 0,
    totalMedia: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from each collection
        const [pagesRes, modelsRes, projectsRes, postsRes, categoriesRes, mediaRes] =
          await Promise.all([
            fetch('/api/pages?limit=0&depth=0'),
            fetch('/api/models?limit=0&depth=0'),
            fetch('/api/projects?limit=0&depth=0'),
            fetch('/api/posts?limit=0&depth=0'),
            fetch('/api/categories?limit=0&depth=0'),
            fetch('/api/media?limit=0&depth=0'),
          ])

        const [pages, models, projects, posts, categories, media] = await Promise.all([
          pagesRes.json(),
          modelsRes.json(),
          projectsRes.json(),
          postsRes.json(),
          categoriesRes.json(),
          mediaRes.json(),
        ])

        setStats({
          totalPages: pages.totalDocs || 0,
          totalModels: models.totalDocs || 0,
          totalProjects: projects.totalDocs || 0,
          totalPosts: posts.totalDocs || 0,
          totalCategories: categories.totalDocs || 0,
          totalMedia: media.totalDocs || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="custom-dashboard">
      <div className="dashboard-header">
        <h1>Welcome to OET CMS</h1>
        <p>Manage your website content with ease</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📄 Pages</h3>
          <p>Manage your website pages</p>
          <div className="card-stat">{stats.totalPages} pages</div>
          <Button el="link" to="/admin/collections/pages">
            View Pages
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>📝 Posts</h3>
          <p>Create and edit blog posts</p>
          <div className="card-stat">{stats.totalPosts} posts</div>
          <Button el="link" to="/admin/collections/posts">
            View Posts
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>🚀 Projects</h3>
          <p>Showcase your work</p>
          <div className="card-stat">{stats.totalProjects} projects</div>
          <Button el="link" to="/admin/collections/projects">
            View Projects
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>🏷️ Categories</h3>
          <p>Organize your content</p>
          <div className="card-stat">{stats.totalCategories} categories</div>
          <Button el="link" to="/admin/collections/categories">
            View Categories
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>📱 Models</h3>
          <p>Manage your models</p>
          <div className="card-stat">{stats.totalModels} models</div>
          <Button el="link" to="/admin/collections/models">
            View Models
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>🖼️ Media</h3>
          <p>Upload and manage files</p>
          <div className="card-stat">{stats.totalMedia} files</div>
          <Button el="link" to="/admin/collections/media">
            View Media
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
