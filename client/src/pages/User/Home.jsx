import React from 'react'
import { Star, Laptop, Code, Database, Globe, ChevronRight } from 'lucide-react'

export default function Home() {
  const handleNavigation = (destination) => {
    console.log(`Navigating to: ${destination}`)
  }
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Unlock Your Creative Potential</h1>
          <p className="text-xl mb-8 text-gray-600">with Online Design and Development Courses.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Explore Courses
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-full border-2 border-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
              View Pricing
            </button>
          </div>
        </header>
        <div className="mb-16">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/business-8676529.jpg?height=400&width=800"
              alt="People in a meeting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-30"></div>
          </div>
        </div>
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Course Categories</h2>
            <button 
              className="flex items-center text-gray-700 hover:text-gray-900 font-semibold transition duration-300 ease-in-out"
              onClick={() => handleNavigation('all-categories')}
            >
              View All <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Laptop className="w-12 h-12" />, name: "Web Development" },
              { icon: <Code className="w-12 h-12" />, name: "Programming" },
              { icon: <Database className="w-12 h-12" />, name: "Data Science" },
              { icon: <Globe className="w-12 h-12" />, name: "Digital Marketing" },
            ].map((category, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={() => handleNavigation(`category/${category.name.toLowerCase().replace(' ', '-')}`)}
              >
                <div className="text-gray-700 mb-4">{category.icon}</div>
                <span className="text-lg font-semibold text-gray-800">{category.name}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Best Seller Courses</h2>
            <button 
              className="flex items-center text-gray-700 hover:text-gray-900 font-semibold transition duration-300 ease-in-out"
              onClick={() => handleNavigation('all-courses')}
            >
              View All <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((course) => (
              <div 
                key={course} 
                className="bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={() => handleNavigation(`course/${course}`)}
              >
                <div className="bg-gradient-to-r from-gray-700 to-gray-600 h-48 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MERN STACK</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="text-gray-700 font-semibold">4.5/5</span>
                    </div>
                    <span className="font-bold text-2xl text-gray-700">$999</span>
                  </div>
                  <button 
                    className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigation(`enroll/${course}`);
                    }}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-16">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src="/pexels-julia-m-cameron-4144222.jpg?height=300&width=400"
                  alt="One to one session"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <p className="text-xl text-gray-600 mb-6">Welcome to <b>Skillfinity</b>, a dynamic platform designed to elevate your learning experience. With 24/7 community support, <b>Skillfinity</b> ensures that help is always within reach. You can easily book learning sessions, track your progress with detailed analytics, and follow personalized learning paths to achieve your goals. Additionally, our extensive on-demand video library provides access to valuable content anytime. <b>Skillfinity</b> empowers you to grow and learn with ease.</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Our Expert Tutors</h2>
            <button 
              className="flex items-center text-gray-700 hover:text-gray-900 font-semibold transition duration-300 ease-in-out"
              onClick={() => handleNavigation('all-tutors')}
            >
              View All <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((tutor) => (
              <div 
                key={tutor} 
                className="text-center cursor-pointer"
                onClick={() => handleNavigation(`tutor/${tutor}`)}
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                  <img
                    src="/tutor.jpg"
                    alt={`Tutor ${tutor}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-xl text-gray-800 mb-2">Robert</p>
                <p className="text-gray-600">Web Development Expert</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}