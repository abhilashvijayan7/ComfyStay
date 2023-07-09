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
export const forgotpassword =(value)=>{
    return userInstance.post('/forgotpassword',{...value})
}

export const verifyOtpForgot = (otp)=>{
    return userInstance.post('/verifyotpforgot',{otp})
}
export const newPassword = (value)=>{
    return userInstance.post('/newpassword',{...value})
}
export const resentOtp = ()=>{
    return userInstance.post('/resentotp')
}

export const resentOtpSignup = ()=>{
    return userInstance.post('/resentotpsignup')
}

export const propertySubmit =(values)=>{
    return userInstance.post('/propertysubmit',{...values},{ headers: { "Content-Type": "multipart/form-data" }})
}

export const propertylist = ()=>{
    return userInstance.get('/propertylist')
}





