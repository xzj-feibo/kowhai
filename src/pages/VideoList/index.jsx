/**
 * 视频列表，系统首页
 */
import VideoItem from '../../components/video/VideoItem';
import React, {useEffect, useRef, useState} from "react";
import {getVideos, getVideosByLabel, searchByName} from "../../api/video";
import {
    Alert,
    Avatar,
    Box,
    Divider,
    Drawer,
    InputBase,
    List,
    ListItemIcon,
    ListItemText, Snackbar
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
import NoticeBar from "../../components/util/NoticeBar";

export default function VideoList() {
    let [videos, setVideos] = useState([]);
    const topMenuItems = ['全部', "音乐", "美食", "风景", "游戏", "鬼畜", "运动", "旅游", "其他"];
    //判断顶部菜单项选中
    const [topIsSelected, setTopIsSelected] = useState(0);

    const inputRef = useRef("");

    //获取全部视频
    const fetchVideos = async () => {
        return await getVideos(); // Fetch video data
    };

    useEffect(() => {
        fetchVideos().then((data) => {
            const videos = data[2].map((video) => ({
                ...video, // Copy other fields of video
                createTime: video.audit.create_time, // Extract and add createTime field
            }));
            setVideos(videos); // Update video data
        });
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
            fetchVideos().then((data) => {
                const videos = data[2].map((video) => ({
                    ...video, // Copy other fields of video
                    createTime: video.audit.create_time, // Extract and add createTime field
                }));
                setVideos(videos); // Update video data
            });
        }
        else{
            try {
                const data = await getVideosByLabel(label);
                const videos = data[2].map((video) => ({
                    ...video, // Copy other fields of video
                    createTime: video.audit.create_time, // Extract and add createTime field
                }));
                setVideos(videos); // Update video data
            }catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
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