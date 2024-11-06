import { configureStore } from "@reduxjs/toolkit"
import userSlice from '../redux/slice/UserSlice'
import adminSlice from '../redux/slice/AdminSlice'
import tutorSlice from '../redux/slice/TutorSlice'
import cartSlice from '../redux/slice/CartSlice'
import categorySlice from '../redux/slice/CategorySlice'

const store=configureStore({
    reducer:{
        user:userSlice,
        tutor:tutorSlice,
        admin:adminSlice,
        cart:cartSlice,
        category:categorySlice,

    }
})

export default store