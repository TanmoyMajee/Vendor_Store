"use client"

import Link from 'next/link'
import { Edit, Trash2 } from 'lucide-react'

const VendorList = ({ vendors = [], pagination = {}, onDelete, onPageChange }) => {
  // vendors: array of vendor objects
  // pagination: { page, limit, total, totalPages }
  // onPageChange: function to call when a page button is clicked

  return (
    <div>
      {/* Vendor Actions */}
      <div className=" flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Vendors</h1>
        <Link
          href="/dashboard/add-vendor"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add New Vendor
        </Link>
      </div>

      {/* Vendor Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Vendor Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Bank Account No.</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Bank Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No vendors found. Add your first vendor to get started.
                </td>
              </tr>
            ) : (
              vendors.map((vendor) => (
                <tr key={vendor._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">{vendor.name}</td>
                  <td className="px-6 py-4">{vendor.Bank_Account_No}</td>
                  <td className="px-6 py-4">{vendor.Bank_Name}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/edit-vendor/${vendor._id}`}
                        className="text-purple-600 hover:text-purple-800 border border-purple-600 px-3 py-1 rounded hover:bg-purple-600 hover:text-white transition-all"
                      >
                        <Edit size={16} className="inline mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => onDelete && onDelete(vendor._id)}
                        className="text-red-600 hover:text-red-800 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 size={16} className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VendorList