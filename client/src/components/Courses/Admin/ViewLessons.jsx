import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../AxiosConfig'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Play, Pause, Maximize, ArrowLeft, BookOpen } from 'lucide-react'
import { toast } from 'sonner'

function LessonCard({ lesson, index }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleTimelineClick = (event) => {
    if (videoRef.current) {
      const rect = event.target.getBoundingClientRect()
      const clickPosition = event.clientX - rect.left
      const clickRatio = clickPosition / rect.width
      videoRef.current.currentTime = clickRatio * duration
    }
  }

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen()
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen()
      }
    }
  }

  return (
    <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl  rounded-xl border-none  transform hover:-translate-y-1">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={lesson.Video || `/placeholder.svg?height=200&width=300`}
          className="w-full h-full object-cover rounded-t-1xl"
          controlsList="nodownload"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button variant="ghost" className="text-white hover:text-gray-400 transition-colors" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-16 h-16" /> : <Play className="w-16 h-16" />}
          </Button>
        </div>
        <Button 
          variant="ghost" 
          className="absolute top-2 right-2 text-black bg-opacity-50  p-1 hover:bg-opacity-70 transition-all" 
          onClick={handleFullScreen}
        >
          <Maximize className="w-6 h-6" />
        </Button>
      </div>
      <div
        className="relative bg-gray-200 h-1 cursor-pointer"
        onClick={handleTimelineClick}
      >
        <div
          className="bg-gray-500 h-full rounded-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      <CardContent className="p-5">
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
  <h3 className="text-xl font-bold text-gray-800">{lesson.lessontitle}</h3>
  <div className="flex items-center text-gray-500">
    <Clock className="w-4 h-4 mr-1" />
    <span>{lesson.duration} minutes</span>
  </div>
</div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{lesson.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600 bg-gray-200 px-3 py-1 rounded-full">Lesson {index + 1}</span>
          
        </div>
      </CardContent>
    </Card>
  )
}

export default function ViewLessons() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const { courseId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get(`/user/data/viewlessons/${courseId}`)
        setLessons(response.data.lessons)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching lessons:", error)
        toast.error("Failed to load lessons")
        setLoading(false)
      }
    }
    fetchLessons()
  }, [courseId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" className="text-gray-600 hover:bg-gray-50" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button></div>
          <h1 className="text-3xl font-bold text-gray-700">Course Lessons</h1><br></br>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}