import React, { useState } from 'react';
import {Button, Typography, Box, LinearProgress, ThemeProvider} from '@mui/material';
import theme from "../../theme";

function VideoUpload() {
    const [videoFile, setVideoFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // 处理文件选择
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
        } else {
            alert('Please select a valid video file.');
        }
    };

    // 模拟上传功能
    const handleUpload = () => {
        if (!videoFile) {
            alert('Please select a video file.');
            return;
        }

        setUploading(true);

        // 模拟文件上传
        const fakeUploadProgress = () => {
            if (uploadProgress < 100) {
                setUploadProgress(uploadProgress + 10);
            } else {
                setUploading(false);
                alert('Video uploaded successfully!');
            }
        };

        const interval = setInterval(fakeUploadProgress, 500);

        // 清理定时器
        return () => clearInterval(interval);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{color: 'white'}}>Upload Video</Typography>

            <input
                accept="video/*"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="video-upload"
            />
            <label htmlFor="video-upload">
                <Button variant="contained" component="span" disabled={uploading}>
                    Choose Video
                </Button>
            </label>

            {videoFile && (
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {videoFile.name}
                </Typography>
            )}

            {uploading && (
                <>
                    <LinearProgress sx={{ width: '100%' }} variant="determinate" value={uploadProgress} />
                    <Typography variant="body2">{uploadProgress}%</Typography>
                </>
            )}

            <Button
                variant="contained"
                onClick={handleUpload}
                disabled={uploading || !videoFile}
            >
                {uploading ? 'Uploading...' : 'Upload Video'}
            </Button>
        </Box>
    );
}

export default VideoUpload;
