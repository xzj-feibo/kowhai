// 用户主页

import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    ListItemButton
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import UserAvatar from "../../components/user/UserAvatar";

export default function UserProfile() {
    return (
        <Box sx={{display: "flex", height: "100vh", width: "100vw"}}>
            {/* Navigation Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: 240, boxSizing: "border-box"},
                    backgroundColor: 'black',
                    color: 'white',
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: "auto", backgroundColor: 'black', color: 'white'}}>
                    <List>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Personal Info"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Settings"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box sx={{flexGrow: 1, bgcolor: "background.default", p: 3}}>
                {/* Top App Bar */}
                <AppBar position="fixed" sx={{
                    height: '80px',
                    backgroundColor: 'black',
                    color: 'white',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap sx={{flexGrow: 1}}>
                            User Home
                        </Typography>
                        <IconButton edge="end" color="inherit">
                            <UserAvatar src="https://image-10001577.image.myqcloud.com/upload/3/20170412/1492007452202.jpg" avatarSize={54} size={70}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Spacer for AppBar */}
                <Toolbar/>

                {/* Page Content */}
                <Typography variant="h4" gutterBottom>
                    Welcome to your Home Page!
                </Typography>
                <Typography variant="body1">
                    Here you can navigate to your personal information or adjust your settings using the menu on the
                    left.
                </Typography>
            </Box>
        </Box>
    );
};