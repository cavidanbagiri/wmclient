import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import CustomLoadingButton from '../components/common/CustomLoadingButton.jsx';
import MessageBox from '../layouts/MessageBox.jsx';

import { setImageUploadMessageBoxFalse } from '../store/profile-store.js';

import ProfileService from '../services/profile-service.js';

import { IoCloudUploadOutline } from "react-icons/io5";

function ProfilePage() {

  const dispatch = useDispatch();

  const image_upload = useSelector((state) => state.profileSlice.image_upload);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    else {
      let formData = new FormData()
      formData.append('file', file);
      dispatch(ProfileService.uploadProfileImage(formData));
    }
  }

  useEffect(() => {
    if (image_upload.message_box) {
      setTimeout(() => {
        dispatch(setImageUploadMessageBoxFalse());
      }, 2000)
    }
  }, [image_upload.message_box])

  return (
    <div className='flex flex-col h-screen bg-gray-100 text-gray-400 font-medium items-center justify-center '>

      {
        image_upload.message_box && 
        <MessageBox color={image_upload.color_cond} message={image_upload.error_message} />
      }

      <div className='flex flex-col my-3'>
        <p className='text-start text-2xl  text-gray-400'>
          Foto Ekle
        </p>
        <input placeholder='Add Certificate or Passport' type='file'
          onChange={handleFileChange}
          className={`hover:bg-gray-200 rounded-lg text-base my-2 border`} />
        {
          !image_upload.pending ?
            <button onClick={handleUploadClick}
              className={`hover:bg-slate-600 bg-slate-800  p-3 mb-3 rounded-lg text-base text-white duration-300`}>
              Upload <IoCloudUploadOutline className='ml-1 inline text-2xl' />
            </button>
            :
            <CustomLoadingButton />
        }
      </div>

    </div>
  )
}

export default ProfilePage