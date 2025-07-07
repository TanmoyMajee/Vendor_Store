
"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import VendorList from '@/component/vendorList'
import Pagination from '@/component/Pagination'

export default function Dashboard() {
  const { user, loading, token } = useAuth()
  const router = useRouter()
  const [vendors, setVendors] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, totalPages: 1 })
  const [loadingVendors, setLoadingVendors] = useState(true)

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  // Initial fetch on mount
  useEffect(() => {
    if (user) loadPage(pagination.page)
  }, [user])

  // Combined page load
  const loadPage = async (page) => {
    setLoadingVendors(true)
    try {
      const res = await fetch(`/api/vendor?page=${page}&limit=${pagination.limit}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      setVendors(data.vendors || [])
      setPagination(data.pagination || { ...pagination, page })
    } catch (err) {
      console.error('Error fetching vendors:', err)
      setVendors([])
    } finally {
      setLoadingVendors(false)
    }
  }

  // Handle page clicks directly
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return
    loadPage(newPage)
  }

  const handleDeleteVendor = async (vendorId) => {
    try {
      const res = await fetch(`/api/vendor/${vendorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        // Reload current page after deletion
        loadPage(pagination.page)
      }
    } catch (err) {
      console.error('Error deleting vendor:', err)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24"> 
      <div className="max-w-6xl mx-auto px-5 py-8">
        {loadingVendors ? (
          <div className="text-center py-8">
            <div className="text-xl">Loading vendors...</div>
          </div>
        ) : (
          <VendorList
            vendors={vendors}
            pagination={pagination}
            onDelete={handleDeleteVendor}
          />
        )}
      </div>
      <div className='mt-0'>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
      
    </div>
  )
}
