const express = require("express");
const courseRoute = express.Router();
const { addCourse } = require('../../controller/courseController');
const userAuth = require('../../middleware/userAuth');

courseRoute.post('/add', addCourse);

module.exports = courseRoute;