
import AdminHeader from '../pages/Admin/AdminHeader'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '@/pages/Admin/AdminLogin'
import Footer from '@/components/common/Footer'
import StudentManagement from '@/pages/Admin/StudentMangement'
import TutorManagement from '@/pages/Admin/TutorMangement'
import Tutor from '@/pages/Admin/Tutor'
import Student from '@/pages/Admin/Student'
import AdminDashboard from '@/pages/Admin/AdminDashboard'
import AdminForgot from '@/pages/Admin/AdminForgot'
import AdminReset from '@/pages/Admin/AdminReset'
import ProtectedAdminLogin from '@/private/admin/ProtectedAdminLogin'
import ProtectedAdminRoutes from '@/private/admin/ProtectedAdminRoutes'
import AddCategory from '@/components/Courses/Admin/AddCategory'
import CategoryManagement from '@/pages/Admin/CategoryManagement'
import CourseManagement from '@/components/Courses/Admin/CourseManagement'
import ViewCourseDetails from '@/components/Courses/Admin/ViewCourseDetails'
import ViewLessons from '@/components/Courses/Admin/ViewLessons'

function AdminRoutes() {
  return (
    <div>
      <AdminHeader/>
      <Routes>

        <Route path='*' element={<ProtectedAdminLogin><AdminLogin/></ProtectedAdminLogin>}/>
        <Route path='students' element={<ProtectedAdminRoutes><StudentManagement/></ProtectedAdminRoutes>}/>
        <Route path="/student/:studentId" element={<ProtectedAdminRoutes><Student /></ProtectedAdminRoutes>}/>
        <Route path='tutors' element={<ProtectedAdminRoutes><TutorManagement/></ProtectedAdminRoutes>}/>
        <Route path='courses' element={<ProtectedAdminRoutes><CourseManagement/></ProtectedAdminRoutes>}/>
        <Route path='tutors/tutor' element={<ProtectedAdminRoutes><Tutor/></ProtectedAdminRoutes>}/>
        <Route path='dashboard' element={<ProtectedAdminRoutes><AdminDashboard/></ProtectedAdminRoutes>}/>
        <Route path="forgot-password" element={<AdminForgot/>}/>
        <Route path='reset-password/:token' element={<AdminReset/>}/>
        <Route path='addcategory' element={<ProtectedAdminRoutes><AddCategory/></ProtectedAdminRoutes>}/>
        <Route path='category' element={<ProtectedAdminRoutes><CategoryManagement/></ProtectedAdminRoutes>}/>
        <Route path='courses/:id' element={<ProtectedAdminRoutes><ViewCourseDetails/></ProtectedAdminRoutes>}/>
        <Route path='courses/:courseId/lessons' element={<ProtectedAdminRoutes><ViewLessons/></ProtectedAdminRoutes>}/>

      </Routes>
      <Footer />
    </div>
  )
}

export default AdminRoutes
