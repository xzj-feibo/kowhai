import axios from "axios";

// 获取用户数据
export const getUserData = async () => {
    try {
        const response = await axios.get("/v1/users");  // 发起 GET 请求到 '/v1/users' 端点
        return response.data.users;  // 返回响应中的数据
    } catch (error) {
        if (error.response.status !== 200){
            // 如果是500错误，设置错误信息
            alert(error.response.data.details);
        }
    }
};

//创建用户
export const createUser = async (userData) => {
    try{
        const response = await axios.post("/v1/user/create", userData);
        return response.status
    }catch (error) {
        if (error.response.status !== 200){
            // 如果是500错误，设置错误信息
            alert(error.response.data.details);
            return error.response.status
        }
    }
}

//根据名字查询用户
export const getUserByName = async (name) => {
    try {
        const response = await axios.get("/v1/user/getbyname", {params: {name:name}});
        return response.data
    }catch (error) {
        if (error.response.status !== 200){
            // 如果是500错误，设置错误信息
            alert(error.response.data.details);
        }
    }
}

//登录
export const login = async (userData) => {
    try {
        const response = await axios.post("/v1/user/login", userData);
        return response.status
    }catch (error){
        if (error.response.status !== 200){
            // 如果是500错误，设置错误信息
            alert(error.response.data.details);
            return error.response.status
        }
    }
}