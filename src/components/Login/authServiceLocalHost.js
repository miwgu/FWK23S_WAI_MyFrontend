export const login = async (config, email, password, token) => {
    const { apiUrl } = config;
    try{
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, token }),
        credentials: 'include'
    });
    /* if (!response.ok) {
        //throw new Error(`Login failed: ${response.statusText}`);
       let errorMessage = 'Login faild!';
       try{
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage ;
       }catch (error){
         //console.error("Error parsing error response:", error);
         errorMessage = await response.text();
        }
       throw new Error(errorMessage);
    } */

       if (!response.ok) {
        // Attempt to parse the error message if JSON
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || 'Login failed';
        throw new Error(errorMessage);
    }

    const data = await response.json();
    sessionStorage.setItem('csrfToken', data.csrfToken);
    return { isLoggedIn: true, csrfToken: data.csrfToken };
 
} catch (error){
   console.error('Login error:', error.message);
   throw error;

 }
};

export const refresh = async (config) => {
    const { apiUrl } = config;
    const response = await fetch(`${apiUrl}/refresh`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
    }
    const data = await response.json();
    sessionStorage.setItem('csrfToken', data.csrfToken);
    return { success: true, csrfToken: data.csrfToken };
};

export const secureCall = async (config, url, options = {}) => {
    const { apiUrl } = config;
    const csrfToken = sessionStorage.getItem('csrfToken');
    let response = await fetch(`${apiUrl}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'Content-Type' in options.headers ? options.headers['Content-Type'] : 'application/json'
        },
        credentials: 'include'
    });
    if (response.status === 403) {
        await refresh(config);
        response = await fetch(`${apiUrl}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                'X-CSRF-Token': sessionStorage.getItem('csrfToken')
            },
            credentials: 'include'
        });
    }
    if (!response.ok) {
        throw new Error(`API call to ${url} failed: ${response.statusText}`);
    }
    return await response.json();
};

export const logout = async (config) => {
    
        sessionStorage.removeItem('csrfToken');
        localStorage.clear();

    //return { isLoggedIn: false };
};

