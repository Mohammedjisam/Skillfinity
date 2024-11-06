import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '@/AxiosConfig';


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isResetMode, setIsResetMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState('')
    const [role, setRole] = useState('student')
  
    useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const tokenFromUrl = params.get('token')
      const roleFromUrl = params.get('role')
      if (tokenFromUrl) {
        setIsResetMode(true)
        setToken(tokenFromUrl)
      }
      if (roleFromUrl) {
        setRole(roleFromUrl)
      }
    }, [])
  
    const handleForgotPassword = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        await axiosInstance.post('/user/forgot', { email, role })
        toast.success('Reset link sent to your email')
        console.log(`Reset link sent for role: ${role}`)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to send reset link')
      }
      setIsLoading(false)
    }
  
    const handleResetPassword = async (e) => {
      e.preventDefault()
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      setIsLoading(true)
      try {
        await axiosInstance.post(`/user/reset/${token}`, { password: newPassword, role })
        toast.success('Password reset successfully')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to reset password')
      }
      setIsLoading(false)
    }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] bg-white p-2 gap-4 lg:gap-8">
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="/Screenshot 2024-10-22 190349.png"
            alt="Forgot Password Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mr-2"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {isResetMode ? 'RESET YOUR PASSWORD' : 'FORGOTTEN YOUR PASSWORD'}
          </h2>
        </div>
        <form onSubmit={isResetMode ? handleResetPassword : handleForgotPassword} className="space-y-4">
          {!isResetMode && (
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-600">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          )}
          {isResetMode && (
            <>
              <div>
                <label htmlFor="new-password" className="block text-xs font-semibold text-gray-600">
                  NEW PASSWORD
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-xs font-semibold text-gray-600">
                  CONFIRM PASSWORD
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-gray-800 py-2 px-4 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
          >
            {isLoading ? 'PROCESSING...' : (isResetMode ? 'RESET PASSWORD' : 'SEND RESET LINK')}
          </button>
        </form>
        {!isResetMode && (
          <p className="text-xs text-gray-600 mt-4">
            We will send a password reset link to your email.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;