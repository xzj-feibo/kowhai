import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Box, Paper, Typography } from '@mui/material';

const VideoPlayer = ({ src, title }) => {
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play().catch((error) => {
                    console.log("Autoplay was prevented. Adding a click event listener.");
                    videoRef.current.addEventListener('click', () => {
                        videoRef.current.play();
                    });
                });
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.play().catch((error) => {
                    console.log("Autoplay was prevented. Adding a click event listener.");
                    videoRef.current.addEventListener('click', () => {
                        videoRef.current.play();
                    });
                });
            });
        }

        // 监听视频播放进度
        const interval = setInterval(() => {
            if (videoRef.current) {
                setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [src]);

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
            <Paper elevation={3} sx={{ backgroundColor: 'red', borderRadius: '12px' }}>
                <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <video
                        ref={videoRef}
                        controls
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 'calc(100% - 10px)', // 调整进度条的位置
                        left: 0,
                        width: '100%',
                        height: '10px',
                        backgroundColor: '#e0e0e0', // 背景颜色
                        borderRadius: '5px',
                    }}
                >
                    <Box
                        sx={{
                            width: `${progress}%`,
                            height: '100%',
                            backgroundColor: 'red', // 已加载的进度条颜色
                            borderRadius: '5px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-5px',
                                left: `${progress - 2}%`, // 小图标的动态位置
                                width: '10px',
                                height: '10px',
                                backgroundColor: 'blue', // 小图标颜色
                                borderRadius: '50%',
                            }}
                        />
                    </Box>
                </Box>
                <Typography variant="h6" sx={{ marginTop: 2, borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                    {title}
                </Typography>
            </Paper>
        </Box>
    );
};

export default VideoPlayer;
