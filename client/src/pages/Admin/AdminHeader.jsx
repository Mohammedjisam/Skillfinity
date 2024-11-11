import { useState } from 'react';
import { ChevronRight, Menu, X, Search, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const adminData = useSelector((store) => store.admin.adminDatas);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/admin/dashboard');
  };

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
            {adminData ? (
              <nav className="hidden md:flex space-x-6">
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-gray-900">Home</Link>
                <Link to="/admin/category" className="text-gray-700 hover:text-gray-900">Categories</Link>
                <Link to="/admin/courses" className="text-gray-700 hover:text-gray-900">Courses</Link>
                <Link to="/admin/students" className="text-gray-700 hover:text-gray-900">Students</Link>
                <Link to="/admin/tutors" className="text-gray-700 hover:text-gray-900">Tutors</Link>
              </nav>
            ) : null}
            {adminData ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Course"
                    className="pl-8 pr-2 py-1 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <button className="rounded-full bg-gray-200 p-1" onClick={handleProfileClick}>
                  <User className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button className="px-3 py-2 text-gray-700 hover:text-gray-900">Log in</button>
              </div>
            )}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-4 pt-2 pb-4">
            <ul className="space-y-2">
              {adminData ? (
                <>
                  <li>
                    <Link to="/admin/dashboard" className="text-gray-700 hover:text-gray-900">Home</Link>
                  </li>
                  <li>
                    <Link to="/admin/dashboard" className="text-gray-700 hover:text-gray-900">Courses</Link>
                  </li>
                  <li>
                    <Link to="/admin/students" className="text-gray-700 hover:text-gray-900">Students</Link>
                  </li>
                  <li>
                    <Link to="/admin/tutors" className="text-gray-700 hover:text-gray-900">Tutors</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button className="text-gray-700 hover:text-gray-900">Log in</button>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {adminData && (
            <div className="px-4 py-4 space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Course"
                  className="w-full pl-8 pr-2 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-gray-900 bg-gray-100 rounded-md">
                Profile
              </button>
            </div>
          )}
        </div>
      )}

      <div className="h-0.5 bg-green-500"></div>
    </header>
  );
};

export default Header;
