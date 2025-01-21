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

const backAddress = process.env.REACT_APP_LOCAL_BACK_ADDRESS;

export const uploadVideo = async (userId, videoName, videoDuration, videoFile) => {
    const formData = new FormData();

    // 将各个字段添加到 FormData
    formData.append('userId', userId);
    formData.append('videoName', videoName);
    formData.append('videoDuration', videoDuration);
    formData.append('video', videoFile);  // 这是文件

    try {
        const response = await axios.post(`${backAddress}/v1/video/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;  // 返回响应数据
    } catch (e) {
        console.error("Video upload failed:", e);
        throw e;  // 如果上传失败，抛出错误
    }
};

export const getVideos = async () => {
    try {
        const response = await axios.get(`${backAddress}/v1/videos`);
        return response.data
    }catch (e) {
        console.error("Video get failed:", e);
        throw e;
    }
}