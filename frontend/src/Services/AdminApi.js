import { adminInstance } from "../axios/axiosInstance";

export const adminLogin =(value)=>{
    return adminInstance.post('/login',{...value});
}

export const propertylist = (page, limit)=>{
    return adminInstance.get('/propertylist', {
        params: {
            limit,
            page
        }
    })
}

export const updatePropertyStatus = (propertyId, status) => {
    return adminInstance.put(`/properties/${propertyId}/status`, { status });
  };

