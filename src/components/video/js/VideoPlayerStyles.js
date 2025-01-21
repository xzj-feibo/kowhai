import {Box, Slider, styled} from "@mui/material";
import theme from "../../../theme";

export const StyledVideo = styled('video')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '25px',
    zIndex: 1,
    cursor: 'pointer'
})

export const ProcessBar = styled(Box)(({progressBarWidth}) => ({
    position: 'absolute',
    bottom: '70px',
    left: '50%',
    width: progressBarWidth,
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
    top: '5px'
}))

export const LoadedProgress = styled(Box)(({loadedProgress}) => ({
    width: `${loadedProgress}%`,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
}))

export const Progress = styled(Box)(({progress}) => ({
    width: `${progress}%`,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    top: 0,
    left: 0
}))

export const Dot = styled(Box)(({progress}) => ({
    position: 'absolute',
    top: '-5px',
    left: `${progress}%`,
    width: '12px',
    height: '12px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    transform: 'translateX(-50%)',
    zIndex: 4
}))

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
    '& .MuiSlider-thumb': {
        width: 12,
        height: 12,
    }
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