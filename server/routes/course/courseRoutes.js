const express = require("express");
const courseRoute = express.Router();
const { addCourse ,addLesson,viewCourse,deleteCourse,viewData,editCourse,deleteLesson,editLesson} = require('../../controller/courseController');
const authMiddleware = require('../../middleware/authMiddleware');

courseRoute.post('/addcourse',authMiddleware,addCourse);
courseRoute.post('/addlesson/:id',authMiddleware, addLesson);
courseRoute.get('/viewcourse',authMiddleware,viewCourse);
courseRoute.delete('/viewcourse/:id',authMiddleware,deleteCourse);
courseRoute.get('/viewdata/:id',authMiddleware,viewData)
courseRoute.put('/editData/:id',authMiddleware,editCourse)
courseRoute.get('/editlesson/:lessonId', authMiddleware, editLesson);
courseRoute.put('/editlesson/:lessonId', authMiddleware, editLesson);
courseRoute.delete('/editlesson/:lessonId',authMiddleware,deleteLesson);


module.exports = courseRoute;