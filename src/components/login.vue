<template>
      <form class="form-signin" method="post">
          <h1>MaxKey单点登录系统</h1>
          <div>
            <label for="username" class="sr-only" >
                <img src="../assets/user.png" alt=""/>
            </label>
            <input  v-model="form.username" type="text" name="username" id="username" class="form-control" placeholder="用户名">
          </div>
          <div class="password">
             <label for="inputPassword" class="sr-only">
                <img src="../assets/lock.png" alt=""/>
             </label>
            <input  v-model="form.password" :type="passwordType" name="password" id="inputPassword" class="form-control" placeholder="密码" required>
           <img
              src="../assets/eyesopen.png"
              class="eyes-img"
              v-if="visible"
              @click="show()"
            />
            <img
              src="../assets/eyesclose.png"
              class="eyes-img"
              v-if="!visible"
              alt=""
              @click="show()"
            /> 
          </div>
          <button class="btn" type="submit" @click="login">登录</button>
      </form>
   
</template>

<script lang="ts">
import {defineComponent} from 'vue'
//import { ElMessage } from "element-plus"
import { AxiosError, AxiosResponse } from 'axios'
import {api} from "../utils/api"
import {reactive,ref} from "vue"
interface Form {
    username: string,
    password: string,
    redirect_uri: string
}
export default defineComponent({
    name: "login",
    setup(){
        const form = reactive<Form>({
                    username:"",
                    password:"",
                    redirect_uri:""
                })
        let passwordType=ref("text")
        let visible=ref(false)
        const show=()=>{
            visible.value=!(visible.value);
            if(!visible.value)passwordType.value="password"
            else passwordType.value="text"
        }
        //获取redirect_uri的值
        const getUrlParam=(key:string)=>{
            let query = window.location.search.substring(1).split('&')
            for(let i=0;i<query.length;i++){
                let pair = query[i].split('=')
                if(pair[0] === key){
                    return pair[1];
                }
            }
            return ""   
        }
        form.redirect_uri=getUrlParam("redirect_uri")
        const login=()=>{
            api.authorize(form)
                .then((res:AxiosResponse)=>{
                    let code=res.data
                    localStorage.setItem('code',code)
                    //如果有回调地址则跳转第三方应用,并且带上验证码
                    //第三方应用拿到验证码到后台进行验证，如果验证成功则登录成功
                    //登录成功后验证token的有效性
                    window.location.href=form.redirect_uri+`${code}`
                    })
                .catch((err:AxiosError)=>Promise.reject(err))       
        }
        return {
            form,
            login,
            show,
            visible,
            passwordType
        }
    }
});
</script>

<style lang="less">
 html,
 body {
     height:100%;
 }
 .body {
     display: flex;
     align-items: center;
     padding-top: 40px;
     padding-bottom: 40px;
     background-color: #f5f5f5
 }
 .form-signin { 
     overflow:hidden;
     width: 100%;
     max-width: 330px;
     padding: 15px;
     margin:auto;
     .sr-only {
        img {
            width: 25px;
            height: 25px;

        }
     }
     .form-control {
         position: relative;
         box-sizing: border-box;
         height: auto;
         padding: 10px;
         margin: 10px;
         font-size: 16px;
     }
     &:focus {
         z-index:2;
     }
     .password {
        position: relative;
        .eyes-img {
            position: absolute;
            width: 25px;
            height: 25px;
            transform: translate(-40px, 18px);
        }

     }
     
     .btn {
        width: 60px;
        height: 30px;
        background: #2E9AFE;
        color: #fff;
        border: none;
        border-radius: 3px;
     }
 }

</style>