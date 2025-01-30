/**
 * 登录页
 */
import React, {useState} from 'react';
import {Snackbar, Alert, Box, styled} from '@mui/material';
import {useNavigate} from "react-router-dom"
import LoginBox from "../../components/login/LoginBox";
import theme from "../../theme";
import {login} from "../../api/user";
import {StyledButton, StyledLink, StyledTextField} from "./loginStyles";
import NoticeBar from "../../components/util/NoticeBar";

export default function Login() {
    // 使用 useState 来管理输入框的状态
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //提示框相关状态
    const [openSnackbar, setOpenSnackbar] = useState(false); // 控制 Snackbar 是否打开
    const [snackbarMessage, setSnackbarMessage] = useState(''); // 提示框的内容
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // 提示框的类型（error, success, warning, info）
    // 构造 userData 对象
    const userData = { user_name: username, password: password };
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
                debugger;
                localStorage.setItem("token", data[2])
                localStorage.setItem("userId", data[3].id)
                localStorage.setItem("avatar", data[3].avatar)
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

    return (
        <Box>
            <LoginBox>
                <h2 style={{fontFamily: theme.typography.loginRegisterTopicFont}}>Login to Kowhai</h2>
                {/* 用户名输入框 */}
                <StyledTextField id="username"
                           label="Username"
                           variant="outlined"
                           required
                           fullWidth
                           value={username} // 绑定输入框的值
                           onChange={(e) => setUsername(e.target.value)} // 更新用户名的状态
                           onKeyDown={(event) => handleLogin(event, 1)} // 监听键盘按下事件
                           />

                {/* 密码输入框 */}
                <StyledTextField id="password"
                           label="Password"
                           type="password"
                           variant="outlined"
                           required
                           fullWidth
                           value={password} // 绑定密码输入框的值
                           onChange={(e) => setPassword(e.target.value)} // 更新密码的状态
                           onKeyDown={(event) => handleLogin(event,1)} // 监听键盘按下事件
                           />

                {/* 登录按钮 */}
                <StyledButton
                    variant="contained"
                    fullWidth
                    onClick={(event) => handleLogin(event,0)}
                >
                    Login
                </StyledButton>

                {/* 第三方登录按钮 */}
                <StyledButton variant="outlined"
                    fullWidth
                    onClick={()=>{navigate('/login3');}}
                >
                    Login with Google
                </StyledButton>

                {/*注册链接*/}
                <StyledLink
                    to="/register"
                    onMouseEnter={e => e.target.style.color = theme.palette.secondary.main}
                    onMouseLeave={e => e.target.style.color = theme.palette.primary.main}
                >
                    without an account?
                </StyledLink>
            </LoginBox>
            <NoticeBar openSnackbar={openSnackbar} handleCloseSnackbar={() => setOpenSnackbar(false)} snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage}/>
        </Box>
    );
}
