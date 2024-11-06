import { useState, useEffect } from 'react'
import { Menu, X, Loader2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import axiosInstance from '@/AxiosConfig'

export default function Student() {
  const { studentId } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [student, setStudent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get(`/admin/students/${studentId}`, { withCredentials: true })
        setStudent(response.data.student)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching student data:', err)
        setError('Failed to load student data. Please try again.')
        setIsLoading(false)
      }
    }

    fetchStudentData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 w-[350px]">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">There was a problem loading the student data.</p>
          <p className="mb-4">{error}</p>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4">
        <button
          className="md:hidden mb-4 p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle sidebar</span>
        </button>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h1 className="text-xl font-bold">Student Details</h1>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={student.profileImage || "/placeholder.svg?height=300&width=300"}
                  alt={`${student.name}'s profile`}
                  className="w-full rounded-lg object-cover aspect-square"
                />
              </div>
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-3xl font-bold text-blue-600">{student.name}</h2>
                <hr className="border-gray-200" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{student.phoneNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{student.user_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Course Purchased</p>
                    <p className="font-medium">{student.course || 'No courses'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${student.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {student.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}