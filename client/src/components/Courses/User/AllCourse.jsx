'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, ChevronLeft } from 'lucide-react'
import axiosInstance from '@/AxiosConfig'
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const AllCourse = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const coursesPerPage = 12
  const userDatas = useSelector((store) => store.user.userDatas)

  useEffect(() => {
    fetchCourses()
    fetchCartItems()
  }, [])

  useEffect(() => {
    if (userDatas) {
      fetchCartItems()
    }
  }, [userDatas])

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('/user/data/viewallcourse')
      const visibleCourses = response.data.courses.filter(course => course.isVisible)
      setCourses(visibleCourses)
      setTotalPages(Math.ceil(visibleCourses.length / coursesPerPage))
    } catch (error) {
      console.error("Error fetching courses:", error)
      toast.error("Failed to load courses. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchCartItems = async () => {
    try {
      if (!userDatas || !userDatas._id) {
        console.log("User data not available, skipping cart fetch")
        return
      }
      const response = await axiosInstance.post('/user/data/cart', { userId: userDatas._id })
      setCartItems(response.data.cart?.items || [])
    } catch (error) {
      console.error("Error fetching cart items:", error)
      if (error.response && error.response.status === 401) {
        console.log("User not authenticated, clearing cart items")
        setCartItems([])
      }
    }
  }

  const handleViewDetails = (courseId) => {
    navigate(`/coursedetails/${courseId}`)
  }

  const handleAddToCart = async (courseId) => {
    try {
      if (!userDatas || !userDatas._id) {
        toast.error("Please log in to add items to cart.")
        return
      }
      await axiosInstance.post(`/user/data/addcart/${courseId}`, { userId: userDatas._id })
      toast.success("Course added to cart successfully!")
      fetchCartItems() // Refetch cart items to ensure we have the latest data
    } catch (error) {
      console.error("Error adding course to cart:", error)
      toast.error("Failed to add course to cart.")
    }
  }

  const handleGoToCart = () => {
    navigate('/cart')
  }

  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleBackClick = () => {
    navigate(-1)
  }

  const isInCart = (courseId) => {
    return cartItems.some(item => item.courseId._id === courseId)
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center mb-8">
          <Button onClick={handleBackClick} variant="outline" className="mr-4 border-none">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-4xl font-bold text-gray-800">Explore Courses</h1>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-[6px] shadow-md overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.coursetitle}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                      <span className="sr-only">Add to favorites</span>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{course.coursetitle}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={course.tutor?.profileImage || "/default-avatar.png"}
                        alt={course.tutor?.name || "Tutor"}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{course.tutor?.name || "Unknown Tutor"}</span>
                      <span className="text-sm text-gray-500 ml-auto">
                        Category: {course.category?.title || "Uncategorized"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold">₹{course.price}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={() => handleViewDetails(course._id)}
                        variant="outline"
                        className="flex-1 bg-blue-500 border-none"
                      >
                        View Details
                      </Button>
                      {isInCart(course._id) ? (
                        <Button
                          onClick={handleGoToCart}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Go to Cart
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAddToCart(course._id)}
                          className="flex-1 bg-green-600 hover:bg-primary/90"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <Button
                    key={number}
                    onClick={() => paginate(number)}
                    variant={currentPage === number ? "default" : "outline"}
                    className={`px-4 py-2 ${
                      currentPage === number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } text-sm font-medium`}
                  >
                    {number}
                  </Button>
                ))}
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AllCourse