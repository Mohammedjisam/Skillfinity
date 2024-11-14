import { useState, useEffect } from 'react';
import axiosInstance from '../../../AxiosConfig';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const userDatas = useSelector((store) => store.user.userDatas);
  console.log("userIdfrger",userDatas._id)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.post(`/user/data/cart`,{userId: userDatas._id});
        console.log("Cart response:", response.data);
        setCartItems(response.data.cart.items);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (courseId) => {
    try {
      setIsProcessing(true);
      await axiosInstance.delete(`/user/data/removecart/`,{params:{
        userId:userDatas._id,
        courseId,
      }});
      setCartItems((prevItems) => prevItems.filter((item) => item.courseId?._id !== courseId));
      toast.success("Course removed from cart successfully!");
    } catch (error) {
      console.error("Error removing course from cart:", error);
      toast.error("Failed to remove course from cart.");
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleBuyAll = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("All courses purchased successfully!");
      // Clear cart or perform additional actions as needed
    } catch (error) {
      console.error("Error processing purchase:", error);
      toast.error("Failed to complete purchase.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyNow = async (courseId) => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Course purchased successfully!");
      // Handle post-purchase actions here
    } catch (error) {
      console.error("Error processing single purchase:", error);
      toast.error("Failed to complete purchase.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold mb-2">Loading Cart...</h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600">Add some courses to get started!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {cartItems.map((item) => {
          const course = item.courseId;
          if (!course || !course._id) return null; // Skip items without valid course data

          return (
            <div key={course._id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={course.thumbnail || '/placeholder.svg'}  // Optional chaining to avoid errors
                alt={course.coursetitle || 'Course Thumbnail'}  // Fallback alt text
                className="w-full sm:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold mb-2">{course.coursetitle || 'Course Title'}</h3>
                <p className="font-bold text-lg mb-2">₹{item.price}</p>
              </div>
              <div className="flex flex-col sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleBuyNow(course._id)}
                  disabled={isProcessing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-[#334155] transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Buy Now'}
                </button>
                <button
                  onClick={() => handleRemove(course._id)}
                  disabled={isProcessing}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Total: ₹{calculateTotal()}</h3>
            <p className="text-gray-600">Total items: {cartItems.length}</p>
          </div>
          <button
            onClick={handleBuyAll}
            disabled={isProcessing}
            className="w-full sm:w-auto px-8 py-3 bg-[#475569] text-white rounded-lg hover:bg-[#334155] transition-colors disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Buy All Courses'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
