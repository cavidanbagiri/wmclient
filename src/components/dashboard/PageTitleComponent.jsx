import React from 'react'

import temp_user_image from '../../assets/temp_user_image.png'

import { Link } from 'react-router-dom';

function PageTitleComponent(props) {

    return (
        <div className='flex flex-col justify-between py-2 px-4 rounded-lg mt-4 mb-1 mx-8 '>

            <div className='text-center' >
                {/* <span className='text-[42px] font-bold my-3' >
                    Ustay Warehouse Management System
                </span> */}
            </div>

            <div className='flex flex-row  justify-between items-center mt-1'>
                <div className='flex flex-row items-center'>
                    {

                        localStorage.getItem('profile_image') !== "null" ?
                            <img className="w-20 h-20 rounded-full ring-1 ring-gray-300 dark:ring-gray-500" src={localStorage.getItem('profile_image')} alt="Loading..." />
                            :
                            <img className="w-20 h-20 rounded-full ring-1 ring-gray-300 dark:ring-gray-500" src={temp_user_image} alt="Large avatar" />

                    }
                    {/* <img className="w-20 h-20 rounded-full ring-1 ring-gray-300 dark:ring-gray-500" src={temp_user_image} alt="Large avatar"></img> */}
                    <div className='flex flex-col ml-6 px-1 '>
                        <span className='rounded-lg text-[40px] font-bold ' >Merhaba, {localStorage.getItem('username')}</span>
                        <span className=' px-1 text-[16px] text-gray-400 '>{
                            // props.user.status_name?.charAt(0).toUpperCase() + props.user.status_name?.slice(1)
                            localStorage.getItem('status_name')
                        }</span>
                        {/* <span className='px-1 text-[12px] text-black'>(Ustay Moscow SRU Project)</span> */}
                    </div>
                </div>
                <div className='text-sm' style={{ fontWeight: 500 }}>
                    <Link to="/warehouse" >
                        <button className='bg-indigo-500 text-white px-4 py-2 rounded-lg text-base hover:bg-indigo-600 duration-200'>
                            Ambara Git
                        </button>
                    </Link>

                </div>
            </div>

        </div>
    )
}

export default PageTitleComponent