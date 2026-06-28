import api from "@/lib/axios";

export const registerUser = async(data:any)=>{
    const response = await api.post("/accounts/register/", data);
    return response.data;
}
export const loginUser = async(data:any)=>{
    const response = await api.post("/accounts/login/", data);
    return response.data;
}
export const getCurrentUser = async()=>{
    const response = await api.get("/accounts/me/");
    return response.data;
}
export const logoutUser = async(refresh:string)=>{
    const response = await api.post("/accounts/logout/", {refresh});
    return response.data;
}