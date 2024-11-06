import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedAdminRoutes({children}) {
    const adminData = useSelector((state)=>state?.admin?.adminDatas);
    if(!adminData){
       return  <Navigate to={"/admin"}/>
    }
    return children
}

export default ProtectedAdminRoutes


