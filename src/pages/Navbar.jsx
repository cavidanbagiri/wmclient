
// import React from 'react'
import { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavbarItemComponent from '../components/navbar/navbar_item-component.jsx';



import { TbHexagonLetterWFilled } from "react-icons/tb";
import LoginPage from "./LoginPage.jsx";
import UserService from "../services/user-service.js";

function Navbar() {

    const dispatch = useDispatch();

    const is_auth = useSelector((state) => state.userSlice.is_auth);
    const [homeIsShown, setHomeIsShown] = useState(false);
    const [stockIsShown, setStockIsShown] = useState(false);
    const [createMaterialIsShown, setcreateMaterialIsShown] = useState(false);
    const [warehouseIsShown, setWarehouseIsShown] = useState(false);
    const [logoutIsShown, setLogoutIsShown] = useState(false);
    const [areaIsShown, setAreaIsShown] = useState(false);
    const [profileIsShown, setProfileIsShown] = useState(false);
    
    const [selected , setSelected] = useState('Home');


    // After Reload get current route
    useEffect(()=>{
        const path = window.location.pathname.slice(1);
        if(path === ''){
            setSelected('Home');
        }
        else{
            setSelected(path.charAt(0).toUpperCase() + path.slice(1));
        }
    },[])

    return (


        <div className='relative '>

            {/* Check if User Authenticated */}
            {is_auth ?
                <div className='sticky top-0 left-0 z-20  float-left h-screen flex flex-col items-center p-2 rounded-md bg-white'>

                    <div className='flex flex-col justify-between h-screen bg-white'>
                        <div className='flex flex-col items-center'>
                            <Link to='/' onClick={() => {setSelected('Home')}}>
                                <TbHexagonLetterWFilled className='text-indigo-600 mt-4 mb-2 text-4xl ' />
                            </Link>

                            {/* Home Page */}
                            <Link to='/' onClick={() => {setSelected('Home')}}>
                                <NavbarItemComponent selected={selected} isShown={homeIsShown} setIsShown={setHomeIsShown} iconName={'fa-house'} iconSize={'text-xl'} iconValue={'Home'} />
                            </Link>

                            <Link to="/create" onClick={() => {setSelected('Create')}}>
                                <NavbarItemComponent selected={selected} isShown={createMaterialIsShown} setIsShown={setcreateMaterialIsShown} iconName={'fa-plus'} iconSize={'text-2xl'} iconValue={'Create'} />
                            </Link>

                            <Link to="/warehouse" onClick={() => {setSelected('Warehouse')}}>
                                <NavbarItemComponent selected={selected} isShown={warehouseIsShown} setIsShown={setWarehouseIsShown} iconName={'fa-chart-area'} iconSize={'text-xl'} iconValue={'Warehouse'} />
                            </Link>

                            <Link to="/stock" onClick={() => {setSelected('Stock')}}>
                                <NavbarItemComponent selected={selected} isShown={stockIsShown} setIsShown={setStockIsShown} iconName={'fa-warehouse'} iconSize={'text-xl'} iconValue={'Stock'} />
                            </Link>

                            <Link to="/area" onClick={() => {setSelected('Area')}}>
                                <NavbarItemComponent selected={selected} isShown={areaIsShown} setIsShown={setAreaIsShown} iconName={'fa-area'} iconSize={'text-xl'} iconValue={'Area'} />
                            </Link>

                            <Link to="/profile" onClick={() => {setSelected('Profile')}}>
                                <NavbarItemComponent selected={selected} isShown={profileIsShown} setIsShown={setProfileIsShown} iconName={'fa-profile'} iconSize={'text-xl'} iconValue={'Profile'} />
                            </Link>

                        </div>
                        <div onClick={() => {
                            dispatch(UserService.userLogout());
                        }}>
                            <NavbarItemComponent isShown={logoutIsShown} setIsShown={setLogoutIsShown} iconName={'fa-circle-user'} iconSize={'text-2xl'} iconValue={'Logout'} />
                        </div>
                    </div>

                </div>
                :
                <LoginPage />
            }
            {
                is_auth && <Outlet />
            }


        </div>
    )
}

export default Navbar;
