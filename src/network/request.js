import axios from 'axios'
export function request(config){
    const resolve = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        time: 5000
    })

    resolve.interceptors.request.use(config => {
        return config
    },err => {
        console.log(err);
    })

    resolve.interceptors.response.use(res => {
        return res.data
    },err => {
        console.log(err);
    })

    return resolve(config)
}