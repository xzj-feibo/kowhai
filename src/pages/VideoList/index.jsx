/**
 * 视频列表，系统首页
 */
import VideoItem from '../../components/video/VideoItem';
import {useEffect, useRef, useState} from "react";
import {getVideos, getVideosByLabel, searchByName} from "../../api/video";
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    InputBase,
    List,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SubscriptionIcon from "@mui/icons-material/Subscriptions"
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {AsideListItem, TopButton, TopListItem} from "./VideoList";
import {getSubscriptions} from "../../api/user";
import {type} from "@testing-library/user-event/dist/type";

export default function VideoList() {
    let [videos, setVideos] = useState([]);

    //判断顶部菜单项选中
    const [topIsSelected, setTopIsSelected] = useState(0);
    //判断侧边栏选项选中
    const [asideIsSelected, setAsideIsSelected] = useState(0)
    //顶部菜单
    const topMenuItems = ['全部', '音乐', '美食', '风景', '游戏', '鬼畜', '运动', '旅游', '发现新视频']
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

    const inputRef = useRef("");

//获取全部视频
    const fetchVideos = async () => {
        return await getVideos(); // Fetch video data
    };

    //获取订阅数据
    const fetchSubscriptions = async (userId) => {
        return await getSubscriptions(userId);
    }

    useEffect(() => {
        fetchVideos().then((data) => {
            const videos = data.data.map((video) => ({
                ...video, // Copy other fields of video
                createTime: video.audit.create_time, // Extract and add createTime field
            }));
            setVideos(videos); // Update video data
        });
        fetchSubscriptions(localStorage.getItem("userId")).then((data) => {
            setSubscriptions(data.data);
        })
    }, []); // Empty array means it runs once on component mount

    //处理搜索事件
    const handleSearch = async () => {
        const inputElement = inputRef.current;
        const value = inputElement.value;
        const data = await searchByName(value)
        //todo
    }

    const handleGetVideosByLabel = async (label) => {
        setTopIsSelected(label);
        if (label === 0){
           fetchVideos();
        }
        else{
            try {
                const data = await getVideosByLabel(label);
                const videos = data.data.map((video) => ({
                    ...video, // Copy other fields of video
                    createTime: video.audit.create_time, // Extract and add createTime field
                }));
                setVideos(videos); // Update video data
            }catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        }
    }
    //处理侧边栏选项被点击事件
    function handleListItemClick(id) {
        setAsideIsSelected(id);
    }

    return (
        <Box sx={{ display: 'flex', backgroundColor: 'black', width: '100vw', height: '100vh' }}>
            {/* 侧边栏 */}
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
                        {subscriptions.map((item) => (
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

            {/* 主内容 */}
            <Box
                sx={{
                    flexGrow: 1, // 主内容占满剩余空间
                    padding: 2,  // 内边距
                    overflowX: 'auto', // 允许横向滚动
                }}
            >
                {/* 搜索栏 */}
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px'
                }}>
                    <Box sx={{
                        border: '1px, solid, #787878',
                        borderRadius: '60px',
                        paddingLeft: '15px',
                        width: '600px',
                    }}>
                        <InputBase sx={{color: 'white', width: '100%'}} placeholder='搜索'>
                            <Divider orientation='vertical' flexItem/>
                        </InputBase>
                    </Box>
                </Box>

                {/*顶部菜单列表*/}
                <Box>
                    {topMenuItems.map((item, index) => (
                        <TopButton
                            isSelected={topIsSelected === index}
                            onClick={() => handleGetVideosByLabel(index)}>
                            {item}
                        </TopButton>
                    ))}
                </Box>

                {/* 视频列表 */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        overflow: 'auto',
                    }}
                >
                    {videos.map((video) => (
                        <Box
                            key={video.id}
                            sx={{
                                flex: '1 1 calc(20% - 8px)', // 每项占20%宽度
                                maxWidth: 'calc(20% - 8px)', // 保证宽度一致
                            }}
                        >
                            <VideoItem video={video} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>

    );
}