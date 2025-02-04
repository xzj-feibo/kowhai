import React, { useState } from "react";
import {
    Avatar,
    Button,
    Tabs,
    Tab,
    Card,
    Typography,
    TextField,
    IconButton,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import PollIcon from "@mui/icons-material/Poll";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import {useLocation, useNavigate} from "react-router-dom";
import AppBarLayout from "../../layout/AppBarLayout";

const ProfilePage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate(); //获取路由跳转函数
    const location = useLocation();
    const avatar = location.state?.avatar;
    const username = location.state?.username;
    return (
        <Box sx={{ color: "#fff", minHeight: "100vh", p: 3, display: "flex", justifyContent: "center" }}>
            <AppBarLayout/>
            <Box sx={{ width: "45%", marginTop: '4%' }}>
                {/* 用户信息 */}
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ width: 150, height: 150, bgcolor: "#4caf50" }} src={avatar} />
                    <Box>
                        <Typography variant="h4">{username}</Typography>
                        <Typography variant="subtitle1" sx={{ color: "#aaa" }}>
                            @{username}
                        </Typography>
                    </Box>
                </Box>

                {/* 按钮 */}
                <Box mt={2} display="flex" gap={2}>
                    <Button variant="contained" sx={{ bgcolor: "#555", color: "#fff", borderRadius: "20px" }}
                    onClick={() => navigate("/video/upload")}
                    >
                        上传视频
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: "#555", color: "#fff", borderRadius: "20px" }}>
                        管理视频
                    </Button>
                </Box>

                {/* 发表帖子输入框 */}
                <Card sx={{ mt: 3, p: 2, bgcolor: "#1e1e1e", width: "70%" }}>
                    <TextField
                        fullWidth
                        placeholder="和粉丝分享最新动态"
                        variant="outlined"
                        multiline
                        minRows={4} // 增加默认高度
                        InputProps={{ style: { color: "#fff" } }}
                        sx={{
                            input: { color: "#fff" },
                            bgcolor: "#333",
                            borderRadius: 1,
                            width: "100%",
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" }
                        }}
                    />
                    <Box display="flex" mt={1} justifyContent="space-between">
                        <Box>
                            <IconButton color="primary">
                                <ImageIcon />
                            </IconButton>
                            <IconButton color="primary">
                                <PollIcon />
                            </IconButton>
                            <IconButton color="primary">
                                <VideoLibraryIcon />
                            </IconButton>
                        </Box>
                        <Button variant="contained" color="primary" disabled>
                            发布
                        </Button>
                    </Box>
                </Card>

                {/* Tabs 选项卡 */}
                <Tabs
                    value={tabIndex}
                    onChange={(e, newValue) => setTabIndex(newValue)}
                    textColor="inherit"
                    indicatorColor="primary"
                    sx={{ mt: 3 }}
                >
                    <Tab label="已发布" />
                    <Tab label="已定时" />
                    <Tab label="已归档" />
                </Tabs>

                {/* 空页面 */}
                <Box textAlign="center" mt={5}>
                    <EditIcon sx={{ fontSize: 50, color: "#555" }} />
                    <Typography variant="h6" sx={{ mt: 1, color: "#aaa" }}>
                        发布帖子
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#777" }}>
                        你发布的帖子会显示在这里，整个社区都能看到
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
