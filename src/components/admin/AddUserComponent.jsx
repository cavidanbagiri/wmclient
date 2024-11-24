
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AdminService from '../../services/admin-service';
import { setCreateUserStatusInitial,
    setCreateUserStatusError,
    setCreateUserMessage } from '../../store/admin-store';

import LoadingButton from '@mui/lab/LoadingButton';

function AddOrderedComponent() {


    const dispatch = useDispatch();
    
    const user = useSelector((state) => state.adminSlice.user);

    const group = useSelector((state) => state.adminSlice.group);
    const project = useSelector((state) => state.adminSlice.project);
    const user_status = useSelector((state) => state.adminSlice.user_status);

    let [ordered_data, setOrderedData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        // phoneNumber: '',
        password: '',
        // address: '',
        // is_admin: false,
        project_id: project.projects[0]?.id ?? 1,
        group_id: group.groups[0]?.id ?? 1,
        // group_name: '',
        user_status_id: user_status[0]?.id ?? 1
    });

    function createNewOrdered() {
        if (ordered_data.email.trim() === ''){
            dispatch(setCreateUserStatusError());
            dispatch(setCreateUserMessage('Email Required'));
        } 
        else if(ordered_data.first_name.trim() === ''){
            dispatch(setCreateUserStatusError());
            dispatch(setCreateUserMessage('First Name Required'));
        } 
        else if (ordered_data.last_name.trim() === ''){
            dispatch(setCreateUserStatusError());
            dispatch(setCreateUserMessage('Last Name Required'));
        } 
        else if (ordered_data.password.trim() === ''){
            dispatch(setCreateUserStatusError());
            dispatch(setCreateUserMessage('Password Required'));
        }
        else if (ordered_data.password.trim().length < 8){
            dispatch(setCreateUserStatusError());
            dispatch(setCreateUserMessage('Password Must be grater than 8 character'));
        }        
        else{
            console.log('ordered data ', ordered_data);
            dispatch(AdminService.createUser(ordered_data));
        }
    }

    // Fetch All Groups
    useEffect(() => {
        dispatch(AdminService.fetchGroups());
        dispatch(AdminService.fetchProjects());
        dispatch(AdminService.fetchUserStatus());
    }, [])

    // Control after creating new ordered conditions and messages
    useEffect(() => {
        if (user.status != -1) {
            setTimeout(() => {
                dispatch(setCreateUserStatusInitial());
                setOrderedData((each) => ({
                    ...each,
                    first_name: '',
                    last_name: '',
                    email: '',
                    //phoneNumber: '',
                    password: '',
                    //address: '',
                    //is_admin: false,
                    project_id: project.projects[0]?.id ?? 1,
                    group_id: group.groups[0]?.id ?? 1,
                    //group_name: '',
                    user_status_id: user_status[0]?.id ?? 1
                }));
            }, 2000)
        }
    }, [user.status]);

   

    return (
        <div className=''>

            {
                user.status === 1 && <span className={`flex justify-end bg-green-300 w-full text-end text-green-500 font-bold p-1`}>{user.message}</span>
            }

            {
                user.status === 0 && <span className={`flex justify-end bg-red-300 w-full text-end text-red-500  font-bold p-1`}>{user.message}</span>
            }

            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>Email</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="email" placeholder='@gmail.com' value={ordered_data.email}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                email: event.target.value
                            }))
                        }} />
                </div>
                {/* <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Phone</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='+(8) 9656666666'  value={ordered_data.phoneNumber}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                phoneNumber: event.target.value
                            }))
                        }} />
                </div> */}
            </div>
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

            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>Password</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder=''  value={ordered_data.password}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                password: event.target.value
                            }))
                        }} />
                </div>
                {/* <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Address</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder=''  value={ordered_data.address}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                address: event.target.value
                            }))
                        }} />
                </div> */}
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

            {/* Projects */}
            <div className='text-sm my-3'>
                <p className='text-gray-400'>Projects</p>
                <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                    onChange={(event) => {
                        console.log('event target is : ', event.target.value);
                        setOrderedData((each) => ({
                            ...each,
                            project_id: event.target.value,
                        }))
                    }}
                >
                    {project.projects.map((item) => (
                        <option key={item.id} value={item.id} >{item.project_name}</option>
                    ))}
                </select>
            </div>


            {/* User Status */}
            <div className='text-sm my-3'>
                <p className='text-gray-400'>User Status</p>
                <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                    onChange={(event) => {
                        setOrderedData((each) => ({
                            ...each,
                            user_status_id: event.target.value,
                        }))
                    }}
                >
                    {user_status.map((item) => (
                        <option key={item.id} value={item.id} >{item.status_name}</option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <div className='opacity-70'>

                {
                    !user.pending ?
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