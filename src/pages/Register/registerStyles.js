import {Box, Button, styled, TextField} from "@mui/material";
import theme from "../../theme";

export const RegisterBox = styled(Box)(({theme})=>({
    display: 'flex',        // 启用弹性布局
    position: 'absolute',    // 使用绝对定位
    top: '20vh',             // 距离顶部 20% 的位置，即 3/5 高度
    left: '38vw',            //距离左边38%位置
    flexDirection: 'column', // 垂直排列子元素
    justifyContent: 'center', // 垂直居中
    alignItems: 'center',    // 水平居中
    height: '60vh',         // 父容器高度
    padding: theme.spacing(5),        //内边距
    gap: theme.spacing(4),             // 子元素之间的间距
    backgroundColor: theme.palette.background.paper, // 背景颜色
    width: '40%',           // 容器宽度
    maxWidth: theme.spacing(125),       // 限制最大宽度
    margin: '0 auto',        // 水平居中
    borderRadius: theme.spacing(2.5)     //圆角
}));

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
    marginTop: '40px',
    color: 'black',
    transition: 'transform 0.3s ease', // 使用 transition 平滑过渡
    '&:hover':{
        transform: 'scale(1.08)', // 鼠标悬浮时放大 10%
    }
})