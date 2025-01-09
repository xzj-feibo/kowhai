// 用户主页

import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, List, ListItem, ListItemIcon, ListItemText, Drawer } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

const UserHome = () => {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Navigation Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Personal Info" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                {/* Top App Bar */}
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                            User Home
                        </Typography>
                        <IconButton edge="end" color="inherit">
                            <Avatar alt="User Avatar" src="/path/to/user-image.jpg" />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Spacer for AppBar */}
                <Toolbar />

                {/* Page Content */}
                <Typography variant="h4" gutterBottom>
                    Welcome to your Home Page!
                </Typography>
                <Typography variant="body1">
                    Here you can navigate to your personal information or adjust your settings using the menu on the left.
                </Typography>
            </Box>
        </Box>
    );
};

export default UserHome;