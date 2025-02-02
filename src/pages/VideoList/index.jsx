/**
 * 视频列表，系统首页
 */
import VideoItem from '../../components/video/VideoItem';
import React, {useEffect, useRef, useState} from "react";
import {getVideos, getVideosByLabel, searchByName} from "../../api/video";
import {
    Avatar,
    Box,
    Divider, Grid,
    InputBase,
} from "@mui/material";

import {TopButton} from "./VideoList";
import {useNavigate} from "react-router-dom";
import AppBarLayout from "../../layout/AppBarLayout";


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

    //按视频类型查询api
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
        <Box
            sx={{
                flexGrow: 1, // 主内容占满剩余空间
                padding: 2,  // 内边距
            }}
        >
            <AppBarLayout/>

            {/* 搜索框下方的标签栏，固定在顶部 */}
            <Box sx={{ position: 'sticky', top: '60px', zIndex: 2 }}>
                <Box sx={{
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'left',
                    padding: '10px 0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}>
                    {topMenuItems.map((item, index) => (
                        <TopButton
                            key={index}
                            isSelected={topIsSelected === index}
                            onClick={() => handleGetVideosByLabel(index)}
                            sx={{ margin: '0 10px' }}
                        >
                            {item}
                        </TopButton>
                    ))}
                </Box>
            </Box>

            {/* 视频列表 */}
            <Grid container spacing={2} sx={{ padding: 2, marginTop: '50px' }}>
                {videos.map((video) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video.id}>
                        <Box
                            sx={{
                                width: '100%', // 保证盒子填满网格
                                aspectRatio: '16 / 9', // 保持16:9比例
                                height: 'auto', // 自动调整高度
                            }}
                        >
                            <VideoItem video={video} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}