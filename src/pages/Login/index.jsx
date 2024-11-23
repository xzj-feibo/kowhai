import React from 'react';
import {TextField, Button, Link} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoginBox from "../../components/LoginBox";

export default function Login() {
    const theme = useTheme();

    return (
        <LoginBox>
            <h2>Login to Kowhai</h2>

            {/* 用户名输入框 */}
            <TextField id="username" label="Username" variant="outlined" required fullWidth sx={{
                '& .MuiOutlinedInput-root': { // 定位到 OutlinedInput
                    '&:hover fieldset': {      // 修改悬浮时的边框颜色
                        borderColor: theme.palette.primary.light,
                    },
                },
            }}/>

            {/* 密码输入框 */}
            <TextField id="password" label="Password" type="password" variant="outlined" required fullWidth sx={{
                '& .MuiOutlinedInput-root': { // 定位到 OutlinedInput
                    '&:hover fieldset': {      // 修改悬浮时的边框颜色
                        borderColor: theme.palette.primary.light,
                    },
                },
            }}/>

            {/* 登录按钮 */}
            <Button variant="contained" color="primary" fullWidth sx={{
                height: '45px',
                color: 'white',
                '&:hover': {backgroundColor: theme.palette.primary.main}
            }}>
                Login
            </Button>

            {/* 第三方登录按钮 */}
            <Button variant="outlined" fullWidth sx={{height: '45px',color:theme.palette.primary.dark}}>
                Login with Google
            </Button>

            {/*注册链接*/}
            <Link href="#" underline="hover" sx={{
                alignSelf: 'flex-end', // 右对齐
                marginTop: 'auto', // 将链接推到容器底部
                marginRight: '10px', // 设置右侧间距
            }}>
                {'without an account?'}
            </Link>
        </LoginBox>
    );
}
