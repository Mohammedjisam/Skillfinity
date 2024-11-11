import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import axiosInstance from '@/AxiosConfig';

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/user/data/viewallcourse');
        setCourses(response.data.courses);
        console.log(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleViewDetails = (courseId) => {
    navigate(`/coursedetails/${courseId}`);
  };

  const handleAddToCart = async (courseId) => {
    try {
      const response = await axiosInstance.post(`/user/data/addcart/${courseId}`);
      console.log(`Course with ID ${courseId} added to cart`, response.data);
      // Optionally show a success message or toast notification here
    } catch (error) {
      console.error("Error adding course to cart:", error);
      // Optionally show an error message or toast notification here
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.coursetitle}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{course.coursetitle}</h3>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={course.tutor.profileImage}
                  alt={course.tutor.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-600">{course.tutor.name}</span>
                <span className="text-sm text-gray-500 ml-auto">Category: {course.category.title}</span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">₹{course.price}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleViewDetails(course._id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleAddToCart(course._id)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourse;
