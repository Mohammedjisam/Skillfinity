
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
import CourseManagement from '@/pages/Admin/CourseMangement'
import AddCategory from '@/components/Courses/Admin/AddCategory'
import CategoryManagement from '@/pages/Admin/CategoryManagement'

function AdminRoutes() {
  return (
    <div>
      <AdminHeader/>
      <Routes>

        <Route path='*' element={<ProtectedAdminLogin>
           <AdminLogin/>
           </ProtectedAdminLogin>}/>
        <Route path='students' element={<ProtectedAdminRoutes>
          <StudentManagement/>
        </ProtectedAdminRoutes>}/>
        <Route path="/student/:studentId" element={<ProtectedAdminRoutes>
          <Student />
        </ProtectedAdminRoutes>}/>
        <Route path='tutors' element={<ProtectedAdminRoutes>
          <TutorManagement/>
        </ProtectedAdminRoutes>}/>
        <Route path='courses' element={<ProtectedAdminRoutes>
          <CourseManagement/>
        </ProtectedAdminRoutes>}/>
        <Route path='tutors/tutor' element={<ProtectedAdminRoutes>
          <Tutor/>
        </ProtectedAdminRoutes>}/>
        <Route path='dashboard' element={<ProtectedAdminRoutes>
          <AdminDashboard/>
        </ProtectedAdminRoutes>}/>
        <Route path="forgot-password" element={<AdminForgot/>}/>
        <Route path='reset-password/:token' element={<AdminReset/>}/>
        <Route path='addcategory' element={<AddCategory/>}/>
        <Route path='category' element={<CategoryManagement/>}/>

      </Routes>
      <Footer />
    </div>
  )
}

export default AdminRoutes
