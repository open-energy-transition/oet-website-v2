import React from 'react'
import { Logo } from '@/components/Logo/Logo'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black">
      {/* Logo */}
      <div className="mb-8">
        <span className="block dark:hidden">
          <Logo type="red" className="max-w-[200px] h-auto" />
        </span>
        <span className="hidden dark:block">
          <Logo type="white" className="max-w-[200px] h-auto" />
        </span>
      </div>

      {/* Animated bar */}
      <div className="w-48 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="h-full bg-red-500 rounded-full animate-loading-bar" />
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
