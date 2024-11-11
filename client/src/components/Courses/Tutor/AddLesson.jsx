import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Menu, Upload, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import SideBar from '../../../pages/Tutor/SideBar'
import axiosInstance from '../../../AxiosConfig'
import { toast } from 'sonner';

export default function AddLesson() {
  const { id: courseId } = useParams()
  const navigate = useNavigate()
  const tutor = useSelector((state) => state.tutor.tutorDatas)

  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    pdfUrl: '',
    duration: '',
    tutor: tutor._id,
    course: courseId,
  })
  const [videoFile, setVideoFile] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [videoPreview, setVideoPreview] = useState(null)
  const [addedLessons, setAddedLessons] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    setVideoFile(file)
    if (file) {
      const videoUrl = URL.createObjectURL(file)
      setVideoPreview(videoUrl)
    } else {
      setVideoPreview(null)
    }
  }

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let videoUrl = ''
      let pdfUrl = ''

      if (videoFile) {
        const videoFormData = new FormData()
        videoFormData.append('file', videoFile)
        videoFormData.append('upload_preset', 'skillfinity_media')
        videoFormData.append('cloud_name', 'dwxnxuuht')

        const videoResponse = await fetch(
          'https://api.cloudinary.com/v1_1/dwxnxuuht/video/upload',
          {
            method: 'POST',
            body: videoFormData,
          }
        )

        const videoData = await videoResponse.json()
        videoUrl = videoData.secure_url
      }

      if (pdfFile) {
        const pdfFormData = new FormData()
        pdfFormData.append('file', pdfFile)
        pdfFormData.append('upload_preset', 'skillfinity_media')
        pdfFormData.append('cloud_name', 'dwxnxuuht')

        const pdfResponse = await fetch(
          'https://api.cloudinary.com/v1_1/dwxnxuuht/raw/upload',
          {
            method: 'POST',
            body: pdfFormData,
          }
        )

        const pdfData = await pdfResponse.json()
        pdfUrl = pdfData.secure_url
      }

      const lessonDataToSubmit = {
        ...lessonData,
        videoUrl: videoUrl,
        pdfUrl: pdfUrl,
      }
  
      const response = await axiosInstance.post(`/tutor/course/addlesson/${courseId}`, lessonDataToSubmit)
      setAddedLessons([...addedLessons, response.data.lesson])
      toast.success('Lesson added successfully')
      
      // Reset form fields
      setLessonData({
        title: '',
        description: '',
        videoUrl: '',
        pdfUrl: '',
        duration: '',
        tutor: tutor._id,
        course: courseId,
      })
      setVideoFile(null)
      setPdfFile(null)
      setVideoPreview(null)
    } catch (error) {
      console.error('Error adding lesson:', error)
      toast.error('Failed to add lesson')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFinishCourse = () => {
    navigate('/tutor/courses')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SideBar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeItem="Courses"
      />
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">Add New Lesson</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <main className="p-6">
          <Card className="max-w-[1200px] mx-auto bg-white p-8 rounded-lg shadow-sm border-dashed border-gray-300">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Title
                    </label>
                    <Input
                      name="title"
                      value={lessonData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-rose-50 border-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Description
                    </label>
                    <Textarea
                      name="description"
                      value={lessonData.description}
                      onChange={handleInputChange}
                      required
                      className="w-full min-h-[150px] bg-rose-50 border-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Duration (in minutes)
                    </label>
                    <Input
                      name="duration"
                      value={lessonData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-rose-50 border-none"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Video
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-200 bg-white overflow-hidden">
                        {videoPreview ? (
                          <video src={videoPreview} controls className="w-full h-full object-cover" />
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center">
                            <Upload className="h-12 w-12 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-500">Upload lesson video</p>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                        id="video-upload"
                      />
                      <Button
                        type="button"
                        onClick={() => document.getElementById('video-upload').click()}
                        className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white"
                      >
                        {videoFile ? 'Change Video' : 'Add Video'}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson PDF
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-200 bg-white overflow-hidden">
                        {pdfFile ? (
                          <div className="h-full flex flex-col items-center justify-center">
                            <FileText className="h-12 w-12 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-500">{pdfFile.name}</p>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center">
                            <FileText className="h-12 w-12 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-500">Upload lesson PDF</p>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfChange}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <Button
                        type="button"
                        onClick={() => document.getElementById('pdf-upload').click()}
                        className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white"
                      >
                        {pdfFile ? 'Change PDF' : 'Add PDF'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  {isUploading ? 'Uploading...' : 'Add Lesson'}
                </Button>
              </div>
            </form>
          </Card>

          {addedLessons.length > 0 && (
            <Card className="max-w-[1200px] mx-auto mt-8 bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Added Lessons</h2>
              <ul className="space-y-2">
                {addedLessons.map((lesson, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>{index+1}</span>
                    <span>{lesson.lessontitle}</span>
                    <span>{lesson.duration} minutes</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleFinishCourse}
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Submit
              </Button>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}