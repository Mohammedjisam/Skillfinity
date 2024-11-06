import React, { useState, useEffect, useRef } from 'react'
import { Clock, Mail } from 'lucide-react'

export default function OtpVerification({ email = "user@example.com", onVerify, onResend }) {
  const [otp, setOtp] = useState(["", "", "", "", ""])
  const [timer, setTimer] = useState(120)
  const inputRefs = useRef([])

  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value !== "" && index < 4) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const otpString = otp.join("")
    console.log('OTP submitted:', otpString)
    if (onVerify) {
      onVerify(otpString)
    }
  }

  const handleResend = () => {
    setTimer(120)
    if (onResend) {
      onResend()
    }
  }

  return (
    <div >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 flex items-center justify-center bg-primary rounded-l-lg">
            <div className="relative w-full h-40 md:h-full">
              <img
                src="/2942004.jpg"
                alt="OTP Verification"
                className="object-cover rounded-lg shadow-sm"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Mail className="text-white w-12 h-12" />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-center text-primary"><br/>OTP Verification</h2>
            </div>
            <p className="text-center mb-4 text-sm text-gray-600">
              We've sent an email with an activation code to <span className="font-semibold">{email}</span>
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center space-x-1">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-10 h-10 text-center text-lg font-bold border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  />
                ))}
              </div>
              <button
              type="submit"
              className="w-full bg-gray-500 text-white py-1.5 rounded-md hover:bg-gray-600 transition duration-200 ease-in-out focus:outline-none"
              >
              Verify OTP
              </button>
            </form>
            <div className="text-center mt-4">
              {timer > 0 ? (
                <p className="text-xs text-gray-600 flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Resend OTP in {Math.floor(timer / 60).toString().padStart(2, "0")}:
                  {(timer % 60).toString().padStart(2, "0")}
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-primary hover:text-primary-dark focus:outline-none text-xs"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
