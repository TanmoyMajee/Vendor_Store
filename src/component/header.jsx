"use client"

import Link from 'next/link'
import { useAuth } from '@/context/authContext'

const Header = () => {
  const { user, logOut, loading } = useAuth()

  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-800">VendorHub</Link>

          {user ? (
            // Logged in user - show profile and logout
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <span className="text-gray-700 font-medium">
                {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            // Not logged in - show sign in button
            <Link href="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header