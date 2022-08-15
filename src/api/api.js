import axios from "axios"

export const URLS = {
    // baseURL: 'https://test-place.vimap.vn/',
    baseURL: '/',
    signIn: 'api/app/login-token-result/login-get-token',
    signUp: 'api/account/register',
    placeTypes: 'api/app/place-type',
    place: 'api/app/place',
    placeTypeNames: 'api/app/place/place-type-name',
    placeByStatus: 'api/app/place/by-status-type',
    exportPlace: 'api/v1/export-place',
}

function urlEncodeQueryParams(data) {
    if (data == null || data === undefined) return '';
    const params = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    // const params = Object.keys(data).map(key => data[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}` : '');
    const query = params.filter(value => !!value).join('&');
    return query.length > 0 ? '?' + query : '';
}

export const getApi = (config) => {
    const axiosInstance = axios.create({
        baseURL: URLS.baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('TOKEN_BEARER')}`,
        },
        responseType: config?.responseType,
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
        const response = await api.get(`${URLS.placeTypeNames}?maxResultCount=999&&filter=${q}`, {
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

export const fetchPlaceNamesApi = async (parameters = { filter: '', sorting: '', skipCount: 0, maxResultCount: 50 }) => {
    const api = getApi();
    const response = await api.get(URLS.place + urlEncodeQueryParams(parameters));
    return response.data;
}

export const fetchPlaceNamesByStatusApi = async (parameters = { filter: '', sorting: '', skipCount: 0, maxResultCount: 50, statusType: 0 }) => {
    const api = getApi();
    const response = await api.get(URLS.placeByStatus + urlEncodeQueryParams(parameters));
    return response.data;
}

export const updatePlaceNameStatusApi = async (id, statusType) => {
    const api = getApi();
    const response = await api.put(`${URLS.place}/${id}?statusType=${statusType}`);
    return response.data;
}


export const exportPlaceApi = async () => {
    const api = getApi({ responseType: 'blob' });
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);

    api.post(URLS.exportPlace)
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'list-place-name.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


// // userw1
// var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1QTRDM0EzNTAyQzdBRTNGQjIzQTVGNkI3NjNGNjg2IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NjAxNjI3NDcsImV4cCI6MTY5MTY5ODc0NywiaXNzIjoiaHR0cHM6Ly90ZXN0LXBsYWNlLnZpbWFwLnZuIiwiYXVkIjoiUGxhY2VBcHAiLCJjbGllbnRfaWQiOiJQbGFjZUFwcF9BcHAiLCJzdWIiOiI4MTUyNzE0MS0xNTkxLTAzOGUtMGE0MC0zYTA1OTI0M2RlMWUiLCJhdXRoX3RpbWUiOjE2NjAxNjI3NDYsImlkcCI6ImxvY2FsIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6InVzZXJ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6IkZhbHNlIiwibmFtZSI6InVzZXJ3MSIsImlhdCI6MTY2MDE2Mjc0Nywic2NvcGUiOlsiUGxhY2VBcHAiXSwiYW1yIjpbInB3ZCJdfQ.K1qNYSb6bAMSeVgszjs8rt-rhlIcq6o6tUcPYKgRFYkGEr5Dg_-pVDsV4MFo99mwxaN1EAU-lBC0p7vbkxaVGMx8lv0L1Q_b3kMfT9IaC1ZLvsiG7hZluF76kNO5giLVocBLDALPeAafXB26xZOFu0W3IlnX8dqhELavGwN8cjwXdp3MTAxFWPlG0lKAvhc7DWk0LQTYfj3feJuRbxG6-YCDtUIhMIOcUj1EcTNv6knCW5hXpPO5xw9xQ4iEyhAvQ2ng0XaRDxRyKwKBDo86mBnrFApU6CtLPOod_-_-XQ7NtAWxv3nYifOZ6Cuc2I4qD5ojAsOQzT59oZC4ToJBOQ"

// // admin
// var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1QTRDM0EzNTAyQzdBRTNGQjIzQTVGNkI3NjNGNjg2IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTk2Mzk5NDYsImV4cCI6MTY5MTE3NTk0NiwiaXNzIjoiaHR0cHM6Ly90ZXN0LXBsYWNlLnZpbWFwLnZuIiwiYXVkIjoiUGxhY2VBcHAiLCJjbGllbnRfaWQiOiJQbGFjZUFwcF9BcHAiLCJzdWIiOiI1Yzg3MGJjMC03YmMwLTk3YWItNjYxYy0zYTA1NmE1N2IxNTkiLCJhdXRoX3RpbWUiOjE2NTk2Mzk5NDUsImlkcCI6ImxvY2FsIiwicm9sZSI6ImFkbWluIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6ImFkbWluQGFicC5pbyIsImVtYWlsX3ZlcmlmaWVkIjoiRmFsc2UiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTk2Mzk5NDYsInNjb3BlIjpbIlBsYWNlQXBwIl0sImFtciI6WyJwd2QiXX0.Rsu_qX8RWamIrWp6--KIxQzsrK8A-ihL5B5Mu0VCld_5AiwA8g853kDXjUhqzxKbVVZTty54MrBNtKEunYtvnjELBA1KFRdzNycmxlCsxyzPkpXSY-9QNza5zaWWbDE9WQTeZ2Aj7G0IxuFQNfcRypcVRt5-XkDDzh2YQLIfIXUZ2zlso-OWX90xSsoZaz9-gTtsokw3UQaRXiTWG0pWA_fmQCkL0qlEzrsiWVyjJsduMnee06X1-PBpCoQrsME2OxWujqXTB7kkj4U-yCWlzEa8IyOzJ7y6MYwA2ezzqo34Y5jc08W5ksHhvhcBaEz6jg-xRKLa-_bjH5c1e_YiwA"
// var response = await fetch('https://test-place.vimap.vn/api/app/place', {
//     method: 'POST',
//     mode: 'cors',
//     credentials: "omit",
//     headers: {
//         'Authorization': token,
//         'Content-Type': 'application/json',
//         // 'RequestVerificationToken': 'CfDJ8KZl2WckkV9Eje3Mv1Wdhgc1FjhRaOECrlM-2OuSjmdJNW66p5T7cGq7-i8bN1V1AgxiNwOYHMH82g3d9sPC4cSM6Ap9Z38nJbAeGtsVrscyAcwxE-hPGwMLqqM0AT5RpcoqgVNWNWEvE7JKYWEXITmTMyBhxstOHyv7Bm5_BBjEwQdSBLRYYhdNFbA5Pn2NmQ'
//     },
//     body: JSON.stringify({
//         name: "Bến xex",
//         placeType: "car"
//     })
// })
// response = await response.json();

// console.log(response);


// (function (send) {
//     XMLHttpRequest.prototype.send = function (data) {
//         this.setRequestHeader(abp.security.antiForgery.tokenHeaderName, abp.security.antiForgery.getToken());
//         return send.call(this, data);
//     };
// })(XMLHttpRequest.prototype.send);
