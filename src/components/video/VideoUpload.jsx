import React, {useEffect, useRef, useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import { uploadVideo } from "../../api/video";
import NoticeBar from "../util/NoticeBar";

export default function VideoUpload() {
    const [videoFile, setVideoFile] = useState(null);//视频文件
    const [imgFile, setImgFile] = useState(null);//封面文件
    const [videoName, setVideoName] = useState(""); // 使用 state 管理视频名称
    const videoRef = useRef(null); // 引用 video 元素
    const imgRef = useRef(null); // 引用 img 元素
    const [duration, setDuration] = useState(null); // 用于存储视频时长
    const [label, setLabel] = useState(null); // 用于存储视频标签
    //视频类型
    const videoTypes = ['音乐', '美食', '风景', '游戏', '鬼畜', '运动', '旅游', '其他']

    //提示框相关状态
    const [openSnackbar, setOpenSnackbar] = useState(false); // 控制 Snackbar 是否打开
    const [snackbarMessage, setSnackbarMessage] = useState(''); // 提示框的内容
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // 提示框的类型（error, success, warning, info）
    const [autoHideDuration, setAutoHideDuration] = useState(2000); //自动关闭时长
    const [handleCloseSnackbar, setHandleCloseSnackbar] = useState(() => setOpenSnackbar(false)) //用于处理手动关闭
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
        // 显示 "上传中" 提示，类型为 info，并禁用自动关闭
        setSnackbarMessage("视频上传中...");
        setSnackbarSeverity("info");
        setOpenSnackbar(true); // 打开 Snackbar
        setAutoHideDuration(null); // 禁止自动关闭
        setHandleCloseSnackbar(()=>{}); //禁止点击关闭

        // 使用视频名称和时长上传视频
        const data = await uploadVideo(localStorage.getItem('userId'), videoName, duration, imgFile, videoFile, label);
        setHandleCloseSnackbar(() => setOpenSnackbar(false))
        if (data[0] === 200){
            setSnackbarMessage(data[1]);
            setSnackbarSeverity('success');
        }else{
            // 如果登录失败，设置错误提示框
            setSnackbarMessage(data[1]);
            setSnackbarSeverity('error'); // 错误类型
            setOpenSnackbar(true); // 打开提示框
        }
    };
    //处理视频标签改变
    const handleChangeLabel = (event)=> {
        setLabel(event.target.value);
    }

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

            <FormControl>
                <InputLabel id="label">视频类型</InputLabel>
                <Select
                    labelId="label"
                    id="label"
                    value={label}
                    label="Label"
                    onChange={handleChangeLabel}
                    sx={{width: '120px'}}
                >
                    {videoTypes.map((item, index) => (
                        <MenuItem value={index+1}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                sx={{margin: "15px"}}
                label="Input your video name"
                value={videoName} // 绑定到 state
                onChange={(e) => setVideoName(e.target.value)} // 更新 videoName state
            />
            <Button onClick={handleUploadClick} variant="contained" color="primary">
                Upload
            </Button>
            <NoticeBar openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} autoHideDuration={autoHideDuration}/>
        </Paper>
    );
}
