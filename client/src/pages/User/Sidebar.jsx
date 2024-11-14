import React from 'react'
import { User, BookOpen, Award, ShoppingBag, Heart, LogOut, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '@/redux/slice/UserSlice'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import axiosInstance from '@/AxiosConfig'

const ConfirmationDialog = ({
  title,
  text,
  icon,
  confirmButtonText,
  onConfirm
}) => {
  const showConfirmation = () => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };

  return { showConfirmation };
};

const Sidebar = ({ isOpen, toggleSidebar, activeItem = 'Profile' }) => {
  const userData = useSelector((store) => store.user.userDatas)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleNavigation = (path) => {
    navigate(path)
    toggleSidebar()
  }


  const handleLogout = () => {
    const { showConfirmation } = ConfirmationDialog({
      title: "Logout Confirmation",
      text: "Are you sure you want to log out?",
      icon: "warning",
      confirmButtonText: "Yes, log out",
      onConfirm: () => {
        dispatch(logoutUser())
        navigate("/")
        toggleSidebar()
        toast.success('Logged out successfully!')
      }
    });

    showConfirmation();
  }

  const menuItems = [
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'Certifications', icon: Award, path: '/certifications' },
    { name: 'My Orders', icon: ShoppingBag, path: '/my-orders' },
    { name: 'Wishlist', icon: Heart, path: '/wishlist' },
  ]

  return (
    <div 
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30 bg-white shadow-lg w-64 p-4 flex flex-col`}
    >
      <div className="flex justify-between items-center lg:hidden mb-4">
        <span className="font-bold text-xl">Menu</span>
        <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-200">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full mb-2 overflow-hidden">
          <img
            src={userData.profileImage || "/avatar.png?height=100&width=100"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-sm text-gray-600"><b>{userData.email}</b></span>
      </div>
      <nav className="flex-grow">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
              activeItem === item.name
                ? 'bg-gray-200 text-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 mb-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  )
}

export default Sidebar