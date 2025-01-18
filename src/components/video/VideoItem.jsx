import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, IconButton, Avatar, Tooltip } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Hls from 'hls.js';

const VideoItem = ({ video }) => {
    const { name, image, link, id, createTime } = video;
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const videoRef = useRef(null); // Reference to video element
    const hlsRef = useRef(null); // Reference to HLS instance
    const isPlayingRef = useRef(false); // Track whether the video is playing

    const timeAgo = formatDistanceToNow(new Date(createTime), { addSuffix: true });

    const handlePlayClick = (e) => {
        e.stopPropagation();
        navigate(`/video/detail/${id}`);
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
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                borderRadius: 2,
                boxShadow: 2,
                position: 'relative',
                width: 360,
                height: 250,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/video/${id}`)}
        >
            <Box sx={{ position: 'relative', width: 360, height: 250 }}>
                {isHovered ? (
                    <video
                        ref={videoRef}
                        width="100%"
                        autoPlay
                        muted
                        loop
                        style={{ borderRadius: '8px' }}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src={image}
                        alt={name}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                )}

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
                            <PlayArrow sx={{ color: 'white' }} />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            <Box sx={{ padding: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }} noWrap>
                    {name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    {/*<Avatar sx={{ width: 24, height: 24 }} alt={channel.name} src={channel.avatar} />*/}
                    {/*<Typography variant="body2" sx={{ marginLeft: 1, color: 'gray' }}>*/}
                    {/*    {channel.name}*/}
                    {/*</Typography>*/}
                    <Typography variant="body2" sx={{ marginLeft: 2, color: 'gray' }}>
                        {timeAgo}
                    </Typography>
                </Box>

                {/*<Typography variant="body2" sx={{ color: 'gray', marginTop: 0.5 }}>*/}
                {/*    {views} 观看*/}
                {/*</Typography>*/}
            </Box>
        </Paper>
    );
};

export default VideoItem;
