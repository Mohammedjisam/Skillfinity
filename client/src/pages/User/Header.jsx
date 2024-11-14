import { useState } from 'react';
import { ChevronRight, Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return { isAuthenticated, setIsAuthenticated };
};

const Header = () => {
  const userData = useSelector((store) => store.user.userDatas);
  const cartItems = useSelector((store) => store.cart.items) || [];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            {userData ? (
              <>
                <nav className="hidden md:flex space-x-6">
                  <a href="/home" className="text-gray-700 hover:text-gray-900">Home</a>
                  <a href="/allcourse" className="text-gray-700 hover:text-gray-900">Courses</a>
                  <a href="#" className="text-gray-700 hover:text-gray-900">About Us</a>
                  <a href="/viewalltutors" className="text-gray-700 hover:text-gray-900">Tutors</a>
                  <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Course"
                      className="pl-8 pr-2 py-1 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="relative flex items-center space-x-2">
                    <button
                      className="rounded-full bg-gray-200 p-1"
                      onClick={handleCartClick}
                    >
                      <ShoppingCart className="h-6 w-6 text-gray-600" />
                    </button>
                    {cartItems.length > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center absolute -top-2 -right-2">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <button 
                    className="rounded-full" 
                    onClick={handleProfileClick}
                  >
                    {userData.profileImage ? (
                      <img 
                        src={userData.profileImage} 
                        alt="Profile" 
                        className="h-8 w-8 object-cover rounded-full"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-600" />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button onClick={handleLoginClick} className="px-3 py-2 text-gray-700 hover:text-gray-900">Log in</button>
                <button onClick={handleSignUpClick} className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Sign Up</button>
              </div>
            )}
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {userData ? (
            <>
              <nav className="px-4 pt-2 pb-4 space-y-2">
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Home</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Courses</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">About Us</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Tutors</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-gray-900">Contact</a>
              </nav>
              <div className="px-4 py-4 space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Course"
                    className="w-full pl-8 pr-2 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-gray-900 bg-gray-100 rounded-md flex items-center justify-between" onClick={handleCartClick}>
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:text-gray-900 bg-gray-100 rounded-md flex items-center" onClick={handleProfileClick}>
                  {userData.profileImage ? (
                    <img 
                      src={userData.profileImage} 
                      alt="Profile" 
                      className="h-6 w-6 object-cover rounded-full mr-2"
                    />
                  ) : (
                    <User className="h-6 w-6 text-gray-600 mr-2" />
                  )}
                  <span>Profile</span>
                </button>
              </div>
            </>
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