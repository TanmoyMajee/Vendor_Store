"use client"

import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import { Users, CreditCard, Shield } from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (loading) return
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Manage Your <span className="text-blue-600">Vendors</span> Efficiently
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your vendor management process with our comprehensive platform.
            Store vendor details, manage bank information, and keep everything organized in one place.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md"
            >
              Get Started
            </button>
            <button className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Vendor Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Easily add, edit, and manage all your vendor information in one centralized location.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Bank Details</h3>
              <p className="text-gray-600 leading-relaxed">
                Securely store and manage vendor banking information for seamless transactions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Secure Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Google OAuth integration ensures secure authentication and data protection.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}