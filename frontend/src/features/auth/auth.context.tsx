import React, { createContext, useState } from "react";

interface AuthContextType {
    user: null | object,
    setUser: React.Dispatch<React.SetStateAction<null | object>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    
    const [user, setUser] = useState<null | object>(null);
    const [loading, setLoading] = useState(false);
    
    
    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            { children }
        </AuthContext.Provider>
    )
}