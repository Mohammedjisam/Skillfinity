const userRoute=require('./routes/user/userRoutes')
const tutorRoute=require('./routes/tutor/tutorRoutes')
const adminRoute=require('./routes/admin/adminRoutes')
const courseRoute=require('./routes/course/courseRoutes')
const dataRoutes=require('./routes/course/dataRoutes')

const express=require('express')
const mongoose=require("mongoose")
const cors=require("cors")
const path = require("path"); 
const app = express()
const cookieParser=require("cookie-parser")

app.use (express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(cors(
    {origin: 'http://localhost:5173',
      credentials: true,}
  ))

  mongoose.connect("mongodb://localhost:27017/Skillfinity")

  .then(() => {
    console.log(`MongoDB connected successfully to ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'"
    );
    next();
  });
  
app.use("/user",userRoute)
app.use("/user/data",dataRoutes)
app.use("/tutor",tutorRoute)
app.use("/tutor/course",courseRoute)
app.use('/admin',adminRoute)

app.listen("3000",()=>{
    console.log("server started");
})