import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Box, Paper, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import {VolumeOff, VolumeUp, PictureInPictureAlt} from "@mui/icons-material";
import theme from "../../theme";

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [loadedProgress, setLoadedProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [progressBarWidth, setProgressBarWidth] = useState('95%');
    const [progressBarHeight, setProgressBarHeight] = useState('3px');
    const [isMiniMode, setIsMiniMode] = useState(false);

    //return之前的代码会在组件渲染后执行一次
    useEffect(() => {
        const videoElement = videoRef.current;
        let hls;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = src;
        }

        const handleProgress = () => {
            //获取已缓冲的部分
            const bufferedEnd = videoElement.buffered.length ? videoElement.buffered.end(0) : 0;
            //视频总时长
            const duration = videoElement.duration;
            if (duration > 0) {
                //更新已加载的进度条
                setLoadedProgress((bufferedEnd / duration) * 100);
            }
        };

        const handleTimeUpdate = () => {
            //获取当前播放时间
            const currentTime = videoElement.currentTime;
            const duration = videoElement.duration;
            if (duration > 0) {
                //更新进度条
                setProgress((currentTime / duration) * 100);
            }
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        //返回值是清理函数，当组件卸载或src变化时执行
        return () => {
            videoElement.removeEventListener('progress', handleProgress);
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    const handleMouseEnterVideo = () => {
        setShowControls(true);
    };

    const handleMouseLeaveVideo = () => {
        if (isPlaying) {
            setTimeout(() => {
                setShowControls(false);
            }, 200);
        }
    };

    const handleMouseEnterProgressBar = () => {
        setProgressBarWidth('100%');
        setProgressBarHeight('5px');
    };

    const handleMouseLeaveProgressBar = () => {
        setProgressBarWidth('95%');
        setProgressBarHeight('3px');
    };

    const togglePlayPause = () => {
        const videoElement = videoRef.current;
        if (isPlaying) {
            videoElement.pause();
        } else {
            videoElement.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        videoRef.current.volume = newValue;
        if (newValue > 0) {
            setIsMuted(false);
        }
    };

    const toggleFullscreen = () => {
        const videoElement = videoRef.current;
        if (isFullscreen) {
            //检查页面是否有全屏元素
            if (document.fullscreenElement) {
                // 退出全屏
                if (document.exitFullscreen) {
                    document.exitFullscreen().catch((err) => {
                        console.error("Error exiting fullscreen:", err);
                    });
                }
            }
        } else {
            // 进入全屏
            if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen().catch((err) => {
                    console.error("Error entering fullscreen:", err);
                });
            }
        }
    };


    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        if (newMutedState) {
            setVolume(0);
            videoRef.current.volume = 0;
        } else {
            setVolume(1);
            videoRef.current.volume = 1;
        }
    };

    const handleMouseEnterVolume = () => {
        setShowVolumeSlider(true);
        setSliderWidth(150);
    };

    const handleMouseLeaveVolume = () => {
        setTimeout(() => {
            setSliderWidth(0);
            setShowVolumeSlider(false);
        }, 3000);
    };

    const handleVideoClick = () => {
        togglePlayPause();
    };

    const handleProgressBarClick = (event) => {
        //返回一个 DOMRect 对象，该对象包含元素的大小及其相对于视口的位置
        const rect = event.currentTarget.getBoundingClientRect();
        //event.clientX为点击位置相对于左边界的X坐标，rect.left为进度条的作边界X坐标
        const offsetX = event.clientX - rect.left;
        const newProgress = (offsetX / rect.width) * 100;
        const videoElement = videoRef.current;
        videoElement.currentTime = (newProgress / 100) * videoElement.duration;
        setProgress(newProgress);
    };

    const toggleMiniMode = () => {
        setIsMiniMode(!isMiniMode);
    };

    const miniModeStyles = {
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 380,
        height: 250,
        zIndex: 1000,
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '80px 80px auto', padding: 2 }}>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: 'black',
                    ...(isMiniMode ? miniModeStyles : {}),
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        // (...)为扩展运算符，当isMiniMode为true时会将样式追加到后面，...false表示什么也不追加
                        ...(isMiniMode && { paddingBottom: '0', height: '100%' }),
                    }}
                    onMouseEnter={handleMouseEnterVideo}
                    onMouseLeave={handleMouseLeaveVideo}
                >
                    <video
                        ref={videoRef}
                        controls={false}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '25px',
                            zIndex: 1,
                            cursor: 'pointer',
                        }}
                        onClick={handleVideoClick}
                    />
                    {showControls && (
                        <>
                            <Box
                                onClick={handleProgressBarClick}
                                onMouseEnter={handleMouseEnterProgressBar}
                                onMouseLeave={handleMouseLeaveProgressBar}
                                sx={{
                                    position: 'absolute',
                                    bottom: '70px',
                                    left: '50%',
                                    width: progressBarWidth,
                                    height: '15px',
                                    backgroundColor: 'transparent',
                                    borderRadius: '3px',
                                    zIndex: 3,
                                    cursor: 'pointer',
                                    transform: 'translateX(-50%)',
                                    transition: 'width 0.3s ease-in-out',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: progressBarHeight,
                                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                        position: 'absolute',
                                        top: '5px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${loadedProgress}%`,
                                            height: '100%',
                                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: `${progress}%`,
                                            height: '100%',
                                            backgroundColor: theme.palette.primary.main,
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                        }}
                                    />
                                    {/*进度条圆点*/}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '-5px',
                                            left: `${progress}%`,
                                            width: '12px',
                                            height: '12px',
                                            backgroundColor: theme.palette.primary.main,
                                            borderRadius: '50%',
                                            transform: 'translateX(-50%)',
                                            zIndex: 4,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    left: '12px',
                                    zIndex: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton onClick={togglePlayPause} sx={{ color: 'white' }}>
                                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                </IconButton>

                                <Box
                                    onMouseEnter={handleMouseEnterVolume}
                                    onMouseLeave={handleMouseLeaveVolume}
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'width 0.3s ease',
                                        width: `${sliderWidth}px`,
                                    }}
                                >
                                    <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
                                        {isMuted ? <VolumeOff /> : <VolumeUp />}
                                    </IconButton>
                                    {showVolumeSlider && (
                                        <Slider
                                            value={volume}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={handleVolumeChange}
                                            sx={{
                                                width: '150px',
                                                color: theme.palette.primary.main,
                                                height: '2px',
                                                '& .MuiSlider-thumb': {
                                                    width: 12,
                                                    height: 12,
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    right: '60px',
                                    zIndex: 4,
                                }}
                            >
                                <IconButton onClick={toggleFullscreen} sx={{ color: 'white' }}>
                                    {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                                </IconButton>
                            </Box>

                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    right: '20px',
                                    zIndex: 4,
                                }}
                            >
                                <IconButton onClick={toggleMiniMode} sx={{ color: 'white' }}>
                                    <PictureInPictureAlt />
                                </IconButton>
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default VideoPlayer;
