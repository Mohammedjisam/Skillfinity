import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from 'sonner';
import Otp from '../../components/common/Otp'; 
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { addTutor } from '@/redux/slice/TutorSlice';
import { useDispatch } from 'react-redux';
import axiosInstance from '@/AxiosConfig';

const TutorSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const validate = () => {
    const error = {};

    if (!name?.trim()) {
      error.name = "Name is required";
    } else if (/^\d/.test(name.trim())) {
      error.name = "Name should not start with a number";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(name.trim())) {
      error.name = "Name can only contain letters, numbers, and spaces";
    }

    if (!email?.trim()) {
      error.email = "Email is required";
    } else if (/^\d/.test(email.trim())) {
      error.email = "Email should not start with a number";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
    ) {
      error.email = "Invalid email format";
    }

    if (!phone?.trim()) {
      error.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      error.phone = "Phone number should be 10 digits";
    }

    if (!password?.trim()) {
      error.password = "Password is required";
    } else if (!/^[a-zA-Z0-9]{8,}$/.test(password.trim())) {
      error.password =
        "Password must be at least 8 characters long and contain only letters and numbers";
    }

    return error;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      if (password === confirmPassword) {
        try {
          toast.success("Generating OTP, please wait");
          const response = await axiosInstance.post("/tutor/sendotp", { email });
          toast.success(response.data.message);
          console.log(response.data.otp)
          setIsOTPDialogOpen(true);
        } catch (err) {
          if (err.response && err.response.status === 409) {
            return toast.error(err.response.data.message);
          }
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("Confirm password does not match");
      }
    } else {
      Object.values(errors).forEach(error => toast.error(error));
    }
  };

  const handleOTPVerify = async (otpString) => {
    try {
      const response = await axiosInstance.post("/tutor/create", {
        name,
        email,
        phone,
        password,
        otp: otpString,
      });
     
      dispatch(addTutor(response.data.tutorData)); 
      toast.success(response.data.message);
      navigate("/tutor/dashboard");
      setIsOTPDialogOpen(false);
      return toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      
      if (err.response && err.response.status === 404) {
        return toast.error(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        return toast.error(err.response.data.message);
      }
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axiosInstance.post("/tutor/sendotp", { email });
      toast.success("OTP resent successfully");
      console.log(response)
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src="../../../public/people-2569404.jpg"
            alt="Sign up visual"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 md:ml-8">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Mobile</label>
              <input
                type="tel"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label>I agree with Terms of Use and Privacy Policy</label>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Sign Up
            </button>
            <div className="text-center mt-4">OR</div>
            <GoogleLogin className="w-full bg-gray-100 text-gray-800 p-3 rounded-md hover:bg-gray-200 transition duration-300"
            onSuccess={credentialResponse => {
              const credentialResponseDecode=jwtDecode(credentialResponse.credential);
            console.log(credentialResponseDecode)
            }}
            onError={() => {
              console.log('SignUp Failed');
            }}
          />
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate('/tutor');
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      {isOTPDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Otp
            email={email}
            onVerify={handleOTPVerify}
            onResend={handleResendOTP}
          />
        </div>
      )}
    </div>
  );
};
export default TutorSignup;
