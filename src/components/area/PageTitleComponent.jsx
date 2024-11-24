import React from 'react'

import { Link } from 'react-router-dom'

function PageTitleComponent() {
    return (
        <div className='flex flex-col p-2 w-full'>
            <div className='flex flex-row w-full justify-between items-center bg-gray-50 rounded-lg px-4 mt-2 mb-3'>
                <span style={{ fontWeight: 600, fontFamily: 'IBM Plex Sans' }}
                    className='py-4 px-2 rounded-lg text-4xl text-start '>Sahaya Cikilan Malzemeler</span>
                <div className='text-xs' style={{ fontWeight: 600 }}>
                    <Link to="/stock">
                        <button className='bg-orange-500 text-white px-5 py-3 rounded-lg'>
                            Stoka Sayfasina Git
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PageTitleComponent