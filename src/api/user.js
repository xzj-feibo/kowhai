import axios from "axios";

// 获取用户数据
export const getUserData = async () => {
    try {
        const response = await axios.get("/v1/users");  // 发起 GET 请求到 '/v1/users' 端点
        return response.data.users;  // 返回响应中的数据
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;  // 抛出错误以便调用者处理错误
    }
};

//创建用户
export const createUser = async (userData) => {
    try{
        const response = await axios.post("/v1/user/create", userData);
        return response.data
    }catch (error) {
        console.error('Error creating user:', error);  // 打印错误信息
        throw error;  // 抛出错误，供调用者处理
    }
}

//根据名字查询用户
export const getUserByName = async (name) => {
    try {
        const response = await axios.get("/v1/user/getbyname", {params: {name:name}});
        return response.data
    }catch (error) {
        console.error('Error getting user by name:', error);  // 打印错误信息
        throw error;  // 抛出错误，供调用者处理
    }
}