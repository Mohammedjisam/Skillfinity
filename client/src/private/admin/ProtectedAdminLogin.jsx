import React  from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedAdminLogin({children}) {
 const adminData = useSelector((state)=>state?.admin?.adminDatas);

 if(adminData){
    return <Navigate to={"/admin/dashboard"}/>
 }
 return children;
}

export default ProtectedAdminLogin
