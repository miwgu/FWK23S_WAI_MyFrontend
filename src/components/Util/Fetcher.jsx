import React, { useEffect, useState, Children, cloneElement } from 'react';
import { useLocalHostLogin } from '../Login/LocalHostLoginProvider';

const Fetcher = ({ apiUrl, path, children, interval = 0 }) => {
    const { isLoggedIn, secureCall } = useLocalHostLogin(); // Access isLoggedIn and secureCall from context
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            setData(null);
            setError('Not logged in');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await secureCall(apiUrl, path);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        let intervalId;
        if (interval > 0) {
            intervalId = setInterval(fetchData, interval * 1000); // Setup periodic fetch
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId); // Cleanup on unmount or dependency change
            }
        };
    }, [apiUrl, path, interval, isLoggedIn, secureCall]); // Include secureCall in dependencies

    if (error === 'Not logged in') return <div>{error}</div>;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Pass fetched data to children
    const enhancedChildren = Children.map(children, child => cloneElement(child, { data }));

    return <div>{enhancedChildren}</div>;
};

export default Fetcher;
