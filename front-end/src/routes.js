import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from "./components/auth/private/routes";
import Login from "./screens/auth/login";
import Register from "./screens/auth/register";
import Home from './screens/home'
import Notes from "./screens/notes/index";
import UserEdit from "./screens/users/edit";



const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/notes" element={<PrivateRoute element={<Notes />} />} />
                    {/* <PrivateRoute path="/users/edit" element={<UserEdit />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router