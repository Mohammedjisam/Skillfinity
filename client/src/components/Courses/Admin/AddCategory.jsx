import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../../pages/Admin/AdminSideBar'
import axiosInstance from '@/AxiosConfig'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'sonner'
import { addCategory } from '@/redux/slice/CategorySlice'
import { useDispatch } from 'react-redux'
import { Menu, X } from 'lucide-react'

export default function AddCategory() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post(
        '/admin/addcategory',
        formData,
        { withCredentials: true }
      )
      if(response.data){
        dispatch(addCategory(response.data.categoryData))
        navigate("/admin/category")
        toast.success(response.data.message)
      } else {
        toast.error('No data received from server')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Category Adding failed'
      console.error(errorMessage)
      toast.error(errorMessage)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-grow">
        <header className="bg-white shadow-md p-4 flex justify-between items-center lg:hidden">
          <h1 className="text-xl font-bold">Add New Category</h1>
          <button onClick={toggleSidebar} className="text-gray-600" aria-label="Toggle sidebar">
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 hidden lg:block">Add New Category</h1>
            <button 
              onClick={toggleSidebar} 
              className="text-gray-600 lg:hidden" 
              aria-label="Toggle sidebar"
            >
              {/* {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />} */}
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}