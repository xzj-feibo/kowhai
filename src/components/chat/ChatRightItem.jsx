import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme";

export default function ChatRightItem({avatar, message, time}) {
    function formatTime(isoTime) {
        // 截取时间字符串，确保 Date 对象能正确解析
        const fixedIsoTime = isoTime.replace(/\.\d+Z$/, match => match.slice(0, 4) + 'Z');
        const date = new Date(fixedIsoTime);
        const now = new Date();

        if (isNaN(date.getTime())) {
            throw new Error("Invalid Date Format");
        }

        const isToday = date.toDateString() === now.toDateString();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        if (isToday) {
            return `${hours}:${minutes} ${period}`;
        } else {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            return `${hours}:${minutes} ${period} ${day}, ${month}`;
        }
    }

    const time1 = "2025-02-03T23:19:56.12278Z";
    console.log(formatTime(time1));

    const time2 = "2025-01-01T09:15:20.000Z";
    console.log(formatTime(time2));

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
                    backgroundColor: theme.palette.secondary.light,
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
                    {formatTime(time)}
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
