import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedUserLogin({children}) {
    const userData = useSelector((state)=>state?.user?.userDatas);
   
    if(userData){
       return <Navigate to={"/home"}/>
    }
    return children;
   }

export default ProtectedUserLogin
