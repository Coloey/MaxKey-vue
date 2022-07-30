import { ConstantParams } from "../types";
export default const Constant :ConstantParams = {
    client_id: "",//注册应用时分配的client_id
    redirect_uri:"",//应用回调地址，注册时需要配置
    grant_type?:"authorization",//授权类型
    
}