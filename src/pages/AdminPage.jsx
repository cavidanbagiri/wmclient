
import React, { useState } from 'react'

import { useSelector } from 'react-redux';

import AddGroupComponent from '../components/admin/AddGroupComponent' // Checked
import AddProjectsComponent from '../components/admin/AddProjectsComponent' // Checked
import AddCompanyComponent from '../components/admin/AddCompanyComponent' // Checked
import AddUserComponent from '../components/admin/AddUserComponent' // Checked

import AddOrderedComponent from '../components/admin/AddOrderedComponent'

function AdminPage() {

    const user = useSelector((state) => state.userSlice.user);

    const [showCreateCompany, setShowCreateCompany] = useState(false);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [showCreateOrdered, setShowCreateOrdered] = useState(false);
    const [showCreateProject, setShowCreateProject] = useState(false);

    return (
        
        <>
            {
                user.is_admin 
                ?
                <div className='flex flex-col justify-center items-center p-5'>

            <div className='flex flex-row justify-start items-center w-full'>
                <button className='text-sm py-2 px-5 border rounded-md border-black font-bold bg-white text-black mx-2 hover:bg-orange-500 hover:text-white duration-200'
                    onClick={() => setShowCreateCompany(!showCreateCompany)}>Create Company</button>
                <button className='text-sm py-2 px-5 border rounded-md border-black font-bold bg-white text-black mx-2 hover:bg-orange-500 hover:text-white duration-200'
                    onClick={() => setShowCreateGroup(!showCreateGroup)}>Create Group</button>
                <button className='text-sm py-2 px-5 border rounded-md border-black font-bold bg-white text-black mx-2 hover:bg-orange-500 hover:text-white duration-200'
                    onClick={() => setShowCreateUser(!showCreateUser)}>Create User</button>
                <button className='text-sm py-2 px-5 border rounded-md border-black font-bold bg-white text-black mx-2 hover:bg-orange-500 hover:text-white duration-200'
                    onClick={() => setShowCreateOrdered(!showCreateOrdered)}>Create Ordered</button>
                <button className='text-sm py-2 px-5 border rounded-md border-black font-bold bg-white text-black mx-2 hover:bg-orange-500 hover:text-white duration-200'
                    onClick={() => setShowCreateProject(!showCreateProject)}>Create Projects</button>
            </div>

            {
                showCreateCompany && <AddCompanyComponent />
            }

            {
                showCreateGroup && <AddGroupComponent />
            }

            {
                showCreateUser && <AddUserComponent />
            }

            {
                showCreateOrdered && <AddOrderedComponent />
            }

            {
                showCreateProject && <AddProjectsComponent />
            }

                </div>
                :
                <p>Not Authorized</p>
            }
        
        </>

    )
}

export default AdminPage