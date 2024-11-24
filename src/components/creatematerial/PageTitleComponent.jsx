import React from 'react'

import LoadingButton from '@mui/lab/LoadingButton';

import { useSelector } from 'react-redux';

function PageTitleComponent(props) {

    const show_load = useSelector((state) => state.createTableSlice.show_load);
    
    return (
        <div className='flex flex-row justify-between items-center bg-gray-100 rounded-lg px-4 mt-4 mb-3'>
            <span style={{ fontWeight: 600 }} className='py-4 px-2 rounded-lg text-4xl text-start '>Malzeme Giris Sayfasi</span>
            <div className='text-xs' style={{ fontWeight: 500 }}>
                {
                    !show_load ?
                        <button onClick={props.postFunc} className='text-base py-2 px-4 border rounded-md border-green-500 bg-green-600 text-white mx-2 hover:bg-white hover:text-green-500 duration-200' >Ambara Teslim Al</button>
                        :
                        <LoadingButton loading variant="outlined" className='text-black'>
                            Waiting
                        </LoadingButton>
                }
            </div>
        </div>
    )
}

export default PageTitleComponent