'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Menu, X, Search } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import axiosInstance from '@/AxiosConfig'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory, deleteCategory, setCategories } from '@/redux/slice/CategorySlice'
import { toast } from 'sonner'
import { Input } from "@/components/ui/input"

export default function CategoryManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ _id: '', title: '', description: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 5
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categoryDatas)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/admin/categories', { withCredentials: true })
        setIsLoading(false)
        console.log(response.data.categories)
        dispatch(setCategories(response.data))
      } catch (error) {
        console.error('Error fetching categories:', error)
        setIsLoading(false)
        toast.error('Failed to fetch categories')
      }
    }
    fetchCategories()
  }, [dispatch])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const filteredCategories = categories.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)

  const handleEdit = (category) => {
    setEditData(category)
    setIsEditing(true)
  }

  const handleSaveEdit = async () => {
    try {
      const response = await axiosInstance.put(`/admin/category/${editData._id}`, {
        title: editData.title,
        description: editData.description
      }, { withCredentials: true })
      
      const updatedCategory = response.data.category
      dispatch(updateCategory(updatedCategory))
      
      const updatedCategories = categories.map(cat => 
        cat._id === updatedCategory._id ? updatedCategory : cat
      )
      dispatch(setCategories(updatedCategories))
      
      setIsEditing(false)
      toast.success('Category updated successfully')
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error('Failed to update category')
    }
  }

  const handleDelete = async (_id) => {
    try {
      await axiosInstance.delete(`/admin/category/${_id}`, { withCredentials: true })
      dispatch(deleteCategory(_id))
      
      const updatedCategories = categories.filter(cat => cat._id !== _id)
      dispatch(setCategories(updatedCategories))
      
      toast.success('Category deleted successfully')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold">Category Management</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <div className="flex flex-1">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          <h1 className="text-2xl font-bold mb-6 hidden md:block">Categories</h1>
          
          <div className="mb-4 relative w-64">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. No.</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedCategories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-sm text-gray-500 text-center">No categories found</td>
                    </tr>
                  ) : (
                    paginatedCategories.map((category, index) => (
                      <tr key={category._id} className="cursor-pointer hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-500">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{category.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{category.description}</td>
                        <td className="px-4 py-2 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              className="w-24 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
                              onClick={() => handleEdit(category)}
                            >
                              Edit
                            </button>
                            <button
                              className="w-24 px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-300"
                              onClick={() => handleDelete(category._id)}
                            >
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

          {filteredCategories.length > 0 && (
            <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 py-1 rounded text-sm ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 text-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {isEditing && (
            <div className="mt-6 p-4 bg-gray-50 border rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Edit Category</h2>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full mb-2 px-4 py-2 border rounded-md"
                placeholder="Category Title"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-md"
                placeholder="Category Description"
              />
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}