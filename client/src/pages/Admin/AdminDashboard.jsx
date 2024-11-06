import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { Menu } from 'lucide-react'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from 'chart.js'
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Filler)

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    { title: "Total Revenue", value: "₹2100000", icon: "₹" },
    { title: "Total Courses", value: "65", icon: "📚" },
    { title: "Total Tutors", value: "12", icon: "👨‍🏫" },
    { title: "Total Students", value: "252", icon: "👨‍🎓" }
  ]

  useEffect(() => {
    const ctx = document.getElementById('marketOverview').getContext('2d')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Market Overview',
          data: [400, 300, 600, 800, 500, 700],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.1,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button className="md:hidden p-2 rounded-md hover:bg-gray-200" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                <div className="text-3xl mr-4">{stat.icon}</div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h2>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
            <div className="h-[300px]">
              <canvas id="marketOverview"></canvas>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
