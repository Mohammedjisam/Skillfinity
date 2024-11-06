import React from 'react';
import { Menu, X } from 'lucide-react';
const navItems = ['Dashboard', 'Category', 'Students', 'Orders', 'Tutors', 'Courses', 'Logout'];

export default function Tutor() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className={`bg-white w-full md:w-64 md:min-h-screen ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 space-y-4">
          <div className="flex flex-col items-center">
            <img src="/placeholder.svg?height=80&width=80" alt="User" className="w-20 h-20 rounded-full" />
            <p className="mt-2 text-sm text-gray-600">leonardo@gmail.com</p>
          </div>
          <nav>
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`block py-2 px-4 text-sm hover:bg-gray-200 ${
                  item === 'Tutors' ? 'bg-gray-200 font-semibold' : ''
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4">
        <button
          className="md:hidden mb-4 p-2 bg-gray-200 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <header className="bg-slate-600 text-white p-4 rounded-lg mb-4">
          <h1 className="text-xl font-bold">Tutor</h1>
        </header>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-rose-600 mb-6">Tutor Details</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Henry"
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold mb-4">Henry</h3>
              <div className="space-y-2">
                <p><span className="font-semibold">Phone Number:</span> 8956784565</p>
                <p><span className="font-semibold">Email:</span> henry@gmail.com</p>
                <p><span className="font-semibold">Tutor ID:</span> henry23</p>
                <p><span className="font-semibold">Courses:</span></p>
                <ul className="list-disc list-inside pl-4">
                  <li>Mern Stack</li>
                  <li>Python</li>
                </ul>
                <p><span className="font-semibold">Status:</span> <span className="text-green-600">Active</span></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}