export const LoginWelcome = () => (
  <div className="oet-login">
    <h1>Website workspace</h1>
    <p>Sign in to manage Open Energy Transition content.</p>
  </div>
)

export const DashboardWelcome = () => (
  <section className="oet-welcome" aria-labelledby="oet-welcome-title">
    <div>
      <p className="oet-eyebrow">Open Energy Transition</p>
      <h1 id="oet-welcome-title">Your website workspace</h1>
      <p>Write, review and publish. Save a draft to preview changes before they go live.</p>
    </div>
    <nav aria-label="Quick actions" className="oet-quick-actions">
      <a href="/admin/collections/publications/create">New publication</a>
      <a href="/admin/collections/media">Media library</a>
      <a href="/admin/globals/home-page">Edit home page</a>
    </nav>
  </section>
)
