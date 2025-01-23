import {Button, keyframes, styled, TextField} from "@mui/material";
import theme from "../../theme";
import {Link} from "react-router-dom";

export const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': { // 定位到 OutlinedInput
        '&:hover fieldset': {      // 修改悬浮时的边框颜色
            borderColor: theme.palette.primary.light
        }
    }
});

export const StyledButton = styled(Button)({
    height: '40px',
    width: '70%',
    color:'black',
    borderRadius: '50px',        // 设置圆角为50px，使按钮的左右两边为半圆
    paddingLeft: '30px',         // 调整左右内边距，使按钮内容不会太贴边
    paddingRight: '30px',
    transition: 'transform 0.3s ease', // 使用 transition 平滑过渡
    '&:hover':{
        transform: 'scale(1.08)', // 鼠标悬浮时放大 10%
    }
})

export const StyledLink = styled(Link)({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 'bold'
})