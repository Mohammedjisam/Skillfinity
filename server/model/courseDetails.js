const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  coursetitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  }
},{
  timestamps: true,
 });

const Course = mongoose.model('courses', CourseSchema);
module.exports =Course;