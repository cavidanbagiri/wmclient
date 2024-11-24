import React from 'react'

function TypeInformComponent(props) {
    return (
        <div className='flex flex-col justify-start px-5 '>

            <div className='flex text-lg text-gray-400 items-center'>
                <span className='w-28 text-[15px] py-0.5'>
                    Proje
                </span>
                <span className='bg-gray-200 h-2 rounded-lg w-36'>
                </span>
                <span style={{ fontWeight: 600 }} className='text-green-500 text-[16px] ml-4'>
                    {props.type_data.Project}
                </span>
            </div>
            <div className='flex text-lg text-gray-400 items-center'>
                <span className='w-28 text-[15px] py-0.5'>
                    Demirbas
                </span>
                <span className='bg-gray-200 h-2 rounded-lg w-36'>
                </span>
                <span style={{ fontWeight: 600 }} className='text-green-500 text-[16px] ml-4'>
                    {props.type_data.Fixture}
                </span>
            </div>
            <div className='flex text-lg text-gray-400 items-center'>
                <span className='w-28 text-[15px] py-0.5'>
                    Sarf
                </span>
                <span className='bg-gray-200 h-2 rounded-lg w-36'>
                </span>
                <span style={{ fontWeight: 600 }} className='text-green-500 text-[16px] ml-4'>
                    {props.type_data.Consumable}
                </span>
            </div>

        </div>
    )
}

export default TypeInformComponent