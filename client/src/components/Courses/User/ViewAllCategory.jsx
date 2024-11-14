import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../AxiosConfig';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Laptop, Code, Database, Globe, Cloud, Shield, Cpu, Smartphone, Wifi, Server, BookOpen, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ViewAllCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const categoriesPerPage = 12;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/user/data/viewallcategory');
        setCategories(response.data.categories);
        setTotalPages(Math.ceil(response.data.categories.length / categoriesPerPage));
      } catch (error) {
        console.error("Error fetching all categories:", error);
        toast.error("Failed to load categories."); 
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

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

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber) ;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">All Categories</h1>
      </header>
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCategories.map((category, index) => (
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
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <Button
                  key={number}
                  onClick={() => paginate(number)}
                  variant={currentPage === number ? "default" : "outline"}
         
                  className={`px-4 py-2 ${
                    currentPage === number
                      ? 'bg-primary text-primary-foreground '
                      : 'bg-white text-gray-700 hover:bg-gray-50 '
                  } text-sm font-medium`}
                >
                  {number}
                </Button>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}