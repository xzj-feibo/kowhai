import {Avatar, Box, Button, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import {addComment} from "../../api/comment";

export default function CommentInput({videoId, userName, callback}) {
    const [comment, setComment] = useState("");

    const handleChange = (event) => {
        setComment(event.target.value);  // 更新状态为 TextField 的内容
    };
    //添加评论
    const handleClickAddComment = () => {
        const commentData = {
            videoId: videoId+"",
            reviewerId: localStorage.getItem('userId'),
            userName: userName,
            content: comment
        }
        addComment(commentData).then(data => {
            console.log(data[2]);
            setComment("");
            callback()
        });
    }
    //取消评论
    const handleCancel = () => {
        setComment("");
    }
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2}>
                {/* 用户头像 */}
                <Avatar src={localStorage.getItem('avatar')} sx={{ height: '50px', width: '50px' }} />

                {/* 评论输入区域 */}
                <Stack spacing={1} sx={{ flex: 1 }}>
                    <TextField
                        id="comment-input"
                        placeholder="添加评论..."
                        variant="standard"
                        fullWidth
                        value={comment}  // 设置 TextField 的值为状态
                        onChange={handleChange}  // 监听内容变化
                        sx={{
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'white', // 聚焦状态的线条颜色
                            },
                            '& .MuiInputBase-input': {
                                color: 'white', // 输入文字颜色
                            },
                        }}
                    />
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button variant="contained" size="small" sx={{ mr: 1, backgroundColor: 'white', color:'black', borderRadius: '22px' }} onClick={handleClickAddComment}>
                                发布
                            </Button>
                            <Button size="small" sx={{color:'white', borderRadius: '22px'}} onClick={handleCancel}>取消</Button>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}