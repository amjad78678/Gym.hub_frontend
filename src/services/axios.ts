import axios from 'axios'
 
const BASE_URL = import.meta.env.VITE_BASE_URL
const Api = axios.create({baseURL:BASE_URL,withCredentials:true})


Api.interceptors.response.use((response)=>{
   return response
}, (error) => {
    if(error.response){
        const {data}=error.response
        console.log('axio',data.message)  
    }else{
        console.log(error);
        
    }
    return Promise.reject(error)
})


Api.interceptors.request.use(
    (config) => {

        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const userToken = userDetails?.token; 
        const gymDetails = JSON.parse(localStorage.getItem('gymDetails'));
        const gymToken = gymDetails?.token; 

        if (userToken && gymToken) {
            config.headers['Authorization'] = `Bearer ${userToken},Bearer ${gymToken}`;
        } else if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        } else if (gymToken) {
            config.headers['Authorization'] = `Bearer ${gymToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default Api; 