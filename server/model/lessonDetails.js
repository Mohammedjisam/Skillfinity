const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'courses',
    required: true,
  },
  lessontitle: {
    type: String,
    required: true,
  },
  duriation: {
    type: String,
    required: true,
  },
  Video: {
    type: String,
    required: true,
  },
  videothumbnail: {
    type: String,
    required: true,
  },
  pdfnotes:{
    type: String,
    required: true,
  }
},{
  timestamps: true,
 });

const Lesson = mongoose.model('course', LessonSchema);
module.exports =Lesson;                     