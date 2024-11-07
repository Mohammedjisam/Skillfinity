const Course = require('../model/courseModel');
const Lesson = require('../model/lessonModel')
const cloudinary = require('../config/cloudinaryConfig');
const Category = require('../model/categoryModel')

const addCourse = async (req, res) => {
  try {
    
    const { coursetitle, category, price, features, thumbnail,tutor,difficulty} = req.body;
    console.log("asjdajd",category);
    
    
   const categoryData = await Category.findById(category);
    if (!categoryData) {
      
      return res.status(404).send("Category not found");
    }
    const newCourse = new Course({
      coursetitle,
      category:categoryData._id,
      price,
      features,
      thumbnail: thumbnail,
      tutor,
      difficulty,
    });

    await newCourse.save();

    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error in addCourse:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addLesson = async (req, res) => {
  try {
    const lessonData = req.body;
    console.log("Received lesson data:", lessonData);

    
    const { title, duration, videoUrl, pdfUrl, course, tutor, description } = lessonData;
    
    if (!title || !duration || !course || !tutor) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const newLesson = new Lesson({
      lessontitle: title,
      duration,
      Video: videoUrl,
      pdfnotes: pdfUrl,
      course,
      tutor,
      description,
    });

    await newLesson.save();

    const courseData = await Course.findById(course);
    if (!courseData) {
      return res.status(404).json({ message: "Course not found" });
    }
    courseData.lessons.push(newLesson._id);

    await courseData.save();

    res.status(201).json({ message: "Lesson added successfully", lesson: newLesson });
  } catch (error) {
    console.error("Error in addLesson:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewCourse = async (req, res) => {
  try {
    const tutorId = req.user._id; // Retrieve tutor ID from authenticated user

    // Fetch courses where the tutor matches the logged-in user
    const courses = await Course.find({ tutor: tutorId }).populate('category').populate('tutor');
    
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error in viewCourse:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const tutorId = req.user._id; // Get the tutor ID from the authenticated user

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the authenticated tutor is the creator of the course
    if (course.tutor.toString() !== tutorId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this course" });
    }

    // Delete associated lessons
    await Lesson.deleteMany({ course: courseId });

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCourse:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addCourse, addLesson, viewCourse, deleteCourse };