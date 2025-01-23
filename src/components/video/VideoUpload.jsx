import {useEffect, useRef, useState} from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { uploadVideo } from "../../api/video";

export default function VideoUpload() {
    const [videoFile, setVideoFile] = useState(null);//视频文件
    const [imgFile, setImgFile] = useState(null);//封面文件
    const [videoName, setVideoName] = useState(""); // 使用 state 管理视频名称
    const videoRef = useRef(null); // 引用 video 元素
    const imgRef = useRef(null); // 引用 img 元素
    const [duration, setDuration] = useState(null); // 用于存储视频时长

    const handleVideoFileChange = (e) => {
        const selectedVideoFile = e.target.files[0];
        setVideoFile(selectedVideoFile);

        // 使用 URL.createObjectURL() 创建文件的临时 URL
        const videoUrl = URL.createObjectURL(selectedVideoFile);
        // 在 videoRef.current 有效时设置 video 元素的 src
        if (videoRef.current) {
            const videoElement = videoRef.current;
            videoElement.src = videoUrl;
            videoElement.onloadedmetadata = () => {
                setDuration(videoElement.duration); // 获取视频时长
            };
        }
    };

    const handleImgFileChange = (e) => {
        const selectedImgFile = e.target.files[0];
        setImgFile(selectedImgFile);
        // 使用 URL.createObjectURL() 创建文件的临时 URL
        const imgUrl = URL.createObjectURL(selectedImgFile);
        if (imgRef.current) {
            const imgElement = imgRef.current;
            imgElement.src = imgUrl;
        }
    }

    const handleUploadClick = async () => {
        if (videoName === ""){
            setVideoName(videoFile.name)
        }
        // 使用视频名称和时长上传视频
        const response = await uploadVideo(1, videoName, duration, imgFile, videoFile);
        // console.log("Upload response:", response);
    };


    return (
        <Paper sx={{
            backgroundColor: "white",
            height: "100vh",
            width: "100vw",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '5px'}}>
                <input
                    id="upload-video-file"
                    type="file"
                    accept="video/*"
                    style={{display: "none"}} // 隐藏默认文件选择框
                    onChange={handleVideoFileChange}
                />
                <label htmlFor="upload-video-file">
                    <Button variant="contained" component="span">
                        Choose Video File
                    </Button>
                </label>

                <Box>
                    <video
                        ref={videoRef} // 引用 video 元素
                        controls
                        style={{width: "300px", height: "300px", margin: '10px', borderRadius: '16px'}}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <p>Selected file: {videoFile === null ? "未选择文件" : videoFile.name}</p>
                    {duration && <p>Video Duration: {duration.toFixed(2)} seconds</p>} {/* 显示视频时长 */}
                </Box>
            </Box>

            <Box sx={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '5px'}}>
                <input
                    id="upload-img-file"
                    type="file"
                    accept="image/*"
                    style={{display: "none"}} // 隐藏默认文件选择框
                    onChange={handleImgFileChange}
                />
                <label htmlFor="upload-img-file">
                    <Button variant="contained" component="span">
                        Choose Cover File
                    </Button>
                </label>
                <Box>
                    <img ref={imgRef} style={{width: "300px", height: "300px", margin: '10px', borderRadius: '16px'}} alt="未选择图片"/>
                </Box>
            </Box>

            <TextField
                sx={{margin: "15px"}}
                label="Input your video name"
                value={videoName} // 绑定到 state
                onChange={(e) => setVideoName(e.target.value)} // 更新 videoName state
            />
            <Button onClick={handleUploadClick} variant="contained" color="primary">
                Upload
            </Button>
        </Paper>
    );
}
