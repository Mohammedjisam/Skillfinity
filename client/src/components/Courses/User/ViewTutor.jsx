'use client'

import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axiosInstance from '@/AxiosConfig'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Book, DollarSign, Mail, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const ITEMS_PER_PAGE = 8

const ViewTutor = () => {
  const { id } = useParams()
  const [tutor, setTutor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [cartItems, setCartItems] = useState([])
  const userDatas = useSelector((store) => store.user.userDatas)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTutorData()
    fetchCartData()
  }, [id, userDatas._id])

  const fetchTutorData = async () => {
    try {
      const tutorResponse = await axiosInstance.get(`/user/data/viewtutor/${id}`)
      setTutor(tutorResponse.data)
      console.log("Fetched tutor data:", tutorResponse.data)
    } catch (error) {
      console.error("Error fetching tutor details:", error)
      setError("Failed to load tutor details")
      toast.error("Failed to load tutor details")
      if (error.response) {
        console.error("Response data:", error.response.data)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchCartData = async () => {
    try {
      if (!userDatas || !userDatas._id) {
        console.log("User data not available, skipping cart fetch")
        return
      }
      const cartResponse = await axiosInstance.post("/user/data/cart", {
        userId: userDatas._id,
      })
      const cartCourseIds = cartResponse.data.cart?.items.map(item => item.courseId._id) || []
      setCartItems(cartCourseIds)
    } catch (error) {
      console.error("Error fetching cart information:", error)
      if (error.response) {
        console.error("Response data:", error.response.data)
      }
    }
  }

  const handleAddToCart = async (courseId) => {
    try {
      if (!userDatas || !userDatas._id) {
        toast.error("Please log in to add items to cart.")
        return
      }
      await axiosInstance.post(`/user/data/addcart/${courseId}`, { userId: userDatas._id })
      setCartItems(prevItems => [...prevItems, courseId])
      toast.success('Course added to cart successfully!')
    } catch (error) {
      console.error("Error adding course to cart:", error)
      toast.error('Failed to add course to cart')
    }
  }

  const goToCart = () => {
    navigate('/cart')
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  )

  const totalPages = tutor ? Math.ceil(tutor.courses.length / ITEMS_PER_PAGE) : 0
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCourses = tutor ? tutor.courses.slice(startIndex, endIndex) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tutor && (
          <>
            <Card className="mb-6 sm:mb-8 md:mb-12 border-none bg-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                    <AvatarImage src={tutor.tutor.profileImage} alt={tutor.tutor.name} />
                    <AvatarFallback>{tutor.tutor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">{tutor.tutor.name}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-2xl">{tutor.tutor.bio}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        <Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {tutor.courses.length} Courses
                      </Badge>
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Top Seller
                      </Badge>
                    </div>
                    <Button variant="outline" className="flex items-center text-xs sm:text-sm border-none bg-gray-300">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Connect: {tutor.tutor.email}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Courses by {tutor.tutor.name}</h3>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {currentCourses.map(course => (
                <Card key={course._id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg border-none shadow-md">
                  <img
                    src={course.thumbnail || "/placeholder.svg?height=180&width=320"}
                    alt={course.coursetitle}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-base sm:text-lg line-clamp-2">{course.coursetitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-2 flex-grow">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      Category: {course.category?.title || "Uncategorized"}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-green-600">₹{course.price}</p>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex flex-col sm:flex-row gap-2">
                    <Button asChild variant="outline" className="w-full sm:w-1/2 text-xs sm:text-sm py-1">
                      <Link to={`/coursedetails/${course._id}`}>View Course</Link>
                    </Button>
                    {cartItems.includes(course._id) ? (
                      <Button 
                        className="w-full sm:w-1/2 bg-yellow-500 hover:bg-yellow-600 text-xs sm:text-sm py-1"
                        onClick={goToCart}
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Go to Cart
                      </Button>
                    ) : (
                      <Button 
                        className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-xs sm:text-sm py-1"
                        onClick={() => handleAddToCart(course._id)}
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none bg-gray-300"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none bg-gray-300"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ViewTutor