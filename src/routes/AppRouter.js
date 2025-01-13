import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import React from 'react';
import Login from "../pages/Login";
import Login3 from "../pages/Login3";
import UserProfile from "../pages/UserProfile";
import UserList from "../components/user/UserList";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

export default function AppRouter(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/login3" element={<Login3/>}/>
                <Route path="/user/:id" element={<UserProfile/>}/>
                <Route path="/register" element={<Register/>}/>
                {/*<Route path="/user/all" component={UserList}/>*/}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}
