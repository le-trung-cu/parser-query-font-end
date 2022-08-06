import axios from "axios"

export const URLS = {
    // baseURL: 'https://test-place.vimap.vn/',
    baseURL: '/',
    signIn: 'api/app/login-token-result/login-get-token',
    signUp: 'api/account/register',
    placeTypes: 'api/app/place-type',
    place: 'api/app/place'
}

export const getApi = () => {
    const axiosInstance = axios.create({
        baseURL: URLS.baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('TOKEN_BEARER')}`,
        }
    });

    return {
        get: axiosInstance.get,
        post: (url, data) => axiosInstance.post(url, JSON.stringify(data)),
        put: axiosInstance.put,
    }
}

export const withAxiosApi = async (fn, ...args) => {
    try {
        const response = await fn(...args);
        return { data: response.data };
    } catch (error) {
        return { error: error.response.data.error };
    }
}

export const signUpApi = async ({ userName, emailAddress, password }) => {
    const api = getApi();
    return await withAxiosApi(api.post, URLS.signUp, { userName, emailAddress, password, appName: 'reactjs' });
}

export const signInByEmailAndPasswordApi = async ({ userNameOrEmailAddress, password, rememberMe = true }) => {
    const api = getApi();
    return await withAxiosApi(api.post, URLS.signIn, { userNameOrEmailAddress, password, rememberMe });
}

export const fetchPlaceTypesApi = async () => {
    const api = getApi();
    return withAxiosApi(api.get, URLS.placeTypes);
}

let fetchSuggestionsController = null;

export const fetchPlaceNameSuggestionsApi = async (q = '') => {
    // cancel the previous request
    if (fetchSuggestionsController !== null) {
        fetchSuggestionsController.abort();
    }
    fetchSuggestionsController = new AbortController();

    try {
        const api = getApi();
        const response = await api.get(`${URLS.place}?filter=${q}`, {
            signal: fetchSuggestionsController.signal,
        });
        fetchSuggestionsController = null;
        return response.data;
    } catch (e) {
        if (axios.isCancel(e)) {
            console.log(`fetch suggestion for q=${q} was cancelled!`);
        }
        throw e;
    }
}

export const createPlaceNameApi = async (placeType = '', name = '') => {
    const api = getApi();
    return await withAxiosApi(api.post, URLS.place, { placeType, name });
}