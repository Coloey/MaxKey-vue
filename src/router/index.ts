import {createRouter,createWebHashHistory} from "vue-router"
export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            component:()=>Promise.resolve(import("../components/login.vue"))
        }
    ]
})