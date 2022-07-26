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
            errorMessage: 'You have entered an invalid username or password',
        }
    }
}

const fetchSuggestionsController = new AbortController();
export const fetchSuggestions = async (search = '') => {
    // cancel the previous request
    fetchSuggestionsController.abort();
    try {
        const api = getApi();
        await Promise.resolve().then((resolve, reject) => setTimeout(resolve, Math.random() * 500))
        console.log('response data');
        // const response = await api.get(`/suggestions?s=${search}`, {
        //     signal: fetchSuggestionsController.signal,
        // });
        // return ['a', 'b', 'c']
    } catch (e) {
        console.log(e.toJson());
    }
}