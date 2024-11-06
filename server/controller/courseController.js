const Course = require('../model/courseDetails');
const cloudinary = require('../config/cloudinaryConfig');
const Category = require('../model/categoryModel')

const addCourse = async (req, res) => {
  try {
    const { coursetitle, category, price, features, thumbnail } = req.body;
   console.log(category)
   const categoryData = await Category.findOne({ title: category });
   console.log(categoryData._id)
    if (!categoryData) {
      return res.status(404).send("Category not found");
    }
    const newCourse = new Course({
      coursetitle,
      category:categoryData._id,
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