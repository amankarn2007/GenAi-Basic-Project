import React, { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

interface AuthContextType {
    user: null | object,
    setUser: React.Dispatch<React.SetStateAction<null | object>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider store all global states like navbar, user, theme. can be accessed from anywhere
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    
    const [user, setUser] = useState<null | object>(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => { //on every refresh fetch user, bcs user will be cleared on every refresh
        
        const getAndSetUser = async() => {
            setLoading(true);
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (err) {
                
            } finally {
                setLoading(false);
            }
        }

        getAndSetUser();

    }, [])

    
    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            { children }
        </AuthContext.Provider>
    )
}