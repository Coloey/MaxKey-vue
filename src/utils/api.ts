import {AxiosPromise} from 'axios'
import axios from "axios"
import qs from "qs"
axios.defaults.baseURL='http://sso.maxkey.top'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const api ={
    //授权
    authorize(data:any):AxiosPromise{
        return axios.post('/sign/authz/oauth/v20/authorize',{
            data:qs.stringify(data),
        })
    },
    getAccessTokenByCode(data:any):AxiosPromise{
        return axios.post('/sign/authz/oauth/v20/token',{
            data:qs.stringify(data),
            
        })
    },
    getUserInfo(data:any):AxiosPromise{
        return axios.post('/sign/api/oauth/v20/me',{
            data:qs.stringify(data),
           
        })
    }
}