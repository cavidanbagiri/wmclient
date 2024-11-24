import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import $api, { API_URL } from "../http";



class UserService {

    static userLogin = createAsyncThunk(
        'users/login',
        async (user_data) => {
            let data = null;
            await $api.post('/users/login', user_data)
                .then((response) => {
                    data = response.data;
                }).catch((err)=>{
                    data = null;
                })
            return data;
        }
    );

    static refresh = createAsyncThunk(
        '/users/refresh',
        async ()=>{
            let data = null
            await $api.get('/users/refresh')
            .then((res)=>{
                data = {
                    data: res.data,
                    status_code: res.status
                }
                
            })
            .catch((err)=>{
                if(err){
                    data = {
                        message: err.response.data['message'],
                        status_code: err.response.status
                    }
                }
            })
            return data
        } 
    )

   static userLogout = createAsyncThunk(
       '/users/logout',
       async ()=>{
        //    await $api.post('/users/logout')
        //    .then((response) => {
        //        console.log('user logout ',response);
        //    })
        localStorage.clear();
       }
   )

}


export default UserService;