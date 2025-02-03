import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

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
import VideoTagComment from "../components/video/VideoTagComment";
import SidebarLayout from "../layout/SidebarLayout";
import Chat from "../pages/Chat";

export default function AppRouter(){
    //鉴权逻辑
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    }

    //守卫组件
    const PrivateRoute = ({children}) => {
        return isAuthenticated() ? children : <Navigate to="/login"/>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/login3" element={<Login3/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<SidebarLayout/>}>
                    <Route path="/" element={<PrivateRoute><VideoList/></PrivateRoute>}/>
                    <Route path="/comment" element={<VideoTagComment><VideoList/></VideoTagComment>}/>
                    <Route path="/user/:userId" element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
                    <Route path="/video/upload" element={<PrivateRoute><VideoUpload/></PrivateRoute>}/>
                </Route>
                <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>}/>
                <Route path="/video/detail/:videoId" element={<PrivateRoute><VideoDetail/></PrivateRoute>}/>
                <Route path="/users" element={<PrivateRoute><UserList/></PrivateRoute>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}
