import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedTutorRoutes({children}) {
    const tutorData = useSelector((state)=>state?.tutor?.tutorDatas);
    if(!tutorData){
        return  <Navigate to={"/tutor"}/>
     }
     return children
 }
export default ProtectedTutorRoutes
