import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./Axios";

const tokenManagement = createSlice({
    name: "user",
    initialState: {
        token: ''
    },
    reducers: {
        setToken (state, action) {
            state.token = action.payload
        }
    }
})

const {setToken} = tokenManagement.actions
const tokenReducers = tokenManagement.reducer

// 異步方法
const fetchLogin = ({username, password}) => {
return async(dispatch)=> {
    const response = axiosInstance.post('/login', {username, password})
    dispatch(setToken(response.data.data))
    localStorage.setItem('token', response.data.token);
    
}
}

export {fetchLogin, setToken}
export default tokenReducers