import React, { createContext, useContext, useState } from 'react';
import { login, logout, refresh, secureCall } from './authServiceLocalHost';
import { useNavigate } from 'react-router-dom';

const LocalLoginContext = createContext();
const localConfig = { apiUrl: 'http://localhost:3001/api/auth' };  // Configuration for local development

export const LocalHostLoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            const result = await authService.login(localConfig, email, password);
            console.log('Login Response:', result)
            setIsLoggedIn(result.isLoggedIn);
            sessionStorage.setItem('csrfToken', result.csrfToken);
            navigate("/usermain")
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            setIsLoggedIn(false);
        }
    };

    const authService = {
        login,
        logout,
        refresh,
        secureCall,
    };

    const contextValue = { 
        isLoggedIn, 
        loading, 
        error, 
        login: handleLogin, 
        logout: authService.logout, 
        secureCall: authService.secureCall 
    };

    return (
        <LocalLoginContext.Provider value={contextValue}>
            {children}
        </LocalLoginContext.Provider>
    );
};

export const useLocalHostLogin = () => useContext(LocalLoginContext);