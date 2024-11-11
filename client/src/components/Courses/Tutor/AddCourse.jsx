import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { Menu, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import SideBar from '../../../pages/Tutor/SideBar'
import axiosInstance from '../../../AxiosConfig'

export default function AddCourse() {
  const tutor = useSelector(state => state.tutor.tutorDatas)
  const navigate = useNavigate()
  
  const [courseData, setCourseData] = useState({
    coursetitle: '',
    category: '',
    price: '',
    features: '',
    thumbnail: null,
    tutor: tutor._id,
    difficulty: '',
    courseStructure: ['', '', '', '', '', '']
  })
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [categories, setCategories] = useState([])

  const difficultyLevels = [
    'Beginner',
    'Elementary',
    'Intermediate',
    'Upper Intermediate',
    'Advanced',
    'Expert'
  ]

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/admin/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleStructureChange = (index, value) => {
    setCourseData(prevData => ({
      ...prevData,
      courseStructure: prevData.courseStructure.map((item, i) => i === index ? value : item)
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'skillfinity_media')
      formData.append('cloud_name', 'dwxnxuuht')
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwxnxuuht/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (data.secure_url) {
        setCourseData(prevData => ({
          ...prevData,
          thumbnail: data.secure_url
        }))
        setThumbnailPreview(data.secure_url)
        toast.success('Thumbnail uploaded successfully')
      } else {
        throw new Error('Failed to upload image')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Failed to upload thumbnail')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!courseData.category || !courseData.difficulty) {
      toast.error('Please select both category and difficulty level')
      return
    }

    try {
      setIsUploading(true)
      const response = await axiosInstance.post('/tutor/course/addcourse', courseData)
      toast.success('Course added successfully')
      navigate(`/tutor/addlesson/${response.data.course._id}`)
    } catch (error) {
      console.error('Error adding course:', error)
      toast.error(error.response?.data?.message || 'Failed to add course')
    } finally {
      setIsUploading(false)
    }
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
            <h1 className="text-2xl font-bold">Add New Course</h1>
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
                      Course Title
                    </label>
                    <Input
                      name="coursetitle"
                      value={courseData.coursetitle}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-rose-50 border-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Category
                    </label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="w-full bg-rose-50 border-none">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-100 border-none">
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <Select
                      value={courseData.difficulty}
                      onValueChange={(value) => setCourseData(prev => ({ ...prev, difficulty: value }))}
                    >
                      <SelectTrigger className="w-full bg-rose-50 border-none">
                        <SelectValue placeholder="Select difficulty level" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-100 border-none">
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <Input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-rose-50 border-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features
                    </label>
                    <Textarea
                      name="features"
                      value={courseData.features}
                      onChange={handleInputChange}
                      required
                      className="w-full min-h-[150px] bg-rose-50 border-none"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Thumbnail Image
                  </label>
                  <div className="bg-rose-50 rounded-lg p-4">
                    <div className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-200 bg-white overflow-hidden">
                      {thumbnailPreview ? (
                        <img
                          src={thumbnailPreview}
                          alt="Course thumbnail"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center">
                          <Upload className="h-12 w-12 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-500">Upload course thumbnail</p>
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
                    <Button
                      type="button"
                      onClick={() => document.getElementById('thumbnail-upload').click()}
                      className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Add Image
                    </Button>
                  </div>

                  {/* New Course Structure Section */}
                  <div className="mt-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Structure
                    </label>
                    <div className="bg-rose-50 rounded-lg p-4">
                      <div className="space-y-2">
                        {courseData.courseStructure.map((item, index) => (
                          <Input
                            key={index}
                            value={item}
                            onChange={(e) => handleStructureChange(index, e.target.value)}
                            placeholder={`Section ${index + 1}`}
                            className="w-full bg-white border-none"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 text-lg font-medium"
                >
                  {isUploading ? 'Creating Course...' : 'Add Lessons'}
                </Button>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </div>
  )
}