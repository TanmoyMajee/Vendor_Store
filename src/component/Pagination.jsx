"use client"
import React from 'react'

export default function Pagination({ pagination, onPageChange }) {
  const { page, limit, total, totalPages } = pagination
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="w-full bg-white border-t py-4">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Results Info */}
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-3">
          {/* Previous Button */}
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              page === 1
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-purple-600 bg-white border border-purple-600 hover:bg-purple-600 hover:text-white'
            }`}
          >
            Previous
          </button>

          {/* Page Info */}
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              page === totalPages
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-purple-600 bg-white border border-purple-600 hover:bg-purple-600 hover:text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}