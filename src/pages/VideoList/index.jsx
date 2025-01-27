import VideoItem from '../../components/video/VideoItem';
import {useEffect, useRef, useState} from "react";
import {getVideos, searchByName} from "../../api/video";
import {Box, Divider, Drawer, InputBase} from "@mui/material";

export default function VideoList() {
    let [videos, setVideos] = useState([]);
    let [page, setPage] = useState(0);
    let [pageSize, setPageSize] = useState(0);
    const inputRef = useRef("");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getVideos(); // Fetch video data
                const videos = data.data.map((video) => ({
                    ...video, // Copy other fields of video
                    createTime: video.audit.create_time, // Extract and add createTime field
                }));
                setVideos(videos); // Update video data
                setPage(data.page); // Update page
                setPageSize(data.pageSize); // Update pageSize
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos(); // Call async function
    }, []); // Empty array means it runs once on component mount

    //处理搜索事件
    const handleSearch = async () => {
        const inputElement = inputRef.current;
        const value = inputElement.value;
        const data = await searchByName(value)
        //todo
    }

    return (
        <Box sx={{ display: 'flex', backgroundColor: 'black' }}>
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
                    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        <h3>Kowhai</h3>
                        <img src='/imgs/kowhai.png' style={{ width: '50px', height: '40px', marginLeft: '8px' }} />
                    </Box>
                    <Divider />
                    <p>Home</p>
                    <p>My Videos</p>
                    <p>Favorites</p>
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
                        border: '3px, solid, #787878',
                        borderRadius: '60px',
                        paddingLeft: '15px',
                        width: '600px',
                    }}>
                        <InputBase sx={{color: 'white'}} placeholder='Search Videos'>
                            <Divider orientation='vertical' flexItem/>
                        </InputBase>
                    </Box>
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
