import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: "MERN Stack Developer",
    image: "https://i.imgur.com/MK3eW3As.jpg",
    price: 7990,
    instructor: {
      name: "John Doe",
      avatar: "https://i.imgur.com/MK3eW3As.jpg"
    }
  },
  {
    id: 2,
    title: "Flutter Development",
    image: "https://i.imgur.com/MK3eW3As.jpg",
    price: 7990,
    instructor: {
      name: "Jane Smith",
      avatar: "https://i.imgur.com/MK3eW3As.jpg"
    }
  },
  {
    id: 3,
    title: "Python Programming",
    image: "https://i.imgur.com/MK3eW3As.jpg",
    price: 7990,
    instructor: {
      name: "Mike Johnson",
      avatar: "https://i.imgur.com/MK3eW3As.jpg"
    }
  },
  // Add more courses as needed
];

const BestSellerCourse = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-600">{course.instructor.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">₹{course.price}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                  Buy this Course
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm flex items-center justify-center">
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

export default BestSellerCourse;