import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {formatDistanceToNow, parseISO} from 'date-fns';
import Hls from 'hls.js';
import UserAvatar from "../user/UserAvatar";

const VideoItem = ({ video }) => {
    const { name, image, link, id, createTime, user_name } = video;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const videoRef = useRef(null); // Reference to video element
    const hlsRef = useRef(null); // Reference to HLS instance
    const isPlayingRef = useRef(false); // Track whether the video is playing

    const parsedTime = parseISO(createTime); // 解析日期
    const timeAgo = formatDistanceToNow(parsedTime, { addSuffix: true });


    const handlePlayClick = (e) => {
        e.stopPropagation();
        // 使用查询参数将视频链接传递给 VideoDetail 页面
        navigate(`/video/detail/${id}?src=${encodeURIComponent(link)}`);
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

        return () => {
            // Clean up HLS instance when video is no longer hovered or component unmounts
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
                isPlayingRef.current = false; // Reset playback status
            }
        };
    }, [isHovered, link]); // Dependency array to react to hover state and link

    return (
        <Box>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    boxShadow: 2,
                    position: 'relative',
                    width: 360,
                    height: 220,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handlePlayClick}
            >
                <Box sx={{position: 'relative', width: 360, height: 220, borderRadius: '10px'}}>
                    <video
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        autoPlay={isHovered} // 悬停时自动播放
                        muted
                        loop
                        preload
                        poster={image} // 使用封面图
                        style={{borderRadius: '10px', objectFit: 'cover'}}
                    >
                        Your browser does not support the video tag.
                    </video>

                    {isHovered && (
                        <Tooltip title="播放" placement="top" arrow>
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
                                <PlayArrow sx={{color: 'white'}}/>
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Paper>
            <Box sx={{padding: 2, color: 'white', borderRadius: 2, display: 'inline-block'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <UserAvatar src="https://image-10001577.image.myqcloud.com/upload/3/20170412/1492007452202.jpg"
                                avatarSize={40} size={50}/>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
                        <Typography variant="h7" sx={{ fontWeight: 'bold' }} noWrap>
                            {name}
                        </Typography>
                        <Typography variant="body2">
                            {user_name}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>

                    <Typography variant="body2">
                        3000+ 观看 * &nbsp;
                    </Typography>
                    <Typography variant="body2">
                        {timeAgo}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default VideoItem;
