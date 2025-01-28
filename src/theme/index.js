/**
 * 系统的主题文件，定义主题色，字体家族、字号等
 */
import {createTheme} from "@mui/material";

const theme = createTheme(
    {
        //调色板
        palette: {
            // //文本
            // text: {
            //     primary: 'white'
            // },
            // //背景
            // background: {
            //     default: 'black'
            // },
            primary: {                  //主色
                main: '#4285F4', // Google Blue
                light: '#82B1FF',
                dark: '#3367D6',
            },
            secondary: {
                main: '#64B5F6',      // lighter blue, still complementary to Google Blue
                light: '#BBDEFB',     // very light blue
                dark: '#1E88E5'       // darker blue with a hint of greenish tone, balancing the Google Blue
            }
        },
        //排版
        typography: {
            loginRegisterTopicFont: 'Roboto, Arial, sans-serif',
        },
        //间距
        spacing: 4,
        shape: {
            borderRadius: 8,
        },
    }
)

export default theme;