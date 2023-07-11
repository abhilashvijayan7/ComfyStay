import { adminInstance } from "../axios/axiosInstance";

export const adminLogin =(value)=>{
    return adminInstance.post('/login',{...value});
}

export const propertylist = ()=>{
    return adminInstance.get('/propertylist')
}
export const updatePropertyStatus = (propertyId, status) => {
    return adminInstance.put(`/properties/${propertyId}/status`, { status });
  };