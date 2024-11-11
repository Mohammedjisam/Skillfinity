import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import axiosInstance from '@/AxiosConfig';

const MyCourses = ({ tutorId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchTutorCourses = async () => {
        try {
          const response = await axiosInstance.get(`user/data/tutors/${tutorId}/courses`);
          setCourses(response.data.courses);
          console.log(response.data.courses);
        } catch (error) {
          console.error("Error fetching tutor's courses:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTutorCourses();
    }, [tutorId]);
  
    const handleViewDetails = (courseId) => {
      navigate(`/coursedetails/${courseId}`);
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
                <button
                  onClick={() => handleViewDetails(course._id)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MyCourses;