

import { CiHome } from "react-icons/ci";
import { PiWarehouseThin } from "react-icons/pi";
import { CiSquarePlus } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { PiStackThin } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { PiFactoryThin } from "react-icons/pi";

import '../../css/dropdown.css';

function NavbarItemComponent(props) {
    return (
        <div className='relative text-white hover:bg-gray-100 px-[10px] py-[10px] flex items-center rounded-lg'>
            <span
                onMouseEnter={() => props.setIsShown(true)}
                onMouseLeave={() => props.setIsShown(false)}>
                {props.iconValue === 'Home' && <CiHome className={`${props.selected === 'Home' ? 'text-indigo-600 ' : 'text-black'} my-3 text-3xl`} />}
                {props.iconValue === 'Stock' && <PiStackThin className={`${props.selected === 'Stock' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl`} />}
                {props.iconValue === 'Create' && <CiSquarePlus className={`${props.selected === 'Create' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl`} />}
                {props.iconValue === 'Warehouse' && <PiWarehouseThin className={`${props.selected === 'Warehouse' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl`} />}
                {props.iconValue === 'Area' && <PiFactoryThin className={`${props.selected === 'Area' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl` }/>}
                {props.iconValue === 'Profile' && <CiUser className={`${props.selected === 'Profile' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl` } />}
                {props.iconValue === 'Logout' && <CiLogout className={`${props.selected === 'Logout' ? 'text-indigo-600' : 'text-black'} my-3 text-3xl` }/>}
            </span>
            {
                props.isShown &&
                <div>
                    <span
                        style={{fontWeight: 600}}
                        className="text-ellipsis tooltip-box-animation absolute top-3 left-10 ml-1 bg-slate-900 py-3 px-5 text-white border text-xl rounded-md flex">
                        {props.iconValue}
                    </span>
                </div>

            }

        </div>
    )
}

export default NavbarItemComponent