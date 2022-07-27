import axios from "axios"

export const getApi = () => {
    const axiosInstance = axios.create({
        baseURL: '',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return {
        get: axiosInstance.get,
        post: (url, data) => axiosInstance.post(url, JSON.stringify(data)),
        put: axiosInstance.put,
    }
}

export const signInByEmailAndPassword = async (email, password) => {
    try {
        const api = getApi();
        const response = await api.post('/signin', { email, password });
        if (response.status === 200) {
            const { token } = response.data;
            return null;
        }
    } catch (error) {
        return {
            status: 'error',
            errorMessage: 'You have entered an incorrect username or password',
        }
    }
}

export const fetchPlaceTypesApi = async () => {
    const api = getApi();
    const resposne = await api.get('place-types');
    return resposne.data;
}

let fetchSuggestionsController = null;

export const fetchSuggestionsApi = async (q = '') => {
    // cancel the previous request
    if (fetchSuggestionsController !== null) {
        fetchSuggestionsController.abort();
    }
    fetchSuggestionsController = new AbortController();

    try {
        const api = getApi();
        const response = await api.get(`/suggestions?q=${q}`, {
            signal: fetchSuggestionsController.signal,
        });
        fetchSuggestionsController = null;
        console.log(`fetch suggestion for q=${q} was responsed!`);
        return response.data;
    } catch (e) {
        if (axios.isCancel(e)) {
            console.log(`fetch suggestion for q=${q} was cancelled!`);
        }
        return [];
    }
}

export const createPlaceTypeNameApi = async (type = '', name = '') => {
    const api = getApi();
    const response = await api.post('/place', {
        placeType: type,
        placeName: name,
    });
    return response;
}