import VideoItem from '../../components/video/VideoItem'
import {useEffect, useState} from "react";
import {getVideos} from "../../api/video";
import {Box, Grid} from "@mui/material";
export default function VideoList() {
    const video = {
        id: '12345',
        name: 'How to Learn React',
        channel: {
            name: 'Username',
            avatar: 'https://image-10001577.image.myqcloud.com/upload/3/20170412/1492007452202.jpg',
        },
        views: '1.2M',
        createTime: '2025-01-18T12:00:00Z', // 上传时间
        thumbnail: 'https://image-10001577.image.myqcloud.com/upload/3/20170412/1492007452202.jpg', // 视频缩略图
        link: 'http://20.2.162.44:9000/video/1/玉面手雷王/玉面手雷王.m3u8', // m3u8 视频链接
    };
    let [videos, setVideos] = useState([])
    let [page, setPage] = useState(0)
    let [pageSize, setPageSize] = useState(0)
    useEffect(() => {
        const data = getVideos();
        videos = data.data;
        page = data.page;
        pageSize = data.pageSize;
    }, []);
    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                {/* 按列布局，最多 5 列 */}
                {videos.map((video, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={video.id}>
                        <VideoItem video={video} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}