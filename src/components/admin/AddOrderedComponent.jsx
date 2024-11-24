
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AdminService from '../../services/admin-service';
import { setCreateOrderedStatusInitial,
    setCreateOrderedStatusError,
    setCreateOrderedMessage } from '../../store/admin-store';

import LoadingButton from '@mui/lab/LoadingButton';

function AddOrderedComponent() {


    const dispatch = useDispatch();
    const ordered = useSelector((state) => state.adminSlice.ordered);
    
    let group = useSelector((state) => state.adminSlice.group);
    let project = useSelector((state) => state.adminSlice.project);

    let [ordered_data, setOrderedData] = useState({
        first_name: '',
        last_name: '',
        // email: '',
        // phoneNumber: '',
        project_id: 1,
        group_id: 1,
        group_name: ''
    });

    function createNewOrdered() {
        if(ordered_data.first_name.trim() === '' ){
            dispatch(setCreateOrderedStatusError());
            dispatch(setCreateOrderedMessage('Siparisici Adi Giriniz'));
        }
        else if(ordered_data.last_name.trim() === '' ){
            dispatch(setCreateOrderedStatusError());
            dispatch(setCreateOrderedMessage('Siparisici Soyadi Giriniz'));
        }
        else{
            dispatch(AdminService.createOrdered(ordered_data));
        }
    }

    // Fetch All Groups
    useEffect(() => {
        dispatch(AdminService.fetchGroups());
    }, [])

    // Control after creating new ordered conditions and messages
    // Fetch All Groups
    useEffect(() => {
        dispatch(AdminService.fetchGroups());
        dispatch(AdminService.fetchProjects());
        dispatch(AdminService.fetchOrdereds());
    }, [])

    // Control after creating new ordered conditions and messages
    useEffect(() => {
        if (ordered.status != -1) {
            setTimeout(() => {
                dispatch(setCreateOrderedStatusInitial());
                setOrderedData((each) => ({
                    ...each,
                    first_name: '',
                    last_name: '',
                    project_id: 1,
                    group_id: 1,
                    group_name: ''
                }));
            }, 2000)
        }
    }, [ordered.status]);


    return (
        <div className=''>

            {
                ordered.status === 1 && <span className={`flex justify-end bg-green-300 w-full text-end text-green-500 font-bold p-1`}>{ordered.message}</span>
            }

            {
                ordered.status === 0 && <span className={`flex justify-end bg-red-300 w-full text-end text-red-500  font-bold p-1`}>{ordered.message}</span>
            }


            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>First name</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder=''  value={ordered_data.first_name}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                first_name: event.target.value
                            }))
                        }} />
                </div>
                <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Last name</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder=''  value={ordered_data.last_name}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                last_name: event.target.value
                            }))
                        }} />
                </div>
            </div>

            {/* Group */}
            <div className='text-sm my-3'>
                <p className='text-gray-400'>Group</p>
                <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                    onChange={(event) => {
                        setOrderedData((each) => ({
                            ...each,
                            group_id: event.target.value,

                        }))
                    }}
                >
                    {group.groups.map((item) => (
                        <option key={item.id} value={item.id} >{item.group_name}</option>
                    ))}
                </select>
            </div>

            {/* Project */}
            <div className='text-sm my-3'>
                <p className='text-gray-400'>Project</p>
                <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                    onChange={(event) => {
                        setOrderedData((each) => ({
                            ...each,
                            project_id: event.target.value,

                        }))
                    }}
                >
                    {project.projects.map((item) => (
                        <option key={item.id} value={item.id} >{item.project_name.toUpperCase()}</option>
                    ))}
                </select>
            </div>

            <div className='opacity-70'>

                {
                    !ordered.pending ?
                        <button onClick={createNewOrdered} className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                            Confirm
                        </button>
                        :
                        <LoadingButton loading variant="outlined" className='text-black w-full p-4'>
                            Please Submit
                        </LoadingButton>
                }

            </div>
        </div>
    )
}

export default AddOrderedComponent