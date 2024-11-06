import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice'; // Assuming you have this action
import { useState } from 'react';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleBuyAll = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    // Handle purchase logic here
  };

  const handleBuyNow = async (itemId) => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    // Handle single item purchase logic here
  };

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
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row items-center gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full sm:w-48 h-32 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">By {item.instructor}</p>
              <p className="font-bold text-lg mb-2">₹{item.price}</p>
            </div>
            <div className="flex flex-col sm:flex-col gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleBuyNow(item.id)}
                disabled={isProcessing}
                className="px-6 py-2 bg-[#475569] text-white rounded-lg hover:bg-[#334155] transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Buy Now'}
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                disabled={isProcessing}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
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
