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


//格式化时间
 export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    // 获取当前日期的年月日 (使用UTC)
    const today = new Date();
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    // 获取当前年份和日期，判断是否是今天
    const todayYear = today.getUTCFullYear();
    const todayMonth = today.getUTCMonth();
    const todayDay = today.getUTCDate();

    // 获取时间部分 (使用UTC)
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // AM/PM 转换
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    // 判断是否是今天
    const isToday = date.getUTCDate() === todayDay && date.getUTCMonth() === todayMonth && date.getUTCFullYear() === todayYear;

    // 返回格式化的日期时间
    let formattedDateTime = `${hours}:${minutes} ${period}`;

    // 如果不是今天，则加上日期
    if (!isToday) {
        formattedDateTime = `${month}-${day} ${formattedDateTime}`;
    }

    // 如果不是今年，则加上年份
    if (year !== todayYear) {
        formattedDateTime = `${year} ${formattedDateTime}`;
    }

    return formattedDateTime;
}