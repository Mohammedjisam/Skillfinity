const express = require("express");
const courseRoute = express.Router();
const { addCourse ,addLesson,viewCourse,deleteCourse,viewData,editCourse,deleteLesson,editLesson, updateLesson} = require('../../controller/courseController');
const verifyUser = require('../../middleware/authMiddleware')

courseRoute.post('/addcourse',addCourse);
courseRoute.post('/addlesson/:id', addLesson);
courseRoute.get('/viewcourse/:id',viewCourse);
courseRoute.delete('/viewcourse/',deleteCourse);
courseRoute.post('/viewdata/:id',viewData)
courseRoute.put('/editData/:id',editCourse)
courseRoute.get('/editlesson', editLesson);
courseRoute.put('/editlesson', updateLesson);
courseRoute.delete('/editlesson/',deleteLesson);


module.exports = courseRoute;