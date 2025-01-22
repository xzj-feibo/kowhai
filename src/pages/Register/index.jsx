import React, { useState } from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stepper,
    Step,
    StepLabel,
    Slide,
    IconButton,
    Box,
    Snackbar, Alert
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from "../../theme";
import RegisterBox from "../../components/register/RegisterBox";
import BirthdayInput from "../../components/user/BirthdayInput";
import {useNavigate} from "react-router-dom";
import {createUser} from "../../api/user";
import {StyledButton, StyledTextField, TitleBox} from "./registerStyles";
import * as PropTypes from "prop-types";

TitleBox.propTypes = {children: PropTypes.node};
export default function Register() {
    //用户状态
    const [user, setUser] = useState({
        user_name: '', gender: '', birth: '', password: '', email: '', phone: ''
    });
    //提示框相关状态
    const [openSnackbar, setOpenSnackbar] = useState(false); // 控制 Snackbar 是否打开
    const [snackbarMessage, setSnackbarMessage] = useState(''); // 提示框的内容
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // 提示框的类型（error, success, warning, info）

    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Personal Information", "Gender", "Birthday"];
    const navigate = useNavigate(); // 获取 navigate 函数
    const handleInputChange = (newValues) => {
        setUser(prevState => ({ ...prevState, ...newValues }));
    };

    const handleNext = () => {
        setActiveStep(prevStep => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevStep => prevStep - 1);
    };

    const handleBackToLogin = () => {
        navigate('/login')
    }

    const handleRegister = async (event, flag) => {
        //是否点击了注册或回车
        let b = false;
        if (flag === 0){
            b = true
        }else{
            if (event.key === 'Enter') {
                b = true
            }
        }
        if (b){
            const data = await createUser(user);
            if (data[0] === 200){
                setSnackbarMessage(data[1]);
                setSnackbarSeverity('success');
                setOpenSnackbar(true);

                // 使用 setTimeout 延迟跳转，确保 Snackbar 显示后再跳转
                setTimeout(() => {
                    navigate('/login');
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
        <Box>
            <RegisterBox>
                <TitleBox>
                    <h2 style={{fontFamily: theme.typography.loginRegisterTopicFont}}>Register an account</h2>
                </TitleBox>

                <Stepper activeStep={activeStep} alternativeLabe sx={{marginBottom: "15px"}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Wrap the entire form in a Slide component to animate the whole form */}
                <Slide direction="left" in={activeStep === 0} mountOnEnter unmountOnExit>
                    <div>
                        {/* Step 1: Personal Information */}
                        <StyledTextField id="name"
                            label="Name"
                            variant="outlined"
                            required
                            fullWidth
                            value={user.user_name}
                            onChange={(e) => setUser(prevState => ({ ...prevState, name: e.target.value }))}
                        />
                        <StyledTextField id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            value={user.password}
                            onChange={(e) => setUser(prevState => ({ ...prevState, password: e.target.value }))}
                        />
                        <StyledTextField id="email"
                            label="Email"
                            variant="outlined"
                            required
                            fullWidth
                            value={user.email}
                            onChange={(e) => setUser(prevState => ({ ...prevState, email: e.target.value }))}
                        />
                        <StyledTextField id="phone"
                            label="Phone"
                            variant="outlined"
                            required
                            fullWidth
                            value={user.phone}
                            onChange={(e) => setUser(prevState => ({ ...prevState, phone: e.target.value }))}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StyledButton variant="contained" onClick={handleNext} sx={{
                                marginRight: '50px'
                            }}>Next</StyledButton>

                            <StyledButton variant="contained" sx={{
                                marginTop: '40px'
                            }} onClick={handleBackToLogin}>Back to Login</StyledButton>
                        </Box>
                    </div>
                </Slide>

                <Slide direction="left" in={activeStep === 1} mountOnEnter unmountOnExit>
                    <div>
                        {/* Step 2: Gender and Avatar */}
                        <FormControl sx={{ alignSelf: 'flex-start', marginBottom: '50px'}}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender"
                                value={user.gender}
                                onChange={(e) => setUser(prevState => ({ ...prevState, gender: e.target.value }))}
                                row
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>

                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton onClick={handleBack} sx={{ position: 'absolute', top: 16, left: 16 }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <StyledButton variant="contained" onClick={handleNext} sx={{
                                marginTop: '100px'
                            }}>Next</StyledButton>
                        </Box>
                    </div>
                </Slide>

                <Slide direction="left" in={activeStep === 2} mountOnEnter unmountOnExit>
                    <div>
                        {/* Step 3: Birthday */}
                        <FormLabel sx={{marginBottom: '26px', marginTop: '100px'}}>Birthday</FormLabel>
                        <BirthdayInput onChange={(birthday) => handleInputChange({ birth: `${birthday.day}-${birthday.month}-${birthday.year}` })} onKeyDown={(event) => {handleRegister(event, 1)}}/>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton onClick={handleBack} sx={{ position: 'absolute', top: 16, left: 16 }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <StyledButton variant="contained" sx={{
                                marginTop: '90px'
                            }} onClick={(event) => handleRegister(event, 0)}>Register</StyledButton>
                        </Box>
                    </div>
                </Slide>
            </RegisterBox>
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
        </Box>
    );
}