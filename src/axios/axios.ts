import axios, { AxiosHeaders } from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    // timeout: 2000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": ''
    }
})

// instance.interceptors.request.use(function (config: any)
// {
//     utilService.showLoader()
//     if (config.headers == undefined)
//     {
//         config.headers = {}
//     }

//     const token = storageService.getToken()
//     if (token)
//     {
//         config.headers.Authorization = `Bearer ${token}`
//         // config.headers = { ...config.headers } as AxiosHeaders;
//         // config.headers.set('Authorization', `Bearer ${token}`)
//     }
//     return config
// }, (error) =>
// {
//     return Promise.reject(error);
// }

// )

instance.interceptors.response.use(function (response)
{
    if (response.data)
    {
        return response.data
    }
}, (error) =>
{
    let { response } = error
    return response
})


export default instance