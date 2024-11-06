const Course = require('../model/courseDetails');
const cloudinary = require('../config/cloudinaryConfig');

const addCourse = async (req, res) => {
  try {
    const { coursetitle, category, price, features, thumbnail } = req.body;

    const newCourse = new Course({
      coursetitle,
      category,
      price,
      features,
      thumbnail: thumbnail
    });

    await newCourse.save();

    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error in addCourse:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addCourse };