import Footer from '@/components/common/Footer'
import Header from '../pages/Tutor/TutorHeader'
import Otp from '@/components/common/Otp'
import Dashboard from '@/pages/Tutor/DashBoard'
import TutorLogin from '@/pages/Tutor/TutorLogin'
import TutorSignup from '@/pages/Tutor/TutorSignUp'
import { Route, Routes } from 'react-router-dom'
import TutorForgot from '@/pages/Tutor/TutorForgot'
import TutorReset from '@/pages/Tutor/TutorReset'
import TutorProfile from '@/pages/Tutor/TutorProfile'
import ProtectedTutorLogin from '@/private/tutor/ProtectedTutorLogin'
import ProtectedTutorRoutes from '@/private/tutor/ProtectedTutorRoutes'
import AddCourse from '@/components/Courses/Tutor/AddCourse'
import AddLesson from '@/components/Courses/Tutor/AddLesson'
import EditCourse from '@/components/Courses/Tutor/EditCourse'
import EditLesson from '@/components/Courses/Tutor/EditLesson'
import MyCourses from '@/components/Courses/Tutor/MyCourse'

function TutorRoutes() {
  return (
    <div>
    <Header/>
      <Routes>
        <Route path='*' element={<ProtectedTutorLogin><TutorLogin/></ProtectedTutorLogin>}/>
        <Route path='signup' element={<ProtectedTutorLogin><TutorSignup/></ProtectedTutorLogin>}/>
        <Route path="forgot-password" element={<TutorForgot/>}/>
        <Route path='reset-password/:token' element={<TutorReset/>}/>
        <Route path='otp' element={<Otp />}/>
        <Route path='dashboard' element={<ProtectedTutorRoutes><Dashboard/></ProtectedTutorRoutes>}/>
        <Route path='profile' element={<ProtectedTutorRoutes><TutorProfile/></ProtectedTutorRoutes>}/>
        <Route path='addcourse' element={<ProtectedTutorRoutes><AddCourse/></ProtectedTutorRoutes>}/>
        <Route path='addlesson/:id'element={<ProtectedTutorRoutes><AddLesson/></ProtectedTutorRoutes>}/>
        <Route path='mycourse'element={<ProtectedTutorRoutes><MyCourses/></ProtectedTutorRoutes>}/>
        <Route path='editcourse/:id'element={<ProtectedTutorRoutes><EditCourse/></ProtectedTutorRoutes>}/>
        <Route path='editlesson/:lessonId'element={<ProtectedTutorRoutes><EditLesson/></ProtectedTutorRoutes>}/>
      </Routes>
    <Footer/>
    </div>
  )
}

export default TutorRoutes
