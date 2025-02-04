import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {formatDistanceToNow, parseISO} from "date-fns";
import Hls from "hls.js";
import {Box, IconButton, Paper, Stack, Tooltip, Typography} from "@mui/material";
import {PlayArrow} from "@mui/icons-material";
import UserAvatar from "../user/UserAvatar";

export default function VideoItemOfSearch({video}) {
    const { name, image, link, id, avatar, createTime, user_name } = video;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const videoRef = useRef(null); // Reference to video element
    const hlsRef = useRef(null); // Reference to HLS instance
    const isPlayingRef = useRef(false); // Track whether the video is playing

    const parsedTime = parseISO(createTime); // 解析日期
    const timeAgo = formatDistanceToNow(parsedTime, { addSuffix: true });


    //点击video标签跳转
    const handlePlayClick = (e) => {
        e.stopPropagation();
        // 使用查询参数将视频链接传递给 VideoDetail 页面
        navigate(`/video/detail/${id}`, { state: { src: link, videoName: name, avatar: avatar, userName: user_name, videoId: id } });
    };

    useEffect(() => {
        if (isHovered && videoRef.current) {
            // Initialize HLS.js if it's supported and not already initialized
            if (Hls.isSupported()) {
                if (!hlsRef.current) {
                    const hls = new Hls();
                    hls.loadSource(link); // Load the m3u8 video source
                    hls.attachMedia(videoRef.current); // Attach HLS stream to the video element

                    // Handle video playback when HLS is ready
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        if (videoRef.current && videoRef.current.paused && !isPlayingRef.current) {
                            videoRef.current.play().catch(() => {}); // Attempt to play the video
                            isPlayingRef.current = true; // Mark as playing
                        }
                    });

                    // Store HLS instance reference for cleanup
                    hlsRef.current = hls;
                }
            } else {
                // For non-HLS sources, directly set the video source and play
                videoRef.current.src = link;
                videoRef.current.play().catch(() => {}); // Attempt to play after setting the source
            }
        }
    })
    return (
        <Stack direction='row' spacing={2} sx={{ padding: 2, alignItems: 'flex-start' }}>
            {/* 视频部分 */}
            <Box sx={{ width: 600, height: 350, position: 'relative', cursor: 'pointer' }}>
                <Paper
                    sx={{
                        position: 'relative',
                        borderRadius: '10px',
                        boxShadow: 2,
                        overflow: 'hidden',
                        width: '100%',
                        height: '100%'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handlePlayClick}
                >
                    <video
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        autoPlay={isHovered} // 悬停时自动播放
                        muted
                        loop
                        preload
                        poster={image} // 使用封面图
                        style={{ objectFit: 'cover' }}
                    >
                        Your browser does not support the video tag.
                    </video>

                    {isHovered && (
                        <Tooltip title="Play" placement="top" arrow>
                            <IconButton
                                onClick={handlePlayClick}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    padding: 1,
                                }}
                            >
                                <PlayArrow sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Paper>
            </Box>

            {/* 元数据部分 */}
            <Box sx={{ flex: 2, paddingLeft: 2, maxWidth: 500 , marginLeft: '50px' , color:'white'}}>
                <Stack>
                    <Typography variant="h5" sx={{ fontWeight: 'medium', marginBottom: 0.5 }} noWrap>
                        {name}
                    </Typography>


                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                        <UserAvatar src={avatar} avatarSize={50} size={50} />
                        <Box sx={{ marginLeft: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} noWrap>
                                {user_name}
                            </Typography>
                            <Typography variant="body2" sx={{color:'white'}}>
                                {user_name}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography variant="body2" noWrap>
                        {timeAgo}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                        <Typography variant="body2">
                            {3000} views
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Stack>


    )
}