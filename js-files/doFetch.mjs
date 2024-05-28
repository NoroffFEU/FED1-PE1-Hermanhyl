import { getAuthToken } from "../js-files/handlers/handleAuthLogin.mjs";

export async function doFetch(url, isAuth = false, options = {}) {
    try {
        const headers = {
            'content-Type': 'application/json',
        };
        if (isAuth) {
            const authToken = getAuthToken();
            headers["authorization"] = `Bearer ${authToken}`;
        };

        const combinedOptions = {headers, ...options };

        const response = await fetch(url, combinedOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        throw error;
    }
}
