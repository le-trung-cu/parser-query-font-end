import axios from "axios"

// export const URLS = {
//     baseURL: 'https://localhost:44394/api/',
//     placeTypes: 'app/place-type',
//     place: 'app/place'
// }

export const URLS = {
    baseURL: 'https://test-place.vimap.vn/api/',
    signIn: 'account/login',
    signUp: 'account/register',
    placeTypes: 'app/place-type',
    place: 'app/place'
}

export const getApi = () => {
    const axiosInstance = axios.create({
        baseURL: URLS.baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });

    return {
        get: axiosInstance.get,
        post: (url, data) => axiosInstance.post(url, JSON.stringify(data)),
        put: axiosInstance.put,
    }
}

export const signUpApi = async ({ userName, email, password }) => {
    const api = getApi();
    const response = await api.post(URLS.signUp, { userName, emailAddress: email, password, appName: '' });
    if (response.status === 200) {
        console.log('sign up was success!');
    }
}

export const signInByEmailAndPasswordApi = async ({ userNameOrEmailAddress, password, rememberMe = true }) => {
    const api = getApi();
    const response = await api.post(URLS.signIn, { userNameOrEmailAddress, password, rememberMe });
    console.log(response);
    if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        return
    }
}

export const signOutApi = () => {
    localStorage.removeItem('token');
}

export const fetchPlaceTypesApi = async () => {
    const api = getApi();
    const resposne = await api.get(URLS.placeTypes);
    return resposne.data;
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
        console.log(response);
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
    const response = await api.post(URLS.place, {
        placeType,
        name,
        source: 'auto',
        status: 0,
    });
    return response;
}