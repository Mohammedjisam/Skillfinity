import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SideBar from '../../../pages/Tutor/SideBar';
import axiosInstance from '@/AxiosConfig';

export default function AddCourse() {
  const [courseData, setCourseData] = useState({
    coursetitle: '',
    category: '',
    price: '',
    features: '',
    thumbnail: null
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [category,setCategory]=useState([]);
  const navigate = useNavigate();
  const categories = useSelector(state => state.category.categoryDatas);

  useEffect(() => {

      fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/admin/categories');
       console.log(response)
       setCategory(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };
  console.log("hhhhhhhhh",category)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'skillfinity_media');
      formData.append('cloud_name', 'dwxnxuuht');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwxnxuuht/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setCourseData(prevData => ({
          ...prevData,
          thumbnail: data.secure_url
        }));
        setThumbnailPreview(data.secure_url);
        toast.success('Thumbnail uploaded successfully');
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload thumbnail');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await a.post('/api/courses/add', courseData);
      toast.success('Course added successfully');
      navigate('/tutor/courses');
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activeItem="Courses" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Add New Course</h1>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                    <input
                      type="text"
                      name="coursetitle"
                      value={courseData.coursetitle}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-pink-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Category</label>
                    <select
                      name="category"
                      value={courseData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-pink-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {category.map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-pink-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                    <textarea
                      name="features"
                      value={courseData.features}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-pink-50 h-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Thumbnail Image</label>
                  <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Course thumbnail"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md cursor-pointer hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    {isUploading ? 'Uploading...' : 'Add Image'}
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full mt-6 bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                disabled={isUploading}
              >
                Add Course
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}