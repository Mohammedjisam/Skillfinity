import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '@/AxiosConfig';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Book, DollarSign, Mail, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

const ViewTutor = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const response = await axiosInstance.get(`/user/data/viewtutor/${id}`);
        setTutor(response.data);
        console.log(response)
      } catch (err) {
        setError("Failed to load tutor details");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorDetails();
  }, [id]);

  const handleAddToCart = async (courseId) => {
    try {
      await axiosInstance.post(`/user/data/addcart/${courseId}`);
      toast.success('Course added to cart successfully!');
    } catch (error) {
      toast.error('Failed to add course to cart');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tutor && (
          <>
            <Card className="mb-6 sm:mb-8 md:mb-12">
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
                    <Button variant="outline" className="flex items-center text-xs sm:text-sm">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Connect: {tutor.tutor.email}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Courses by {tutor.tutor.name}</h3>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {tutor.courses.map(course => (
                <Card key={course._id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                  <img
                    src={course.thumbnail || "/placeholder.svg?height=180&width=320"}
                    alt={course.coursetitle}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <CardHeader className="p-3 sm:p-4">
                    <CardTitle className="text-base sm:text-lg line-clamp-2">{course.coursetitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0 flex-grow">
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">
                      Category: {course.category.title || "Uncategorized"}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-green-600">₹{course.price}</p>
                  </CardContent>
                  <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col sm:flex-row gap-2">
                    <Button asChild variant="outline" className="w-full sm:w-1/2 text-xs sm:text-sm py-1 sm:py-2">
                      <Link to={`/coursedetails/${course._id}`}>View Course</Link>
                    </Button>
                    <Button 
                      className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-xs sm:text-sm py-1 sm:py-2"
                      onClick={() => handleAddToCart(course._id)}
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewTutor;