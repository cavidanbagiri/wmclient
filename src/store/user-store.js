
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import $api from '../http';
import UserService from "../services/user-service.js";
axios.defaults.withCredentials = true;

const initialState = {
    user: {
        email: 'unknown',
        username: '',
        projectId: 0,
        user_status: 0,
        is_admin: false,
        profile_image: '',
    },
    login_pending: false,
    is_auth: false,
    is_login_error: false,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserStatus: (state) => {
            state.user.user_status = localStorage.getItem('status_code');
            state.user.is_admin = JSON.parse(localStorage.getItem('is_admin'));
        },
        setLoginErrorFalse: (state) => {
            state.is_login_error = false
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(UserService.userLogin.pending, (state, action) => {
            state.login_pending = true;
        })
        builder.addCase(UserService.userLogin.fulfilled, (state, action) => {
            state.login_pending = false;
            if (action.payload !== null) {
                state.user = action.payload.user;
                state.is_auth = true;
                localStorage.setItem('token', action.payload.access_token);
                localStorage.setItem('is_admin', action.payload.user.is_admin);
                localStorage.setItem('status_code', action.payload.user.status_code)
                localStorage.setItem('project_id', action.payload.user.project);
                localStorage.setItem('username', action.payload.user.username);
                localStorage.setItem('status_name', action.payload.user.status_name);
                localStorage.setItem('profile_image', action.payload.user.profileImage);
                state.user.is_admin = action.payload.user.is_admin;
                state.user.projectId = action.payload.user.projectId;
                state.user.user_status = action.payload.user.status_code;
                state.user.username = action.payload.user.username;
                state.user.status_name = action.payload.user.status_name;
                state.user.profile_image = action.payload.user.profileImage;
                state.is_login_error = false;
            }
            else {
                state.is_login_error = true;
            }
        })
        // builder.addCase(UserService.refreshTokens.fulfilled, (state, action) => {
        //     if (action.payload != null) {
        //         localStorage.setItem('token', action.payload.access);
        //         localStorage.setItem('is_admin', action.payload.user.is_admin);
        //         localStorage.setItem('status_code', action.payload.user.status_code)
        //         localStorage.setItem('projectId', action.payload.user.projectId);
        //         localStorage.setItem('username', action.payload.user.username);
        //         localStorage.setItem('status_name', action.payload.user.status_name);
        //         localStorage.setItem('profile_image', action.payload.user.profileImage);
        //         state.user = action.payload.user;
        //         state.user.projectId = action.payload.user.projectId
        //         state.user.user_status = action.payload.user.status_code;
        //         state.user.is_admin = action.payload.user.is_admin;
        //         state.user.username = action.payload.user.username;
        //         state.user.status_name = action.payload.user.status_name;
        //         if(action.payload.user.profileImage !== null){
        //             state.user.profile_image = localStorage.getItem('profile_image');
        //         }
        //         state.is_auth = true;
        //     }
        // })
        builder.addCase(UserService.refresh.fulfilled, (state, action) => {
            state.is_auth = action.payload
            state.user = action.payload.data.user
        })
        builder.addCase(UserService.userLogout.fulfilled, (state, action) => {
            localStorage.clear();
            state.user = null;
            state.is_auth = false;

        })
    }

});

export const fetchUsers = createAsyncThunk(
    'user/users',
    async () => {
        await $api.get('/user/users')
            .then((response) => {
                console.log('fetch users data is : ', response);
            }).catch((err) => {
                console.log('fetch Error happen : ', err);
            })
    }
)


export const { setUserStatus, setLoginErrorFalse } = userSlice.actions

export default userSlice.reducer;