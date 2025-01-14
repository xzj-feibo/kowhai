import React, { useState } from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Slide,
    IconButton,
    ThemeProvider,
    Box,
    Avatar
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from "../../theme";
import RegisterBox from "../../components/register/RegisterBox";
import BirthdayInput from "../../components/user/BirthdayInput";
import {useNavigate} from "react-router-dom";
import {createUser} from "../../api/user";

export default function Register() {
    const [user, setUser] = useState({
        name: '', gender: '', birth: '', password: '', email: '', phone: '', avatar: ''
    });
    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Personal Information", "Gender & Avatar", "Birthday"];
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

    const handleRegister = async () => {
        var flag = await createUser(user);
        if (flag === 200) {
            navigate('/login')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <RegisterBox>
                <Box sx={{
                    position: 'absolute',
                    top: '40px', // 距离顶部20px，根据需要调整
                    left: '50%',
                    transform: 'translateX(-50%)', // 水平居中
                    zIndex: 1 // 确保它显示在其他内容的上方
                }}>
                    <h2>Register an account</h2>
                </Box>

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
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            required
                            fullWidth
                            value={user.name}
                            onChange={(e) => setUser(prevState => ({ ...prevState, name: e.target.value }))}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.light,
                                    },
                                },
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            required
                            fullWidth
                            value={user.password}
                            onChange={(e) => setUser(prevState => ({ ...prevState, password: e.target.value }))}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.light,
                                    },
                                },
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            required
                            fullWidth
                            value={user.email}
                            onChange={(e) => setUser(prevState => ({ ...prevState, email: e.target.value }))}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.light,
                                    },
                                },
                                marginBottom: '16px'
                            }}
                        />
                        <TextField
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            required
                            fullWidth
                            value={user.phone}
                            onChange={(e) => setUser(prevState => ({ ...prevState, phone: e.target.value }))}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.light,
                                    },
                                },
                                marginBottom: '16px'
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="contained" onClick={handleNext} sx={{
                                borderRadius: '50px',        // 设置圆角为50px，使按钮的左右两边为半圆
                                paddingLeft: '30px',         // 调整左右内边距，使按钮内容不会太贴边
                                paddingRight: '30px',
                                marginTop: '40px',
                                marginRight: '50px'
                            }}>Next</Button>

                            <Button variant="contained" sx={{
                                borderRadius: '50px',
                                paddingLeft: '30px',
                                paddingRight: '30px',
                                marginTop: '40px'
                            }} onClick={handleBackToLogin}>Back to Login</Button>
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

                        {/* Avatar Upload */}
                        <Box sx={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                            <FormControl sx={{marginRight: '100px'}}>
                                <FormLabel>Avatar</FormLabel>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="avatar-upload"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setUser(prevState => ({ ...prevState, avatar: URL.createObjectURL(file) }));
                                        }
                                    }}
                                />
                                <label htmlFor="avatar-upload">
                                    <Button variant="outlined" component="span">
                                        Upload Avatar
                                    </Button>
                                </label>
                            </FormControl>

                            <Avatar
                                alt="Remy Sharp"
                                sx={{ width: 80, height: 80 }}
                                src={user.avatar || '/default-avatar.png'}
                            />
                        </Box>

                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton onClick={handleBack} sx={{ position: 'absolute', top: 16, left: 16 }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Button variant="contained" onClick={handleNext} sx={{
                                borderRadius: '50px',        // 设置圆角为50px，使按钮的左右两边为半圆
                                paddingLeft: '30px',         // 调整左右内边距，使按钮内容不会太贴边
                                paddingRight: '30px',
                                marginTop: '100px'
                            }}>Next</Button>
                        </Box>
                    </div>
                </Slide>

                <Slide direction="left" in={activeStep === 2} mountOnEnter unmountOnExit>
                    <div>
                        {/* Step 3: Birthday */}
                        <FormLabel sx={{marginBottom: '26px'}}>Birthday</FormLabel>
                        <BirthdayInput onChange={handleInputChange} onChange={(birthday) => handleInputChange({ birth: `${birthday.day}-${birthday.month}-${birthday.year}` })}/>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton onClick={handleBack} sx={{ position: 'absolute', top: 16, left: 16 }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Button variant="contained" sx={{
                                borderRadius: '50px',
                                paddingLeft: '30px',
                                paddingRight: '30px',
                                marginTop: '90px'
                            }} onClick={handleRegister}>Register</Button>
                        </Box>
                    </div>
                </Slide>

            </RegisterBox>
        </ThemeProvider>
    );
}
