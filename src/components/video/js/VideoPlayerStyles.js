import {Box, Slider, styled} from "@mui/material";
import theme from "../../../theme";

export const StyledVideo = styled('video')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '15px',
    boxShadow: '0 0 200px 35px rgba(255,255,255,0.35)',
    zIndex: 1,
    cursor: 'pointer'
})

export const ProcessBar = styled(Box)(() => ({
    position: 'absolute',
    bottom: '70px',
    left: '50%',
    width: '95%',
    height: '15px',
    backgroundColor: 'transparent',
    borderRadius: '3px',
    zIndex: 3,
    cursor: 'pointer',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease-in-out'
}))

export const InProcessBar = styled(Box)(({progressBarHeight}) => ({
    width: '100%',
    height: progressBarHeight,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    zIndex:1
}))

export const LoadedProgress = styled(Box)(({loadedProgress}) => ({
    width: `${loadedProgress}%`,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex:2,
}))

export const StyledSlider = styled(Slider)(() => ({
    height: '3px',
    width: "100%",
    position: 'absolute',
    bottom: '-13px',
    zIndex: 3,
    '& .MuiSlider-thumb': {
        width: '15px', // 调整滑块大小
        height: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    '& .MuiSlider-rail': {
        backgroundColor: 'transparent', // 设置未滑动部分的颜色
    },
    '& .MuiSlider-track': {
        backgroundColor: theme.palette.primary.main, // 设置已滑动部分的颜色
    }
}));

export const PlayingBox = styled(Box)({
    position: 'absolute',
    bottom: '15px',
    left: '12px',
    zIndex: 4,
    display: 'flex',
    alignItems: 'center'
})

export const VolumeBox = styled(Box)(({sliderWidth}) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'width 0.3s ease',
    width: `${sliderWidth}px`,
}))

export const VolumeSlider = styled(Slider)({
    width: '150px',
    color: theme.palette.primary.main,
    height: '2px',
})

export const FullScreenBox = styled(Box)({
    position: 'absolute',
    bottom: '15px',
    right: '60px',
    zIndex: 4
})

export const PIPBox = styled(Box)({
    position: 'absolute',
    bottom: '15px',
    right: '20px',
    zIndex: 4
})