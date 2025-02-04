import {Box, Stack} from "@mui/material";
import AppBarLayout from "../../layout/AppBarLayout";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchVideos} from "../../api/video";
import VideoItemOfSearch from "../../components/video/VideoItemOfSearch";

/**
 * 搜索页
 * @returns {JSX.Element}
 */
export default function Search() {
    const location = useLocation();
    const [searchedVideos, setSearchedVideos] = useState([]);
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword'); // 获取查询参数中的 keyword

    const fetchSearchVideos = async () => {
         return await searchVideos(keyword);
    }
    useEffect(() => {
        fetchSearchVideos().then((data) => {
            const videos = data[2].map((video) => ({
                ...video, // Copy other fields of video
                createTime: video.audit.create_time, // Extract and add createTime field
            }));
            setSearchedVideos(videos); // Update video data
        })
    }, []);
    return (
        <Box sx={{marginTop: '4%'}}>
            <AppBarLayout/>
            <Box sx={{width:'90%', height:'95%', display:'flex', justifyContent:'center', overflowY: 'auto'}}>
                <Stack spacing={10}>
                    {searchedVideos && searchedVideos.map((video) => (
                        <VideoItemOfSearch video={video}/>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}