/**
 * 系统的主题文件，定义主题色，字体家族、字号等
 */
import {createTheme} from "@mui/material";

const theme = createTheme(
    {
        //调色板
        palette: {
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
            background:{
                paper: 'rgba(255,255,255,0.94)'
            }
        },
        //排版
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
            borderRadius: 8,
        },
    }
)

export default theme;