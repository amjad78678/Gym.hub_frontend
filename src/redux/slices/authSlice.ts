import { createSlice } from "@reduxjs/toolkit";


const storedUserInfo=localStorage.getItem('userDetails');
const parsedUserInfo= storedUserInfo?JSON.parse(storedUserInfo):null    ;
const storedGymDetails=localStorage.getItem('gymDetails');
const parsedGymDetails= storedGymDetails?JSON.parse(storedGymDetails):null;

const authSlice=createSlice({
    initialState:{
        uLoggedIn:localStorage.getItem('uLoggedIn')?true:false,
        userDetails:parsedUserInfo,
        gLoggedIn: localStorage.getItem('gLoggedIn')?true:false,
        gymDetails:parsedGymDetails,
        aLoggedIn: localStorage.getItem('aLoggedIn')?true:false
    },
    name:'auth',
    reducers:{
        setUserLogin:(state)=>{
            state.uLoggedIn=true
            localStorage.setItem('uLoggedIn','true')
        },
        setUserDetails:(state,action)=>{
            state.userDetails=action.payload
            localStorage.setItem('userDetails',JSON.stringify(action.payload))
        },
        setUserLogout:(state)=>{
            state.uLoggedIn=false,
            state.userDetails=null
            localStorage.removeItem('uLoggedIn')
            localStorage.removeItem('userDetails')
        },
        setGymLogin: (state,action) => {
            state.gLoggedIn = true;
            localStorage.setItem('gLoggedIn', 'true');
            state.gymDetails=action.payload
            localStorage.setItem('gymDetails',JSON.stringify(action.payload))
        },
        setGymLogout: (state) => {
            state.gLoggedIn = false;
            localStorage.removeItem('gLoggedIn');
            state.gymDetails=null
            localStorage.removeItem('gymDetails')
        },
        setAdminLogin: (state) => {
            state.aLoggedIn = true;
            localStorage.setItem('aLoggedIn', 'true');
        },
        setAdminLogout: (state) => {
            state.aLoggedIn = false;
            localStorage.removeItem('aLoggedIn');
        }
    }
})


export const {setUserLogin,setUserLogout,setUserDetails,setAdminLogin,setAdminLogout,setGymLogin,setGymLogout}=authSlice.actions
export default authSlice.reducer