export const addAuthToken = (token) => {
    console.log('add token', token);
    localStorage.setItem('access-token', token);
};

export const getAuthToken = () => {
    const accessToken = localStorage.getItem('access-token');
    return accessToken;
};