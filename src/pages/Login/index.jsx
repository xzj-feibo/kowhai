import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import {Link, useNavigate} from "react-router-dom"
import LoginBox from "../../components/login/LoginBox";
import {ThemeProvider} from "@mui/material";
import theme from "../../theme";
import {login} from "../../api/user";

export default function Login() {
    // 使用 useState 来管理输入框的状态
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // 构造 userData 对象
    const userData = { name: username, password: password };
    const navigate = useNavigate(); // 获取 navigate 函数

    //处理登录
    const handleLogin = async () => {
        await login(userData);
        navigate('/');
    }
    return (
        <ThemeProvider theme={theme}>
            <LoginBox>
                <h2>Login to Kowhai</h2>

                {/* 用户名输入框 */}
                <TextField id="username"
                           label="Username"
                           variant="outlined"
                           required
                           fullWidth
                           value={username} // 绑定输入框的值
                           onChange={(e) => setUsername(e.target.value)} // 更新用户名的状态
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
                        '&:hover': {backgroundColor: theme.palette.primary.main}
                    }}
                        onClick={handleLogin}
                >
                </Button>

                {/* 第三方登录按钮 */}
                <Button variant="outlined" fullWidth sx={{height: '45px',color:theme.palette.primary.dark}}>
                    Login with Google
                </Button>

                {/*注册链接*/}
                <Link to="/register" sx={{
                    color: theme.palette.secondary,  // 设置颜色
                    textDecoration: 'none',  // 去除下划线
                    fontWeight: 'bold',  // 设置粗体
                    '&:hover': {
                        color: theme.palette.primary,  // hover 时改变颜色
                    },
                }}>
                    {'without an account?'}
                </Link>
            </LoginBox>
        </ThemeProvider>
    );
}
