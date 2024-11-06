import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import axiosInstance from '@/AxiosConfig'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory, deleteCategory, setCategories } from '@/redux/slice/CategorySlice'
import { toast } from 'sonner'

export default function CategoryManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // const [category,setCategories]=useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ _id: '', title: '', description: '' })
  const itemsPerPage = 5
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categoryDatas)
  console.log("from store=========>",categories)
  

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

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(categories.length / itemsPerPage)

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
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {paginatedCategories.length > 0 ? (
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
                    {paginatedCategories.map((category, index) => (
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
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-gray-500">No categories available</div>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

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
