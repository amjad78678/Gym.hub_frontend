import { createSlice } from "@reduxjs/toolkit";


const storedUserInfo=localStorage.getItem('uLoggedIn');
const parsedUserInfo= storedUserInfo?JSON.parse(storedUserInfo):null;

const authSlice=createSlice({
    initialState:{
        uLoggedIn:parsedUserInfo,
    },
    name:'auth',
    reducers:{
        
        setUserLogin:(state,action)=>{
            state.uLoggedIn=true,
            localStorage.setItem('uLoggedIn',JSON.stringify(action.payload))
        },
        userLogout:(state)=>{
            state.uLoggedIn=false,
            localStorage.removeItem('uLoggedIn')
        }
    }
})


export const {setUserLogin,userLogout}=authSlice.actions
export default authSlice.reducer