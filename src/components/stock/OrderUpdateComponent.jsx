
import { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {
    setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxTrue,
    setOrderUpdateErrorMessage,
} from '../../store/stock-store.js';

import StockService from "../../services/stock-service.js";

import CustomLoadingButton from "../common/CustomLoadingButton.jsx";
import SpinnerComponent from '../common/SpinnerComponent.jsx';

import { AnimatePresence, motion } from 'framer-motion';

function OrderUpdateComponent() {

    const dispatch = useDispatch();
    const po_data = useSelector((state) => state.stockSlice.po_data);
    const po_data_pending = useSelector((state) => state.stockSlice.po_data_pending);

    const order_update = useSelector((state) => state.stockSlice.order_update);

    const [material_name, setMaterialName] = useState('');
    const [stock, setStock] = useState(0);
    const [unit, setUnit] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [material_id, setMaterialId] = useState('');

    const postFunc = () => {
        let updated_data = {
            id: po_data.id,
            material_name: material_name,
            stock: stock,
            serial_number: serial_number,
            material_id: material_id,
        };

        dispatch(StockService.updateStock(updated_data))
        dispatch(setOrderUpdateErrorMessage({ message: 'Data Successfully Updated' }))

    }

    useEffect(() => {
        if (po_data?.WarehouseModel?.warehouse_id) {

            setMaterialName(po_data.WarehouseModel.material_name);
            setStock(po_data.stock);
            setUnit(po_data.WarehouseModel.unit);
            setSerialNumber(po_data.serial_number);
            setMaterialId(po_data.material_id);
        }
        else {
            console.log('else work')
        }

    }, [po_data]);

    return (

        <div
            className='flex flex-row justify-between z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30'>
            <div className='w-1/2' ></div>
            <AnimatePresence>
                <motion.div exit={{ opacity: 0, x: -1000, }} initial={{ opacity: 0, x: 1000, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                    className='flex flex-col bg-white w-1/2' >
                    {/* Close and Title Component Section */}
                    <div className='flex justify-between p-5 text-end'>
                        <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='text-3xl'>
                            Malzeme Güncelle
                        </span>
                        <span
                            onClick={() => {
                                dispatch(setOrderSelectionUpdateToggleFalse());
                            }}
                            className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
                            <IoMdClose className='text-2xl' />
                        </span>
                    </div>

                    {po_data_pending && <div className='flex justify-center w-full'><SpinnerComponent /></div>}

                    {po_data && !po_data_pending &&
                        <div className='flex flex-col p-4 '>

                            {/* Material Name Side */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Malzeme Ismi </span>
                                <div className='relative w-full flex justify-end'>
                                    <span className={''}>
                                        {material_name}
                                    </span>
                                </div>
                            </div>

                            {/* Material Qty Side */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Stok </span>
                                <div className='relative'>
                                    {stock}
                                </div>
                            </div>

                            {/* Matterial Type Side */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Birim </span>
                                <div className='relative'>
                                    {unit}
                                </div>
                            </div>

                            {/* Serial Number Side */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Seri Numarası </span>
                                <div className='relative w-full'>
                                    <input value={serial_number} type="text" className={'border p-2 rounded-lg'} onChange={(e) => {
                                        setSerialNumber(e.target.value);
                                    }} />
                                </div>
                            </div>

                            {/* Material ID Side */}
                            <div className='flex items-center justify-between mt-3'>
                                <span className='w-1/3'>Malzeme ID Kodu </span>
                                <div className='relative w-full'>
                                    <input value={material_id} type="text" className={'border p-2 rounded-lg'}
                                        onChange={(e) => {
                                            setMaterialId(e.target.value);
                                        }} />
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
                                    <CustomLoadingButton />
                            }
                        </div>
                    }

                </motion.div>
            </AnimatePresence>
        </div>

    )
}

export default OrderUpdateComponent