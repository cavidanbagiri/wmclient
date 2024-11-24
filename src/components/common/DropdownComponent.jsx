
import React, { useEffect } from 'react'

import { motion, AnimatePresence } from "framer-motion"


function DropDownComponent(props) {
    console.log(props)
    return (
        <AnimatePresence>
            <motion.div className='absolute top-15 z-10'
                initial={{ opacity: 0,  }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0,  }}
                transition={{ duration: 0.4 }}
            >
                <div style={{ fontFamily: 'Saira Condensed' }} className=' rounded-xl flex flex-col items-start bg-white border shadow-2xl max-h-96 overflow-hidden overflow-y-auto w-96'>
                    <div className='flex flex-col w-full bg-white'>
                        <div className='sticky top-0 p-4 bg-white'>
                            <input className=' w-full p-2 text-lg bg-gray-100 rounded-lg' type="text" placeholder={props.input_name} onChange={(event) => {
                                props.filterChange(event, props.text_name)
                            }} />
                        </div>
                        <ul className='w-full px-4'>
                            {props.data.map((item) => (
                                <li className='text-lg text-start p-1 cursor-pointer hover:bg-gray-100'
                                    onClick={(val) => {
                                        props.listenFunc(val.target.id, val.target.innerText);
                                    }} key={item.id} id={item.id} >
                                    {item[props.text_name]}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default DropDownComponent