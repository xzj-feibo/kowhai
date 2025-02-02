/**
 * 视频详情页
 */
import VideoPlayer from "../../components/video/VideoPlayer";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import {Avatar, Box, Button, Divider, Stack, TextField, Typography} from "@mui/material";
import AppBarLayout from "../../layout/AppBarLayout";
import {getVideoLikes} from "../../api/video";
import CommentInput from "../../components/comment/CommentInput";
import CommentItem from "../../components/comment/CommentItem";
import {getComments} from "../../api/comment";

export default function VideoDetail() {
    const location = useLocation();
    const videoSrc = location.state?.src;
    const videoName = location.state?.videoName;
    const avatar = location.state?.avatar;
    const userName = location.state?.userName;
    const videoId = location.state?.videoId;
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    //右侧按钮是否点击,-1-未点击，1-已点击
    const [rightButtons, setRightButtons] = useState([-1,-1,-1])

    //得到视频点赞数量
    const fetchGetVideoLikes = async ()=>{
        return await getVideoLikes(videoId);
    }

    //得到视频评论数据
    const fetchGetComments = async () => {
        return await getComments(videoId);
    }

    useEffect(() => {
        fetchGetVideoLikes().then((data) => {
            setLikes(data[2]);
        });

        fetchGetComments().then((data)=>{
            setComments(data[2]);
        })
    }, []);

    //发布评论后回调函数
    const addCommentCallback = () => {
        fetchGetComments().then((data)=>{
            setComments(data[2]);
        })
    }

    //处理右侧按钮点击
    const handleRightButtonClick = (i) => {
        const updatedButtons = [...rightButtons];  // 创建新的数组副本
        updatedButtons[i] = -updatedButtons[i];
        setRightButtons(updatedButtons); // 通过 setState 更新状态
    }
    return (
        <Box>
            <AppBarLayout/>
            <Box sx={{marginTop: '4%', color: 'white'}}>
                <VideoPlayer
                    src={videoSrc}
                />

                <Box sx={{ marginLeft: '7.5%', marginTop: '0.5%', width: '63%' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{videoName}</Typography>
                    {/*视频下方按钮和Up*/}
                    <Box sx={{ backgroundColor: 'black', width: '100%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* 左侧部分 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={avatar} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '5%' }}>
                                <Box sx={{ backgroundColor: 'transparent', color: 'white', width: '120px' }}>{userName}</Box>
                                <Box sx={{ backgroundColor: 'transparent', color: 'white', width: '120px' }}>{100} 位订阅者</Box>
                            </Box>
                            <Button sx={{ backgroundColor: 'white', color: 'black', marginLeft: '10px', height: '34px', borderRadius: '17px' }}>订阅</Button>
                        </Box>

                        {/* 右侧按钮部分 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Button sx={{ backgroundColor: '#212121', color: 'white', padding: '5px 10px', borderRadius: '25px 0 0 25px' }} onClick={() => handleRightButtonClick(0)}>
                                    {rightButtons[0] === -1 ? <ThumbUpOffAltOutlinedIcon/> : <ThumbUpAltIcon/>}&nbsp;&nbsp;
                                    {likes}
                                </Button>
                                {/* Divider 组件 */}
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#424242' }} />
                                <Button sx={{ backgroundColor: '#212121', color: 'white', padding: '5px 10px', borderRadius: '0 25px 25px 0' }} onClick={() => handleRightButtonClick(1)}>
                                    {rightButtons[1] === -1 ? <ThumbDownOffAltOutlinedIcon/> : <ThumbDownAltIcon/>}
                                </Button>
                            </Box>
                            <Button sx={{ backgroundColor: '#212121', color: 'white', padding: '5px 10px', borderRadius: '25px' }} onClick={() => handleRightButtonClick(2)}>
                                {rightButtons[2] === -1 ? <BookmarkBorderIcon/> : <BookmarkOutlinedIcon/>}&nbsp;
                                保存
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ marginLeft: '7.5%', marginTop: '1%', width: '63%' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        1000条评论
                    </Typography>
                    {/* 添加评论 */}
                    <CommentInput videoId={videoId} userName={userName}  callback={addCommentCallback}/>
                </Box>

            {/*  评论列表  */}
                <Stack spacing={5}  sx={{marginLeft: '7.5%', marginTop: '0.5%', width: '63%'}}>
                    {comments && comments.map((comment) => (
                        <CommentItem avatar={comment.avatar} userName={comment.userName} content={comment.content}/>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}