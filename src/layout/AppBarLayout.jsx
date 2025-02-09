import React, {useState} from "react";
import {Avatar, Box, IconButton, InputBase, InputAdornment, AppBar, Toolbar, Typography, SvgIcon} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Outlet, useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function AppBarLayout() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const handleClickAvatar = () => {
        navigate(`/user/${localStorage.getItem('userId')}`,{
            state: {
                username: localStorage.getItem('username'),
                avatar: localStorage.getItem('avatar')
            }
        });
    };

    //处理搜索
    function handleSearch() {
        navigate('/search?keyword='+keyword)
    }

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
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>  {/* Adjusted left margin */}
                        <img src='/imgs/kowhai.png' style={{ width: '50px', height: '40px', marginRight: '8px' }} alt='Logo' />
                        <Typography variant="h6" color="white">
                            Kowhai
                        </Typography>
                    </Box>

                    <Box sx={{position:'relative', left:'70px', width: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {/* Search Bar */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #787878',
                            borderRadius: '60px',
                            paddingLeft: '15px',
                            width: '35%',
                            height: '40px',
                        }}>
                            <InputBase
                                sx={{ color: 'white', width: '100%' }}
                                placeholder="搜索"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) { // 只在没有按 Shift 的情况下发送消息
                                        e.preventDefault(); // 防止默认行为（换行）
                                        handleSearch();
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSearch}>
                                            <SearchOutlinedIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Box>

                        {/* Avatar */}
                        <Avatar
                            src={localStorage.getItem('avatar')}
                            sx={{ cursor: 'pointer', left:'32%' }}
                            onClick={handleClickAvatar}
                        />
                        <IconButton sx={{ cursor: 'pointer', left:'33%', color: 'white' }} onClick={()=>{navigate('/chat')}}>
                            <WhatsAppIcon fontSize='large'/>
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