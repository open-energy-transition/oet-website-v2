'use client'

export function CookieSettingsButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).klaro?.show) {
      ;(window as any).klaro.show((window as any).klaroConfig)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="text-heebo-small-link text-xs lg:text-sm text-white hover:underline cursor-pointer bg-transparent border-0 p-0"
    >
      Cookie Settings
    </button>
  )
}
