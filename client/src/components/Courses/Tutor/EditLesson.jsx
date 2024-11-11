import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Save, ArrowLeft, Upload, Menu } from 'lucide-react'
import axiosInstance from '../../../AxiosConfig'
import SideBar from '../../../pages/Tutor/SideBar'

export default function EditLesson() {
  const [lessonData, setLessonData] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { lessonId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await axiosInstance.get(`/tutor/course/editlesson/${lessonId}`)
        setLessonData(response.data.lesson)
      } catch (error) {
        console.error('Error fetching lesson data:', error)
      }
    }

    fetchLessonData()
  }, [lessonId])

  const handleInputChange = (field, value) => {
    setLessonData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0]
    if (fileType === 'video') {
      setVideoFile(file)
    } else if (fileType === 'pdf') {
      setPdfFile(file)
    }
  }

  const uploadToCloudinary = async (file, resourceType) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'skillfinity_media')
    formData.append('cloud_name', 'dwxnxuuht')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwxnxuuht/${resourceType}/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error(`Error uploading ${resourceType} to Cloudinary:`, error)
      throw error
    }
  }

  const handleSaveLesson = async () => {
    try {
      let updatedData = { ...lessonData }

      if (videoFile) {
        const videoUrl = await uploadToCloudinary(videoFile, 'video')
        updatedData.Video = videoUrl
      }

      if (pdfFile) {
        const pdfUrl = await uploadToCloudinary(pdfFile, 'raw')
        updatedData.pdfnotes = pdfUrl
      }

      const dataToSend = {
        title: updatedData.lessontitle,
        duration: updatedData.duration,
        videoUrl: updatedData.Video,
        pdfUrl: updatedData.pdfnotes,
        description: updatedData.description
      }

      const response = await axiosInstance.put(`/tutor/course/editlesson/${lessonId}`, dataToSend)
      console.log('Lesson updated:', response.data)
      navigate(`/tutor/editcourse/${lessonData.course}`)
    } catch (error) {
      console.error('Error updating lesson:', error)
    }
  }

  if (!lessonData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activeItem="Courses" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Edit Lesson</h1>
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
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
                  <input
                    type="text"
                    value={lessonData.lessontitle}
                    onChange={(e) => handleInputChange('lessontitle', e.target.value)}
                    className="w-full p-2 border rounded border-dashed border-gray-300 bg-rose-50"
                    placeholder="Lesson Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={lessonData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full p-2 border rounded border-dashed border-gray-300 bg-rose-50"
                    placeholder="Duration (e.g. 10:30)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={lessonData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-2 border rounded border-dashed border-gray-300 bg-rose-50"
                    placeholder="Lesson Description"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'video')}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                    >
                      <Upload className="w-4 h-4 mr-2 inline-block" />
                      Change Video
                    </label>
                    {videoFile && <span className="text-sm text-gray-600">{videoFile.name}</span>}
                  </div>
                  {lessonData.Video && (
                     <video 
                     controls
                     controlsList="nodownload" 
                     disablePictureInPicture
                     className="mt-2 w-full max-w-md rounded-lg bg-black"
                     style={{
                       '--video-border-radius': '0.5rem',
                     } }
                   >
                      <source src={lessonData.Video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF Notes</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'pdf')}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                    >
                      <Upload className="w-4 h-4 mr-2 inline-block" />
                      Change PDF
                    </label>
                    {pdfFile && <span className="text-sm text-gray-600">{pdfFile.name}</span>}
                  </div>
                  {lessonData.pdfnotes && (
                    <a href={lessonData.pdfnotes} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
                      View Current PDF
                    </a>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleSaveLesson}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <Save className="w-4 h-4 mr-2 inline-block" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate(`/tutor/editcourse/${lessonData.course}`)}
              className="mt-6 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}