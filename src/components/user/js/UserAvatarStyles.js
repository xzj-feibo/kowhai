// 外层Box，styled(Box)返回一个函数
import {Avatar, Box, styled} from "@mui/material";
import {deepOrange} from "@mui/material/colors";

export const StyledBox = styled(Box)(({ size }) => ({
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
}));
// 光圈
export const LightRing = styled(Box)({
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
});

// 黑色背景
export const Background = styled(Box)(({ size }) => ({
    width: `${size - 4}px`,
    height: `${size - 4}px`,
    borderRadius: '50%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
}));

// 头像
export const StyledAvatar = styled(Avatar)(({ avatarSize }) => ({
    backgroundColor: deepOrange[500],
    width: `${avatarSize}px`,
    height: `${avatarSize}px`,
    zIndex: 2,
}));