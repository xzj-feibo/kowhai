import {Avatar, Box, IconButton, Stack, Typography} from "@mui/material";
import theme from "../../theme";
import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function CommentItem({avatar, userName, content}) {
    return (
        <Box>
            {/*头像，名字，回复时间*/}
            <Stack direction='row' spacing={2} sx={{width: '100%'}}>
                <Avatar src={avatar}/>
                <Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography variant='p'>@{userName}</Typography>
                        <Typography variant='p' sx={{color: theme.palette.primary.main}}>2024.04.21</Typography>
                    </Stack>
                    <Stack direction='row'>
                        <Typography variant='p' sx={{width: '1100px', overflow: 'hidden'}}>
                            {content}
                        </Typography>
                        <Box>
                            <IconButton>
                                <FavoriteBorderIcon sx={{color: 'white'}}/>
                            </IconButton>
                            <Typography variant='p'>100</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}