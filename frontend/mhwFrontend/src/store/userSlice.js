import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:{}
}

const userSlice=createSlice({

    name:"userInfo",
    initialState,
    reducers:{
 
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload;
        },
        logout:(state,action)=>{
            state.status=false;
            state.userData=null;
        }


    }

})

export default userSlice.reducer
export const {login,logout}=userSlice.actions;