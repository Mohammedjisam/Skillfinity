import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8 mb-8">
          <div className="flex flex-col items-start md:items-start">
            <div className="flex items-center mb-4">
              <img
                src="/logo-black-Photoroom.svg?height=40&width=40"
                alt="Skillfinity Logo"
                className="mr-2"
                style={{ height: '80px', width: 'auto' }}
              />
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>skillfinity@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 9998887777</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Malappuram, Kerala</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-56 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Home</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400">Benefits</a></li>
                <li><a href="#" className="hover:text-green-400">Our Courses</a></li>
                <li><a href="#" className="hover:text-green-400">Our Testimonials</a></li>
                <li><a href="#" className="hover:text-green-400">Our FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400">Company</a></li>
                <li><a href="#" className="hover:text-green-400">Achievements</a></li>
                <li><a href="#" className="hover:text-green-400">Our Goals</a></li>
              </ul>
            </div>
            
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Social Profiles</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="bg-white p-2 rounded-md hover:bg-gray-200">
                <Facebook className="h-5 w-5 text-gray-700" />
              </a>
              <a href="#" className="bg-white p-2 rounded-md hover:bg-gray-200">
                <Twitter className="h-5 w-5 text-gray-700" />
              </a>
              <a href="#" className="bg-white p-2 rounded-md hover:bg-gray-200">
                <Linkedin className="h-5 w-5 text-gray-700" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-600">
          <p>&copy; 2024 Skillfinity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
