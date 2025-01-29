import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import { uploadVideo } from "../../api/video";
import NoticeBar from "../util/NoticeBar";

export default function VideoUpload() {
    const [videoFile, setVideoFile] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [videoName, setVideoName] = useState("");
    const videoRef = useRef(null);
    const imgRef = useRef(null);
    const [duration, setDuration] = useState(null);
    const [label, setLabel] = useState(null);
    const videoTypes = ["音乐", "美食", "风景", "游戏", "鬼畜", "运动", "旅游", "其他"];

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");
    const [autoHideDuration, setAutoHideDuration] = useState(2000);
    const [handleCloseSnackbar, setHandleCloseSnackbar] = useState(() =>
        setOpenSnackbar(false)
    );

    const handleVideoFileChange = (e) => {
        const selectedVideoFile = e.target.files[0];
        setVideoFile(selectedVideoFile);
        const videoUrl = URL.createObjectURL(selectedVideoFile);
        if (videoRef.current) {
            const videoElement = videoRef.current;
            videoElement.src = videoUrl;
            videoElement.onloadedmetadata = () => {
                setDuration(videoElement.duration);
            };
        }
    };

    const handleImgFileChange = (e) => {
        const selectedImgFile = e.target.files[0];
        setImgFile(selectedImgFile);
        const imgUrl = URL.createObjectURL(selectedImgFile);
        if (imgRef.current) {
            imgRef.current.src = imgUrl;
        }
    };

    const handleUploadClick = async () => {
        if (videoName === "") {
            setVideoName(videoFile.name);
        }
        setSnackbarMessage("视频上传中...");
        setSnackbarSeverity("info");
        setOpenSnackbar(true);
        setAutoHideDuration(null);
        setHandleCloseSnackbar(() => {});
        const data = await uploadVideo(
            localStorage.getItem("userId"),
            videoName,
            duration,
            imgFile,
            videoFile,
            label
        );
        setHandleCloseSnackbar(() => setOpenSnackbar(false));
        if (data[0] === 200) {
            setSnackbarMessage(data[1]);
            setSnackbarSeverity("success");
        } else {
            setSnackbarMessage(data[1]);
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const handleChangeLabel = (event) => {
        setLabel(event.target.value);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Paper sx={{ height: "700px", width: "1000px", padding: '30px' }}>
                <Grid container spacing='50px' sx={{ height: "100%" }}>
                    {/* 左上角 - 视频 */}
                    <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
                        {/*视频组件*/}
                        <Box component='video'
                        ref={videoRef}
                        controls
                        accept="video/mp4"
                        sx={{width: "100%", height: '250px', borderRadius: "16px", marginBottom: '10px'}}/>
                        <input
                            id="upload-video-file"
                            type="file"
                            accept="video/*"
                            style={{ display: "none" }}
                            onChange={handleVideoFileChange}
                        />
                        <label htmlFor="upload-video-file">
                            <Button variant="contained" component="span">
                                选择视频文件
                            </Button>
                        </label>
                        <p>Selected file: {videoFile === null ? "未选择文件" : videoFile.name}</p>
                        {duration && <p>Video Duration: {duration.toFixed(2)} seconds</p>}
                    </Grid>

                    {/* 右上角 - 图片 */}
                    <Grid item xs={6}>
                        <Box component='img' ref={imgRef}
                             sx={{width: "100%", borderRadius: "16px", height: '250px', marginBottom: '5px'}}/>
                        <input
                            id="upload-img-file"
                            type="file"
                            accept="image/*"
                            style={{display: "none"}}
                            onChange={handleImgFileChange}
                        />
                        <label htmlFor="upload-img-file">
                            <Button variant="contained" component="span">
                                选择视频封面图片
                            </Button>
                        </label>
                    </Grid>

                    {/* 左下角 - 视频类型和视频名称 */}
                    <Grid item xs={6}>
                        <FormControl sx={{minWidth: 120, mb: 2}}>
                            <InputLabel id="label">视频类型</InputLabel>
                            <Select
                                labelId="label"
                                id="label"
                                value={label}
                                label="Label"
                                onChange={handleChangeLabel}
                            >
                                {videoTypes.map((item, index) => (
                                    <MenuItem key={index} value={index + 1}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ display: "block", mt: 2, width: '300px' }}
                            label="请输入视频名称"
                            value={videoName}
                            onChange={(e) => setVideoName(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    {/* 右下角 - 上传按钮 */}
                    <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <Button onClick={handleUploadClick} variant="contained" color="primary">
                            上传
                        </Button>
                    </Grid>
                </Grid>
                <NoticeBar
                    openSnackbar={openSnackbar}
                    handleCloseSnackbar={handleCloseSnackbar}
                    snackbarSeverity={snackbarSeverity}
                    snackbarMessage={snackbarMessage}
                    autoHideDuration={autoHideDuration}
                />
            </Paper>
        </Box>
    );
}
