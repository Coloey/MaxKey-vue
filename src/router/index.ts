import {createRouter,createWebHashHistory} from "vue-router"
export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            component:()=>Promise.resolve(import("../components/login.vue"))
        },
        {
            path:'/passport/login',
            component:()=>Promise.resolve(import("../components/login.vue")),
        },
        {
            path:'/passport/forgot',
            component:()=>Promise.resolve(import("../components/Forgot.vue"))
        },
        {
            path:'/dashboard',
            component:()=>Promise.resolve(import("../components/Home.vue")),
            children:[
                {
                    path:'home',
                    component:()=>Promise.resolve(import("../components/AppList.vue"))
                },
                {
                    path:'user',
                    component:()=>Promise.resolve(import("../components/User.vue"))
                }
            ]

            
        }
    ]
})