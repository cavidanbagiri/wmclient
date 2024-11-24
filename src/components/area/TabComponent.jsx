
import React from 'react'

function TabComponent(props) {



    return (
        <div className='flex flex-row justify-start px-3 w-full my-2 text-lg font-thin'>
            <button onClick={()=>{
                props.setTabsNum(0)
            }} 
            className={`px-3 py-1 rounded-md ${props.tabs_num===0 ? 'bg-gray-50 border-b-2 shadow-md' : ''} hover:bg-gray-100 `}>Sahaya Cikilanlar</button>

            <button onClick={()=>{
                props.setTabsNum(1)
            }} 
            className={`px-3 py-1 rounded-md ${props.tabs_num===1 ? 'bg-gray-50 border-b-2 shadow-md' : ''} hover:bg-gray-100 `}>Zayiat Malzemeler</button>

            <button onClick={()=>{
                props.setTabsNum(2)
            }} 
            className={`px-3 py-1 rounded-md ${props.tabs_num===2 ? 'bg-gray-50 border-b-2 shadow-md' : ''} hover:bg-gray-100 `}>Tamirdeki Malzemeler</button>

        </div>
    )
}

export default TabComponent