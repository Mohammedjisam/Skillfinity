import React, { useState } from 'react';
import { Upload, Play, Plus, Menu, X } from 'lucide-react';
import SideBar from '../../../pages/Tutor/SideBar';

const AddLesson = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    duration: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // Create video thumbnail
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = function() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        setVideoThumbnail(canvas.toDataURL('image/jpeg'));
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData, videoFile, and pdfFile
    console.log('Submitting:', { formData, videoFile, pdfFile });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar activeItem="Courses" isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      <div className="flex-1 p-14 lg:ml">
        <button
          className="lg:hidden mb-4 p-2 bg-gray-200 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Centered container */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">Add Course Lessons</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* PDF Notes Upload */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">Add Pdf Notes</span>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        className="hidden"
                      />
                      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                        <Plus className="w-5 h-5" />
                      </div>
                    </label>
                    {pdfFile && (
                      <span className="text-sm text-gray-600">{pdfFile.name}</span>
                    )}
                  </div>

                  {/* Main Form Area */}
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lesson Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lesson Duration
                          </label>
                          <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            placeholder="e.g., 30 minutes"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                            <Play className="w-4 h-4" />
                            Upload Video
                          </label>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                            id="video-upload"
                          />
                          <label
                            htmlFor="video-upload"
                            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Video
                          </label>
                          {videoFile && (
                            <p className="mt-1 text-sm text-gray-600">{videoFile.name}</p>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Video Thumbnail */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Video Thumbnail
                        </label>
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                          {videoThumbnail ? (
                            <img
                              src={videoThumbnail}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
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
                      </div>
                    </div>

                    {/* Add Button */}
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
