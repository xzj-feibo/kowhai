import VideoItem from '../../components/video/VideoItem'
import {useEffect, useState} from "react";
import {getVideos} from "../../api/video";
import {Box, Grid} from "@mui/material";
export default function VideoList() {
    let [videos, setVideos] = useState([])
    let [page, setPage] = useState(0)
    let [pageSize, setPageSize] = useState(0)
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getVideos();  // 使用 await 等待 Promise 解析
                const videos = data.data.map((video) => ({
                    ...video,                    // 复制 video 的其他字段
                    createTime: video.audit.create_time,  // 提取并添加 createTime 字段
                }));
                setVideos(videos);              // 更新视频数据
                setPage(data.page);             // 更新页码
                setPageSize(data.pageSize);     // 更新每页视频数量
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos(); // 调用异步函数
    }, []);  // 空数组意味着只在组件挂载时执行一次

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                {/* 按列布局，最多 5 列 */}
                {videos.map((video) => (
                    <Grid item xs={12} sm={6} md={2.4} key={video.id}>
                        <VideoItem video={video} /><br/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}