import Vue from 'vue'
import Router from 'vue-router'

import main from './pages/main.vue'
import login from './pages/login.vue'

import news from './pages/news.vue'
import practiceInfo from './pages/practiceInfo.vue'
import myDesign from './pages/myDesign.vue'
import allDesign from './pages/allDesign.vue'
import recruit from './pages/recruit.vue'
import classForm from './pages/classForm.vue'

import teacherInfo from './pages/teacherInfo.vue'

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
                {path:'/practiceInfo', component: practiceInfo},
                {path:'/myDesign', component: myDesign},
                {path:'/allDesign', component: allDesign},
                {path:'/recruit', component: recruit},
                {path:'/classForm', component: classForm},

                {path:'/teacherInfo', component: teacherInfo},
            ]
        }
    ]
})

