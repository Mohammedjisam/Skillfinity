'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Menu, X, Search, SlidersHorizontal, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from '../../../AxiosConfig'
import AdminSidebar from '@/pages/Admin/AdminSideBar'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

export default function CourseManagement() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const itemsPerPage = 5

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/user/data/viewallcourse', { withCredentials: true })
        setIsLoading(false)
        setCourses(response.data.courses)
      } catch (error) {
        console.error('Error fetching courses:', error)
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getUniqueCategories = () => {
    const categories = new Set(
      courses
        .filter(course => course.category && course.category.title)
        .map(course => course.category.title)
    );
    return ['All', ...Array.from(categories)];
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.coursetitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.category && course.category.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      course.tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'All' || (course.category && course.category.title === categoryFilter)
    
    return matchesSearch && matchesCategory
  })

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)

  const handleCourseClick = (id) => {
    navigate(`/admin/courses/${id}`)
  }

  const handleToggleVisibility = async (id, isVisible) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: isVisible ? "This course will be hidden from students." : "This course will be visible to students.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: isVisible ? 'Yes, hide it!' : 'Yes, unhide it!'
    })

    if (result.isConfirmed) {
      try {
        await axiosInstance.put(`/user/data/togglecoursevisibility/${id}`, { isVisible: !isVisible }, { withCredentials: true })
        setCourses(courses.map((course) => {
          if (course._id === id) {
            return { ...course, isVisible: !isVisible }
          }
          return course
        }))
        Swal.fire(
          'Success!',
          `Course ${isVisible ? 'hidden' : 'unhidden'} successfully`,
          'success'
        )
        toast.success(`Course ${isVisible ? 'hidden' : 'unhidden'} successfully`)
      } catch (error) {
        console.error('Error toggling course visibility:', error)
        Swal.fire(
          'Error!',
          'Failed to toggle course visibility',
          'error'
        )
        toast.error('Failed to toggle course visibility')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold text-gray-800">Course Management</h1>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      <div className="flex flex-1">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 md:p-8 space-y-6">
          <Card className="border-0 shadow-lg rounded-xl bg-white">
            <CardHeader className="border-2 border-dashed border-gray-100 rounded-t-xl">
              <CardTitle className="text-2xl font-bold text-gray-800">Courses Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative w-full md:w-1/2">
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-pink-100 border-none">
                    {getUniqueCategories().map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => setCategoryFilter(category)}
                        className={categoryFilter === category ? 'bg-gray-300' : ''}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="rounded-lg border-2 border-dashed border-gray-100 overflow-hidden bg-white ">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b-2 border-dashed border-gray-100">
                      <TableHead className="w-20 font-semibold text-gray-600">Sl. No.</TableHead>
                      <TableHead className="font-semibold text-gray-600">Course Name</TableHead>
                      <TableHead className="font-semibold text-gray-600">Category</TableHead>
                      <TableHead className="font-semibold text-gray-600">Tutor Name</TableHead>
                      <TableHead className="font-semibold text-gray-600 text-center">Lessons</TableHead>
                      <TableHead className="font-semibold text-gray-600">Status</TableHead>
                      <TableHead className="font-semibold text-gray-600">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCourses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">
                          No courses found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedCourses.map((course, index) => (
                        <TableRow 
                          key={course._id} 
                          className="hover:bg-gray-50 transition-colors duration-150 border-b-2 border-dashed border-gray-100 cursor-pointer"
                          onClick={() => handleCourseClick(course._id)}
                        >
                          <TableCell className="font-medium text-gray-900">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{course.coursetitle}</TableCell>
                          <TableCell className="text-gray-600">{course.category ? course.category.title : 'N/A'}</TableCell>
                          <TableCell className="text-gray-600">{course.tutor.name}</TableCell>
                          <TableCell className="text-center text-gray-600">{course.lessons.length}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              course.isVisible 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {course.isVisible ? 'Visible' : 'Hidden'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleVisibility(course._id, course.isVisible)
                              }}
                              variant={course.isVisible ? 'destructive' : 'outline'}
                              size="icon"
                            >
                              {course.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}