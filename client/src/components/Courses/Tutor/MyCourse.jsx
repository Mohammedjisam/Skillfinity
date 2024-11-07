import React, { useState, useEffect } from 'react'
import { Pencil, Trash2, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import SideBar from '../../../pages/Tutor/SideBar'
import axiosInstance from '../../../AxiosConfig'
import ConfirmationModal from '../../common/ConfirmationModal'

const MyCourses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false) // Modal state
  const [selectedCourse, setSelectedCourse] = useState(null) // Selected course for deletion
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [currentPage])

  const fetchCourses = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get('/tutor/course/viewcourse')
      setCourses(response.data.courses)
      setTotalPages(Math.ceil(response.data.courses.length / 5))
    } catch (error) {
      console.error('Error fetching courses:', error)
      toast.error('Failed to fetch courses')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (courseId) => {
    navigate(`/tutor/edit-course/${courseId}`)
  }

  const handleDelete = (courseId) => {
    setSelectedCourse(courseId) // Set the selected course ID
    setModalOpen(true) // Open the modal
  }

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/tutor/course/viewcourse/${selectedCourse}`)
      toast.success('Course deleted successfully')
      fetchCourses() // Refresh the course list
    } catch (error) {
      console.error('Error deleting course:', error)
      toast.error('Failed to delete course')
    } finally {
      setModalOpen(false) // Close the modal
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activeItem="Courses" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Courses ({courses.length})</h1>
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
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course?"
      />
    </div>
  )
}

export default MyCourses
