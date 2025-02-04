import {Avatar, Box, Typography} from "@mui/material";
import React from "react";
import theme from "../../theme";
import {formatDateTime} from "../../api/chat";

export default function ChatLeftItem({avatar, message, time}) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '2%',
                position: 'relative',
                marginLeft: '40px'
            }}
        >
            {/* 用户头像 */}
            <Box sx={{ marginRight: '1%'}}>
                <Avatar sx={{position: 'absolute',
                    top: 0,
                    left: '-40px',}} src={avatar}
                />
            </Box>

            {/* 消息气泡 */}
            <Box
                sx={{
                    maxWidth: '55%',
                    backgroundColor: 'white',
                    color: '#000',
                    padding: '8px 12px',
                    borderRadius: '15px',
                    borderTopLeftRadius: '2px',
                    position: 'relative',
                }}
            >
                <Typography variant="body1">
                    {message}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', fontSize: '10px', marginTop: '4px' }}>
                    {formatDateTime(time)}
                </Typography>
            </Box>
        </Box>
    )
}