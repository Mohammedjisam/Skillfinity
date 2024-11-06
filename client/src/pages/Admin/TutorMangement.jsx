import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import axios from 'axios'
import AdminSidebar from './AdminSidebar'
import { logoutTutor } from '@/redux/slice/TutorSlice'
import { useDispatch } from 'react-redux'
import axiosInstance from '@/AxiosConfig'

export default function TutorManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 5
  const [tutors, setTutors] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()      

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axiosInstance.get("/admin/tutors");
        setIsLoading(false)
        setTutors(response.data.tutors)
      } catch (error) {
        console.error('Error fetching tutors:', error)
        setIsLoading(false)
      }
    }
    fetchTutors()
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedTutors = tutors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  async function handleList(id) {
    try {
      const response = await axiosInstance.put(`/admin/listtutor/${id}`, { withCredentials: true }) 
      setTutors(tutors.map((x) => {
        if (x._id === id) {
          return { ...x, isActive: true }
        }
        return x;
      }));
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handleUnlist(id) {
    try {
      const response = await axiosInstance.put(`/admin/unlisttutor/${id}`, { withCredentials: true })       
      setTutors(tutors.map((x) => {
        if (x._id === id) {
          return { ...x, isActive: false }; 
        }
        if(x?.isActive === false) {
          dispatch(logoutTutor())
        }
        return x;
      }));  
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold">Tutor Management</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <div className="flex flex-1">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          <h1 className="text-2xl font-bold mb-6 hidden md:block">Tutors</h1>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {tutors.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No tutors available.</p>
              ) : (
                <table className="w-full table-auto divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. No.</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor_ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor Mail</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses Taken</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTutors.map((tutor, index) => (
                      <tr key={tutor._id} className="cursor-pointer hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-500">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{tutor.user_id}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{tutor.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{tutor.email}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{tutor.course || 'No Courses'}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{tutor.isActive ? 'Active' : 'Inactive'}</td>
                        <td className="px-4 py-2 text-sm font-medium">
                          <button
                            className={`text-white px-4 py-2 rounded-md hover:opacity-90 transition duration-300 ${tutor.isActive ? 'bg-red-600' : 'bg-blue-600'}`}
                            onClick={() => (tutor.isActive ? handleUnlist(tutor._id) : handleList(tutor._id))}
                            style={{ width: '80px' }} // Ensures consistent button width
                          >
                            {tutor.isActive ? 'Block' : 'Unblock'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {tutors.length > 0 && (
            <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: Math.ceil(tutors.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
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
                disabled={currentPage === Math.ceil(tutors.length / itemsPerPage)}
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
