'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Menu, X, Search } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import { logoutUser } from '@/redux/slice/UserSlice'
import { useDispatch } from 'react-redux'
import axiosInstance from '@/AxiosConfig'
import { Input } from "@/components/ui/input"

export default function StudentManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 5
  const [students, setStudents] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/admin/students', { withCredentials: true })
        setIsLoading(false)
        setStudents(response.data.students)
      } catch (error) {
        console.error('Error fetching students:', error)
        setIsLoading(false)
      }
    }
    fetchStudents()
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleToggleStatus = async (id, isActive) => {
    try {
      const response = await axiosInstance.put(`/admin/${isActive ? 'unlistuser' : 'listuser'}/${id}`, { withCredentials: true })
      console.log(response)
      
      setStudents(students.map((student) => {
        if (student._id === id) {
          return { ...student, isActive: !isActive }
        }
        return student
      }))

      if (!isActive) {
        dispatch(logoutUser())
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold">Student Management</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <div className="flex flex-1">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          <h1 className="text-2xl font-bold mb-6 hidden md:block">Students</h1>
          
          <div className="mb-4 relative w-64">
            <Input
              type="text"
              placeholder="Search students..."
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
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student_ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses Purchased</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-2 text-sm text-gray-500 text-center">No students found</td>
                    </tr>
                  ) : (
                    paginatedStudents.map((student, index) => (
                      <tr key={student._id} className="cursor-pointer hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-500">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{student.user_id}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{student.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{student.email}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{student.course || 'No Courses'}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{student.isActive ? 'Active' : 'Inactive'}</td>
                        <td className="px-4 py-2 text-sm font-medium">
                          <button
                            className={`w-24 px-6 py-2 rounded-md text-white transition duration-300 ${student.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                            onClick={() => handleToggleStatus(student._id, student.isActive)}
                          >
                            {student.isActive ? 'Block' : 'Unblock'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>               
              </table>
            </div>
          </div>

          {filteredStudents.length > 0 && (
            <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: Math.ceil(filteredStudents.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
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
                disabled={currentPage === Math.ceil(filteredStudents.length / itemsPerPage)}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 text-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}