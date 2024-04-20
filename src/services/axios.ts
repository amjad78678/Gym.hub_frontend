import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const Api = axios.create({baseURL:BASE_URL,withCredentials:true})


Api.interceptors.response.use((response)=>response, (error) => {
    if(error.response){
        const {data}=error.response
        console.log('axio',data.message)
    }else{
        console.log(error);
        
    }
    return Promise.reject(error)
})

export default Api;