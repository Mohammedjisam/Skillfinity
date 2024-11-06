import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedTutorLogin({children}) {
    const tutorData = useSelector((state)=>state?.tutor?.tutorDatas);

    if(tutorData){
       return <Navigate to={"/tutor/dashboard"}/>
    }
    return children;
   }


export default ProtectedTutorLogin
