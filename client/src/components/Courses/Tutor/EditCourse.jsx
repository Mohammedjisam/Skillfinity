'use client'

import React, { useState, useCallback } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { ChevronDown, MonitorPlay, Users, Edit2, Trash2, Menu } from 'lucide-react'
import SideBar from '../../../pages/Tutor/SideBar'

export default function EditCourse() {
  const [isOpen, setIsOpen] = useState(false)
  const [src, setSrc] = useState(null)
  const [crop, setCrop] = useState({ aspect: 16 / 9 })
  const [image, setImage] = useState(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Image cropping functions
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setSrc(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoaded = useCallback((img) => {
    setImage(img)
  }, [])

  const onCropComplete = useCallback((crop) => {
    makeClientCrop(crop)
  }, [])

  const makeClientCrop = async (crop) => {
    if (image && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(image, crop, 'newFile.jpeg')
      setCroppedImageUrl(croppedImageUrl)
    }
  }

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty')
          return
        }
        blob.name = fileName
        window.URL.revokeObjectURL(croppedImageUrl)
        resolve(window.URL.createObjectURL(blob))
      }, 'image/jpeg')
    })
  }

  const handleDeleteCourse = () => {
    // Implement delete course logic here
    console.log('Delete course')
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
          <div className="max-w-6xl mx-auto p-6">
            {/* Course Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 mb-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <img src={croppedImageUrl || "/placeholder.svg?height=80&width=80"} alt="Course thumbnail" className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <h1 className="text-2xl font-bold">MERN Stack Developer</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 100 Students</span>
                    <span className="flex items-center gap-2"><MonitorPlay className="w-4 h-4" /> 6 Lessons</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Structure */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Course Structure</h2>
                  <div className="space-y-2">
                    {['Introduction', 'JavaScript', 'NodeJS', 'MongoDB', 'ReactJS', 'Sample Project'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span>{index + 1}. {item}</span>
                        <Edit2 className="w-4 h-4 text-gray-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lessons */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Lessons</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="border rounded-lg p-4">
                        <img src="/placeholder.svg?height=150&width=300" alt={`Lesson ${item}`} className="w-full h-32 object-cover rounded-lg mb-3" />
                        <h3 className="font-medium">Introduction of MERN stack class for beginners</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500">Duration: 15:00</span>
                          <button className="text-red-500 text-sm">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Title</label>
                    <input type="text" defaultValue="MERN Stack Developer" className="w-full p-2 border rounded-md" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <div className="flex gap-4">
                      <input type="number" defaultValue="999" className="w-full p-2 border rounded-md" />
                      <input type="number" defaultValue="20" placeholder="Discount %" className="w-32 p-2 border rounded-md" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Features</label>
                    <textarea className="w-full p-2 border rounded-md h-32" defaultValue="• Access on all devices&#13;• Certification of completion&#13;• 7 Modules" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
                    <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {src && (
                        <ReactCrop
                          src={src}
                          crop={crop}
                          onChange={(newCrop) => setCrop(newCrop)}
                          onImageLoaded={onImageLoaded}
                          onComplete={onCropComplete}
                        />
                      )}
                      {!src && !croppedImageUrl && (
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center border-2 border-dashed rounded-full">
                            <Edit2 className="w-6 h-6 text-gray-400" />
                          </div>
                          <span className="text-sm text-gray-500">Click to upload thumbnail</span>
                        </div>
                      )}
                      {croppedImageUrl && (
                        <img alt="Crop" src={croppedImageUrl} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onSelectFile}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="mt-4 w-full inline-flex justify-center px-4 py-2 bg-gray-900 text-white rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                      {croppedImageUrl ? 'Change Thumbnail' : 'Upload Thumbnail'}
                    </label>
                  </div>

                  <button className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Save Changes
                  </button>

                  {/* Delete Course Button */}
                  <button 
                    onClick={handleDeleteCourse}
                    className="w-full mt-4 bg-white text-red-500 py-2 rounded-md border border-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}