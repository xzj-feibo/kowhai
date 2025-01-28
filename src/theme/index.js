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
                main: '#0bde4e',        //主强度
                light: '#0df557',       //轻
                dark: '#06c242'         //深
            },
            secondary: {
                main: '#87CEEB',      // skyblue
                light: '#A3D8F5',     // lighter skyblue
                dark: '#5A9BB3'       // darker skyblue
            },
        },
        //排版
        typography: {
            loginRegisterTopicFont: 'JosefinSans, sans-serif',
        },
        //间距
        spacing: 4,
        shape: {
            borderRadius: 8,
        },
    }
)

export default theme;