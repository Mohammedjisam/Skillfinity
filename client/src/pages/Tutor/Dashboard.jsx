import { useState } from 'react'
import SideBar from './SideBar'
import { Menu } from 'lucide-react'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const chartData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 50 },
    { month: 'Apr', value: 27 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 23 },
    { month: 'Jul', value: 34 },
  ]

  const maxValue = Math.max(...chartData.map(item => item.value))

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SideBar 
        activeItem="Dashboard" 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm lg:hidden">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Total Revenue', value: '₹2100000' },
                { title: 'Total Courses', value: '65' },
                { title: 'Total Students', value: '252' },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-3xl font-bold mb-2">{item.value}</h2>
                  <p className="text-gray-600">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <h2 className="text-xl font-semibold mb-2 sm:mb-0">Market Overview</h2>
                <div className="flex flex-wrap space-x-2">
                  {['All', '1M', '6M', '1Y', 'YTD'].map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors mb-2 sm:mb-0"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-64 mt-4">
               <div className="relative h-full">
                 {chartData.map((item, index) => (
                   <div
                    key={index}
                      className="absolute bottom-0 bg-teal-500 w-8 rounded-t-md flex flex-col justify-between items-center"
                      style={{
                      height: `${(item.value / maxValue) * 100}%`,
                      left: `calc(${(index / (chartData.length - 1)) * 100}% - 1rem)`, // Adjust left position
                    }}
                  >
                   <div className="text-xs text-white mt-1">
                     {item.value}
                   </div>
                   <div className="text-xs text-white mb-1">
                     {item.month}
                   </div>
                 </div>
                 ))}
                </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard