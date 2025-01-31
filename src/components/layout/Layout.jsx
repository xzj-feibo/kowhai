/**
 * 布局
 */
import {Avatar, Box, Divider, Drawer, List, ListItemIcon, ListItemText} from "@mui/material";
import {AsideListItem} from "../../pages/VideoList/VideoList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, {useEffect, useState} from "react";
import {getSubscriptions} from "../../api/user";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionIcon from "@mui/icons-material/Subscriptions";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import {Outlet, useNavigate} from "react-router-dom";

export default function Layout() {
    const navigate = useNavigate();
    //判断侧边栏选项选中
    const [asideIsSelected, setAsideIsSelected] = useState(0)
    //侧边栏选项菜单
    const asideMenuItems = [
        { id: 0, text: '首页', defaultIcon: <HomeOutlinedIcon />, selectedIcon: <HomeIcon/> },
        { id: 1, text: '订阅', defaultIcon: <SubscriptionsOutlinedIcon />, selectedIcon: <SubscriptionIcon/> },
        { id: 2, text: '点赞过的视频', defaultIcon: <ThumbUpAltOutlinedIcon />, selectedIcon: <ThumbUpAltIcon/> },
        { id: 3, text: '历史记录', defaultIcon: <HistoryIcon />, selectedIcon: <HistoryOutlinedIcon/> },
        { id: 4, text: '播放列表', defaultIcon: <PlaylistPlayOutlinedIcon />, selectedIcon: <PlaylistPlayRoundedIcon/> },
        { id: 5, text: '我的视频', defaultIcon: <VideoLibraryOutlinedIcon />, selectedIcon: <VideoLibraryIcon/> },
        { id: 6, text: '稍后观看', defaultIcon: <WorkHistoryOutlinedIcon />, selectedIcon: <WorkHistoryIcon/> },
    ]
    //用户订阅的艺人数据（头像+艺人用户名）
    const [subscriptions, setSubscriptions] = useState([])


    useEffect(()=>{
        fetchSubscriptions(localStorage.getItem("userId")).then((data) => {
            setSubscriptions(data[2]);
        })
    },[])

    //获取订阅数据
    const fetchSubscriptions = async (userId) => {
        return await getSubscriptions(userId);
    }

    //处理侧边栏选项被点击事件
    function handleListItemClick(id) {
        setAsideIsSelected(id);
        if (id === 0){
            navigate('/')
        }
    }
    return (
        <Box sx={{width: '100vw', height: '100vh'}}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240, // 侧边栏宽度
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: 'black',
                        color: 'white'
                    },
                }}
            >
                <Box sx={{ padding: 2 }}>
                    <Box sx={{display: 'inline-flex', alignItems: 'center'}}>
                        <img src='/imgs/kowhai.png' style={{width: '50px', height: '40px', marginLeft: '8px'}}
                             alt='无图片'/>&nbsp;&nbsp;
                        <h2>Kowhai</h2>
                    </Box>
                    <List sx={{ width: '200px' }}>
                        {asideMenuItems.map((item) => {
                            // 如果 item.id === 3，则先插入 Divider
                            if (item.id === 3) {
                                return (
                                    <>
                                        <Divider key={`divider-${item.id}`} sx={{ backgroundColor: 'white', marginY: '5px' }} />
                                        <AsideListItem button>
                                            <Box sx={{marginRight: '7px'}}>我</Box>
                                            <ListItemIcon sx={{ color: 'white', minWidth: '30px' }}>
                                                <ArrowForwardIosIcon sx={{fontSize: '16px'}}/>
                                            </ListItemIcon>
                                        </AsideListItem>
                                        <AsideListItem
                                            key={item.id}
                                            button
                                            onClick={() => handleListItemClick(item.id)}
                                            isSelected={item.id === asideIsSelected}
                                        >
                                            <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                                                {item.id === asideIsSelected ? item.selectedIcon : item.defaultIcon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </AsideListItem>
                                    </>
                                );
                            }

                            // 正常渲染菜单项
                            return (
                                <AsideListItem
                                    key={item.id}
                                    button
                                    onClick={() => handleListItemClick(item.id)}
                                    isSelected={item.id === asideIsSelected}
                                >
                                    <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                                        {item.id === asideIsSelected ? item.selectedIcon : item.defaultIcon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </AsideListItem>
                            );
                        })}
                    </List>

                    {/*订阅列表*/}
                    <List sx={{ width: '200px' }}>
                        <Divider sx={{ backgroundColor: 'white', marginY: '5px' }} />
                        <AsideListItem button>
                            <Box sx={{marginRight: '7px'}}>订阅</Box>
                            <ListItemIcon sx={{ color: 'white', minWidth: '30px' }}>
                                <ArrowForwardIosIcon sx={{fontSize: '16px'}}/>
                            </ListItemIcon>
                        </AsideListItem>
                        {subscriptions && subscriptions.map((item) => (
                            <AsideListItem button>
                                <Box sx={{marginRight: '7px', display: 'flex', alignItems: 'center'}}>
                                    <Avatar src={item.avatar} sx={{width: '20px', height: '20px'}}/>
                                    <Box sx={{marginLeft: '7px'}}>{item.user_name}</Box>
                                </Box>
                            </AsideListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            {/* 主内容区域 */}
            <Box sx={{ flexGrow: 1, marginLeft: '230px', padding: 2 }}>
                <Outlet /> {/* 子路由页面 */}
            </Box>
        </Box>
    )
}