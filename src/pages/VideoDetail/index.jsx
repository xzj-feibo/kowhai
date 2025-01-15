import VideoPlayer from "../../components/video/VideoPlayer";
import React from "react";

export default function VideoDetail() {
    return (
        <VideoPlayer
            src="http://119.45.154.194:9000/video/1/cunk_on_life/cunk_on_life.m3u8"
            title="鬓如雪 - 周杰伦"
        />
    )
}