import Vue from 'vue'
import Router from 'vue-router'

import main from './pages/main.vue'
import login from './pages/login.vue'

import news from './pages/news.vue'
import talk from './pages/talk.vue'
import recruit from './pages/recruit.vue'
import recruit_public from './pages/recruit_public.vue'

import stuPracticeInfo from './pages/stuPracticeInfo.vue'
import stuDesign_stu from './pages/stuDesign_stu.vue'
import stuDesign_all from './pages/stuDesign_all.vue'
import stuClassForm from './pages/stuClassForm.vue'

import tchInfo from './pages/tchInfo.vue'
import tchDesign_stu from './pages/tchDesign_stu.vue'
import tchDesign_my from './pages/tchDesign_my.vue'
import tchClassForm from './pages/tchClassForm.vue'

Vue.use(Router);

export default new Router({
    mode:'history',
    routes:[
        {path:'/',component: login},
        {path:'/login',component: login},
        {
            path:'/main',
            component:main,
            children:[
                {path:'', component: news},
                {path:'/news', component: news},
                {path:'/talk', component: talk},
                {path:'/recruit', component: recruit},
                {path:'/recruit_public', component: recruit_public},

                {path:'/stuPracticeInfo', component: stuPracticeInfo},
                {path:'/stuDesign_stu', component: stuDesign_stu},
                {path:'/stuDesign_all', component: stuDesign_all},
                {path:'/stuClassForm', component: stuClassForm},

                {path:'/tchInfo', component: tchInfo},
                {path:'/tchDesign_stu', component: tchDesign_stu},
                {path:'/tchDesign_my', component: tchDesign_my},
                {path:'/tchClassForm', component: tchClassForm},
            ]
        }
    ]
})

