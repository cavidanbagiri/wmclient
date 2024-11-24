import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import DropDownComponent from "../common/DropdownComponent.jsx";
import WarehouseService from "../../services/warehouse-service.js";
import MaterialCodeDropDownComponent from "../common/MaterialCodeDropdownComponent.jsx";

import AdminService from "../../services/admin-service.js";
import CommonService from "../../services/common.services";

function FilterComponent() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);

    const companies = useSelector((state) => state.commonSlice.companies);
    const ordereds = useSelector((state) => state.commonSlice.ordereds);
    const material_code = useSelector((state) => state.commonSlice.material_code);

    // Filter Section Hooks
    const [show_material_code, setShowMaterialCode] = useState(false);
    const [material_code_id, setMaterialCodeId] = useState('');
    const [material_code_description, setMaterialCodeDescription] = useState('');
    
    const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
    const [isUserDropDown, setIsUserDropDown] = useState(false);
    const [documentnum, setDocumentNum] = useState('');
    const [material_name, setMaterialName] = useState('');
    const [po, setPO] = useState('');
    const [createdAt, setSelectedDate] = useState('');

    const [company, setCompany] = useState({
        company_id: '',
        company_name: ''
    })
    const [ordered, setOrdered] = useState({
        ordered_id: '',
        ordered_name: '',
    })

    const listenCompany = (val, second_val) => {
        setCompany((each) => ({
            ...each,
            company_id: val,
            company_name: second_val
        }));
        setIsCompanyDropDown(!isCompanyDropDown)
    }
    const listenUser = (val, second_val) => {
        setOrdered((each) => ({
            ...each,
            ordered_id: val,
            ordered_name: second_val
        }))
        setIsUserDropDown(!isUserDropDown);
    }
    const filterChange = (event, comp) => {
        if (comp === 'username') {
            dispatch(CommonService.filterOrdereds(event.target.value));
        }
        else if (comp === 'company_name') {
            dispatch(CommonService.filterCompanies(event.target.value));
        }
    }

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
            company_id: company.company_id,
            ordered_id: ordered.ordered_id,
            document: documentnum.toString(),
            material_name: material_name.toString(),
            created_at: createdAt.toString(),
            po: po,
            material_code_id: material_code_id
        };
      
        dispatch(WarehouseService.filterWarehouseData(data));
    }

    function handleEscape(e) {
        if (e.key === 'Escape') {
            setIsCompanyDropDown(false);
            setIsUserDropDown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscape, true);
    }, [])

    return (

        <div className='flex items-end justify-between w-full mb-3 px-4'>
            <div className='flex'>

                {/* Selected Date Filter */}
                <div className='mr-3'>
                    <p className='text-xs text-gray-400 pl-1'>Tarih</p>
                    <input
                        className='text-[11px] bg-white border border-gray-300 rounded-lg w-28 p-2 outline-none text-center hover:border-orange-300 '
                        type="date" name="" id="" onChange={(e) => {
                        setSelectedDate(e.target.value)
                    }}/>
                </div>

                {/* Company Side */}
                <div className='relative mr-3'>
                    <p className='text-[11px] text-gray-400 pl-1'>Firma</p>
                    <button
                        className='text-[11px] bg-white border border-gray-300  rounded-lg  p-3 w-36 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 '
                        onClick={() => {
                            setIsCompanyDropDown(!isCompanyDropDown)
                        }}>
                        {company.company_id === '' ? 'Firma' : company.company_name}
                    </button>
                    {
                        isCompanyDropDown && <DropDownComponent
                            data={companies}
                            text_name={'company_name'}
                            input_name={'Company...'}
                            listenFunc={listenCompany}
                            filterChange={filterChange}
                        />
                    }
                </div>

                {/* Ordered Side */}
                <div className='relative mr-3'>
                    <p className='text-xs text-gray-400 pl-1'>Siparisci</p>
                    <button
                        className='text-[11px] bg-white border border-gray-300 rounded-lg p-3 w-36 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 '
                        onClick={() => {
                            setIsUserDropDown(!isUserDropDown)
                        }}>
                        {ordered.ordered_id === '' ? 'Siparisci' : ordered.ordered_name}
                    </button>
                    {
                        isUserDropDown && <DropDownComponent
                            data={ordereds}
                            text_name={'username'}
                            input_name={'Orderer...'}
                            listenFunc={listenUser}
                            filterChange={filterChange}
                        />
                    }
                </div>

                {/* Doc Number Side */}
                <div className='mr-3'>
                    <p className='text-[11px] text-gray-400 pl-1'>Dokuman Numarasi</p>
                    <input value={documentnum}
                           className='placeholder-black text-[11px] bg-white border border-gray-300 rounded-lg w-36 p-2 outline-none text-center hover:border-orange-300 '
                           type="text" placeholder='Dokuman Num' onChange={(e) => {
                        setDocumentNum(e.target.value);
                    }}/>
                </div>

                {/* Material name */}
                <div className='mr-3'>
                    <p className='text-[11px] text-gray-400 pl-1'>Malzeme Ismi</p>
                    <input value={material_name}
                           className='placeholder-black text-[11px] bg-white border border-gray-300 rounded-lg w-64 p-2 outline-none text-center  hover:border-orange-300 '
                           type="text" placeholder='Malzeme Ismi' onChange={(e) => {
                        setMaterialName(e.target.value);
                    }}/>
                </div>

                {/* PO Number */}
                <div className='mr-3'>
                    <p className='text-[11px] text-gray-400 pl-1'>Siparis Numarasi</p>
                    <input value={po}
                           className='placeholder-black text-[11px] bg-white border border-gray-300 rounded-lg w-24 p-2 outline-none text-center hover:border-orange-300 '
                           type="text" placeholder='Siparis No' onChange={(e) => {
                        setPO(e.target.value);
                    }}/>
                </div>

                {/* Material Code Side */}
                <div className='mr-3 relative'>
                    <p className='text-[11px] text-gray-400 pl-1'>Malzeme Kodu</p>
                    <button onClick={()=>{
                        setShowMaterialCode(!show_material_code)
                        console.log('clicked and result is :', show_material_code);
                    }}
                    className='text-[11px] text-gray-600 bg-gray-200 border border-gray-300 rounded-lg p-2 w-36 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 '>
                        {
                            material_code_description === '' ? 'Malzeme Kodu' : material_code_description
                        }
                    </button>
                    { show_material_code &&
                    <MaterialCodeDropDownComponent
                        data={material_code.material_codes}
                        filterChange={filterMaterialCode}
                        listenFunc={listenMaterialCode}
                    />
                }
                </div>

            </div>

            <div className='relative'>
                <p className='text-[11px] text-gray-400 pl-1'>Search</p>
                <button
                    className='text-[11px] bg-green-500  border border-gray-300 rounded-lg p-2 w-24 text-ellipsis overflow-hidden text-nowrap outline-none text-white hover:bg-white hover:text-green-500 duration-200'
                    onClick={searchFunc}>
                    Search
                </button>
            </div>

        </div>

    )
}

export default FilterComponent