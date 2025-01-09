import {Box} from "@mui/material";

/**
 * 视频播放器组件
 */
export default function VideoPlayer({src, controls}) {
    return (
        <Box sx={{
            maxWidth: '60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 3,
            height: 200,
            borderColor: 'primary.main',
            color: 'text.secondary'
        }}>
            <video width="100%" controls={controls}>
                <source src={src} type="video/mp4"/>
            </video>
        </Box>
    );
}