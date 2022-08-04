import axios from "axios";

function getApi() {
    return axios.create({
        // baseURL: 'https://test-place.vimap.vn/api/',
        baseURL: 'http://localhost:3000/',
        
    })
}

export async function getPlaceApi (params = {filter : '', sorting: '', skipCount: 0, maxResultCount :200}) {
    const api = getApi();
    const response = await api.get('app/place?'+ new URLSearchParams(params).toString());
    return  {
        items: response.data.items,
        totalCount: response.data.totalCount,
    };
}
 export async function changeStatusApi({status, id}){
    const api = getApi();
    const response = await api.put(`app/place/${id}?statusType=${status}`);
    console.log(response);
    return {
        id: response.data.id,
        status: response.data.status,
    }
 }