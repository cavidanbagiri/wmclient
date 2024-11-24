
import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux';

import AdminService from '../../services/admin-service';

import '../../css/dropdown.css'
import { AnimatePresence, motion } from 'framer-motion';

function DropDownComponent(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AdminService.fetchMaterialCodes());
    }, [dispatch])

    return (
        <AnimatePresence>

            <motion.div style={{ fontFamily: 'Saira Condensed' }} className='absolute top-15 z-10 rounded-xl flex flex-col items-start bg-white border shadow-2xl max-h-96 overflow-hidden overflow-y-auto w-[48rem]'
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0, }}
                transition={{ duration: 0.4 }}
            >
                <div className='flex flex-col w-full bg-white'>
                    <div className='sticky top-0 p-4 bg-white'>
                        <input className=' w-full p-2 text-lg bg-gray-100 rounded-lg' type="text" placeholder='Search with material name or material code'
                            onChange={(event) => {
                                props.filterChange(event)
                            }}
                        />
                    </div>
                    <ul className='w-full px-4'>
                        {props.data.map((item) => (
                            <li className='border-b text-lg text-start p-1 cursor-pointer hover:bg-gray-100'
                                onClick={(val) => {
                                    props.listenFunc(item.id, item.material_code, item.material_description);
                                }}
                                key={item.id} id={item.id}
                            >
                                <div className='flex flex-row justify-start items-center'>
                                    <div className=' w-24'>
                                        <span className=' pr-3'>{item.material_code}</span>
                                    </div>
                                    <div className='w-full'>
                                        <span >{item.material_description} </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

        </AnimatePresence>
    )
}

export default DropDownComponent