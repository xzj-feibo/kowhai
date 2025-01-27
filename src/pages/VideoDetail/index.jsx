/**
 * 视频详情页
 */
import VideoPlayer from "../../components/video/VideoPlayer";
import React from "react";
import {useLocation} from "react-router-dom";

export default function VideoDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const videoSrc = queryParams.get('src');
    return (
        <VideoPlayer
            src={videoSrc}
        />
    )
}