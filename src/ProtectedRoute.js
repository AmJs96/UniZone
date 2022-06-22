import React from 'react'
import { Navigate } from 'react-router'
import { UserAuth } from './AuthContextProvider'

function ProtectedRoute({children}) {
    const {user} = UserAuth(); 
  
    if(!user){
       return <Navigate to="/login"/>
    }
  return children;
 
}

export default ProtectedRoute