const express = require("express");
const dataRoute = express.Router();
const { viewAllCourse, viewCourse, addCart, viewCart,viewLessons,removeCart,viewAllCategory,viewCategory,viewAllTutors,viewTutor,toggleCourseVisibility,viewMyCoursesAsTutor } = require('../../controller/dataController');
const authMiddleware = require('../../middleware/authMiddleware'); 

dataRoute.get('/viewallcourse', authMiddleware, viewAllCourse); 
dataRoute.get('/viewallcategory', authMiddleware,viewAllCategory)
dataRoute.get('/viewcourse/:courseId', authMiddleware, viewCourse);
dataRoute.get('/viewlessons/:courseId',authMiddleware,viewLessons)
dataRoute.get('/viewcategory/:categoryId', authMiddleware, viewCategory);
dataRoute.post('/addcart/:courseId', authMiddleware, addCart);
dataRoute.get('/cart', authMiddleware, viewCart);
dataRoute.delete('/removecart/:courseId', authMiddleware, removeCart);
dataRoute.get('/viewalltutors',authMiddleware,viewAllTutors)
dataRoute.get('/viewtutor/:id',authMiddleware,viewTutor)
dataRoute.put('/togglecoursevisibility/:courseId', authMiddleware, toggleCourseVisibility);
dataRoute.get('/tutors/:tutorId/courses', authMiddleware, viewMyCoursesAsTutor);


module.exports = dataRoute;
