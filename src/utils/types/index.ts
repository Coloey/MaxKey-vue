export interface MyResponseType<T = any> {
    code:number;
    message:string;
    body:string
}
export interface ConstantParams {
    username: string,
    password: string,
    client_id?:string,
    redirect_uri:string,
    grant_type?:string,
}
export interface ConfigParams {
    client_id: string,
    client_secret: string,
    redirect_uri:string,
    tokencode: string,
    grant_type?: string,
    username?: string,
    passwrod?: string
}