import userInstance from "../axios/axiosInstance"

export const userSignup = (value)=>{
    return userInstance.post('/register',{...value})
}