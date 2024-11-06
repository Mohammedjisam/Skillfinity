import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedUserRoutes({children}) {
    const userData = useSelector((state)=>state?.user?.userDatas);
    if(!userData){
        return  <Navigate to={"/login"}/>
     }
     return children
 }

export default ProtectedUserRoutes
