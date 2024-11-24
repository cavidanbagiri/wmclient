import React from 'react'

function ButtonComponent(props) {
    return (
        <button onClick={props.executeFunc}
            className='text-[11px] py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-indigo-600 hover:text-white duration-200' >
            {props.title}
        </button>
    )
}

export default ButtonComponent