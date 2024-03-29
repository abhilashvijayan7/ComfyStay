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



export const homePropertylist = (page, limit)=>{
    return userInstance.get('/homepropertylist',{
        params: {
            limit,
            page
        }
    })
}

export const viewProperty =(id)=>{
    return userInstance.get(`/viewproperty/${id}`)
}

export const propertylist = (page, limit)=>{
    return userInstance.get('/propertylist', {
        params: {
            limit,
            page
        }
    })
}
//kvjhdlkhvlkdshlvs
export const bookPropertyApi = (values,id)=>{
    return userInstance.post(`/bookaproperty/${id}`,{...values},{ withCredentials: true })
}

export const PaymentDetailsApi = () => {
    return userInstance.get('/paymentdetails',{ withCredentials: true })
}
//fkdsjfgjlhsrkjhgusrg
export const verifyPayment = (response, data, propertyid, totalAmountamount) => {
    const amount = totalAmountamount / 100;
    const payload = {
        ...response,
        ...data,
        propertyid,
        amount
    };
    return userInstance.post("/verifypayment", payload)
}
export const orderApi = (amount) => {
    return userInstance.post("/orders", { ...amount })
}
export const getOrderDetailsAPI = (orderId) => {
    return userInstance.get(`/getorderdetails/${orderId}`)
}
export const bookingDetailsApi = () => {
    return userInstance.get("/bookingdetails")
}

export const cancelOrder = (id) => {
    return userInstance.post(`/cancelorder/${id}`)
}
export const userDetails = () => {
    return userInstance.get('/getuserDetails')
}

export const editUserDetails = (values) => {
    return userInstance.post('/edituserDetails', values)
}

export const changePasswordAPI = (values) => {
    return userInstance.post('/changepassword', values)
}

export const userHeader = () => {
    return userInstance.get("/")
    
}

export const bookingDetailApi = (page, limit) => {
    return userInstance.get('/hostbookingdetails', {
        params: {
            limit,
            page
        }
    })
}