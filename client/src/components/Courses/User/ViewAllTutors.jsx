import React, { useEffect, useState } from 'react';
import { User, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../AxiosConfig';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

export default function ViewAllTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axiosInstance.get('/user/data/viewalltutors');
        setTutors(response.data.tutors);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        toast.error("Failed to load tutors.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center mb-8">
          <Button onClick={handleBackClick} variant="outline" className="mr-4 border-none">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-4xl font-bold text-gray-800">Our Tutors</h1>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="text-center cursor-pointer"
                onClick={() => navigate(`/viewtutor/${tutor._id}`)}
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                  {tutor.profileImage ? (
                    <img
                      src={tutor.profileImage}
                      alt={tutor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <User className="w-16 h-16 text-gray-500" /> {/* Default avatar icon */}
                    </div>
                  )}
                </div>
                <p className="font-semibold text-xl text-gray-800 mb-2">{tutor.name}</p>
                <p className="text-gray-600">{tutor.specialization}</p> {/* Tutor's specialization */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
