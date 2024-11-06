const express = require("express");
const userRoute = express.Router();
const { signUp, login, logoutUser, updateUser, forgotPassword, resetPassword, sendOtp } = require('../../controller/userController');
const {verifyUser,verifyOtp} = require('../../middleware/userAuth');
// const authMiddleware = require('../../middleware/authMiddleware');

userRoute.post('/sendotp', sendOtp);
userRoute.post('/create', verifyOtp, signUp);
userRoute.post('/login', login);
userRoute.post('/forgot', forgotPassword);
userRoute.post('/reset/:token', resetPassword);
userRoute.put('/update', verifyUser, updateUser);
userRoute.post("/logout", verifyUser, logoutUser);
// userRoute.post('/upload-profile-image', authMiddleware,uploadProfileImage)

module.exports = userRoute;