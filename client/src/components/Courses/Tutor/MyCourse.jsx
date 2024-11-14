import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import SideBar from '../../../pages/Tutor/SideBar'
import axiosInstance from '../../../AxiosConfig'
import ConfirmationDialog from '../../common/ConfirmationDialog'
import { useSelector } from 'react-redux'

const MyCourses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const tuorDatas = useSelector((store) => store.tutor.tutorDatas);
  console.log(tuorDatas._id)
  const itemsPerPage = 4
  
  useEffect(() => {
    fetchCourses()
  }, [currentPage])

  const fetchCourses = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/tutor/course/viewcourse/${tuorDatas._id}`)
      const allCourses = response.data.courses
      setTotalPages(Math.ceil(allCourses.length / itemsPerPage))
      
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      setCourses(allCourses.slice(startIndex, endIndex))
    } catch (error) {
      console.error('Error fetching courses:', error)
      toast.error('Failed to fetch courses')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (courseId) => {
    navigate(`/tutor/editcourse/${courseId}`)
  }

  const handleDelete = async (courseId) => {
    const { showConfirmation } = ConfirmationDialog({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      onConfirm: async () => {
        try {
          await axiosInstance.delete(`/tutor/course/viewcourse/`,{params:{
            tutorId:tuorDatas._id,
            courseId,
          }})
          toast.success('Course deleted successfully')
          // Update the course list after deletion
          setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId))
          // If the current page becomes empty after deletion, go to the previous page
          if (courses.length === 1 && currentPage > 1) {
            setCurrentPage(prev => prev - 1)
          } else {
            fetchCourses()
          }
        } catch (error) {
          console.error('Error deleting course:', error)
          toast.error('Failed to delete course')
        }
      }
    })

    showConfirmation()
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activeItem="Courses" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Courses </h1>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="text-center">Loading courses...</div>
            ) : (
              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 transition-shadow hover:shadow-md"
                  >
                    <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={course.thumbnail || '/placeholder-course.png'}
                        alt={course.coursetitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {course.coursetitle}
                      </h3>
                      <p className="text-sm text-gray-600"><b>Category: {course.category.title}</b></p>
                      <p className="text-sm text-gray-600"><i>Difficulty: {course.difficulty}</i></p>
                      <p className="text-sm text-gray-600"><i>Price: ₹{course.price}</i></p>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleEdit(course._id)}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === index + 1
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MyCourses