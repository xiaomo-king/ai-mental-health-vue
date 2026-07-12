import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'    
import FrontendLayout from '@/components/FrontendLayout.vue'
//路由配置
const backendRoutes = [
    {
        path:'/back',
        //重定向
        redirect:'/back/dashboard',
        component:BackendLayout,
        children: [
            {
                path:'dashboard',
                component:() => import('@/views/dashboard.vue'),
                meta:{
                    title:'数据分析',
                    icon:'PieChart'
                }
            },
            {
                path:'knowledge',
                component:() => import('@/views/knowledge.vue'),
                meta:{
                    title:'知识文章',
                    icon:'ChatLineSquare'
                }
            },
            {
                path:'consultations',
                component:() => import('@/views/consultations.vue'),
                meta:{
                    title:'咨询记录',
                    icon:'Message'
                }
            },
            {
                path:'emotional',
                component:() => import('@/views/emotional.vue'),
                meta:{
                    title:'情绪日志',
                    icon:'User'
                }
            }
        ]
    },
    {
        path:'/auth',
        component:AuthLayout,
        children:[
            {
                path:'login',
                component:() => import('@/views/login.vue'),
                meta:{
                    title:'登录'
                }
            },
            {
                path:'register',
                component:() => import('@/views/register.vue'),
                meta:{
                    title:'注册'
                }
            }
        ]
    }
]
const frontendRoutes = [
    {
        path:'/',
        component:FrontendLayout,
        children:[
            {
                path:'',
                component:() => import('@/views/home.vue'),
            },
            {
                path:'consultation',
                component:() => import('@/views/consultation.vue'),
            },
            {
                path:'emotion-diary',
                component:() => import('@/views/emotionDiary.vue'),
            },
            {
                path:'knowledge',
                component:() => import('@/views/frontendKnowledge.vue'),
            },
            {
                path:'knowledge/article/:id',
                component:() => import('@/views/articleDetail.vue'),
                props:true
            }
            
        ]
    }
]

const router = createRouter({
    history:createWebHistory(),
    //合并路由
    routes:[...backendRoutes,...frontendRoutes]
})
//路由前置守卫
router.beforeEach((to,from,next) => {
    const token = localStorage.getItem('token')
    //当前用户是否登陆
    if(token){
        let userInfo = null
        try {
            userInfo = JSON.parse(localStorage.getItem('userInfo'))
        } catch (e) {
            // userInfo 解析失败，跳转到登录页
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            return next('/auth/login')
        }
        if(userInfo && userInfo.userType == 2){
            //如果是后台用户
            if(to.path.startsWith('/back')){
                next()
            }else{
                next('/back/dashboard')
            }
        }else if(userInfo && userInfo.userType == 1){
            //如果是前台用户
            if(to.path.startsWith('/back') || to.path.startsWith('/auth') ){
                next('/')
            }else{
                next()
            }
        }else{
            // 未知用户类型，跳转到首页
            next('/')
        }
    }else{
        if(to.path.startsWith('/back')){
            //如果是访问后台页面，需要登录
            next('/auth/login')
        }else{
            next()
        }
    }
})

export default router