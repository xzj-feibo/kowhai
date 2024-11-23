// /**
//  * 用户头像组件
//  */
import { Avatar, Box } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export default function UserAvatar({ size = 108, avatarSize = 90, src = '', children = 'N' }) {
    const ringSize = size;
    const innerSize = ringSize - 8; // 光圈厚度为 8px

    return (
        <Box sx={{
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        }}>
            {/* 光圈 */}
            <Box sx={{
                background: 'conic-gradient(from 210deg, #feda75, #fa7e1e, #d62976, #962fbf, #fa7e1e, #feda75)',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                zIndex: 0,
                animation: 'rotate 3s linear infinite',
                '@keyframes rotate': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
            }} />
            {/* 黑色背景和头像 */}
            <Box sx={{
                width: `${innerSize}px`,
                height: `${innerSize}px`,
                borderRadius: '50%',
                background: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
            }}>
                <Avatar sx={{ bgcolor: deepOrange[500], width: `${avatarSize}px`, height: `${avatarSize}px`, zIndex: 2 }} src={src}>
                    {children}
                </Avatar>
            </Box>
        </Box>
    );
}
