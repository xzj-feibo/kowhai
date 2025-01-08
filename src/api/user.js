import axios from "axios";

// 获取用户数据的接口函数
export const getUserData = async () => {
    try {
        const response = await axios.get("/v1/users");  // 发起 GET 请求到 '/v1/users' 端点
        return response.data.users;  // 返回响应中的数据
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;  // 抛出错误以便调用者处理错误
    }
};