import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import React from 'react';
import Login from "../pages/Login";
import Login3 from "../pages/Login3";
import UserProfile from "../pages/UserProfile";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import VideoDetail from "../pages/VideoDetail";
import VideoList from "../pages/VideoList";
import UserList from "../components/user/UserList";
import VideoUpload from "../components/video/VideoUpload";

export default function AppRouter(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VideoList/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/login3" element={<Login3/>}/>
                <Route path="/user/:userId" element={<UserProfile/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/video/detail/:videoId" element={<VideoDetail/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/video/upload" element={<VideoUpload/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}
