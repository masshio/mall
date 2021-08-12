import axios from 'axios'
export function request(config){
    const resolve = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })
    // 1.比如config中的一些信息不符合服务器要求

    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

    // 3. 某些网络请求(比如登录token),必须携带一些特殊的信息
    resolve.interceptors.request.use(config => {
        return config
    },err => {
        console.log(err);
    })

    resolve.interceptors.response.use(res => {
        // 这里只需要res.data,其他的是axios另外加的
        return res.data
    },err => {
        console.log(err);
    })

    return resolve(config)
}