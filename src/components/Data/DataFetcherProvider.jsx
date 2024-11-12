import React, { createContext, useContext, useState } from 'react';
import { secureCall } from '../Login/authServiceLocalHost';

// Config for API endpoint
const localConfig = { apiUrl: 'http://localhost:3001/api/auth' };

const DataFetcherContext = createContext();

export const DataFetcherProvider = ({ children }) => {
    const [error, setError] = useState(null);

    // Call Each data
    const getAllUsers = async () => {
        try {
            const usersData = await secureCall(localConfig, '/allusers', { method: 'GET' });
            return usersData;
        } catch (err) {
            setError(err.message);
            console.error('Failed to fetch users:', err.message);
            return null;
        }
    };

/*     const getUserDetails = async (userId) => {
        try {
            const userData = await secureCall(localConfig, `/user/${userId}`, { method: 'GET' });
            return userData;
        } catch (err) {
            setError(err.message);
            console.error(`Failed to fetch details for user ${userId}:`, err.message);
            return null;
        }
    };
 */
    const contextValue = {
        getAllUsers,
        //getUserDetails,
        error,
    };

    return (
        <DataFetcherContext.Provider value={contextValue}>
            {children}
        </DataFetcherContext.Provider>
    );
};

export const useDataFetcher = () => useContext(DataFetcherContext);

