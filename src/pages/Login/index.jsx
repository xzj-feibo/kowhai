import React, {useState} from 'react';
import {TextField, Button, Snackbar, Alert} from '@mui/material';
import {Link, useNavigate} from "react-router-dom"
import LoginBox from "../../components/login/LoginBox";
import {ThemeProvider} from "@mui/material";
import theme from "../../theme";
import {login} from "../../api/user";

export default function Login() {
    // 使用 useState 来管理输入框的状态
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //提示框相关状态
    const [openSnackbar, setOpenSnackbar] = useState(false); // 控制 Snackbar 是否打开
    const [snackbarMessage, setSnackbarMessage] = useState(''); // 提示框的内容
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // 提示框的类型（error, success, warning, info）
    // 构造 userData 对象
    const userData = { name: username, password: password };
    const navigate = useNavigate(); // 获取 navigate 函数

    //处理登录
    const handleLogin = async (event, flag) => {
        //是否点击了登录或回车
        let b = false;
        if (flag === 0){
            b = true
        }else{
            if (event.key === 'Enter') {
                b = true
            }
        }
        if (b){
            const data = await login(userData);
            if (data[0] === 200){
                setSnackbarMessage(data[1]);
                setSnackbarSeverity('success');
                setOpenSnackbar(true);

                // 使用 setTimeout 延迟跳转，确保 Snackbar 显示后再跳转
                setTimeout(() => {
                    navigate('/');
                }, 2000); // 2000 毫秒（即 2 秒）后跳转
            }else{
                // 如果登录失败，设置错误提示框
                setSnackbarMessage(data[1]);
                setSnackbarSeverity('error'); // 错误类型
                setOpenSnackbar(true); // 打开提示框
            }
        }
    }

    // 关闭提示框
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    return (
        <ThemeProvider theme={theme}>
            <LoginBox>
                <h2 style={{fontFamily: theme.typography.loginRegisterTopicFont}}>Login to Kowhai</h2>
                {/* 用户名输入框 */}
                <TextField id="username"
                           label="Username"
                           variant="outlined"
                           required
                           fullWidth
                           value={username} // 绑定输入框的值
                           onChange={(e) => setUsername(e.target.value)} // 更新用户名的状态
                           onKeyDown={(event) => handleLogin(event, 1)} // 监听键盘按下事件
                           sx={{
                    '& .MuiOutlinedInput-root': { // 定位到 OutlinedInput
                        '&:hover fieldset': {      // 修改悬浮时的边框颜色
                            borderColor: theme.palette.primary.light,
                        },
                    },
                }}/>

                {/* 密码输入框 */}
                <TextField id="password"
                           label="Password"
                           type="password"
                           variant="outlined"
                           required
                           fullWidth
                           value={password} // 绑定密码输入框的值
                           onChange={(e) => setPassword(e.target.value)} // 更新密码的状态
                           onKeyDown={(event) => handleLogin(event,1)} // 监听键盘按下事件
                           sx={{
                    '& .MuiOutlinedInput-root': { // 定位到 OutlinedInput
                        '&:hover fieldset': {      // 修改悬浮时的边框颜色
                            borderColor: theme.palette.primary.light,
                        },
                    },
                }}/>

                {/* 登录按钮 */}
                <Button variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                        height: '45px',
                        color: 'white',
                        '&:hover': {backgroundColor: theme.palette.primary.main},
                        borderRadius: '50px',        // 设置圆角为50px，使按钮的左右两边为半圆
                        paddingLeft: '30px',         // 调整左右内边距，使按钮内容不会太贴边
                        paddingRight: '30px',
                    }}
                        onClick={(event) => handleLogin(event,0)}
                >
                    Login
                </Button>

                {/* 第三方登录按钮 */}
                <Button variant="outlined" fullWidth sx={{
                    height: '45px',
                    color:theme.palette.primary.dark,
                    borderRadius: '50px',        // 设置圆角为50px，使按钮的左右两边为半圆
                    paddingLeft: '30px',         // 调整左右内边距，使按钮内容不会太贴边
                    paddingRight: '30px',
                }}
                    onClick={()=>{navigate('/login3');}}>
                    Login with Google
                </Button>

                {/*注册链接*/}
                <Link
                    to="/register"
                    style={{
                        color: theme.palette.primary.main,
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                    onMouseEnter={e => e.target.style.color = theme.palette.primary.main}
                    onMouseLeave={e => e.target.style.color = theme.palette.secondary.main}
                >
                    without an account?
                </Link>
            </LoginBox>
            {/* Snackbar提示框 */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // 顶部居中显示
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
