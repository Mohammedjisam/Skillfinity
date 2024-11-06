const express = require("express");
const tutorRoute = express.Router();
const{signUp,login,logoutUser,updateTutor,sendOtp,forgotPassword,resetPassword}=require('../../controller/tutorController')
const userAuth=require('../../middleware/userAuth')

tutorRoute.post('/sendotp',sendOtp)
tutorRoute.post('/create',userAuth.verifyOtp,signUp)
tutorRoute.post('/login',login)
tutorRoute.post('/forgot', forgotPassword);
tutorRoute.post('/reset/:token', resetPassword);
tutorRoute.put('/update',updateTutor)
tutorRoute.post("/logout",logoutUser)


module.exports=tutorRoute;
