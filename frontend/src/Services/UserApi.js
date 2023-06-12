import userInstance from "../axios/axiosInstance"

const userSignup = (value)=>{
    return userInstance.post('/register',{...value})
}