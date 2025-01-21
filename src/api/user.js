import axios from "axios";

// 设置全局请求拦截器
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token; // 设置 Authorization 头部
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const backAddress = process.env.REACT_APP_LOCAL_BACK_ADDRESS
// 获取用户数据
export const getUserData = async () => {
    try {
        const response = await axios.get(`${backAddress}/v1/users`);  // 发起 GET 请求到 '/v1/users' 端点
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
        const response = await axios.post(`${backAddress}/user/create`, userData);
        return [response.status,response.data.message]
    }catch (error) {
        if (error.response.status !== 200){
            return [error.response.status, error.response.data.error]
        }
    }
}

//根据名字查询用户
export const getUserByName = async (name) => {
    try {
        const response = await axios.get(`${backAddress}/v1/user/getbyname`, {params: {name:name}});
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
        const response = await axios.post(`${backAddress}/user/login`, userData);
        var token = "Bearer " + response.data.token;
        return [response.status,response.data.message,token]
    }catch (error){
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.details]
        }
    }
}

//上传用户头像
export const uploadAvatar = async (id, file) => {
    if (!file) {
        throw new Error('No file provided for upload');
    }
    var formData = new FormData();
    formData.append('id', id);
    formData.append('avatar', file);
    try {
        const response = await axios.patch(`${backAddress}/user/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 指定上传类型
            },
        });
        return response.data; // 返回响应数据
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error; // 如果发生错误抛出
    }
};