import {Box, Button, styled, TextField} from "@mui/material";
import theme from "../../theme";

export const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
    },
    marginBottom: '16px'
})

export const TitleBox = styled(Box)({
    position: 'absolute',
    top: '40px', // 距离顶部20px，根据需要调整
    left: '50%',
    transform: 'translateX(-50%)', // 水平居中
    zIndex: 1 // 确保它显示在其他内容的上方
})

export const StyledButton = styled(Button)({
    borderRadius: '50px',        // 设置圆角为50px，使按钮的左右两边为半圆
    paddingLeft: '30px',         // 调整左右内边距，使按钮内容不会太贴边
    paddingRight: '30px',
    marginTop: '40px'
})