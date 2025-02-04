import React from "react";
import {Avatar, Box, IconButton, InputBase, InputAdornment, AppBar, Toolbar, Typography, SvgIcon} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';

export default function ChatBarLayout({currentFriendName}) {
    const navigate = useNavigate();
    const handleClickAvatar = () => {
        navigate(`/user/${localStorage.getItem('userId')}`);
    };

    return (
        <Box>
            <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
                        <img src='/imgs/kowhai.png' style={{ width: '50px', height: '40px', marginRight: '8px' }} alt='Logo' />
                        <Typography variant="h6" color="white">
                            Kowhai Chatting
                        </Typography>
                    </Box>

                    {/* Use flexGrow to push content to the right */}
                    {/* Center Content */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="subtitle1" color="white">
                            {currentFriendName}
                        </Typography>
                    </Box>

                    {/* Avatar and Icon */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            src={localStorage.getItem('avatar')}
                            sx={{ cursor: 'pointer', marginRight: '8px' }}
                            onClick={handleClickAvatar}
                        />
                        <IconButton sx={{ color: 'white' }} onClick={() => navigate('/')}>
                            <LogoutSharpIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box>
                <Outlet/>
            </Box>
        </Box>
    );
}