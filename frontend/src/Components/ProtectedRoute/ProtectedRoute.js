import Cookies from 'js-cookie';
import React, { useContext } from 'react'
import {Navigate} from "react-router-dom"


const ProtectedRoute = ({children}) => {

    const token =  Cookies.get('token')
    const userName =  localStorage.getItem('username')
    
    if((!token || !userName) ) {
        return <Navigate to="/login"  />
    }
 return children

};

export default ProtectedRoute;