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


    const handleLogin = async (email, password, token) => {

        if (!email) {
            setError("Please enter your email.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }
        if (!token) {
            setError("Please complete the reCAPTCHA.");
            return;
        }

        setLoading(true);
        setError(null); //When user login error should be reset
        try {
            const result = await authService.login(localConfig, email, password, token);
            console.log('Login Response:', result)
            setIsLoggedIn(result.isLoggedIn);
            sessionStorage.setItem('csrfToken', result.csrfToken);
            setError(null);// when user login suscess reset error
            navigate("/users")
        } catch (err) {
            setError(err.message); //set error message
            console.error('Error during login:', err.message);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async() =>{
        await authService.logout(localConfig);
        setIsLoggedIn(false);
    }

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
        logout: handleLogout, //authService.logout
        secureCall: authService.secureCall 
    };

    return (
        <LocalLoginContext.Provider value={contextValue}>
            {children}
        </LocalLoginContext.Provider>
    );
};

export const useLocalHostLogin = () => useContext(LocalLoginContext);