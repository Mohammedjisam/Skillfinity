const Course = require('../model/courseModel');
const Lesson = require('../model/lessonModel')
const Category= require('../model/categoryModel')

const addCourse = async (req, res) => {
  try {
    const { coursetitle, category, price, features, thumbnail, tutor, difficulty, courseStructure } = req.body;
    
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(404).send("Category not found");
    }

    const newCourse = new Course({
      coursetitle,
      category: categoryData._id,
      price,
      features,
      thumbnail,
      tutor,
      difficulty,
      courseStructure,
    });

    await newCourse.save();

    // Add the new course ID to the category's course array
    categoryData.courses.push(newCourse._id);
    categoryData.tutors.push(tutor);
    await categoryData.save();

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
    const tutorId = req.user._id; 

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

const viewData = async (req, res) => {
  try {
    const  courseId  = req.params.id // Retrieve course ID from route parameters
    const tutorId = req.user._id; 
    console.log(courseId)   // Retrieve tutor ID from authenticated user

    // Find the specific course by ID and check if the tutor is the creator of this course
    const course = await Course.findOne({ _id: courseId, tutor: tutorId })
      .populate('category') // Populate category details
      .populate('lessons')
      .populate('tutor', 'name email'); // Populate tutor details for the course
      console.log(course)

    // Check if the course exists and belongs to the logged-in tutor
    if (!course) {
      return res.status(404).json({ message: "Course not found or unauthorized" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error in viewData:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editCourse = async (req, res) => {

  
  try {
    const courseId = req.params.id; // Retrieve course ID from route parameters
    const tutorId = req.user._id; // Retrieve tutor ID from authenticated user
    // const updates = req.body;

    // Find the course by ID and ensure the tutor is the owner
    const course = await Course.findOne({ _id: courseId, tutor: tutorId });
    if (!course) {
      return res.status(404).json({ message: "Course not found or unauthorized" });
    }
    // const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

    // if (!updatedCourse) {
    //   return res.status(404).json({ error: 'Course not found' });
    // }

    // Extract fields to be updated from the request body
    const { coursetitle, price, features, courseStructure, thumbnail } = req.body;

    // Update the course details if provided
    if (coursetitle) course.coursetitle = coursetitle;
    if (price) course.price = price;
    if (features) course.features = features;
    if (courseStructure) course.courseStructure = courseStructure;
    if (thumbnail) course.thumbnail = thumbnail;

    // Save the updated course
    await course.save();

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error in editCourse:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.lessonId; // Retrieve lesson ID from route parameters
    const tutorId = req.user._id; 
    console.log("lesson",lessonId)// Retrieve tutor ID from authenticated user
    console.log("tutor",tutorId)
    // Find the lesson by ID
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Check if the lesson's course belongs to the authenticated tutor
    const course = await Course.findOne({ _id: lesson.course, tutor: tutorId });
    if (!course) {
      return res.status(403).json({ message: "Unauthorized to delete this lesson" });
    }

    // Remove the lesson ID from the course's lessons array
    course.lessons = course.lessons.filter(id => id.toString() !== lessonId);
    await course.save();

    // Delete the lesson from the database
    await Lesson.findByIdAndDelete(lessonId);

    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    console.error("Error in deleteLesson:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editLesson = async (req, res) => {
  try {
    const lessonId = req.params.lessonId; // Retrieve lesson ID from route parameters
    const tutorId = req.user._id; // Retrieve tutor ID from authenticated user

    // Find the lesson by ID
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    console.log(lesson);
    
    // Check if the lesson's course belongs to the authenticated tutor
    const course = await Course.findOne({ _id: lesson.course, tutor: tutorId });
    if (!course) {
      return res.status(403).json({ message: "Unauthorized to access or modify this lesson" });
    }

    // Handle GET request: return the lesson details
    if (req.method === 'GET') {
      return res.status(200).json({ lesson });
    }

    // Handle PUT request: update the lesson details
    const { title, duration, videoUrl, pdfUrl, description } = req.body;
    if (title) lesson.lessontitle = title;
    if (duration) lesson.duration = duration;
    if (videoUrl) lesson.Video = videoUrl;
    if (pdfUrl) lesson.pdfnotes = pdfUrl;
    if (description) lesson.description = description;

    // Save the updated lesson
    await lesson.save();

    res.status(200).json({ message: "Lesson updated successfully", lesson });
  } catch (error) {
    console.error("Error in editLesson:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { addCourse, addLesson, viewCourse, deleteCourse,viewData,editCourse ,deleteLesson,editLesson};