import React from 'react'
import { GoProject } from "react-icons/go";

function MaterialTypeInform(props) {
    return (

        <div onClick={()=>{
            props.getTypeFilter(props.item.material_type_id);
        }} 
        className='flex flex-col items-center mr-6 hover:cursor-pointer'>
            <span className='text-gray-500 text-xs mb-1'>{props.title}</span>
            <div className={`flex items-center justify-center border-[7px] ${props.color} rounded-full w-[70px] h-[70px]`}>
                <span style={{ fontWeight: 700 }} className='text-xl'>{props.item.count}%</span>
            </div>
        </div>

    )
}

export default MaterialTypeInform