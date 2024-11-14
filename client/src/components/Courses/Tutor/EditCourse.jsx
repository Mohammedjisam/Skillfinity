import React, { useState, useEffect } from 'react'
import { MonitorPlay, Edit2, Menu, Save, X, PlusCircle } from 'lucide-react'
import SideBar from '../../../pages/Tutor/SideBar'
import axiosInstance from '../../../AxiosConfig'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

export default function EditCourse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [courseData, setCourseData] = useState(null)
  const [editingStructureIndex, setEditingStructureIndex] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [reload, setReload] = useState(false)

  const tuorDatas = useSelector((store) => store.tutor.tutorDatas)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!tuorDatas?._id) {
      toast.error('Tutor data is not available yet.')
      return
    }

    const fetchCourseData = async () => {
      try {
        const response = await axiosInstance.post(`/tutor/course/viewdata/${id}`, { tutorId: tuorDatas._id })
        setCourseData(response.data.course)
      } catch (error) {
        toast.error('Error fetching course data')
        console.error('Error fetching course data:', error)
      }
    }

    fetchCourseData()
    setReload(false)
  }, [id, tuorDatas, reload])

  const handleDeleteCourse = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this! All associated lessons will be deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        await axiosInstance.delete(`/tutor/course/viewcourse/`, { params: { tutorId: tuorDatas._id, courseId: id } })
        Swal.fire('Deleted!', 'Your course has been deleted.', 'success')
        toast.success('Course deleted successfully')
        navigate('/tutor/mycourse')
      }
    } catch (error) {
      toast.error('Failed to delete course')
      console.error('Error deleting course:', error)
    }
  }

  const handleRemoveLesson = async (lessonId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        await axiosInstance.delete(`/tutor/course/editlesson/`, { params: { tutorId: tuorDatas._id, lessonId } })
        toast.success('Lesson removed successfully')
        setReload(true)
        Swal.fire('Deleted!', 'Your lesson has been deleted.', 'success')
      }
    } catch (error) {
      toast.error('Failed to remove lesson')
      console.error('Error deleting lesson:', error)
    }
  }

  const handleEditLesson = (lessonId) => {
    navigate(`/tutor/editlesson/${lessonId}`)
  }

  const handleAddLesson = () => {
    navigate(`/tutor/addlesson/${id}`)
  }

  const handleSaveChanges = async () => {
    try {
      let thumbnailUrl = courseData.thumbnail

      if (thumbnailFile) {
        const formData = new FormData()
        formData.append('file', thumbnailFile)
        formData.append('upload_preset', 'skillfinity_media')
        formData.append('cloud_name', 'dwxnxuuht')

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dwxnxuuht/image/upload`,
          { method: 'POST', body: formData }
        )
        const cloudinaryData = await cloudinaryResponse.json()
        thumbnailUrl = cloudinaryData.secure_url
      }

      const updatedData = {
        coursetitle: courseData.coursetitle,
        price: courseData.price,
        features: courseData.features,
        thumbnail: thumbnailUrl,
        courseStructure: courseData.courseStructure,
        tutorId: tuorDatas._id
      }

      await axiosInstance.put(`/tutor/course/editData/${id}`, updatedData)

      toast.success('Course updated successfully')
      navigate('/tutor/mycourse')
    } catch (error) {
      toast.error('Failed to update course')
      console.error('Error updating course:', error)
    }
  }

  const handleInputChange = (field, value) => {
    if (field === 'coursetitle') {
      if (value.length > 20) {
        toast.error('Course title cannot exceed 20 characters.')
        return
      }
    }

    setCourseData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleStructureChange = (index, value) => {
    setCourseData((prevData) => ({
      ...prevData,
      courseStructure: prevData.courseStructure.map((item, i) => i === index ? value : item),
    }))
  }

  const handleEditStructure = (index) => {
    setEditingStructureIndex(index)
  }

  const handleSaveStructure = () => {
    setEditingStructureIndex(null)
  }

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnailFile(e.target.files[0])
      toast.success('Thumbnail selected successfully')
    }
  }

  const addSection = (index) => {
    setCourseData((prevData) => ({
      ...prevData,
      courseStructure: [
        ...prevData.courseStructure.slice(0, index + 1),
        '',
        ...prevData.courseStructure.slice(index + 1),
      ],
    }));
  };
  
  const removeSection = (index) => {
    setCourseData((prevData) => ({
      ...prevData,
      courseStructure: prevData.courseStructure.filter((_, i) => i !== index),
    }));
  };

  if (!courseData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activeItem="Courses" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6 pb-6">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="p-6 flex items-center gap-4">
                <img 
                  src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : courseData.thumbnail || "/placeholder.svg?height=80&width=160"} 
                  alt="Course thumbnail" 
                  className="w-40 h-20 rounded-lg object-cover" 
                />
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{courseData.coursetitle}</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-2"><MonitorPlay className="w-4 h-4" /> {courseData.lessons?.length || 0} Lessons</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold mb-4">Course Structure</h2>
  <div className="space-y-2">
    {courseData.courseStructure?.map((item, index) => (
      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 border-dashed border-gray-300 bg-rose-50">
        {editingStructureIndex === index ? (
          <>
            <input
              type="text"
              value={item}
              onChange={(e) => handleStructureChange(index, e.target.value)}
              className="flex-grow mr-2 p-1 rounded border-none"
            />
            <div>
              <button onClick={handleSaveStructure} className="text-green-600 hover:text-green-800 mr-2">
                <Save className="w-4 h-4" />
              </button>
              <button onClick={() => setEditingStructureIndex(null)} className="text-red-600 hover:text-red-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            <span>{index + 1}. {item}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => handleEditStructure(index)} className="text-gray-500 hover:text-gray-700">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => addSection(index)} className="text-teal-500 hover:text-teal-700">
                <PlusCircle className="w-4 h-4" />
              </button>
              <button onClick={() => removeSection(index)} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
</div>
               
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Lessons</h2>
                    <button
                      onClick={handleAddLesson}
                      className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors flex items-center gap-2"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Add Lesson
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.lessons?.map((lesson) => (
                      <div key={lesson._id} className="border rounded-lg p-4 border-dashed border-gray-300 bg-rose-50">
                        <video controls className="w-full h-50 object-cover rounded-lg mb-3">
                          <source src={lesson.Video || "/placeholder.mp4"} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="items-center justify-between mt-2">
                          <div className=" text-sm text-gray-500 gap-16">
                            <b>Title: {lesson.lessontitle}</b>
                            <div className="items-center mt-2">
                              <div className="text-sm text-gray-500 mb-[10px]">
                                <b>Duration:{lesson.duration} minutes</b>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4 items-center mt-2">
                            <button
                              onClick={() => handleEditLesson(lesson._id)}
                              className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 cursor-pointer transition-colors"
                            >
                              Edit Lesson
                            </button>
                            <button
                              onClick={() => handleRemoveLesson(lesson._id)}
                              className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 cursor-pointer transition-colors"
                            >
                              Remove Lesson
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Course Title</label>
                  <input 
                    type="text" 
                    value={courseData.coursetitle} 
                    onChange={(e) => handleInputChange('coursetitle', e.target.value)} 
                    className="w-full p-2 border rounded-md border-dashed border-gray-300 bg-rose-50" 
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {courseData.coursetitle ? courseData.coursetitle.length : 0} / 20 characters
                  </p>
                </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input 
                      type="number" 
                      value={courseData.price} 
                      onChange={(e) => handleInputChange('price', e.target.value)} 
                      className="w-full p-2 border rounded-md border-dashed border-gray-300 bg-rose-50" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Features</label>
                    <textarea 
                      value={courseData.features} 
                      onChange={(e) => handleInputChange('features', e.target.value)} 
                      rows="4" 
                      className="w-full p-2 border rounded-md border-dashed border-gray-300 bg-rose-50" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
                    <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {thumbnailFile ? (
                        <img 
                          src={URL.createObjectURL(thumbnailFile)} 
                          alt="New thumbnail" 
                          className="w-full h-auto object-contain" 
                        />
                      ) : courseData.thumbnail ? (
                        <img 
                          src={courseData.thumbnail} 
                          alt="Current thumbnail" 
                          className="w-full h-auto object-contain" 
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center border-2 border-dashed rounded-full">
                            <Edit2 className="w-6 h-6 text-gray-400" />
                          </div>
                          <span className="text-sm text-gray-500">Click to upload thumbnail</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="mt-4 w-full inline-flex justify-center px-4 py-2 bg-gray-900 text-white rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                      {thumbnailFile || courseData.thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}
                    </label>
                  </div>
                </div>
                <button
                  onClick={handleSaveChanges}
                  className="mt-6 w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleDeleteCourse}
                  className="mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}