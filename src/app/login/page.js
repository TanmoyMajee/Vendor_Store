"use client"

import React, { useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { Check, LogIn } from 'lucide-react'

export default function LoginPage() {
  const { signInWithGoogle, loading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, router,loading])

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">VendorMS</h1>
          <h2 className="text-xl text-gray-600">Sign in to your account</h2>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* Welcome Message */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Welcome back!</h3>
            <p className="text-sm text-gray-600">Please sign in with your Google account to continue</p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:shadow-md transition-all mb-6"
          >
            <LogIn className="mr-3 w-5 h-5" />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Secure Authentication</span>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              Secure Google OAuth authentication
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              Access to vendor management dashboard
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              Protected data encryption
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}