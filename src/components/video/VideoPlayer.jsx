import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import {Box, Paper, IconButton, SliderThumb} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import {VolumeOff, VolumeUp, PictureInPictureAlt, PersonalVideo} from "@mui/icons-material";
import {
    FullScreenBox, InProcessBar, LoadedProgress,
    PIPBox, PlayingBox, ProcessBar, StyledSlider,
    StyledVideo, VolumeBox, VolumeSlider,
} from './js/VideoPlayerStyles'

const VideoPlayer = ({ src, image }) => {
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
    const [progressBarHeight, setProgressBarHeight] = useState('3px');
    const [isMiniMode, setIsMiniMode] = useState(false);
    //当前播放时间
    const currentTime = videoRef.current ? videoRef.current.currentTime : 0;
    //视频总时长
    const duration = videoRef.current ? videoRef.current.duration : 0;


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
            const bufferedEnd = videoElement.buffered.length ? videoElement.buffered.end(0) : 0;
            const duration = videoElement.duration;
            if (duration > 0) {
                setLoadedProgress((bufferedEnd / duration) * 100);
            }
        };

        videoElement.addEventListener('progress', handleProgress);

        const handleTimeUpdate = () => {
            const currentTime = videoElement.currentTime;
            const duration = videoElement.duration;
            if (duration > 0) {
                setProgress((currentTime / duration) * 100);
            }
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);

        videoElement.autoPlay = true;
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        videoElement.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

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
        setProgressBarHeight('4px');
    };

    const handleMouseLeaveProgressBar = () => {
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
            if (document.fullscreenElement) {
                document.exitFullscreen().catch((err) => {
                    console.error("Error exiting fullscreen:", err);
                });
            }
        } else {
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
        setSliderWidth(0);
        setShowVolumeSlider(false);
    };

    const handleVideoClick = () => {
        togglePlayPause();
    };

    const handleProgressBarClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newProgress = (offsetX / rect.width) * 100;
        const videoElement = videoRef.current;
        videoElement.currentTime = (newProgress / 100) * videoElement.duration;
        setProgress(newProgress);
    };

    const toggleMiniMode = () => {
        setIsMiniMode(!isMiniMode);
    };

    const handleEnd = () => {
        const videoElement = videoRef.current;
        setIsPlaying(false);
        videoElement.currentTime = 0;
    }

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

    // 格式化时间（mm:ss）
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        let minutes;
        if (hours < 1){
            minutes = Math.floor((seconds) / 60)
        }else{
            minutes = Math.floor((seconds % 3600) / 60);
        }
        const remainingSeconds = Math.floor(seconds % 60);
        if (hours < 1){
            //padStart(2,'0')为补充前导0
            return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <Box sx={{maxWidth: 1200, margin: '80px 80px auto', padding: 2}}>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: 'black',
                    ...(isMiniMode ? miniModeStyles : {}),
                }}
            >
                <Box sx={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    ...(isMiniMode && {paddingBottom: '0', height: '100%'}),
                }}
                     onMouseEnter={handleMouseEnterVideo}
                     onMouseLeave={handleMouseLeaveVideo}>

                    <StyledVideo
                        ref={videoRef}
                        controls={false}
                        preload
                        onEnded={handleEnd}
                        onClick={handleVideoClick}
                    />
                    {showControls && (
                        <>
                            <ProcessBar onClick={handleProgressBarClick}
                                        onMouseEnter={handleMouseEnterProgressBar}
                                        onMouseLeave={handleMouseLeaveProgressBar}
                            >

                                <InProcessBar progressBarHeight={progressBarHeight}>
                                    <LoadedProgress loadedProgress={loadedProgress}/>
                                    {/*进度条*/}
                                    <StyledSlider
                                        value={progress}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={100}
                                        valueLabelFormat={(currentTime)=>formatTime(currentTime)}
                                        onChange={(event, newValue) => {
                                            setProgress(newValue); // 实时更新进度
                                        }}
                                        onChangeCommitted={(event, newValue) => {
                                            // 你可以在这里同步更新 `videoRef.current.currentTime`
                                            const videoElement = videoRef.current;
                                            videoElement.currentTime = (newValue / 100) * videoElement.duration;
                                        }}
                                    />
                                </InProcessBar>
                            </ProcessBar>

                            <PlayingBox>
                                <IconButton onClick={togglePlayPause} sx={{color: 'white'}}>
                                    {isPlaying ? <PauseIcon/> : <PlayArrowIcon/>}
                                </IconButton>

                                <VolumeBox sliderWidth={sliderWidth}
                                           onMouseEnter={handleMouseEnterVolume}
                                           onMouseLeave={handleMouseLeaveVolume}>
                                    <IconButton onClick={toggleMute} sx={{color: 'white'}}>
                                        {isMuted ? <VolumeOff/> : <VolumeUp/>}
                                    </IconButton>
                                    {showVolumeSlider && (
                                        <VolumeSlider
                                            value={volume}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={handleVolumeChange}
                                        />
                                    )}
                                </VolumeBox>
                            </PlayingBox>

                            {/* 显示时间 */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: '23px',
                                right: '110px',
                                color: 'white',
                                fontSize: '14px',
                                zIndex: 4
                            }}>
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </Box>

                            <FullScreenBox>
                                <IconButton onClick={toggleFullscreen} sx={{color: 'white'}}>
                                    {isFullscreen ? <FullscreenExitIcon/> : <FullscreenIcon/>}
                                </IconButton>
                            </FullScreenBox>

                            <PIPBox>
                                <IconButton onClick={toggleMiniMode} sx={{color: 'white'}}>
                                    <PictureInPictureAlt/>
                                </IconButton>
                            </PIPBox>
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default VideoPlayer;
