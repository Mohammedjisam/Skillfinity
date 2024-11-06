require("dotenv").config();
const jwt=require('jsonwebtoken');
const Tutor=require('../model/userModel')
const otpSchema =require('../model/otpStore')

const verifyOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    // Find the OTP data based on email
    const otpData = await otpSchema.findOne({ email });
    if (!otpData) {
      return res
        .status(404)
        .json({ success: false, message: "OTP not found." });
    }

    // Compare the provided OTP with the stored OTP
    if (otp === otpData.otp) {
  
      next(); // Proceed to the next middleware (register function)
    } else {
      console.log("Invalid OTP.");
      return res.status(401).json({ success: false, message: "Invalid OTP." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

verifyTutor = async(req,res,next)=>{
    let token = req.cookies.token;
    console.log(token);
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token);
  
        await Tutor.findById(decode.id).select("-password"); // to get all details except password
  
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        console.log("Not authorized, token failed");
        
      }
    } else {
      res.status(401);
      console.log("Not authorized, no token");
    }
 }
  


module.exports = {verifyTutor,verifyOtp}