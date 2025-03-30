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

//upload video api
export const uploadVideo = async (userId, videoName, imgFile, videoFile, label) => {
    const formData = new FormData();

    // 将各个字段添加到 FormData
    formData.append('userId', userId);
    formData.append('videoName', videoName);
    formData.append('video', videoFile);  // 这是视频文件
    formData.append('image', imgFile);  // 这是封面文件
    formData.append('label', label);  // 这是视频标签

    try {
        const response = await axios.post(`${backAddress}/v1/video/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return [response.status, response.data.msg];  // 返回响应数据
    } catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.msg]
        }
    }
};

//分页获取视频
export const getVideos = async () => {
    try {
        const response = await axios.get(`${backAddress}/v1/videos`);
        const data = response.data
        return [response.status, data.msg, data.data.videoList]
    }catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}

//根据视频名称模糊搜索
export const searchByName = async (name) => {
    try {
        const response = await axios.get(`${backAddress}/v1/video/search`,{params:{name:name}});
        const data = response.data;
        return [response.status, data.msg, data.data];
    }catch (error){
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}

//根据分类标签查询视频
export const getVideosByLabel = async (label) => {
    try {
        const response = await axios.get(`${backAddress}/v1/video/getVideosByLabel`, {params: {label: label}});
        const data = response.data;
        return [response.status, data.msg, data.data.videoList];
    }catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}

//查询视频点赞数
export const getVideoLikes = async (videoId) => {
    try {
        const response = await axios.get(`${backAddress}/v1/video/like`, {params: {video_id: videoId}});
        const data = response.data;
        return [response.status, data.msg, data.data];
    }catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}

//搜索视频
export const searchVideos = async (keyword) => {
    try {
        const response = await axios.get(`${backAddress}/v1/video/search`, {params:{name: keyword}});
        const data = response.data;
        return [response.status, data.msg, data.data];
    }catch (error) {
        if (error.response.status !== 200){
            return [error.response.status,error.response.data.err]
        }
    }
}
