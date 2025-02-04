import axios from "axios";

let socket = null;
let onMessageCallback = null;

/**
 * 连接 WebSocket
 * @param {string} baseUrl WebSocket 基础地址
 * @param {Object} params 额外的 URL 参数
 */
export const connectWebSocket = (baseUrl, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${baseUrl}?${queryParams}`;

    socket = new WebSocket(url);

    socket.onopen = () => {
        console.log(`Connected to WebSocket: ${url}`);
    };

    socket.onmessage = (event) => {
        if (onMessageCallback) {
            const message = JSON.parse(event.data);
            onMessageCallback(message);
        }
    };

    socket.onclose = () => {
        console.log('WebSocket closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};

//发送消息
export const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not connected');
    }
};

//接收消息
export const onMessage = (callback) => {
    onMessageCallback = callback;
};

//关闭连接
export const disconnectWebSocket = () => {
    if (socket) {
        socket.close();
    }
};

const backAddress = process.env.REACT_APP_LOCAL_BACK_ADDRESS
//查询历史消息
export const getHistoryMessages = async (senderId, receiverId) => {
    try {
        const response = await axios.get(`${backAddress}/v1/message`, {params:{sender_id: senderId, receiver_id: receiverId}});
        return response.data; // 返回响应数据
    }catch (error){
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}
