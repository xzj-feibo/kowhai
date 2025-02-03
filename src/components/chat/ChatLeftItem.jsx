import {Avatar, Box, Typography} from "@mui/material";
import React from "react";
import theme from "../../theme";

export default function ChatLeftItem() {
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
                    left: '-40px',}} src={localStorage.getItem('avatar')}
                />
            </Box>

            {/* 消息气泡 */}
            <Box
                sx={{
                    maxWidth: '55%',
                    backgroundColor: theme.palette.primary.light,
                    color: '#000',
                    padding: '8px 12px',
                    borderRadius: '15px',
                    borderTopLeftRadius: '2px',
                    position: 'relative',
                }}
            >
                <Typography variant="body1">
                    This is a very long sample message to test the avatar positioning in the left-top corner of the message box. We need to ensure that the content can wrap gracefully without breaking the layout or misplacing the avatar.
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', fontSize: '10px', marginTop: '4px' }}>
                    10:45 AM
                </Typography>
            </Box>
        </Box>
    )
}