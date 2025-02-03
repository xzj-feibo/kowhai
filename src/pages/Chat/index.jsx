import {
    Avatar,
    Box,
    Drawer, IconButton,
    InputAdornment,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    Typography
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import EmojiPicker from "emoji-picker-react";
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import theme from "../../theme";
import {getSubscriptions} from "../../api/user";
import ChatLeftItem from "../../components/chat/ChatLeftItem";
import ChatRightItem from "../../components/chat/ChatRightItem";
import ChatBarLayout from "../../layout/ChatBarLayout";

export default function Chat() {
    //已经订阅的好友
    const [subScribedFriends, setSubScribedFriends] = useState([]);
    //当前聊天的好友信息
    const [currentChattingFriend, setCurrentChattingFriend] = useState(null);
    //与当前好友的聊天数据
    const [chatData, setChatData] = useState([]);
    //当前写的消息
    const [text, setText] = useState("");
    //打开Emoji输入
    const emojiRef = useRef(null);

    //获取订阅数据
    const fetchSubscriptions = async (userId) => {
        return await getSubscriptions(userId);
    }

    useEffect(()=>{
        fetchSubscriptions(localStorage.getItem("userId")).then((data) => {
            setSubScribedFriends(data[2]);
        });

    },[currentChattingFriend])

    //切换聊天好友
    function toggleFriend(index) {
        setCurrentChattingFriend(subScribedFriends[index])
    }
    //切换打开Emoji
    function toggleEmoji() {
        const emojiElement = emojiRef.current;
        if (emojiElement.style.display === 'none'){
            emojiElement.style.display = 'block';
        }else{
            emojiElement.style.display = 'none';
        }
    }

    return (
        <Box>
            <ChatBarLayout/>
            {/*侧边栏*/}
            <Drawer variant="permanent" sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: '15%',
                    boxSizing: 'border-box',
                    backgroundColor: 'black',
                    borderColor: 'gray',
                    color: 'white'
                },
            }}
                    PaperProps={{
                        sx: {
                            top: '50px',
                            width: '15%',
                            boxSizing: 'border-box',
                            backgroundColor: 'black',
                            color: 'white',
                        }
                    }}>
                <Box padding="1%">
                    <List>
                        {subScribedFriends && subScribedFriends.map((friend, index) => (
                            <ListItem sx={{display: 'flex', alignItems: 'center'}}>
                                <ListItemButton sx={{borderRadius: '10px'}} onClick={()=>toggleFriend(index)}>
                                    <Avatar src={friend.avatar}/>
                                    <Typography variant='p' fontWeight='bold' sx={{position:'relative', left: '15%'}}>{friend.user_name}</Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ width: '85%', marginLeft:'15%',marginTop:'80px', height: '100vh', backgroundColor: 'black', display: 'flex', flexDirection: 'column' }}>
                {/* 聊天界面 */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '10px',height: '50px', width:'100%' }}>
                    {/*聊天项*/}
                    <ChatLeftItem/>
                    <ChatRightItem/>
                    <ChatLeftItem/>
                    <ChatRightItem/>
                    <ChatLeftItem/>
                    <ChatRightItem/>
                    <ChatLeftItem/>
                    <ChatRightItem/>
                    <ChatLeftItem/>
                    <ChatRightItem/>
                </Box>

                {/* 输入框 */}
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '0',
                        width: '85%',
                        height: '70px',
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid white',
                            borderRadius: '60px',
                            paddingLeft: '15px',
                            width: '60%',
                            height: '50%',
                        }}
                    >
                        <InputBase
                            sx={{ color: 'white', width: '100%' }}
                            placeholder="输入..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SendIcon sx={{ color: theme.palette.primary.main }} />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>
                    <IconButton onClick={toggleEmoji}>
                        <InsertEmoticonIcon sx={{color:'white'}} fontSize='large'/>
                    </IconButton>
                    <Box sx={{display:'none',position:'relative', width: '150px', height: '50px',zIndex:2,bottom: '400px'}} ref={emojiRef}>
                        <EmojiPicker theme='dark' lazyLoadEmojis onEmojiClick={(emojiObject) => setText(text + emojiObject.emoji)}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}