import { adminInstance } from "../axios/axiosInstance";

export const adminLogin =(value)=>{
    return adminInstance.post('/login',{...value});
}