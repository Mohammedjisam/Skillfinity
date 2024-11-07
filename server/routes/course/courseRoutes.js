const express = require("express");
const courseRoute = express.Router();
const { addCourse ,addLesson,viewCourse,deleteCourse} = require('../../controller/courseController');
const authMiddleware = require('../../middleware/authMiddleware');

courseRoute.post('/addcourse',authMiddleware,addCourse);
courseRoute.post('/addlesson/:id',authMiddleware, addLesson);
courseRoute.get('/viewcourse',authMiddleware,viewCourse)
courseRoute.delete('/viewcourse/:id',authMiddleware,deleteCourse)

module.exports = courseRoute;