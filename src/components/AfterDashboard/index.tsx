import React from 'react'
import { Button } from '@payloadcms/ui'
import './index.scss'

const AfterDashboard: React.FC = () => {
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
          <Button el="link" to="/admin/collections/pages">
            View Pages
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>📝 Posts</h3>
          <p>Create and edit blog posts</p>
          <Button el="link" to="/admin/collections/posts">
            View Posts
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>🚀 Projects</h3>
          <p>Showcase your work</p>
          <Button el="link" to="/admin/collections/projects">
            View Projects
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>🏷️ Categories</h3>
          <p>Organize your content</p>
          <Button el="link" to="/admin/collections/categories">
            View Categories
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>📱 Models</h3>
          <p>Manage your models</p>
          <Button el="link" to="/admin/collections/models">
            View Models
          </Button>
        </div>

        <div className="dashboard-card">
          <h3>🖼️ Media</h3>
          <p>Upload and manage files</p>
          <Button el="link" to="/admin/collections/media">
            View Media
          </Button>
        </div>
      </div>

      <div className="dashboard-stats">
        <h3>Quick Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Pages</span>
            <span className="stat-value">—</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Published Posts</span>
            <span className="stat-value">—</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active Projects</span>
            <span className="stat-value">—</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AfterDashboard
