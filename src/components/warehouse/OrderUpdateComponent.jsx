
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import DropDownComponent from '../common/DropdownComponent';
import CustomLoadingButton from "../common/CustomLoadingButton.jsx";

import { AnimatePresence, motion } from 'framer-motion';

import WarehouseService from '../../services/warehouse-service';

import {
    setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxTrue,
    setOrderUpdateErrorMessage, setOrderUpdateColorCond,
    setOrderUpdateStatus
} from '../../store/warehouse-store';


import { IoMdClose } from "react-icons/io";
import SpinnerComponent from '../common/SpinnerComponent.jsx';
import { USER_MESSAGES } from '../../constants/values.js';


function OrderUpdateComponent() {

    const dispatch = useDispatch();

    const po_data = useSelector((state) => state.warehouseSlice.po_data);
    const po_data_pending = useSelector((state) => state.warehouseSlice.po_data_pending);
    
    const selected_items = useSelector((state) => state.warehouseSlice.selected_items);
    
    const order_update = useSelector((state) => state.warehouseSlice.order_update);

    const companies = useSelector((state) => state.commonSlice.companies);
    const ordereds = useSelector((state) => state.commonSlice.ordereds);


    const material_types = useSelector(state => state.commonSlice.material_types);

    const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
    const [isOrderedDropDown, setIsOrderedDropDown] = useState(false);
    const [documentnum, setDocumentNum] = useState('');
    const [material_type, setMaterialType] = useState('');
    const [material_name, setMaterialName] = useState('');
    const [qty, setQty] = useState(0);
    const [unit, setUnit] = useState('');
    const [po, setPO] = useState('');
    const [price, setPrice] = useState(0);

    const [company, setCompany] = useState({
        companyId: 0,
        company_name: ''
    });
    const [ordered, setOrdered] = useState({
        orderedId: 0,
        ordered_name: '',
    });


    const listenCompany = (val, second_val) => {
        setCompany((each) => ({
            ...each,
            companyId: val,
            company_name: second_val
        }));
        setIsCompanyDropDown(!isCompanyDropDown)
    }
    const listenUser = (val, second_val) => {
        setOrdered((each) => ({
            ...each,
            orderedId: val,
            ordered_name: second_val
        }))
        setIsOrderedDropDown(!isOrderedDropDown);
    }
    const filterChange = (event, comp) => {
        if (comp === 'username') {
            dispatch(filterOrdered(event.target.value));
        }
        else if (comp === 'company_name') {
            dispatch(filterCompany(event.target.value));
        }
    }
    const postFunc = () => {
        let cond = true;
        // if (po_data.leftover <= 0) {
        //     console.log('1');
        //     dispatch(setOrderUpdateMessageBoxTrue());
        //     dispatch(setOrderUpdateColorCond({color:'bg-red-500'}))
        //     dispatch(setOrderUpdateErrorMessage({ message: 'Kalan malzeme 0 oldugu icin, islem gerceklesdirilmedi' }));
        //     cond = false;
        // }
        if (material_name.toString().trim().length === 0) {
            console.log('2');
            dispatch(setOrderUpdateMessageBoxTrue());
            dispatch(setOrderUpdateColorCond({color:'bg-red-500'}))
            dispatch(setOrderUpdateErrorMessage({ message: 'Malzeme ismi bos birakilamaz' }))
            cond = false;
        }
        else if (qty <= 0) {
            console.log('3');
            console.log('3');
            dispatch(setOrderUpdateMessageBoxTrue());
            dispatch(setOrderUpdateColorCond({color:'bg-red-500'}))
            dispatch(setOrderUpdateErrorMessage({ message: 'Malzeme miktari 0 ve ya negativ olamaz' }))
            cond = false;
        }
        else if (price < 0) {
            console.log('4');
            dispatch(setOrderUpdateMessageBoxTrue());
            dispatch(setOrderUpdateColorCond({color:'bg-red-500'}))
            dispatch(setOrderUpdateErrorMessage({ message: 'Malzeme fiyati negativ olamaz' }))
            cond = false;
        }
        // else if (!price) {
        //     console.log('5');
        //     dispatch(setOrderUpdateMessageBoxTrue());
        //     dispatch(setOrderUpdateColorCond({color:'bg-red-500'}))
        //     dispatch(setOrderUpdateErrorMessage({ message: 'Fiyat icin girilen deyer dogru diyil '+ USER_MESSAGES.NON_VALID_NUMBER }))
        //     cond = false;
        // }
        const updated_data = {
            id: Number(po_data.id),
            company_id: company.companyId,
            ordered_id: ordered.orderedId,
            document: documentnum,
            material_name: material_name,
            quantity: qty,
            unit: unit,
            price: price,
            material_type_id: material_type,
            po: po,
        }
        if (cond) {
            console.log('sending for update data ', updated_data);
            dispatch(WarehouseService.updatePO(updated_data))
        }


    }

    useEffect(() => {
        if (po_data?.company?.id) {
            setCompany((each) => ({
                ...each,
                companyId: po_data?.company?.id,
                company_name: po_data?.company?.company_name
            }));
            setDocumentNum(po_data.document);
            setMaterialName(po_data.material_name);
            setMaterialType(po_data.material_type_id);
            setQty(po_data.quantity);
            setPO(po_data.po);
            setUnit(po_data.unit);
            setPrice(po_data.price);
        }
        else{
            console.log('cant enter if');
        }
        if (po_data?.ordered?.id) {
            setOrdered((each) => ({
                ...each,
                orderedId: po_data?.ordered?.id,
                ordered_name: po_data?.ordered?.first_name.charAt(0).toUpperCase() + po_data?.ordered?.first_name.slice(1) + 
                ' ' + po_data?.ordered?.last_name.charAt(0).toUpperCase() + po_data?.ordered?.last_name.slice(1)
            }))
        }
    }, [po_data]);


    useEffect(() => {
        if (order_update.status===201) {
            setTimeout(() => {
                dispatch(setOrderUpdateStatus())
            },2000)
        }
    }, [order_update.status])


    return (
        <div className='flex flex-row justify-between z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30'>
            
            <div className='w-1/2' ></div>
            
            <AnimatePresence>


            <motion.div exit={{ opacity: 0, x: -400, }} initial={{ opacity: 0, x: 200, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
            className='flex flex-col bg-white w-1/2' >
            
                {/* Close and Title Component Section */}
                <div className='flex justify-between p-5 text-end'>
                    <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='text-3xl'>
                        Secileni Guncele
                    </span>
                    <span
                        onClick={() => {
                            dispatch(setOrderSelectionUpdateToggleFalse());
                        }}
                        className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
                        <IoMdClose className='text-2xl' />
                    </span>
                </div>
                { po_data_pending && <div className='flex justify-center w-full'><SpinnerComponent/></div>}
                
                {po_data && !po_data_pending &&
                    <div className='flex flex-col p-4 '>
                        {/* Company Section */}
                        <div className='flex items-center justify-between'>
                            <span className='w-1/3'>Firma Ismi </span>
                            <div className='relative'>
                                <button className='text-xs bg-white border border-gray-300 w-96 rounded-lg p-2 text-ellipsis overflow-hidden text-nowrap outline-none' onClick={() => {
                                    setIsCompanyDropDown(!isCompanyDropDown)
                                }}>
                                    {company.companyId === '' ? 'Firma' : company.company_name}
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
                        </div>

                        {/* Ordered Side */}
                        <div className='flex items-center justify-between mt-3'>
                            <span className='w-1/3'>Siparisci </span>
                            <div className='relative'>
                                <button className='text-xs bg-white border border-gray-300 w-64 rounded-lg  p-2  text-ellipsis overflow-hidden text-nowrap outline-none' onClick={() => {
                                    setIsOrderedDropDown(!isOrderedDropDown)
                                }}>
                                    {ordered.orderedId === '' ? 'Siparisci' : ordered.ordered_name}
                                </button>
                                {
                                    isOrderedDropDown && <DropDownComponent
                                        data={ordereds}
                                        text_name={'username'}
                                        input_name={'Orderer...'}
                                        listenFunc={listenUser}
                                        filterChange={filterChange}
                                    />
                                }
                            </div>
                        </div>

                        {/* Doc Number Side */}
                        <div className='flex items-center justify-between mt-3'>
                            <span className='w-1/3'>Dokuman Numarasi </span>
                            <div className='relative'>
                                <input value={documentnum} className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg p-2 outline-none text-center' type="text" placeholder='Dokuman Numarasi' onChange={(e) => {
                                    setDocumentNum(e.target.value);
                                }} />
                            </div>
                        </div>

                        {/* Material Name Side */}
                        <div className='flex items-center justify-between mt-3'>
                            <span className='w-1/3'>Malzeme Ismi </span>
                            <div className='relative w-full'>
                                <input value={material_name} className='placeholder-black text-xs bg-white border border-gray-300 w-full rounded-lg p-2 outline-none text-center ' type="text" placeholder='Malzeme Ismi' onChange={(e) => {
                                    setMaterialName(e.target.value);
                                }} />
                            </div>
                        </div>

                        {/* Material Qty Side */}
                        <div className='flex items-center justify-between mt-3'>
                            <span className='w-1/3'>Sayi </span>
                            <div className='relative'>
                                <input value={qty} type="number" className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg p-2 outline-none text-center ' placeholder='Sayi' onChange={(e) => {
                                    if(e.target.value<0){
                                        dispatch(setOrderUpdateMessageBoxTrue());
                                        dispatch(setOrderUpdateColorCond({color:'bg-red-500'}))
                                        dispatch(setOrderUpdateErrorMessage({ message: 'Dogru Sayi Giriniz' }));
                                    }
                                    else{
                                        setQty(e.target.value);
                                    }
                                }} />
                            </div>
                        </div>

                        {/* Matterial Type Side */}
                        <div className='flex items-center justify-between mt-3'>
                            <span className='w-1/3'>Birim </span>
                            <div className='relative'>
                                <select value={unit} className='w-48 border p-2 outline-none rounded-lg text-xs text-center'
                                    onChange={(e) => {
                                        setUnit(e.target.value);
                                    }}>
                                    <option value="pcs">Pcs</option>
                                    <option value="ton">Ton</option>
                                    <option value="kg">Kg</option>
                                    <option value="lt">Lt</option>
                                    <option value="mt">Mt</option>
                                    <option value="mt2">Mt2</option>
                                    <option value="mt3">Mt3</option>
                                </select>
                            </div>
                        </div>

                        {/* Material Qty Side */}
                        <div className='flex items-center justify-between mt-3'>
                            <span className='w-1/3'>Fiyat </span>
                            <div className='relative'>
                                <input value={price} className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-36  p-2 outline-none text-center ' type="number" placeholder='Fiyat' 
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }} />
                            </div>
                        </div>

                        {/* Material Name Side */}
                        <div className='flex items-center justify-between mt-3'>
                            <span className='w-1/3'>Siparis Numarasi </span>
                            <div className='relative'>
                                <input value={po}
                                    className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg   p-2 outline-none text-center '
                                    type="text" placeholder='Siparis Numarasi' onChange={(e) => {
                                        setPO(e.target.value);
                                    }} />
                            </div>
                        </div>

                        {/* Matterial Type Side */}
                        <div className='flex items-center justify-between mt-3'>
                            <span className='w-1/3'>Malzeme Tipi </span>
                            <div className='relative '>
                                <select onChange={(event) => {
                                    setMaterialType(event.target.value);
                                }}
                                    className='w-full border p-2 outline-none rounded-lg text-xs'
                                    value={material_type}>
                                    {
                                        material_types.map((each, index) => {
                                            return (
                                                <option key={index} value={each.id}>{each.name}</option>
                                            )
                                        })
                                    }
                                    {/* <option value="Project">Proje</option>
                                    <option value="Consumable">Sarf</option>
                                    <option value="Fixture">Demirbas</option>
                                    <option value="Hand Tools">El Aletleri</option>
                                    <option value="Safety">Safety</option> */}
                                </select>
                            </div>
                        </div>

                        {/* Button Field */}
                        {
                            !order_update.order_update_pending ?
                        <div className='flex justify-end mt-10'>
                            <button onClick={postFunc}
                                className='px-6 py-3 bg-green-500 rounded-lg text-white'>Onayla</button>
                        </div>
                                :
                                <CustomLoadingButton/>
                        }
                    </div>
                }
            
            </motion.div>

            </AnimatePresence>

        </div>
    )
}

export default OrderUpdateComponent