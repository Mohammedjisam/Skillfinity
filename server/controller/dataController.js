const Course = require('../model/courseModel');
const Cart=require('../model/cartModel');
const Lesson = require('../model/lessonModel');
const Category = require('../model/categoryModel');
const User = require('../model/userModel');

const viewAllCourse = async (req, res) => {
  try {
    const courses = await Course.find().populate('tutor').populate('lessons').populate('category');
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error in viewAllCourse:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewCourse = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      console.log("courseId received:", courseId); // Check courseId
  
      const course = await Course.findById(courseId)
        .populate('tutor')
        .populate('lessons')
        .populate('category');
  
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      console.log("Course data:", course); // Check course data before sending
      res.status(200).json({ course });
    } catch (error) {
      console.error("Error in viewCourse:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  const toggleCourseVisibility = async (req, res) => {
    const { courseId } = req.params;
    try {
      const course = await Course.findById(courseId);
      course.isVisible = !course.isVisible;
      await course.save();
      res.status(200).json({ message: 'Course visibility updated', course });
    } catch (error) {
      res.status(500).json({ message: "Error updating course visibility", error: error.message });
    }
  };
  
  const addCart = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const userId = req.user?._id; // Retrieve user ID
  
      // Check if user is logged in
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      console.log("User ID:", userId, "Course ID:", courseId);
  
      // Check if the course exists
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Fetch user's cart or create a new one if it doesn't exist
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({
          userId,
          items: [{ courseId, price: course.price }],
          totalCartPrice: course.price,
        });
      } else {
        // Check if course already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.courseId.equals(courseId));
        if (itemIndex === -1) {
          cart.items.push({ courseId, price: course.price });
        } else {
          cart.items[itemIndex].price = course.price;
        }
  
        // Recalculate the total price
        cart.totalCartPrice = cart.items.reduce((total, item) => total + item.price, 0);
      }
  
      await cart.save(); // Save cart updates
      res.status(200).json({ message: "Course added to cart successfully!", cart });
    } catch (error) {
      console.error("Error in addCart:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

const viewCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user's cart and populate course details with the correct model name
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.courseId',
      model: 'courses', // Correct model name as defined in CourseSchema
      select: 'coursetitle thumbnail price', // Customize fields as needed
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error in viewCart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeCart = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the course to remove
    const itemIndex = cart.items.findIndex(item => item.courseId.equals(courseId));
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Course not found in cart" });
    }

    // Remove the course from items array
    cart.items.splice(itemIndex, 1);

    // Check if the cart is empty after removal
    if (cart.items.length === 0) {
      // If the cart is empty, remove the cart document from the database
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: "Cart is empty and has been removed" });
    }

    // Recalculate the total price after removal
    cart.totalCartPrice = cart.items.reduce((total, item) => total + item.price, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Course removed from cart", cart });
  } catch (error) {
    console.error("Error in removeCart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewAllCategory = async (req, res) => {
  try {
    // Fetch all categories, optionally populate courses if needed
    const categories = await Category.find().populate({
      path: 'courses',
      model: 'courses', // Ensure the model name matches what's defined in your Course schema
      select: 'coursetitle price thumbnail', // Customize fields if needed
    });

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error in viewAllCategory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    console.log("categoryId received:", categoryId);

    // Populate courses and their respective tutors
    const category = await Category.findById(categoryId)
      .populate({
        path: 'courses',
        model: 'courses',
        select: 'coursetitle price thumbnail difficulty tutor', // Ensure 'tutor' field is included here
        populate: {
          path: 'tutor',
          model: 'user',
          select: 'name profileImage', // Populate tutor details
        },
      });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("Courses with tutors fetched:", category.courses);
    res.status(200).json({ courses: category.courses });
  } catch (error) {
    console.error("Error in viewCategory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewAllTutors = async (req, res) => {
  try {
    // Fetch all users with the role of 'tutor'
    const tutors = await User.find({ role: 'tutor' })

    if (!tutors || tutors.length === 0) {
      return res.status(404).json({ message: "No tutors found" });
    }

    res.status(200).json({ tutors });
  } catch (error) {
    console.error("Error in viewAllTutors:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewTutor = async (req, res) => {
  try {
    const tutorId = req.params.id;

    // Find the tutor and populate their profile details
    const tutor = await User.findById(tutorId).select('name profileImage email role');
    if (!tutor || tutor.role !== 'tutor') {
      return res.status(404).json({ message: "Tutor not found" });
    }

    // Find courses taught by the tutor and populate their categories
    const courses = await Course.find({ tutor: tutorId })
      .populate({
        path: 'category',
        model: 'categories', // Ensure this matches your Category model's name
        select: 'title',
      })
      .select('coursetitle thumbnail price category'); // Select fields to show for courses

    res.status(200).json({
      tutor,
      courses,
    });
  } catch (error) {
    console.error("Error in viewTutor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewLessons = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    
    // Find the course and populate lessons associated with it
    const course = await Course.findById(courseId).populate({
      path: 'lessons',
      model: 'lessons', // Ensure this matches your Lesson model name
      select: 'lessontitle description Video pdfnotes duration', // Customize fields as needed
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Return the lessons under the course
    res.status(200).json({ lessons: course.lessons });
  } catch (error) {
    console.error("Error in viewLessons:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const viewMyCoursesAsTutor = async (req, res) => {
  try {
    const userId = req.user._id; // Assumes req.user._id contains the logged-in tutor's ID

    // Check if the user is a tutor
    const user = await User.findById(userId);
    if (!user || user.role !== 'tutor') {
      return res.status(403).json({ message: "Access denied: Only tutors can view their courses" });
    }

    // Find courses where the tutor matches the logged-in tutor's ID
    const courses = await Course.find({ tutor: userId })
      .populate({
        path: 'category',
        model: 'categories', // Match your Category model name here
        select: 'title', // Select specific fields if needed
      })
      .select('coursetitle price thumbnail category'); // Customize course details fields if needed

    // If no courses found, return a not found message
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found for this tutor" });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error in viewMyCoursesAsTutor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { viewAllCourse, viewCourse, addCart,viewCart,removeCart,viewLessons,viewAllCategory ,viewCategory,viewAllTutors ,viewTutor,toggleCourseVisibility,viewMyCoursesAsTutor};