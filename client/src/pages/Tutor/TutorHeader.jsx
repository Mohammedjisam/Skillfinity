import { useState } from 'react';
import { ChevronRight, Menu, X, Search, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const tutorData = useSelector((store) => store.tutor.tutorDatas);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => navigate('/tutor/profile');
  const handleLoginClick = () => navigate('/tutor');
  const handleSignUpClick = () => navigate('/tutor/signup');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="font-sans">
      <div className="bg-gray-600 text-white py-2 px-4 text-center rounded-[5px] mx-auto w-[98.75%] mt-[7px]">
        <p className="text-sm flex items-center justify-center">
          Free Courses <span className="text-yellow-300 mx-1">★</span> Sale Ends Soon. Get It Now
          <ChevronRight className="ml-2 h-4 w-4" />
        </p>
      </div>
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <img
                src="/logo-black-Photoroom.svg?height=40&width=40"
                alt="Skillfinity Logo"
                className="mr-2"
                style={{ height: '50px', width: 'auto' }}
              />
            </div>
            {tutorData ? (
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Courses</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">About Us</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
              </nav>
            ) : null}
            <div className="hidden md:flex items-center space-x-4">
              {tutorData ? (
                <>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Course"
                      className="pl-8 pr-2 py-1 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <button 
                    className="rounded-full" 
                    onClick={handleProfileClick}
                  >
                    {tutorData.profileImage ? (
                      <img 
                        src={tutorData.profileImage} 
                        alt="Profile" 
                        className="h-8 w-8 object-cover rounded-full"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-600" />
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleLoginClick} className="px-3 py-2 text-gray-700 hover:text-gray-900">Log in</button>
                  <button onClick={handleSignUpClick} className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Sign Up</button>
                </>
              )}
            </div>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            {tutorData ? (
              <>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Home</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Courses</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">About Us</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Categories</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Contact</a>
              </>
            ) : null}
          </nav>
          {tutorData ? (
            <div className="px-4 py-4 space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Course"
                  className="w-full pl-8 pr-2 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button onClick={handleProfileClick} className="w-full px-4 py-2 text-left  text-gray-700 hover:text-gray-900 bg-gray-100 rounded-md flex items-center">
                {tutorData.profileImage ? (
                  <img 
                    src={tutorData.profileImage} 
                    alt="Profile" 
                    className="h-6 w-6 object-cover rounded-full mr-2"
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-600 mr-2" />
                )}
                <span>Profile</span>
              </button>
            </div>
          ) : (
            <div className="px-4 py-4 space-y-2">
              <button onClick={handleLoginClick} className="w-full px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md">Log in</button>
              <button onClick={handleSignUpClick} className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Sign Up</button>
            </div>
          )}
        </div>
      )}
      <div className="h-0.5 bg-green-500"></div>
    </header>
  );
};

export default Header;