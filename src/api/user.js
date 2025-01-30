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
        const data = response.data;
        return [response.status, data.msg, data.data]
    } catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
};

//创建用户、注册
export const createUser = async (userData) => {
    try{
        const response = await axios.post(`${backAddress}/user/create`, userData);
        const data = response.data;
        return [response.status,data.msg]
    }catch (error) {
        if (error.response.status !== 200){
            return [error.response.status, error.response.data.err]
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
            return [error.response.status,error.response.data.err]
        }
    }
}

//登录
export const login = async (userData) => {
    try {
        const response = await axios.post(`${backAddress}/user/login`, userData);
        const data = response.data;
        const token = "Bearer " + data.data.token;
        return [response.status,data.msg,token,data.data.user]
    }catch (error){
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
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
        const data = response.data;
        return [response.status,data.msg,data.data]; // 返回响应数据
    } catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
};

//查询用户订阅
export const getSubscriptions = async (userId) => {
    try {
        debugger;
        const response = await axios.get(`${backAddress}/v1/subscribe`, {params:{user_id:userId}});
        const data = response.data;
        return [response.status,data.msg,data.data]; // 返回响应数据
    }catch (error){
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}