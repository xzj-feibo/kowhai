import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Box, Paper, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { VolumeOff, VolumeUp } from "@mui/icons-material";
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

        const handleTimeUpdate = () => {
            const currentTime = videoElement.currentTime;
            const duration = videoElement.duration;
            if (duration > 0) {
                setProgress((currentTime / duration) * 100);
            }
        };

        videoElement.addEventListener('progress', handleProgress);
        videoElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            videoElement.removeEventListener('progress', handleProgress);
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

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
            document.exitFullscreen?.();
        } else {
            videoElement.requestFullscreen?.();
        }
        setIsFullscreen(!isFullscreen);
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
        setSliderWidth(100);
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
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newProgress = (offsetX / rect.width) * 100;
        const videoElement = videoRef.current;
        videoElement.currentTime = (newProgress / 100) * videoElement.duration;
        setProgress(newProgress);
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '80px 80px auto', padding: 2 }}>
            <Paper elevation={3} sx={{ backgroundColor: 'black' }}>
                <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
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

                    <Box
                        onClick={handleProgressBarClick}
                        sx={{
                            position: 'absolute',
                            bottom: '70px',
                            left: '50%',
                            width: '98%',
                            height: '3px',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '3px',
                            zIndex: 3,
                            cursor: 'pointer',
                            transform: 'translateX(-50%)',
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

                        {/* Red dot */}
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

                    <Box sx={{ position: 'absolute', bottom: '15px', left: '12px', zIndex: 4, display: 'flex', alignItems: 'center' }}>
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
                                        width: '100px',
                                        color: 'white',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ position: 'absolute', bottom: '15px', right: '20px', zIndex: 4 }}>
                        <IconButton onClick={toggleFullscreen} sx={{ color: 'white' }}>
                            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default VideoPlayer;
