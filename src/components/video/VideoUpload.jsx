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
    TextField
} from "@mui/material";
import { uploadVideo } from "../../api/video";
import NoticeBar from "../util/NoticeBar";
import FileUploadBox from "../util/FileUploadBox";

export default function VideoUpload() {
    const [videoFile, setVideoFile] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [videoName, setVideoName] = useState("");
    const videoRef = useRef(null);
    const imgRef = useRef(null);
    // const [duration, setDuration] = useState(null);
    const [label, setLabel] = useState(null);
    const videoTypes = ["音乐", "美食", "风景", "游戏", "鬼畜", "运动", "旅游", "其他"];

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");
    const [autoHideDuration, setAutoHideDuration] = useState(5000);
    const [handleCloseSnackbar, setHandleCloseSnackbar] = useState(() =>
        setOpenSnackbar(false)
    );

    //绑定选择的文件
    const handleFile = (selectedFile, i) => {
        if (i === 0){
            setVideoFile(selectedFile);
        }else{
            setImgFile(selectedFile)
        }

    }

    //点击上传
    const handleUploadClick = async () => {
        if (videoName === "") {
            setVideoName(videoFile.name);
        }

        setOpenSnackbar(true);
        setAutoHideDuration(null);
        setHandleCloseSnackbar(() => {});
        const data = await uploadVideo(
            localStorage.getItem("userId"),
            videoName,
            imgFile,
            videoFile,
            label
        );
        setSnackbarMessage(data[1]);
        setSnackbarSeverity("info");
        // 2秒后关闭 Snackbar
        setTimeout(() => {
            setHandleCloseSnackbar(() => setOpenSnackbar(false));
            // ✅ 清除用户输入的内容
            setVideoName("");
            setImgFile(null);
            setVideoFile(null);
            setLabel(null);

            // ✅ 重置 FileUploadBox 组件的内容
            if (videoRef.current) {
                videoRef.current.reset(); // 在 FileUploadBox 组件中实现 reset 方法
            }
            if (imgRef.current) {
                imgRef.current.reset();
            }
        }, 2000);
    };

    //选择视频类型回调
    const handleChangeLabel = (event) => {
        setLabel(event.target.value);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Paper sx={{ height: "700px", width: "1000px", padding: '30px' }}>
                <Grid container spacing='50px' sx={{ height: "100%" }}>
                    {/* 左上角 - 视频 */}
                    <Grid item xs={5} sx={{ display: "flex", flexDirection: "column" }}>
                        {/*视频组件*/}
                        <FileUploadBox ref={videoRef} handleFile={handleFile} type={0} name="请上传视频文件"/>
                    </Grid>

                    {/* 右上角 - 图片 */}
                    <Grid item xs={5}>
                        <FileUploadBox ref={imgRef} handleFile={handleFile} type={1} name="请上传视频封面"/>
                    </Grid>

                    {/* 左下角 - 视频类型和视频名称 */}
                    <Grid item xs={5}>
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
                    <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
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
