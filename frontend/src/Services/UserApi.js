import {userInstance} from '../axios/axiosInstance'

export const userSignup = (value)=>{
    return userInstance.post('/register',{...value})
}
export const verifyOtp = (otp)=>{
    return userInstance.post('/verifyotp',{otp})
}

export const login =(value)=>{
    return userInstance.post('/login',{...value})
}