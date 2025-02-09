import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme";
import {formatDateTime} from "../../api/chat";

export default function ChatRightItem({avatar, message, time}) {
    return (
    <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                marginBottom: '2%',
                marginRight: '40px',
                position: 'relative',
            }}
        >
            {/* 消息气泡 */}
            <Box
                sx={{
                    maxWidth: '55%',
                    backgroundColor: theme.palette.primary.main,
                    color: '#000',
                    padding: '8px 12px',
                    borderRadius: '15px',
                    borderTopRightRadius: '2px',
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

            {/* 用户头像 */}
            <Box sx={{ marginLeft: '1%', position: 'relative' }}>
                <Avatar
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: '-40px',
                    }}
                    src={avatar}
                />
            </Box>
        </Box>
    )
}
