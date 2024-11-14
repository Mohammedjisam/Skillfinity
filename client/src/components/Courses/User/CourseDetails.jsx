import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MonitorPlay,
  Heart,
  ShoppingCart,
  Clock,
  BarChart,
  Calendar,
  User,
  BookOpen,
  Tag,
} from "lucide-react";
import axiosInstance from "../../../AxiosConfig";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function CourseDetails() {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const userDatas = useSelector((store) => store.user.userDatas);
  console.log("userId", userDatas._id);

  useEffect(() => {
    fetchCartData();
    fetchCourseData();
  }, [courseId, userDatas._id]);

  const fetchCourseData = async () => {
    try {
      const courseResponse = await axiosInstance.get(
        `/user/data/viewcourse/${courseId}`
      );
      setCourseData(courseResponse.data.course);
      console.log("Fetched course data:", courseResponse.data.course);
    } catch (error) {
      console.error("Error fetching course details:", error);
      toast.error("Failed to load course details.");
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCartData = async () => {
    try {
      const cartResponse = await axiosInstance.post("/user/data/cart", {
        userId: userDatas._id,
      });
      const cartItems = cartResponse.data.cart?.items || [];
      setIsInCart(cartItems.some((item) => item.courseId._id === courseId));
    } catch (error) {
      console.error("Error fetching cart information:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const addToCart = async () => {
    try {
      const response = await axiosInstance.post(
        `/user/data/addcart/${courseId}`,
        { userId: userDatas._id }
      );
      toast.success("Course added to cart successfully!");
      setIsInCart(true);
      console.log("Cart response:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add course to cart.");
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Course not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-12">
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <img
              src={
                courseData.thumbnail || "/placeholder.svg?height=420&width=1280"
              }
              alt={courseData.coursetitle}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent flex items-end">
              <div className="p-8 w-full">
                <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
                  {courseData.coursetitle}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-400/10 to-blue-500/10 border border-blue-500/20 text-blue-300 hover:from-blue-400/20 hover:to-blue-500/20 transition-colors duration-200"
                  >
                    <MonitorPlay className="w-4 h-4 mr-2 text-blue-400" />
                    {courseData.lessons?.length || 0} Lessons
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-gradient-to-r from-green-400/10 to-green-500/10 border border-green-500/20 text-green-300 hover:from-green-400/20 hover:to-green-500/20 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 mr-2 text-green-400" />
                    {courseData.tutor?.name || "Not specified"}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-gradient-to-r from-purple-400/10 to-purple-500/10 border border-purple-500/20 text-purple-300 hover:from-purple-400/20 hover:to-purple-500/20 transition-colors duration-200"
                  >
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    {courseData.lessons && courseData.lessons.length > 0
                      ? courseData.lessons.reduce(
                          (total, lesson) => total + (lesson.duration || 0),
                          0
                        )
                      : "Not specified"}{" "}
                    minutes
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Course Structure
              </h2>
              <ul className="space-y-4">
                {courseData.courseStructure?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center bg-gray-50 rounded-lg p-4 transition-all hover:bg-gray-100"
                  >
                    <span className="mr-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-semibold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-700">{item}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Features
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseData.features?.split("\n").map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start bg-gray-50 rounded-lg p-3"
                  >
                    <div className="mr-3 mt-1 bg-green-500 rounded-full p-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Course Information
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <User className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="font-semibold mr-2 text-gray-700">
                    Instructor:
                  </span>
                  <span className="text-gray-600">
                    {courseData.tutor?.name || "Not specified"}
                  </span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="font-semibold mr-2 text-gray-700">
                    Duration:
                  </span>
                  <span className="text-gray-600">
                    {courseData.lessons && courseData.lessons.length > 0
                      ? courseData.lessons.reduce(
                          (total, lesson) => total + (lesson.duration || 0),
                          0
                        )
                      : "Not specified"}{" "}
                    minutes
                  </span>
                </li>
                <li className="flex items-center">
                  <BarChart className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="font-semibold mr-2 text-gray-700">
                    Level:
                  </span>
                  <span className="text-gray-600">
                    {courseData.difficulty || "Not specified"}
                  </span>
                </li>
                <li className="flex items-center">
                  <Tag className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="font-semibold mr-2 text-gray-700">
                    Category:
                  </span>
                  <span className="text-gray-600">
                    {courseData.category.title || "Not specified"}
                  </span>
                </li>
                <li className="flex items-center">
                  <MonitorPlay className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="font-semibold mr-2 text-gray-700">
                    Lessons:
                  </span>
                  <span className="text-gray-600">
                    {courseData.lessons?.length || 0}
                  </span>
                </li>
                <li className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="font-semibold mr-2 text-gray-700">
                    Last Updated:
                  </span>
                  <span className="text-gray-600">
                    {courseData.updatedAt
                      ? new Date(courseData.updatedAt).toLocaleDateString()
                      : "Not specified"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                ₹{courseData.price}
              </h2>
              <div className="space-y-4">
                <Button
                  className="w-full text-lg py-6 bg-blue-600 text-white hover:bg-blue-700"
                  size="lg"
                >
                  Buy Now
                </Button>
                {isInCart ? (
                  <Button
                    onClick={goToCart}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-lg py-6 text-white"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Go to Cart
                  </Button>
                ) : (
                  <Button
                    onClick={addToCart}
                    className="w-full bg-green-500 hover:bg-green-600 text-lg py-6 text-white"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full text-lg py-6 border-blue-600 text-blue-600 hover:bg-blue-50"
                  size="lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
