import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AreaService from "../../services/area-service";
import AdminService from "../../services/admin-service.js";

import MaterialCodeDropDownComponent from "../common/MaterialCodeDropdownComponent.jsx";

function FilterComponent() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);
    const material_code = useSelector((state) => state.commonSlice.material_code);

    // Filter Section Hooks
    const [show_material_code, setShowMaterialCode] = useState(false);
    const [material_code_id, setMaterialCodeId] = useState('');
    const [material_code_description, setMaterialCodeDescription] = useState('');

    const [card_number, setCardNNumber] = useState('');
    const [material_name, setMaterialName] = useState('');
    const [po, setPO] = useState('');
    const [createdAt, setSelectedDate] = useState('');
    
    const filterMaterialCode = (event) => {
        dispatch(AdminService.filterMaterialCodes(event.target.value));
    }
    const listenMaterialCode = (id, code, name) => {
        setMaterialCodeId(id);
        setMaterialCodeDescription(name);
        setShowMaterialCode(false);
    }
    
    const searchFunc = () => {
        let data = {
            card_number: card_number.toString(),
            material_name: material_name.toString(),
            createdAt: createdAt.toString(),
            po: po,
            // projectId: user.projectId,
            materialCodeId: material_code_id
        };
        if(user.projectId == 1){

        }
        else{
            data.projectId = user.projectId      
        }
        dispatch(AreaService.filterAreaData(data));
    }

    return (

        <div className="flex flex-col w-full mt-5">
            <div className='flex px-4 justify-start w-full'>
            <span className='text-4xl mb-4 tracking-tighter' style={{ fontWeight: 600, fontFamily: 'IBM Plex Sans' }}>Filtre Islemleri</span>
            </div>

            <div className='flex items-end justify-between w-full mb-3 px-4'>

                <div className='flex'>

                    {/* Selected Date Filter */}
                    <div className='mr-3'>
                        <p className='text-sm text-gray-400 pl-1'>Tarih</p>
                        <input
                            className='text-xs bg-white border border-gray-300 rounded-lg w-28 p-2 outline-none text-center hover:border-orange-300 '
                            type="date" name="" id="" onChange={(e) => {
                                setSelectedDate(e.target.value)
                            }} />
                    </div>

                    {/* Doc Number Side */}
                    <div className='mr-3'>
                        <p className='text-sm text-gray-400 pl-1'>Sicil Numara</p>
                        <input value={card_number}
                            className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-24 p-2 outline-none text-center hover:border-orange-300 '
                            type="text" placeholder='Sicil Numara' onChange={(e) => {
                                setCardNNumber(e.target.value);
                            }} />
                    </div>

                    {/* Material name */}
                    <div className='mr-3'>
                        <p className='text-sm text-gray-400 pl-1'>Malzeme Ismi</p>
                        <input value={material_name}
                            className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-64 p-2 outline-none text-center  hover:border-orange-300 '
                            type="text" placeholder='Malzeme Ismi' onChange={(e) => {
                                setMaterialName(e.target.value);
                            }} />
                    </div>

                    {/* Material name */}
                    <div className='mr-3'>
                        <p className='text-sm text-gray-400 pl-1'>STF No</p>
                        <input value={po}
                            className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-24 p-2 outline-none text-center hover:border-orange-300 '
                            type="text" placeholder='STF No' onChange={(e) => {
                                setPO(e.target.value);
                            }} />
                    </div>

                    {/* Material Code Side */}
                    <div className='mr-3 relative'>
                        <p className='text-sm text-gray-400 pl-1'>Malzeme Kodu</p>
                        <button onClick={() => {
                            setShowMaterialCode(!show_material_code)
                            console.log('clicked and result is :', show_material_code);
                        }}
                            className='text-xs text-gray-600 bg-gray-200 border border-gray-300 rounded-lg p-2 w-36 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 '>
                            {
                                material_code_description === '' ? 'Malzeme Kodu' : material_code_description
                            }
                        </button>
                        {show_material_code &&
                            <MaterialCodeDropDownComponent
                                data={material_code.material_codes}
                                filterChange={filterMaterialCode}
                                listenFunc={listenMaterialCode}
                            />
                        }
                    </div>

                </div>

                <div className=''>
                    <p className='text-sm text-gray-400 pl-1'>Search</p>
                    <button
                        className='text-sm bg-green-500  border border-gray-300 rounded-lg p-2 w-24 text-ellipsis overflow-hidden text-nowrap outline-none text-white hover:bg-white hover:text-green-500 duration-200'
                        onClick={searchFunc}>
                        Search
                    </button>
                </div>

            </div>

        </div>

    )
}

export default FilterComponent