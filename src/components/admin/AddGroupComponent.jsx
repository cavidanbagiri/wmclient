
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AdminService from '../../services/admin-service';
import { setCreateGroupStatusInitial,
    setCreateGroupStatusError,
    setCreateGroupMessage
 } from '../../store/admin-store';

import LoadingButton from '@mui/lab/LoadingButton';

function AddOrderedComponent() {


    const dispatch = useDispatch();

    const group = useSelector((state) => state.adminSlice.group);

    let [group_data, setGroupData] = useState({
        group_name: '',
    });

    function createNewGroup() {
        if (group_data.group_name.trim() === '') {
            dispatch(setCreateGroupStatusError());
            dispatch(setCreateGroupMessage('Grup Ismi Gereklidir'));
        }
        else {
            dispatch(AdminService.createGroup(group_data));
        }
    }

    // Fetch All Groups
    useEffect(() => {
        dispatch(AdminService.fetchGroups());
    }, [])

    // Control after creating new ordered conditions and messages
    useEffect(() => {
        if (group.status != -1) {
            setTimeout(() => {
                dispatch(setCreateGroupStatusInitial());
                setGroupData((each) => ({
                    ...each,
                    group_name: '',
                }));
            }, 2000)
        }
    }, [group.status]);

    return (
        <div className=''>

            {
                group.status === 1 && <span className={`flex justify-end bg-green-300 w-full text-end text-green-500 font-bold p-1`}>{group.message}</span>
            }

            {
                group.status === 0 && <span className={`flex justify-end bg-red-300 w-full text-end text-red-500  font-bold p-1`}>{group.message}</span>
            }

            <div className='flex flex-col justify-between text-sm my-3'>

                <div className='flex  justify-between text-sm my-3'>
                    <div className='w-full'>
                        <span className='text-gray-400'>Grup Ismi</span>
                        <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='' value={group_data.group_name}
                            onChange={(event) => {
                                setGroupData((each) => ({
                                    ...each,
                                    group_name: event.target.value
                                }))
                            }} />
                    </div>
                </div>
                <div className='text-sm my-3'>
                    <p className='text-gray-400'>Mevcut Gruplar</p>
                    <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                        onChange={(event) => {
                            setGroupData((each) => ({
                                ...each,
                                groupId: event.target.value,

                            }))
                        }}
                    >
                        {group.groups.map((item) => (
                            <option key={item.id} value={item.id} >{item.group_name}</option>
                        ))}
                    </select>
                </div>

                <div className='opacity-70'>
                    {
                        !group.pending ?
                            <button onClick={createNewGroup} className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                                Onayla
                            </button>
                            :
                            <LoadingButton loading variant="outlined" className='text-black w-full p-4'>
                                Waiting
                            </LoadingButton>
                    }

                </div>
                
            </div>
        </div>
    )
}

export default AddOrderedComponent