/**
 * 登录框组件
 */
import {styled} from '@mui/material'
import {Box} from '@mui/material'

//使用styled创建自定义的Box，LoginBox
const LoginBox = styled(Box)(({theme})=>({
    display: 'flex',        // 启用弹性布局
    position: 'absolute',    // 使用绝对定位
    top: '20vh',             // 距离顶部 20% 的位置，即 3/5 高度
    left: '38vw',            //距离左边38%位置
    flexDirection: 'column', // 垂直排列子元素
    justifyContent: 'center', // 垂直居中
    alignItems: 'center',    // 水平居中
    height: '40vh',         // 父容器高度
    padding: theme.spacing(5),        //内边距
    gap: theme.spacing(4),             // 子元素之间的间距
    backgroundColor: theme.palette.background.paper, // 背景颜色
    width: '40%',           // 容器宽度
    maxWidth: theme.spacing(100),       // 限制最大宽度
    margin: '0 auto',        // 水平居中
    borderRadius: theme.spacing(2.5)    //圆角
}));
export default LoginBox