import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../AxiosConfig';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Laptop, Code, Database, Globe, Cloud, Shield, Cpu, Smartphone, Wifi, Server, BookOpen } from 'lucide-react';

export default function ViewAllCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/user/data/viewallcategory');
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching all categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Define getCategoryIcon function in the same file
  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'web development':
        return <Laptop className="w-12 h-12 text-blue-500" />;
      case 'programming':
        return <Code className="w-12 h-12 text-green-500" />;
      case 'data science':
        return <Database className="w-12 h-12 text-purple-500" />;
      case 'digital marketing':
        return <Globe className="w-12 h-12 text-red-500" />;
      case 'cloud computing':
        return <Cloud className="w-12 h-12 text-sky-500" />;
      case 'cybersecurity':
        return <Shield className="w-12 h-12 text-yellow-500" />;
      case 'artificial intelligence':
        return <Cpu className="w-12 h-12 text-indigo-500" />;
      case 'mobile app development':
        return <Smartphone className="w-12 h-12 text-pink-500" />;
      case 'networking':
        return <Wifi className="w-12 h-12 text-orange-500" />;
      case 'devops':
        return <Server className="w-12 h-12 text-amber-500" />;
      default:
        return <BookOpen className="w-12 h-12 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">All Categories</h1>
      </header>
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => navigate(`/category/${category._id}`)}
            >
              <div className="text-gray-700 mb-4">
                {getCategoryIcon(category.title)}
              </div>
              <span className="text-lg font-semibold text-gray-800 mb-2">{category.title}</span>
              <p className="text-sm text-gray-600 text-center">
                {category.description || 'Explore our courses in this category.'}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
