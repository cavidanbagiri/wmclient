

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AdminService from '../../services/admin-service';
import {
    setCreateProjectStatusInitial,
    setCreateProjectStatusError,
    setCreateProjectMessage
} from '../../store/admin-store';

import LoadingButton from '@mui/lab/LoadingButton';



function AddProjectsComponent() {

    const dispatch = useDispatch();

    let project = useSelector((state) => state.adminSlice.project);
    let [project_data, setProjectData] = useState({
        project_name: '',
        project_code: '',
    });

    function createNewProject() {
        if (project_data.project_name.trim() === '') {
            dispatch(setCreateProjectStatusError());
            dispatch(setCreateProjectMessage('Project Name Required'));
        }
        else if (project_data.project_code.trim() === '') {
            dispatch(setCreateProjectStatusError());
            dispatch(setCreateProjectMessage('Project Code Required'));
        }
        else {
            dispatch(AdminService.createProject(project_data));
        }
    }

    // Fetch All Groups
    useEffect(() => {
        dispatch(AdminService.fetchProjects());
    }, [])

    // Control after creating new ordered conditions and messages
    useEffect(() => {
        if (project.status != -1) {
            setTimeout(() => {
                dispatch(setCreateProjectStatusInitial());
                setProjectData((each) => ({
                    ...each,
                    project_name: '',
                    project_code: ''
                }));
            }, 2000)
        }
    }, [project.status]);

    return (
        <div className=''>

            {
                project.status === 1 && <span className={`flex justify-end bg-green-300 w-full text-end text-green-500 font-bold p-1`}>{project.message}</span>
            }

            {
                project.status === 0 && <span className={`flex justify-end bg-red-300 w-full text-end text-red-500  font-bold p-1`}>{project.message}</span>
            }

            <div className='flex flex-col justify-between text-sm my-3'>

                <div className='flex  justify-between text-sm my-3'>
                    <div className='w-full'>
                        <span className='text-gray-400'>Proje Ismi</span>
                        <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='' value={project_data.project_name}
                            onChange={(event) => {
                                setProjectData((each) => ({
                                    ...each,
                                    project_name: event.target.value
                                }))
                            }} />
                    </div>
                </div>
                <div className='flex  justify-between text-sm my-3'>
                    <div className='w-full'>
                        <span className='text-gray-400'>Kisa Isim</span>
                        <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='' value={project_data.project_code}
                            onChange={(event) => {
                                setProjectData((each) => ({
                                    ...each,
                                    project_code: event.target.value
                                }))
                            }} />
                    </div>
                </div>
                <div className='text-sm my-3'>
                    <p className='text-gray-400'>Available Projects</p>
                    <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                        onChange={(event) => {
                            setProjectData((each) => ({
                                ...each,
                                projectId: event.target.value,

                            }))
                        }}
                    >
                        {project.projects.map((item) => (
                            <option key={item.id} value={item.id} >{item.project_name}</option>
                        ))}
                    </select>
                </div>

                <div className='opacity-70'>
                    {
                        !project.pending ?
                            <button onClick={createNewProject} className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                                Confirm
                            </button>
                            :
                            <LoadingButton loading variant="outlined" className='text-black w-full p-4'>
                                Please Submit
                            </LoadingButton>
                    }

                </div>

            </div>
        </div>
    )
}

export default AddProjectsComponent