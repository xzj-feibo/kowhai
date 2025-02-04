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
import {connectWebSocket, disconnectWebSocket, getHistoryMessages, onMessage, sendMessage} from "../../api/chat";

export default function Chat() {
    //已经订阅的好友
    const [subScribedFriends, setSubScribedFriends] = useState([]);
    //当前聊天的好友信息
    const [currentChattingFriend, setCurrentChattingFriend] = useState({avatar:"", user_name:""});
    //与当前好友的聊天数据
    const [messages, setMessages] = useState([]);
    //当前写的消息
    const [text, setText] = useState("");
    //打开Emoji输入
    const emojiRef = useRef(null);

    //获取订阅数据
    const fetchSubscriptions = async (userId) => {
        return await getSubscriptions(userId);
    }

    //获取历史消息
    const fetchHistoryMessages = async (senderId, receiverId) => {
        return await getHistoryMessages(senderId, receiverId);
    }
    useEffect(()=>{
        fetchSubscriptions(localStorage.getItem("userId")).then((data) => {
            setSubScribedFriends(data[2]);
        });

        fetchHistoryMessages(localStorage.getItem('userId'), currentChattingFriend.id+'').then((data)=>{
            setMessages(data);
        })
        // 连接 WebSocket
        connectWebSocket('ws://localhost:8082/ws', {user_id:localStorage.getItem('userId')});

        // 注册接收消息的回调
        onMessage((message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => disconnectWebSocket();
    },[currentChattingFriend])

    //发送消息
    const handleSendMessage = () => {
        if (text.trim()){
            const currentMessage = {
                sender_id: Number(localStorage.getItem('userId')),
                receiver_id: currentChattingFriend.id,
                content: text
            }
            //加上时间
            const curMessage = {
                sender_id: Number(localStorage.getItem('userId')),
                receiver_id: currentChattingFriend.id,
                content: text,
                created_at: new Date().toISOString()
            }
            sendMessage(currentMessage);
            setMessages((previewMessages) => [...(previewMessages || []), curMessage])
            setText('');
        }
    };

    //切换聊天好友
    function toggleFriend(index) {
        setCurrentChattingFriend(subScribedFriends[index])
    }

    //切换打开Emoji
    function toggleEmoji() {
        const emojiElement = emojiRef.current;

        // 确保初始状态是'none'
        if (emojiElement.style.display === '' || emojiElement.style.display === 'none') {
            emojiElement.style.display = 'block';
        } else {
            emojiElement.style.display = 'none';
        }
    }


    return (
        <Box>
            <ChatBarLayout currentFriendName={currentChattingFriend.user_name}/>
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

            <Box sx={{ width: '85%', marginLeft:'15%',marginTop:'60px', height: '100vh', backgroundColor: 'black', display: 'flex', flexDirection: 'column' }}>
                {/* 聊天界面 */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        padding: '10px',
                        height: '50px',
                        width: '100%',
                        backgroundImage: `url('/imgs/background.jpg')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed', // 保持背景图不随内容滚动
                        backgroundPosition: 'center',
                    }}
                >
                {/*聊天项*/}
                    {messages && messages.map((message) => (
                        message.sender_id === Number(localStorage.getItem('userId'))
                            ? <ChatRightItem avatar={localStorage.getItem('avatar')} message={message.content} time={message.created_at}/>
                            : <ChatLeftItem avatar={currentChattingFriend.avatar} message={message.content} time={message.created_at}/>
                    ))}
                </Box>

                {/* 输入框 */}
                {currentChattingFriend.user_name !== "" &&
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: '0',
                            width: '85%',
                            height: '70px',
                            backgroundColor: 'transparent',
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
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) { // 只在没有按 Shift 的情况下发送消息
                                        e.preventDefault(); // 防止默认行为（换行）
                                        handleSendMessage();
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSendMessage}>
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
                }
            </Box>
        </Box>
    )
}