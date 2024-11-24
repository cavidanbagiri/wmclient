
import { createSlice } from "@reduxjs/toolkit";
import ProfileService from "../services/profile-service";

const initialState = {
    image_upload: {
        pending: false,
        message_box: false,
        error_message: '',
        color_cond: 'bg-green-500',
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    
    reducers: {
        setImageUploadMessageBoxFalse: (state) => {
            state.image_upload.message_box = false
        }
    },
    
    extraReducers:(builder) => {

        builder.addCase(ProfileService.uploadProfileImage.pending, (state, action) => {
            state.image_upload.pending = true
        })
        builder.addCase(ProfileService.uploadProfileImage.fulfilled, (state, action) => {
            console.log('action payload : ', action.payload);
            state.image_upload.pending = false
            if(action.payload.status === 201){
                state.image_upload.message_box = true
                state.image_upload.error_message = action.payload.data.message
                localStorage.setItem('profile_image', action.payload.data.url)
                state.image_upload.color_cond = 'bg-green-500'
            }
            else if(action.payload.status === 500){
                state.image_upload.message_box = true
                state.image_upload.error_message = action.payload.data
                state.image_upload.color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error : ')
            }
        })
    }

})

export const { setImageUploadMessageBoxFalse } = profileSlice.actions


export default profileSlice.reducer