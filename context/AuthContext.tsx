'use client'

import { createContext, useContext, useState, useEffect } from "react"

import { getCurrentUser, logoutUser } from "@/services/auth/authService"

const AuthContext = createContext<any>(null);

export function AuthProvider({children,}:{children:React.ReactNode}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadUser = async () => {
        try {
            const response = await getCurrentUser();
            setUser(response.data);
        } catch {
            setUser(null);
        }
    };

    const login = async () => {
        await loadUser();
    };

    const logout = async () => {
        try {
            const refresh = localStorage.getItem("refresh");

            if (refresh) {
                await logoutUser(refresh);
            }
        } catch {}

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);
    };


    useEffect(()=>{
        async function initialize(){
            if(localStorage.getItem("access")){
                await loadUser()
            }
            setLoading(false)
        }
        initialize()
    },[])

    return(
        <AuthContext.Provider 
        value={{
            user, login, logout, loading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)