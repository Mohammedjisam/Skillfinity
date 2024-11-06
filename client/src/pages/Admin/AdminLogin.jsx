import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAdmin } from '@/redux/slice/AdminSlice';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'sonner';
import axiosInstance from '@/AxiosConfig';

const AdminLogin = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/admin/login", {
                email,
                password
            }, { withCredentials: true });

            if (response.data) {
                dispatch(addAdmin(response.data.adminData));
                toast.success(response.data.message);
                navigate("/admin/dashboard");
            } else {
                toast.error('No data received from server');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            console.error(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img
                        src="/ai-generated-8575440.png"
                        alt="Login visual"
                        className="w-full h-[500px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                    />
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-4">Login</h2>
                    <p className="mb-4 text-gray-500">Welcome back! Please log in to access your account.</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center" />
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/admin/forgot-password');
                                }}
                                className="text-blue-500 hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 transition duration-300"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
