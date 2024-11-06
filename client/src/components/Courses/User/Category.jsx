
import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "MERN Stack Developer",
    image: "https://i.imgur.com/MK3eW3As.jpg",
    price: 799,
    instructor: {
      name: "John Doe",
      avatar: "https://i.imgur.com/MK3eW3As.jpg"
    }
  },
  {
    id: 2,
    title: "Flutter Development",
    image: "https://i.imgur.com/MK3eW3As.jpg",
    price: 799,
    instructor: {
      name: "Jane Smith",
      avatar: "https://i.imgur.com/MK3eW3As.jpg"
    }
  },
  {
    id: 3,
    title: "Python Programming",
    image: "https://i.imgur.com/MK3eW3As.jpg",
    price: 799,
    instructor: {
      name: "Mike Johnson",
      avatar: "https://i.imgur.com/MK3eW3As.jpg"
    }
  },
  {
    id: 4,
    title: "Go Programming",
    image: "https://i.imgur.com/MK3eW3As.jpg",
    price: 799,
    instructor: {
      name: "Sarah Wilson",
      avatar: "https://i.imgur.com/MK3eW3As.jpg"
    }
  }
];

const Category = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Technical</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort By:</label>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover"
              />
              <button 
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={category.instructor.avatar}
                  alt={category.instructor.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-600">{category.instructor.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">₹{category.price}</div>
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

      <div className="flex justify-center items-center gap-2 mt-8">
        <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100">
          3
        </button>
        <span className="px-2">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100">
          10
        </button>
      </div>
    </div>
  );
};

export default Category;