import axios from 'axios'
import { ElMessage } from 'element-plus'

let isRedirecting = false // 防止多个接口同时返回 -1/403 时重复跳转

//创建axios实例
const service = axios.create({
    baseURL: '/api',//请求的前缀
    timeout: 5000 //请求的超时时间
})

//创建请求拦截器
service.interceptors.request.use(
    (config) => {
        //在发送请求之前做些什么
        const token = localStorage.getItem('token')
        if(token){
            config.headers['token'] = token
        }
        return config
    },
    (error) => {
        //对请求错误做些什么
        return Promise.reject(error)
    }
)

//创建响应拦截器
service.interceptors.response.use(
    (response) => {
        //对响应数据做点什么
        const {data,config} = response
        //处理业务状态码
        if(data.code === '200'){
            return data.data
        }else{
            // 防止多个接口同时返回 -1/403 导致重复跳转
            if(isRedirecting){
                return Promise.reject(data.msg || '登录状态异常')
            }
            if(data.code === '-1'){
                if(!config.url?.includes('login')){
                    ElMessage.error(data.msg || '登陆过期，请重新登录')

                    isRedirecting = true // 标记正在跳转，防止重复执行
                    //清除登陆信息
                    localStorage.removeItem('token')
                    localStorage.removeItem('userInfo')
                    window.location.href = '/auth/login'
                }else{
                    return Promise.reject('账号或密码错误')
                }
            }else if(data.code === '403'){
                ElMessage.error('权限不足，请重新登录')
                isRedirecting = true
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                window.location.href = '/auth/login'
                return Promise.reject('权限不足')
            }
        }
        return response
    },
    (error) => {
        //对响应错误做点什么
        return Promise.reject(error)
    }
)

export default service