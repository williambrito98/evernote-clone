import React from "react";
import { Navigate } from "react-router-dom";
import UserService from "../../../../services/users";


const PrivateRoute = ({ element }) => {
    return UserService.isLoged() ? element : <Navigate replace to="/login" />
}

export default PrivateRoute