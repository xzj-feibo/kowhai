import VideoPlayer from "../../components/video/VideoPlayer";
import React from "react";

export default function VideoDetail() {
    return (
        <VideoPlayer
            src="http://119.45.154.194:9000/video/1/send/send.m3u8"
        />
    )
}