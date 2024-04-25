import { createSlice } from "@reduxjs/toolkit";


const storedUserInfo=localStorage.getItem('userDetails');
const parsedUserInfo= storedUserInfo?JSON.parse(storedUserInfo):null;
const stroredUloggedIn=localStorage.getItem('uLoggedIn');
const parsedUloggedIn= stroredUloggedIn?JSON.parse(stroredUloggedIn):null;

const authSlice=createSlice({
    initialState:{
        uLoggedIn:parsedUloggedIn,
        userDetails:parsedUserInfo,
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
        setAdminLogin: (state) => {
            state.aLoggedIn = true;
            localStorage.setItem('aLoggedIn', 'true');
        },
        adminLogout: (state) => {
            state.aLoggedIn = false;
            localStorage.removeItem('aLoggedIn');
        }
    }
})


export const {setUserLogin,setUserLogout,setUserDetails,setAdminLogin,adminLogout}=authSlice.actions
export default authSlice.reducer