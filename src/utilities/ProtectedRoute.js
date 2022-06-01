import React from "react";

import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, redirectPath = '/auth/login',}) => {
    let isAuth = (localStorage.getItem("Authenticated")==="true")
    if (isAuth ) {
        console.log("User IS authenticated, continuing")
       return children
    }
    else{
    console.log("User IS NOT authenticated, redirecting to login")
    return <Navigate to={redirectPath} replace />;}
};

export default ProtectedRoute;