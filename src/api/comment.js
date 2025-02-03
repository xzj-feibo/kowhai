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
//查询视频评论数
export const getCommentSum = async (videoId) => {
    try {
        debugger;
        const response = await axios.get(`${backAddress}/v1/comment/total`, {params:{video_id:videoId}});
        const data  =response.data;
        return [response.status, data.msg, data.data];
    }catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}

//查询所有评论
export const getComments = async (videoId) => {
    try {
        const response = await axios.get(`${backAddress}/v1/comment/list`, {params:{video_id:videoId}});
        const data  =response.data;
        return [response.status, data.msg, data.data.comments];
    }catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}

//添加评论
export const addComment = async (commentData) => {
    try {
        const response = await axios.post(`${backAddress}/v1/comment/add`, commentData);
        const data = response.data;
        return [response.status, data.msg, data.data];
    }catch (error) {
        if (error.response.status !== 200) {
            return [error.response.status, error.response.data.err]
        }
    }
}