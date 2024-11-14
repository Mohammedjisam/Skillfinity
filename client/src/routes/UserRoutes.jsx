import Footer from '@/components/common/Footer'
import Header from '../pages/User/Header'
import Landing from '@/components/common/Landing'
import Otp from '@/components/common/Otp'
import Login from '@/pages/User/Login'
import Signup from '@/pages/User/SignUp'
import Home from '@/pages/User/Home'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from '@/pages/User/ForgotPassword'
import ResetPassword from '@/pages/User/ResetPassword'
import Profile from '@/pages/User/Profile'
import ProtectedUserLogin from '@/private/user/ProtectedUserLogin'
import ProtectedUserRoutes from '@/private/user/ProtectedUserRoutes'
import BestSellerCourse from '@/components/Courses/User/BestSellerCourse'
import Category from '@/components/Courses/User/Category'
import AllCourse from '../components/Courses/User/AllCourse'
import CourseDetails from '../components/Courses/User/CourseDetails'
import Cart from '../components/Courses/User/Cart'
import ViewAllCategory from '../components/Courses/User/ViewAllCategory'
import ViewAllTutors from '../components/Courses/User/ViewAllTutors'
import ViewTutor from '@/components/Courses/User/ViewTutor'

function UserRoutes() {
  return (
    <div>
        <Header/>
       <Routes>
        <Route path='*' element={<Landing/>}/>
        <Route path='home' element={<ProtectedUserRoutes><Home/></ProtectedUserRoutes>}/>
        <Route path='login' element={<ProtectedUserLogin><Login/></ProtectedUserLogin>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path='reset-password/:token' element={<ResetPassword/>}/>
        <Route path="otp" element={<Otp />}/>
        <Route path='profile' element={<ProtectedUserRoutes><Profile/></ProtectedUserRoutes>}/>
        <Route path='allcourse' element={<ProtectedUserRoutes><AllCourse/></ProtectedUserRoutes>}/>
        <Route path='coursedetails/:courseId' element={<ProtectedUserRoutes><CourseDetails/></ProtectedUserRoutes>}/>
        <Route path='bestsellercourse' element={<ProtectedUserRoutes><BestSellerCourse/></ProtectedUserRoutes>}/>
        <Route path='category/:categoryId' element={<ProtectedUserRoutes><Category /></ProtectedUserRoutes>}/>
        <Route path='cart' element={<ProtectedUserRoutes><Cart /></ProtectedUserRoutes>}/>
        <Route path='viewallcategories' element={<ProtectedUserRoutes><ViewAllCategory /></ProtectedUserRoutes>}/>
        <Route path='viewtutor/:id' element={<ProtectedUserRoutes><ViewTutor /></ProtectedUserRoutes>}/>
        <Route path='viewalltutors' element={<ProtectedUserRoutes><ViewAllTutors /></ProtectedUserRoutes>}/>
       </Routes>
       <Footer />
    </div>
  )
}

export default UserRoutes
